import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface SubcategoryPrompt {
  categorySlug: string;
  subcategoryTitle: string;
  title: string;
  aspectRatio: string;
  reusablePrompt: string;
  filledImagePrompt: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
    fs.readFileSync(path.join(__dirname, "subcategory-prompts-all.json"), "utf-8")
  );
  const prompts: SubcategoryPrompt[] = Array.isArray(raw) ? raw : raw.prompts;

  // Group by product slug
  const byProduct = new Map<string, SubcategoryPrompt[]>();
  for (const p of prompts) {
    const productSlug = `${p.categorySlug}-${slugify(p.subcategoryTitle)}`;
    const list = byProduct.get(productSlug) || [];
    list.push(p);
    byProduct.set(productSlug, list);
  }

  let globalSeed = 10000;
  let updated = 0;
  let created = 0;

  for (const [productSlug, items] of byProduct) {
    const product = await prisma.product.findUnique({
      where: { slug: productSlug },
    });
    if (!product) {
      console.warn(`Product not found: ${productSlug}`);
      continue;
    }

    // Remove old generic sample prompt items for this subcategory product
    await prisma.promptItem.deleteMany({ where: { packId: product.id } });

    const coverImage = imageUrl(items[0].filledImagePrompt, globalSeed, items[0].aspectRatio);
    await prisma.product.update({
      where: { id: product.id },
      data: { coverImage },
    });

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await prisma.promptItem.create({
        data: {
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
      created++;
    }

    updated++;
    console.log(`Updated ${productSlug} with ${items.length} prompts`);
  }

  console.log(`Subcategory seed complete. Updated ${updated} products, created ${created} prompt items.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
