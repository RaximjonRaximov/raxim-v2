"use server";

import { prisma } from "@/lib/db";

export async function getPromptPacks() {
  return prisma.product.findMany({
    where: { type: "PROMPT_PACK", published: true },
    orderBy: { sortOrder: "asc" },
    include: {
      promptItems: {
        orderBy: { sortOrder: "asc" },
        select: { metadata: true },
      },
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

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });
}

export async function getSiteContent(key: string) {
  const row = await prisma.siteContent.findUnique({ where: { key } });
  return row?.value ?? null;
}
