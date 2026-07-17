"use server";

import { prisma } from "@/lib/db";

export async function getPromptPacks() {
  return prisma.product.findMany({
    where: { type: "PROMPT_PACK", published: true },
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { promptItems: true } },
    },
  });
}

export async function getPromptPack(slug: string) {
  return prisma.product.findUnique({
    where: { slug, type: "PROMPT_PACK" },
    include: {
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
      promptItems: {
        orderBy: { sortOrder: "asc" },
        select: { id: true, title: true, aspectRatio: true, coverImage: true, isFreeSample: true, promptText: true },
      },
    },
  });
}

export async function getCourses() {
  return prisma.product.findMany({
    where: { type: "COURSE", published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getCourse(slug: string) {
  return prisma.product.findUnique({
    where: { slug, type: "COURSE" },
    include: {
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
      bundleChildren: { include: { child: true } },
    },
  });
}

export async function getBundleBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug, isBundle: true },
    include: {
      bundleChildren: { include: { child: true } },
    },
  });
}

export async function getSiteContent(key: string) {
  const row = await prisma.siteContent.findUnique({ where: { key } });
  return row?.value ?? null;
}
