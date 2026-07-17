import { PrismaClient, ProductType } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface PromptEntry {
  index: number;
  title: string;
  prompt: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function seed() {
  const prompts: PromptEntry[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, "90_prompts.json"), "utf-8")
  );

  const category = await prisma.category.upsert({
    where: { slug: "featured-ai-prompts" },
    update: {},
    create: {
      title: "Featured AI Prompts",
      slug: "featured-ai-prompts",
      description: "A curated set of 90 production-ready prompts with generated preview images.",
      coverImage: "/prompts/featured/img_01.jpg",
      sortOrder: -1,
    },
  });

  const createdProductIds: string[] = [];

  for (const entry of prompts) {
    const slug = `featured-${entry.index}-${slugify(entry.title)}`;
    const coverImage = `/prompts/featured/img_${String(entry.index).padStart(2, "0")}.jpg`;

    const product = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        type: ProductType.PROMPT_PACK,
        slug,
        title: entry.title,
        description: `Premium AI prompt for ${entry.title.toLowerCase()}. Ready to use with Midjourney, DALL·E, GPT Image 2, Flux, and Stable Diffusion.`,
        price: 500,
        coverImage,
        categoryId: category.id,
        published: true,
        sortOrder: entry.index,
      },
    });

    createdProductIds.push(product.id);

    await prisma.promptItem.upsert({
      where: { id: `${product.id}-sample` },
      update: {},
      create: {
        id: `${product.id}-sample`,
        packId: product.id,
        title: `${entry.title} Prompt`,
        aspectRatio: "1:1",
        promptText: entry.prompt,
        coverImage,
        sortOrder: 0,
        isFreeSample: false,
      },
    });
  }

  // Add featured products to the full library and all-access bundles
  const bundles = await prisma.product.findMany({
    where: { slug: { in: ["full-prompt-library", "all-access"] } },
  });

  for (const bundle of bundles) {
    const existing = await prisma.bundleProduct.findMany({
      where: { bundleId: bundle.id },
      select: { childId: true },
    });
    const existingIds = new Set(existing.map((b) => b.childId));
    const newIds = createdProductIds.filter((id) => !existingIds.has(id));
    await prisma.bundleProduct.createMany({
      data: newIds.map((childId) => ({ bundleId: bundle.id, childId })),
    });
  }

  console.log(`Seeded ${prompts.length} featured prompts in category ${category.title}.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
