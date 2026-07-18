import { prisma } from "../src/lib/db";
import fs from "fs";
import zlib from "zlib";

async function run() {
  const items = await prisma.promptItem.findMany({
    include: {
      pack: {
        select: {
          slug: true,
          title: true,
          price: true,
          coverImage: true,
          category: { select: { slug: true, title: true } },
        },
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  const manifest = items.map((p) => ({
    id: p.id,
    packSlug: p.pack.slug,
    packTitle: p.pack.title,
    categorySlug: p.pack.category?.slug,
    categoryTitle: p.pack.category?.title,
    sortOrder: p.sortOrder,
    title: p.title,
    aspectRatio: p.aspectRatio,
    promptText: p.promptText,
    coverImage: p.coverImage,
    metadata: p.metadata,
  }));

  const json = JSON.stringify(manifest, null, 2);
  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync("data/prompt-manifest.json", json);

  const compressed = zlib.gzipSync(json);
  fs.writeFileSync("data/prompt-manifest.json.gz", compressed);

  console.log("Exported", manifest.length, "prompts");
  console.log("Uncompressed size:", (json.length / 1024 / 1024).toFixed(2), "MB");
  console.log("Compressed size:", (compressed.length / 1024 / 1024).toFixed(2), "MB");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
