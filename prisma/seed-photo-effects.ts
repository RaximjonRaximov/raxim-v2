import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const effects = [
  {
    slug: "neon-cyberpunk-portrait",
    title: "Neon Cyberpunk Portrait",
    description: "Transform a photo into a neon-lit cyberpunk character with glowing city lights.",
    coverImage: "/samples/neon-cyberpunk-portrait.jpg",
    aspectRatio: "1:1",
    promptText:
      "A neon cyberpunk portrait of [subject] standing on a rain-soaked [setting] street, glowing [color1] and [color2] neon lights reflecting off wet pavement, cinematic atmosphere, highly detailed, 8k --ar 1:1",
    gallery: ["/samples/neon-cyberpunk-portrait-2.jpg"],
  },
  {
    slug: "3d-cartoon-avatar",
    title: "3D Cartoon Avatar",
    description: "Turn a face photo into a glossy, stylized 3D cartoon avatar.",
    coverImage: "/samples/3d-cartoon-avatar.jpg",
    aspectRatio: "1:1",
    promptText:
      "A cute 3D cartoon avatar of [subject] with big expressive eyes, soft [color] skin tones, clean white background, Pixar style, glossy render, friendly expression --ar 1:1",
    gallery: ["/samples/3d-cartoon-avatar-2.jpg"],
  },
  {
    slug: "watercolor-portrait",
    title: "Watercolor Portrait",
    description: "Render a photo as a delicate, hand-painted watercolor portrait.",
    coverImage: "/samples/watercolor-portrait.jpg",
    aspectRatio: "1:1",
    promptText:
      "A delicate watercolor portrait of [subject] surrounded by soft [flower] and [element] motifs, pastel washes, artistic wet-on-wet brush strokes, dreamy white background, painterly style --ar 1:1",
    gallery: ["/samples/watercolor-portrait-2.jpg"],
  },
  {
    slug: "vintage-polaroid-portrait",
    title: "Vintage Polaroid Portrait",
    description: "Give any photo a nostalgic instant-film Polaroid look.",
    coverImage: "/samples/vintage-polaroid-portrait.jpg",
    aspectRatio: "1:1",
    promptText:
      "A vintage Polaroid instant film portrait of [subject] at [location], warm retro colors, white instant-film frame, subtle light leaks and film grain, [decade] nostalgic aesthetic --ar 1:1",
    gallery: ["/samples/vintage-polaroid-portrait-2.jpg"],
  },
  {
    slug: "cinematic-movie-poster",
    title: "Cinematic Movie Poster",
    description: "Create a dramatic, blockbuster-style movie poster portrait.",
    coverImage: "/samples/cinematic-movie-poster.jpg",
    aspectRatio: "1:1",
    promptText:
      "A dramatic cinematic movie poster portrait of [subject] as [character], epic [setting] background, dark moody lighting, lens flare, teal and orange color grading, blockbuster style, ultra detailed --ar 1:1",
    gallery: ["/samples/cinematic-movie-poster-2.jpg"],
  },
  {
    slug: "pixel-art-character",
    title: "Pixel Art Character",
    description: "Convert a photo into a retro 16-bit pixel art character.",
    coverImage: "/samples/pixel-art-character.jpg",
    aspectRatio: "1:1",
    promptText:
      "A retro 16-bit pixel art character portrait of [subject] in [theme] style, bright limited color palette, dithered shading, clean [color] background, classic video game aesthetic --ar 1:1",
    gallery: ["/samples/pixel-art-character-2.jpg"],
  },
  {
    slug: "fantasy-elf-portrait",
    title: "Fantasy Elf Portrait",
    description: "Transform a photo into an enchanted fantasy elf character.",
    coverImage: "/samples/fantasy-elf-portrait.jpg",
    aspectRatio: "1:1",
    promptText:
      "A fantasy elf portrait of [subject] with pointed ears, long flowing [color] hair, magical [setting] background, ethereal glowing light, detailed fantasy illustration, enchanted atmosphere --ar 1:1",
    gallery: ["/samples/fantasy-elf-portrait-2.jpg"],
  },
  {
    slug: "barbie-style-portrait",
    title: "Barbie Style Portrait",
    description: "Give any photo a glossy, glamorous Barbie-inspired fashion look.",
    coverImage: "/samples/barbie-style-portrait.jpg",
    aspectRatio: "1:1",
    promptText:
      "A glamorous Barbie style fashion portrait of [subject] wearing [outfit], pink and pastel tones, sparkling accessories, glossy magazine background, dreamy and stylish --ar 1:1",
    gallery: ["/samples/barbie-style-portrait-2.jpg"],
  },
];

async function main() {
  for (const effect of effects) {
    const existing = await prisma.product.findUnique({ where: { slug: effect.slug } });
    if (existing) {
      console.log("Skipping existing:", effect.slug);
      continue;
    }

    await prisma.product.create({
      data: {
        type: "PROMPT_PACK",
        slug: effect.slug,
        title: effect.title,
        description: effect.description,
        price: 0,
        coverImage: effect.coverImage,
        published: true,
        promptItems: {
          create: {
            title: `${effect.title} Prompt`,
            aspectRatio: effect.aspectRatio,
            promptText: effect.promptText,
            coverImage: effect.coverImage,
            sortOrder: 0,
            isFreeSample: true,
            metadata: { images: effect.gallery },
          },
        },
      },
    });
    console.log("Created effect:", effect.title);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
