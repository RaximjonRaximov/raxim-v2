import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const file = path.join(process.cwd(), "public", "raxim-prompts-dataset.zip");
  if (!fs.existsSync(file)) {
    return new NextResponse("Dataset archive not found", { status: 404 });
  }

  const stats = fs.statSync(file);
  const webStream = Readable.toWeb(fs.createReadStream(file));

  return new NextResponse(webStream as ReadableStream<Uint8Array>, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="raxim-prompts-dataset.zip"',
      "Content-Length": String(stats.size),
    },
  });
}
