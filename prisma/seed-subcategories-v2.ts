import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface SubcategoryPrompt {
  productSlug?: string;
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

const SUBCATEGORY_ALIASES: Record<string, Record<string, string>> = {
  photography: {
    workspace: "photography-behind-the-scenes-workspace",
    "holiday-photography": "photography-seasonal-holiday-photography",
  },
  "design-graphics": {
    "business-card": "design-graphics-stationery-business-card",
  },
};

function productSlugCandidates(p: SubcategoryPrompt): string[] {
  if (p.productSlug) return [p.productSlug];
  const cat = p.categorySlug.trim();
  const sub = slugify(p.subcategoryTitle);
  const alias = SUBCATEGORY_ALIASES[cat]?.[sub];
  return [
    alias,
    cat,
    `${cat}-${sub}`,
    sub,
  ].filter((v): v is string => Boolean(v))
    .filter((v, i, a) => a.indexOf(v) === i);
}

async function seed() {
  const raw = JSON.parse(
    fs.readFileSync(path.join(__dirname, "subcategory-prompts-v2-all.json"), "utf-8")
  );
  const prompts: SubcategoryPrompt[] = Array.isArray(raw) ? raw : raw.prompts;

  const products = await prisma.product.findMany({
    where: { type: "PROMPT_PACK" },
    select: { id: true, slug: true },
  });
  const productBySlug = new Map(products.map((p) => [p.slug, p]));

  const byProduct = new Map<string, SubcategoryPrompt[]>();
  const missing: string[] = [];

  for (const p of prompts) {
    const candidates = productSlugCandidates(p);
    const foundSlug = candidates.find((s) => productBySlug.has(s));
    if (!foundSlug) {
      const key = `${p.categorySlug} / ${p.subcategoryTitle} (tried ${candidates.join(", ")})`;
      if (!missing.includes(key)) missing.push(key);
      continue;
    }
    const list = byProduct.get(foundSlug) || [];
    list.push(p);
    byProduct.set(foundSlug, list);
  }

  let globalSeed = 50000;
  let updated = 0;
  let created = 0;

  for (const [productSlug, items] of byProduct) {
    const product = productBySlug.get(productSlug)!;
    const maxSortOrder = await prisma.promptItem.aggregate({
      where: { packId: product.id },
      _max: { sortOrder: true },
    });
    let startSortOrder = (maxSortOrder._max.sortOrder ?? -1) + 1;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const coverSeed = globalSeed;
      const altSeed1 = globalSeed + 1;
      const altSeed2 = globalSeed + 2;
      await prisma.promptItem.create({
        data: {
          packId: product.id,
          title: item.title,
          aspectRatio: item.aspectRatio,
          promptText: item.reusablePrompt,
          coverImage: imageUrl(item.filledImagePrompt, coverSeed, item.aspectRatio),
          metadata: {
            images: [
              imageUrl(item.filledImagePrompt, altSeed1, item.aspectRatio),
              imageUrl(item.filledImagePrompt, altSeed2, item.aspectRatio),
            ],
          },
          sortOrder: startSortOrder + i,
          isFreeSample: true,
        },
      });
      globalSeed += 3;
      created++;
    }

    updated++;
    console.log(`Appended ${productSlug} with ${items.length} prompts`);
  }

  if (missing.length) {
    console.warn(`Missing products (${missing.length}):`);
    for (const m of missing.slice(0, 20)) console.warn(m);
  }

  console.log(`Subcategory v2 seed complete. Updated ${updated} products, created ${created} prompt items.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
