import { PrismaClient, ProductType } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface BulkPrompt {
  categorySlug: string;
  subcategory: string;
  title: string;
  aspectRatio: string;
  reusablePrompt: string;
  filledImagePrompt: string;
}

function aspectRatioToSize(ratio: string): { width: number; height: number } {
  switch (ratio) {
    case "1:1":
      return { width: 1024, height: 1024 };
    case "4:3":
      return { width: 1024, height: 768 };
    case "3:2":
      return { width: 1024, height: 683 };
    case "16:9":
      return { width: 1024, height: 576 };
    case "9:16":
      return { width: 576, height: 1024 };
    case "4:5":
      return { width: 820, height: 1024 };
    case "2:3":
      return { width: 683, height: 1024 };
    case "21:9":
      return { width: 1024, height: 439 };
    default:
      return { width: 1024, height: 1024 };
  }
}

function imageUrl(prompt: string, seed: number, aspectRatio: string): string {
  const { width, height } = aspectRatioToSize(aspectRatio);
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&nologo=true&model=flux&seed=${seed}`;
}

async function seed() {
  const raw = JSON.parse(
    fs.readFileSync(path.join(__dirname, "bulk-prompts.json"), "utf-8")
  );
  const prompts: BulkPrompt[] = Array.isArray(raw) ? raw : raw.prompts;

  // Group by category
  const byCategory = new Map<string, BulkPrompt[]>();
  for (const p of prompts) {
    const list = byCategory.get(p.categorySlug) || [];
    list.push(p);
    byCategory.set(p.categorySlug, list);
  }

  const bundleSlugs = ["full-prompt-library", "all-access"];
  const bundles = await prisma.product.findMany({
    where: { slug: { in: bundleSlugs } },
  });

  let globalSeed = 1;

  for (const [categorySlug, items] of byCategory) {
    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!category) {
      console.warn(`Category not found: ${categorySlug}`);
      continue;
    }

    const packSlug = `essential-${categorySlug}`;
    const title = `Essential ${category.title} Prompts`;
    const coverImage = imageUrl(items[0].filledImagePrompt, globalSeed, items[0].aspectRatio);

    const product = await prisma.product.upsert({
      where: { slug: packSlug },
      update: {},
      create: {
        type: ProductType.PROMPT_PACK,
        slug: packSlug,
        title,
        description: `A curated collection of 30 reusable, high-quality AI image prompts for ${category.title.toLowerCase()}. Every prompt uses [bracket] placeholders so you can change the subject, color, mood, and more in seconds.`,
        price: 0,
        coverImage,
        categoryId: category.id,
        published: true,
        sortOrder: -1000,
      },
    });

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await prisma.promptItem.upsert({
        where: { id: `${product.id}-${i}` },
        update: {},
        create: {
          id: `${product.id}-${i}`,
          packId: product.id,
          title: item.title,
          aspectRatio: item.aspectRatio,
          promptText: item.reusablePrompt,
          coverImage: imageUrl(item.filledImagePrompt, globalSeed, item.aspectRatio),
          sortOrder: i,
          isFreeSample: true,
        },
      });
      globalSeed++;
    }

    // Add this pack to the two main bundles if not already linked
    for (const bundle of bundles) {
      await prisma.bundleProduct.upsert({
        where: {
          bundleId_childId: { bundleId: bundle.id, childId: product.id },
        },
        update: {},
        create: { bundleId: bundle.id, childId: product.id },
      });
    }

    console.log(`Seeded ${items.length} prompts for ${category.title}`);
  }

  console.log("Bulk prompt seed complete.");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
