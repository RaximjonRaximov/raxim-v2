"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { getSignedVideoUrl } from "@/lib/r2";

export async function getMyEntitlements() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.entitlement.findMany({
    where: { userId: session.user.id },
    include: { product: true },
  });
}

export async function getMyOrders() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } }, payment: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOwnedPromptPack(slug: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const pack = await prisma.product.findUnique({
    where: { slug, type: "PROMPT_PACK" },
    include: {
      promptItems: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!pack) return null;

  const entitlement = await prisma.entitlement.findUnique({
    where: { userId_productId: { userId: session.user.id, productId: pack.id } },
  });

  if (!entitlement) return null;

  return pack;
}

export async function getOwnedCourse(slug: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const course = await prisma.product.findUnique({
    where: { slug, type: "COURSE" },
    include: { lessons: { orderBy: { sortOrder: "asc" } } },
  });

  if (!course) return null;

  const entitlement = await prisma.entitlement.findUnique({
    where: { userId_productId: { userId: session.user.id, productId: course.id } },
  });

  if (!entitlement) return null;

  return course;
}

export async function getVideoUrl(lessonId: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { course: true },
  });

  if (!lesson) return null;

  const entitlement = await prisma.entitlement.findUnique({
    where: { userId_productId: { userId: session.user.id, productId: lesson.courseId } },
  });

  if (!entitlement) return null;

  return getSignedVideoUrl(lesson.videoKey);
}

export async function hasEntitlement(userId: string, productId: string) {
  const entitlement = await prisma.entitlement.findUnique({
    where: { userId_productId: { userId, productId } },
  });
  return !!entitlement;
}
