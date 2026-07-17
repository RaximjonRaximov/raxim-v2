"use server";

import { prisma } from "@/lib/db";

export async function getPromptPacks() {
  return prisma.product.findMany({
    where: { type: "PROMPT_PACK", published: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    include: {
      category: true,
      _count: { select: { promptItems: true } },
    },
  });
}

export async function getPromptPack(slug: string) {
  return prisma.product.findUnique({
    where: { slug, type: "PROMPT_PACK" },
    include: {
      category: true,
      promptItems: {
        orderBy: { sortOrder: "asc" },
        select: { id: true, title: true, aspectRatio: true, coverImage: true, isFreeSample: true, sortOrder: true },
      },
    },
  });
}

export async function getPromptPackWithSamples(slug: string) {
  return prisma.product.findUnique({
    where: { slug, type: "PROMPT_PACK" },
    include: {
      category: true,
      promptItems: {
        orderBy: { sortOrder: "asc" },
        select: { id: true, title: true, aspectRatio: true, coverImage: true, metadata: true, isFreeSample: true, promptText: true },
      },
    },
  });
}

export async function getCourses() {
  return prisma.product.findMany({
    where: { type: "COURSE", published: true },
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { lessons: true } },
    },
  });
}

export async function getCourse(slug: string) {
  return prisma.product.findUnique({
    where: { slug, type: "COURSE" },
    include: {
      category: true,
      lessons: {
        orderBy: { sortOrder: "asc" },
        select: { id: true, title: true, slug: true, duration: true },
      },
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      products: {
        where: { type: "PROMPT_PACK", published: true },
        orderBy: { sortOrder: "asc" },
        include: { category: true, _count: { select: { promptItems: true } } },
      },
    },
  });
}

export async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: { type: "PROMPT_PACK", published: true },
        orderBy: { sortOrder: "asc" },
        include: { category: true, _count: { select: { promptItems: true } } },
      },
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      bundleChildren: { include: { child: true } },
    },
  });
}

export async function getBundleBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug, isBundle: true },
    include: {
      category: true,
      bundleChildren: { include: { child: true } },
    },
  });
}

export async function getSiteContent(key: string) {
  const row = await prisma.siteContent.findUnique({ where: { key } });
  return row?.value ?? null;
}
