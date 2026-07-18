import { PrismaClient, ProductType } from "@prisma/client";

const prisma = new PrismaClient();

const samples = [
  {
    slug: "ai-yearbook-portrait",
    title: "AI Yearbook Portrait",
    description: "Nostalgic 90s American high-school yearbook portrait style. Swap in your subject, clothing, backdrop, and mood.",
    coverImage: "/samples/ai-yearbook-portrait.jpg",
    aspectRatio: "1:1",
    promptText: `A nostalgic [year] American high-school yearbook portrait of [subject], wearing [outfit], posed in front of a [backdrop] textured studio backdrop, soft Rembrandt lighting, film grain, slightly faded colors, authentic yearbook photo aesthetic, [mood] expression --ar [aspect] --style raw`,
    gallery: [
      "/samples/ai-yearbook-portrait-2.jpg",
      "/samples/ai-yearbook-portrait-3.jpg",
    ],
  },
  {
    slug: "studio-ghibli-scene",
    title: "Studio Ghibli Scene",
    description: "Dreamy, hand-painted Studio Ghibli style illustration. Perfect for portraits, landscapes, and cozy scenes.",
    coverImage: "/samples/studio-ghibli-scene.jpg",
    aspectRatio: "1:1",
    promptText: `A heartwarming Studio Ghibli style illustration of [subject] in [setting], [time] of day, [weather], soft pastel color palette, hand-painted background, gentle sunlight filtering through [element], dreamy atmosphere, whimsical details, 8k --ar [aspect] --style raw`,
    gallery: [
      "/samples/studio-ghibli-scene-2.jpg",
      "/samples/studio-ghibli-scene-3.jpg",
    ],
  },
  {
    slug: "gta-loading-screen",
    title: "GTA Loading Screen",
    description: "Bold GTA 6 loading screen style portrait with neon city lights and comic-style shading.",
    coverImage: "/samples/gta-loading-screen.jpg",
    aspectRatio: "1:1",
    promptText: `Bold GTA 6 loading screen style portrait of [subject] in [location] at [time], [action], neon city lights, cinematic composition, comic-style shading, saturated teal and magenta colors, crime-drama atmosphere, ultra detailed --ar [aspect]`,
    gallery: [
      "/samples/gta-loading-screen-2.jpg",
      "/samples/gta-loading-screen-3.jpg",
    ],
  },
];

async function run() {
  await prisma.promptItem.deleteMany({});
  await prisma.product.deleteMany({ where: { type: ProductType.PROMPT_PACK } });

  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    const product = await prisma.product.create({
      data: {
        type: ProductType.PROMPT_PACK,
        slug: s.slug,
        title: s.title,
        description: s.description,
        price: 0,
        coverImage: s.coverImage,
        sortOrder: i,
        published: true,
      },
    });

    await prisma.promptItem.create({
      data: {
        packId: product.id,
        title: `${s.title} Prompt`,
        aspectRatio: s.aspectRatio,
        promptText: s.promptText,
        coverImage: s.coverImage,
        sortOrder: 0,
        isFreeSample: true,
        metadata: { images: s.gallery },
      },
    });
  }

  console.log(`Created ${samples.length} sample prompt packs.`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
