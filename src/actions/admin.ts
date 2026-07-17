"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { ProductType, Role, OrderStatus, PaymentProvider } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    throw new Error("Forbidden");
  }
}

export async function adminGetDashboard() {
  await requireAdmin();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalRevenue, revenueThisMonth, totalOrders, totalCustomers, recentOrders, topProducts] = await Promise.all([
    prisma.order.aggregate({ _sum: { totalAmount: true }, where: { status: { in: ["PAID", "FULFILLED"] } } }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { in: ["PAID", "FULFILLED"] }, createdAt: { gte: startOfMonth } },
    }),
    prisma.order.count({ where: { status: { in: ["PAID", "FULFILLED"] } } }),
    prisma.user.count(),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: true, items: { include: { product: true } } },
    }),
    prisma.orderItem.groupBy({
      by: ["productId"],
      _count: { productId: true },
      orderBy: { _count: { productId: "desc" } },
      take: 5,
    }),
  ]);

  const topProductIds = topProducts.map((p) => p.productId);
  const products = await prisma.product.findMany({ where: { id: { in: topProductIds } } });

  return {
    totalRevenue: totalRevenue._sum.totalAmount ?? 0,
    revenueThisMonth: revenueThisMonth._sum.totalAmount ?? 0,
    totalOrders,
    totalCustomers,
    recentOrders,
    topProducts: topProducts.map((p) => ({
      ...p,
      product: products.find((x) => x.id === p.productId),
    })),
  };
}

export async function adminListProducts(type?: ProductType) {
  await requireAdmin();
  return prisma.product.findMany({
    where: type ? { type } : {},
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { promptItems: true, lessons: true, bundleChildren: true } } },
  });
}

export async function adminGetProduct(id: string) {
  await requireAdmin();
  return prisma.product.findUnique({
    where: { id },
    include: {
      promptItems: { orderBy: { sortOrder: "asc" } },
      lessons: { orderBy: { sortOrder: "asc" } },
      bundleChildren: { include: { child: true } },
    },
  });
}

export async function adminCreateProduct(data: {
  type: ProductType;
  slug: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  category?: string;
  level?: string;
  isBundle?: boolean;
  metadata?: object;
}) {
  await requireAdmin();
  const product = await prisma.product.create({ data: { ...data, price: Math.round(data.price) } });
  revalidatePath("/prompts");
  revalidatePath("/courses");
  return product;
}

export async function adminUpdateProduct(
  id: string,
  data: {
    slug?: string;
    title?: string;
    description?: string;
    price?: number;
    coverImage?: string;
    category?: string;
    level?: string;
    published?: boolean;
    metadata?: object;
  }
) {
  await requireAdmin();
  const update: Record<string, unknown> = { ...data };
  if (data.price) update.price = Math.round(data.price);
  const product = await prisma.product.update({ where: { id }, data: update });
  revalidatePath("/prompts");
  revalidatePath("/courses");
  return product;
}

export async function adminCreatePromptItem(data: {
  packId: string;
  title: string;
  aspectRatio: string;
  promptText: string;
  coverImage: string;
  sortOrder: number;
  isFreeSample?: boolean;
}) {
  await requireAdmin();
  return prisma.promptItem.create({ data });
}

export async function adminUpdatePromptItem(
  id: string,
  data: Partial<{
    title: string;
    aspectRatio: string;
    promptText: string;
    coverImage: string;
    sortOrder: number;
    isFreeSample: boolean;
  }>
) {
  await requireAdmin();
  return prisma.promptItem.update({ where: { id }, data });
}

export async function adminDeletePromptItem(id: string) {
  await requireAdmin();
  return prisma.promptItem.delete({ where: { id } });
}

export async function adminCreateLesson(data: {
  courseId: string;
  title: string;
  slug: string;
  videoKey: string;
  duration?: number;
  resourceUrl?: string;
  description?: string;
  sortOrder: number;
}) {
  await requireAdmin();
  return prisma.lesson.create({ data });
}

export async function adminUpdateLesson(id: string, data: Partial<{
  title: string;
  slug: string;
  videoKey: string;
  duration: number;
  resourceUrl: string;
  description: string;
  sortOrder: number;
}>) {
  await requireAdmin();
  return prisma.lesson.update({ where: { id }, data });
}

export async function adminDeleteLesson(id: string) {
  await requireAdmin();
  return prisma.lesson.delete({ where: { id } });
}

export async function adminListOrders(filters?: { status?: string; provider?: string }) {
  await requireAdmin();
  return prisma.order.findMany({
    where: {
      ...(filters?.status && { status: filters.status as OrderStatus }),
      ...(filters?.provider && { paymentProvider: filters.provider as PaymentProvider }),
    },
    orderBy: { createdAt: "desc" },
    include: { user: true, items: { include: { product: true } }, payment: true },
  });
}

export async function adminGetOrder(id: string) {
  await requireAdmin();
  return prisma.order.findUnique({
    where: { id },
    include: { user: true, items: { include: { product: true } }, payment: true },
  });
}

export async function adminCreateManualOrder(data: {
  userId: string;
  productIds: string[];
  totalAmount: number;
  currency: string;
  notes?: string;
}) {
  await requireAdmin();

  const products = await prisma.product.findMany({ where: { id: { in: data.productIds } } });

  const order = await prisma.order.create({
    data: {
      userId: data.userId,
      totalAmount: Math.round(data.totalAmount),
      currency: data.currency,
      paymentProvider: "MANUAL",
      status: "FULFILLED",
      notes: data.notes,
      items: {
        create: products.map((p) => ({ productId: p.id, price: p.price, quantity: 1 })),
      },
      payment: {
        create: { provider: "MANUAL", status: "COMPLETED", amount: Math.round(data.totalAmount), currency: data.currency },
      },
    },
  });

  for (const product of products) {
    await prisma.entitlement.upsert({
      where: { userId_productId: { userId: data.userId, productId: product.id } },
      update: {},
      create: { userId: data.userId, productId: product.id, source: "manual" },
    });
  }

  return order;
}

export async function adminListCustomers() {
  await requireAdmin();
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  });
}

export async function adminGetCustomer(id: string) {
  await requireAdmin();
  return prisma.user.findUnique({
    where: { id },
    include: { orders: { include: { items: { include: { product: true } } }, orderBy: { createdAt: "desc" } }, entitlements: { include: { product: true } } },
  });
}

export async function adminGrantEntitlement(userId: string, productId: string) {
  await requireAdmin();
  return prisma.entitlement.upsert({
    where: { userId_productId: { userId, productId } },
    update: {},
    create: { userId, productId, source: "manual" },
  });
}

export async function adminRevokeEntitlement(id: string) {
  await requireAdmin();
  return prisma.entitlement.delete({ where: { id } });
}

export async function adminListMedia() {
  await requireAdmin();
  return prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getSiteContent(key: string) {
  const row = await prisma.siteContent.findUnique({ where: { key } });
  return row?.value ?? "";
}

export async function updateSiteContent(key: string, value: string) {
  await requireAdmin();
  return prisma.siteContent.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function getSiteSetting(key: string) {
  const row = await prisma.siteSettings.findUnique({ where: { key } });
  return row?.value ?? "";
}

export async function updateSiteSetting(key: string, value: string) {
  await requireAdmin();
  return prisma.siteSettings.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
