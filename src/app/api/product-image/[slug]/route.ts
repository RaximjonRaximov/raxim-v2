import { prisma } from "@/lib/db";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const OUT_DIR = "public/generated-covers";

function filePath(slug: string) {
  return path.join(process.cwd(), OUT_DIR, `${slug}.jpg`);
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const dest = filePath(slug);

  if (fs.existsSync(dest)) {
    const buf = fs.readFileSync(dest);
    return new NextResponse(buf, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const product = await prisma.product.findUnique({
    where: { slug },
    select: { coverImage: true },
  });
  if (!product?.coverImage) return new NextResponse("Not found", { status: 404 });

  const original = product.coverImage;

  if (original.startsWith("/")) {
    return NextResponse.redirect(new URL(original, req.url));
  }

  try {
    const res = await fetch(original, { headers: { "User-Agent": "Mozilla/5.0" } });
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
    return NextResponse.redirect(original);
  } catch {
    return NextResponse.redirect(original);
  }
}
