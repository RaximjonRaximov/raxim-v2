"use server";

import { prisma } from "@/lib/db";
import { promises as fs } from "fs";

export async function generatePhotoEffect(formData: FormData) {
  const file = formData.get("image") as File | null;
  const slug = String(formData.get("slug") || "");
  const promptOverride = String(formData.get("prompt") || "");

  if (!file || !slug) return { error: "Image and effect are required" };
  if (!file.type.startsWith("image/")) return { error: "Only image files are allowed" };
  if (file.size > 10 * 1024 * 1024) return { error: "Image must be smaller than 10 MB" };

  const product = await prisma.product.findUnique({
    where: { slug, type: "PROMPT_PACK", published: true },
    include: { promptItems: { orderBy: { sortOrder: "asc" } } },
  });
  if (!product) return { error: "Effect not found" };

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
  if (!baseUrl) return { error: "Site URL is not configured for image processing" };

  const imageUrl = `${baseUrl.replace(/\/$/, "")}/uploads/${uploadName}`;

  const apiKey = process.env.TOGETHER_API_KEY || process.env.POLLINATIONS_API_KEY;
  if (!apiKey) {
    return { error: "AI rasm generatsiyasi uchun API kalit o'rnatilmagan. Iltimos, TOGETHER_API_KEY yoki POLLINATIONS_API_KEY qo'shing." };
  }

  const result = await generateWithTogether(imageUrl, promptText, apiKey);
  if (result.error || !result.buffer) return { error: result.error || "Image generation returned empty data" };

  const generatedDir = `${process.cwd()}/public/generated`;
  const outputName = `${id}-out.jpg`;
  const outputPath = `${generatedDir}/${outputName}`;

  await fs.mkdir(generatedDir, { recursive: true });
  await fs.writeFile(outputPath, result.buffer);

  return { outputUrl: `/generated/${outputName}`, prompt: promptText };
}

type GenerationResult = { error: string; buffer?: undefined } | { buffer: Buffer; error?: undefined };

async function generateWithTogether(imageUrl: string, prompt: string, apiKey: string): Promise<GenerationResult> {
  try {
    const response = await fetch("https://api.together.xyz/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "black-forest-labs/FLUX.1-schnell-Free",
        prompt,
        width: 1024,
        height: 1024,
        image_url: imageUrl,
        response_format: "bytes",
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      return { error: `Together AI generation failed: ${response.status} ${response.statusText} - ${text.slice(0, 200)}` };
    }
    const data = (await response.json()) as { data?: { b64_json?: string; url?: string }[] };
    const item = data.data?.[0];
    if (item?.b64_json) {
      return { buffer: Buffer.from(item.b64_json, "base64") };
    }
    if (item?.url) {
      const imageRes = await fetch(item.url);
      if (!imageRes.ok) return { error: "Failed to fetch generated image from Together AI" };
      return { buffer: Buffer.from(await imageRes.arrayBuffer()) };
    }
    return { error: "Together AI returned empty image data" };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image generation request failed" };
  }
}
