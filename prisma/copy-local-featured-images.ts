import { prisma } from "../src/lib/db";
import fs from "fs/promises";
import path from "path";

const OUT_DIR = "public/generated-prompt-covers";

function localPath(id: string) {
  return `/generated-prompt-covers/${id}.jpg`;
}

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const items = await prisma.promptItem.findMany({
    select: { id: true, coverImage: true, metadata: true },
  });

  let copied = 0;

  for (const item of items) {
    const url = item.coverImage;
    if (!url.startsWith("/prompts/featured/")) continue;

    const src = path.join("public", url);
    const dest = path.join(OUT_DIR, `${item.id}.jpg`);

    try {
      await fs.copyFile(src, dest);
      const meta = (item.metadata as { images?: string[] } | null) || {};
      const newMetaImages = (meta.images || []).map((imgUrl) =>
        imgUrl === url ? localPath(item.id) : imgUrl
      );

      await prisma.promptItem.update({
        where: { id: item.id },
        data: {
          coverImage: localPath(item.id),
          metadata: { ...meta, images: newMetaImages },
        },
      });
      copied++;
    } catch (e) {
      console.log("skip", item.id, url, String(e).slice(0, 80));
    }
  }

  console.log("Copied", copied, "featured images");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
