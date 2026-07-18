import { prisma } from "@/lib/db";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const OUT_DIR = "public/generated-prompt-covers";

function filePath(id: string, variant: number) {
  if (variant === 0) return path.join(process.cwd(), OUT_DIR, `${id}.jpg`);
  return path.join(process.cwd(), OUT_DIR, `${id}-v${variant}.jpg`);
}

async function resolveUrl(promptId: string, variant: number): Promise<string | null> {
  const item = await prisma.promptItem.findUnique({
    where: { id: promptId },
    select: { coverImage: true, metadata: true },
  });
  if (!item) return null;

  if (variant === 0) return item.coverImage;

  const meta = (item.metadata as { images?: string[] } | null) || {};
  return meta.images?.[variant - 1] || null;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const variant = Math.max(0, parseInt(req.nextUrl.searchParams.get("variant") || "0", 10));
  const dest = filePath(id, variant);

  if (fs.existsSync(dest)) {
    const buf = fs.readFileSync(dest);
    return new NextResponse(buf, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const original = await resolveUrl(id, variant);
  if (!original) return new NextResponse("Not found", { status: 404 });

  // If already a local path, it should exist; if not, fall back.
  if (original.startsWith("/")) {
    return NextResponse.redirect(new URL(original, req.url));
  }

  try {
    const res = await fetch(original, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length > 100) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, buf);
        return new NextResponse(buf, {
          headers: {
            "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    }
    // Rate limited or failed: redirect to original so client loads it.
    return NextResponse.redirect(original);
  } catch {
    return NextResponse.redirect(original);
  }
}
