import { PrismaClient, ProductType, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const coverImage = (slug: string) =>
  `https://images.unsplash.com/photo-${slug}?auto=format&fit=crop&w=1200&q=80`;

const promptPacks = [
  {
    slug: "professional-portraits",
    title: "Professional Portraits",
    price: 1900,
    promptCount: 15,
    category: "Portraits",
  },
  {
    slug: "logo-identity",
    title: "Logo & Identity",
    price: 1500,
    promptCount: 10,
    category: "Branding",
  },
  {
    slug: "social-posters",
    title: "Social Posters",
    price: 1500,
    promptCount: 10,
    category: "Social",
  },
  {
    slug: "product-studio",
    title: "Product Studio",
    price: 1500,
    promptCount: 10,
    category: "Product",
  },
  {
    slug: "fashion-editorial",
    title: "Fashion Editorial",
    price: 1500,
    promptCount: 10,
    category: "Fashion",
  },
  {
    slug: "cinematic-lifestyle",
    title: "Cinematic Lifestyle",
    price: 1500,
    promptCount: 10,
    category: "Cinematic",
  },
  {
    slug: "personal-brand",
    title: "Personal Brand",
    price: 1500,
    promptCount: 10,
    category: "Personal Brand",
  },
];

const courses = [
  {
    slug: "prompt-engineering-for-visual-creators",
    title: "Prompt Engineering for Visual Creators",
    category: "Prompt Engineering",
    level: "Beginner",
    lessonCount: 24,
    durationSeconds: 16200,
    price: 3900,
  },
  {
    slug: "ai-portraits-and-personal-branding",
    title: "AI Portraits & Personal Branding",
    category: "AI Design",
    level: "Beginner",
    lessonCount: 18,
    durationSeconds: 10800,
    price: 2900,
  },
  {
    slug: "logo-identity-systems-with-ai",
    title: "Logo & Identity Systems with AI",
    category: "AI Design",
    level: "Intermediate",
    lessonCount: 20,
    durationSeconds: 12600,
    price: 3500,
  },
  {
    slug: "product-visuals-that-sell",
    title: "Product Visuals That Sell",
    category: "AI Design",
    level: "Intermediate",
    lessonCount: 16,
    durationSeconds: 9000,
    price: 2900,
  },
  {
    slug: "cinematic-ai-video-and-motion",
    title: "Cinematic AI Video & Motion",
    category: "AI Video",
    level: "Intermediate",
    lessonCount: 14,
    durationSeconds: 9000,
    price: 4900,
  },
  {
    slug: "freelancing-with-ai-design",
    title: "Freelancing with AI Design",
    category: "Freelance",
    level: "All levels",
    lessonCount: 12,
    durationSeconds: 7200,
    price: 2500,
  },
];

const promptTemplate = (
  title: string,
  tokens: string[]
) => `A highly detailed ${title.toLowerCase()} scene, [STYLE] editorial photography, soft natural lighting from a large window, shallow depth of field, shot on 85mm f/1.4, ${tokens.join(
  ", "
)}, refined color grading, 8k resolution --ar [ASPECT] --style raw`;

async function seed() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@raxim.design" },
    update: {},
    create: {
      email: "admin@raxim.design",
      name: "Raxim Admin",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  await prisma.siteSettings.createMany({
    data: [
      { key: "telegram_handle", value: "raximdesign" },
      { key: "contact_email", value: "hello@raxim.design" },
      { key: "uzs_per_usd", value: "12800" },
    ],
    skipDuplicates: true,
  });

  await prisma.siteContent.createMany({
    data: [
      { key: "hero_headline", value: "AI visuals that win clients" },
      { key: "hero_subtitle", value: "Prompt packs, video courses, and design services for modern freelancers." },
      { key: "hero_cta", value: "Shop prompts" },
      { key: "about_text", value: "Raxim is an independent AI visual designer helping freelancers ship high-end imagery without the high-end budget." },
      { key: "services_intro", value: "From brand systems to AI-assisted art direction, here is how we can work together." },
    ],
    skipDuplicates: true,
  });

  const packProducts: string[] = [];

  for (let i = 0; i < promptPacks.length; i++) {
    const pack = promptPacks[i];
    const product = await prisma.product.upsert({
      where: { slug: pack.slug },
      update: {},
      create: {
        type: ProductType.PROMPT_PACK,
        slug: pack.slug,
        title: pack.title,
        description: `A curated collection of ${pack.promptCount} production-ready prompts for ${pack.title.toLowerCase()}. Each prompt includes aspect ratio guidance and replaceable tokens so you can drop in your own subjects and colors.`,
        price: pack.price,
        coverImage: coverImage(`1508616227762-${i}`),
        category: pack.category,
        sortOrder: i,
      },
    });
    packProducts.push(product.id);

    const prompts = Array.from({ length: pack.promptCount }).map((_, idx) => ({
      packId: product.id,
      title: `${pack.title} Prompt ${idx + 1}`,
      aspectRatio: idx % 3 === 0 ? "4:5" : idx % 3 === 1 ? "1:1" : "2:3",
      promptText: promptTemplate(pack.title, [
        "[UPLOAD_IMAGE]",
        "[BACKGROUND_COLOR]",
        idx % 2 === 0 ? "[WARDROBE]" : "[MOOD]",
      ]),
      coverImage: coverImage(`1508616227762-${i}-${idx}`),
      sortOrder: idx,
      isFreeSample: idx < 2,
    }));

    await prisma.promptItem.createMany({ data: prompts });
  }

  const fullPromptLibrary = await prisma.product.upsert({
    where: { slug: "full-prompt-library" },
    update: {},
    create: {
      type: ProductType.BUNDLE,
      slug: "full-prompt-library",
      title: "Full Prompt Library",
      description: "Every prompt pack in one bundle. 75+ prompts covering portraits, branding, product, fashion, social, cinematic, and personal brand work.",
      price: 4900,
      coverImage: coverImage("1508616227762-bundle"),
      isBundle: true,
      metadata: { bundleType: "prompts" },
    },
  });

  await prisma.bundleProduct.createMany({
    data: packProducts.map((childId) => ({ bundleId: fullPromptLibrary.id, childId })),
  });

  const courseProducts: string[] = [];

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    const product = await prisma.product.upsert({
      where: { slug: course.slug },
      update: {},
      create: {
        type: ProductType.COURSE,
        slug: course.slug,
        title: course.title,
        description: `${course.title} is a ${course.level.toLowerCase()}-level course with ${course.lessonCount} lessons and over ${Math.round(
          course.durationSeconds / 3600
        )} hours of video. Learn the exact systems used to create sellable AI visuals for clients.`,
        price: course.price,
        coverImage: coverImage(`1508616227763-${i}`),
        category: course.category,
        level: course.level,
        sortOrder: i,
        metadata: {
          lessonCount: course.lessonCount,
          durationSeconds: course.durationSeconds,
          learn: [
            `Master the core ${course.category} workflow`,
            `Build reusable prompt templates`,
            `Deliver client-ready assets fast`,
          ],
        },
      },
    });
    courseProducts.push(product.id);

    const lessons = Array.from({ length: course.lessonCount }).map((_, idx) => ({
      courseId: product.id,
      title: `Lesson ${idx + 1}: ${course.title.split(" ").slice(0, 3).join(" ")} fundamentals`,
      slug: `lesson-${idx + 1}`,
      sortOrder: idx,
      videoKey: `courses/${course.slug}/lesson-${idx + 1}.mp4`,
      duration: 600 + idx * 30,
      description: "Detailed walkthrough with examples and templates.",
    }));

    await prisma.lesson.createMany({ data: lessons });
  }

  const allAccess = await prisma.product.upsert({
    where: { slug: "all-access" },
    update: {},
    create: {
      type: ProductType.BUNDLE,
      slug: "all-access",
      title: "All-Access",
      description: "Every course plus the full prompt library. The complete Raxim toolkit.",
      price: 9900,
      coverImage: coverImage("1508616227763-bundle"),
      isBundle: true,
      metadata: { bundleType: "all-access" },
    },
  });

  await prisma.bundleProduct.createMany({
    data: [
      ...packProducts.map((childId) => ({ bundleId: allAccess.id, childId })),
      ...courseProducts.map((childId) => ({ bundleId: allAccess.id, childId })),
    ],
  });

  console.log("Seed complete.");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
