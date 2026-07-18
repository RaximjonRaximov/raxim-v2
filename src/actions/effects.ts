"use server";

import { prisma } from "@/lib/db";
import { promises as fs } from "fs";

export async function generatePhotoEffect(formData: FormData) {
  const file = formData.get("image") as File | null;
  const slug = String(formData.get("slug") || "");
  const promptOverride = String(formData.get("prompt") || "");

  if (!file || !slug) throw new Error("Image and effect are required");
  if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed");
  if (file.size > 10 * 1024 * 1024) throw new Error("Image must be smaller than 10 MB");

  const product = await prisma.product.findUnique({
    where: { slug, type: "PROMPT_PACK", published: true },
    include: { promptItems: { orderBy: { sortOrder: "asc" } } },
  });
  if (!product) throw new Error("Effect not found");

  const promptItem = product.promptItems[0];
  const basePrompt = promptItem?.promptText || `Transform this photo into the style of ${product.title}`;
  const promptText = promptOverride || basePrompt;

  const id = crypto.randomUUID();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg";
  const uploadName = `${id}.${safeExt}`;
  const uploadDir = `${process.cwd()}/public/uploads`;
  const uploadPath = `${uploadDir}/${uploadName}`;

  const arrayBuffer = await file.arrayBuffer();
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(uploadPath, Buffer.from(arrayBuffer));

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.UPLOAD_BASE_URL || "";
  if (!baseUrl) throw new Error("Site URL is not configured for image processing");

  const imageUrl = `${baseUrl.replace(/\/$/, "")}/uploads/${uploadName}`;
  const seed = Math.floor(Math.random() * 1_000_000);

  const pollinationUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?image=${encodeURIComponent(imageUrl)}&width=1024&height=1024&seed=${seed}&nologo=true`;

  const response = await fetch(pollinationUrl, { cache: "no-store" });
  if (!response.ok) throw new Error(`Image generation failed: ${response.status} ${response.statusText}`);

  const generatedDir = `${process.cwd()}/public/generated`;
  const outputName = `${id}-out.jpg`;
  const outputPath = `${generatedDir}/${outputName}`;

  await fs.mkdir(generatedDir, { recursive: true });
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, buffer);

  return { outputUrl: `/generated/${outputName}`, prompt: promptText };
}
