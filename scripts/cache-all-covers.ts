import { prisma } from "../src/lib/db";
import fs from "fs";
import path from "path";

const OUT_DIR = "public/generated-prompt-covers";
const DELAY_MS = 2000;
const MAX_RETRIES = 5;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function download(url: string, dest: string, attempt = 1): Promise<boolean> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(60000),
    });
    if (res.status === 429 && attempt < MAX_RETRIES) {
      const wait = 2 ** attempt * 1000;
      console.log(`  429 retry ${attempt} for ${path.basename(dest)}, wait ${wait}ms`);
      await sleep(wait);
      return download(url, dest, attempt + 1);
    }
    if (!res.ok) {
      console.log(`  failed ${res.status} for ${path.basename(dest)}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 100) {
      console.log(`  too small ${buf.length} for ${path.basename(dest)}`);
      return false;
    }
    fs.writeFileSync(dest, buf);
    return true;
  } catch (e) {
    console.log(`  error ${String(e).slice(0, 60)} for ${path.basename(dest)}`);
    return false;
  }
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const items = await prisma.promptItem.findMany({
    select: { id: true, coverImage: true },
    orderBy: { sortOrder: "asc" },
  });

  console.log(`Caching ${items.length} cover images...`);
  let ok = 0;
  let skipped = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const url = item.coverImage;
    if (!url || url.startsWith("/")) {
      skipped++;
      continue;
    }
    const dest = path.join(OUT_DIR, `${item.id}.jpg`);
    if (fs.existsSync(dest)) {
      skipped++;
      continue;
    }

    process.stdout.write(`[${i + 1}/${items.length}] ${item.id} `);
    if (await download(url, dest)) {
      ok++;
      console.log("OK");
    } else {
      console.log("FAIL");
    }

    await sleep(DELAY_MS);
  }

  console.log(`\nDone. Downloaded ${ok}, skipped ${skipped}/${items.length}`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
