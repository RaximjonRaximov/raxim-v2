import { PrismaClient, ProductType, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function coverImage(seed: string, width = 800, height = 600) {
  const safe = slugify(seed);
  return `https://picsum.photos/seed/${safe}/${width}/${height}`;
}

const categories = JSON.parse(
  fs.readFileSync(path.join(__dirname, "categories.json"), "utf-8")
) as Array<{ title: string; subcategories: string[] }>;

const courses = [
  {
    slug: "prompt-engineering-for-visual-creators",
    title: "Prompt Engineering for Visual Creators",
    category: "Prompt Engineering",
    level: "Beginner",
    lessonCount: 24,
    durationSeconds: 16200,
    price: 0,
  },
  {
    slug: "ai-portraits-and-personal-branding",
    title: "AI Portraits & Personal Branding",
    category: "AI Design",
    level: "Beginner",
    lessonCount: 18,
    durationSeconds: 10800,
    price: 0,
  },
  {
    slug: "logo-identity-systems-with-ai",
    title: "Logo & Identity Systems with AI",
    category: "AI Design",
    level: "Intermediate",
    lessonCount: 20,
    durationSeconds: 12600,
    price: 0,
  },
  {
    slug: "product-visuals-that-sell",
    title: "Product Visuals That Sell",
    category: "AI Design",
    level: "Intermediate",
    lessonCount: 16,
    durationSeconds: 9000,
    price: 0,
  },
  {
    slug: "cinematic-ai-video-and-motion",
    title: "Cinematic AI Video & Motion",
    category: "AI Video",
    level: "Intermediate",
    lessonCount: 14,
    durationSeconds: 9000,
    price: 0,
  },
  {
    slug: "freelancing-with-ai-design",
    title: "Freelancing with AI Design",
    category: "Freelance",
    level: "All levels",
    lessonCount: 12,
    durationSeconds: 7200,
    price: 0,
  },
];

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
      { key: "hero_headline", value: "High-quality AI prompts for creators" },
      { key: "hero_subtitle", value: "Curated image prompts, reusable formulas, and video courses for modern freelancers." },
      { key: "hero_cta", value: "Explore prompts" },
      { key: "about_text", value: "Raxim is an independent AI visual designer helping freelancers ship high-end imagery without the high-end budget." },
      { key: "services_intro", value: "From brand systems to AI-assisted art direction, here is how we can work together." },
    ],
    skipDuplicates: true,
  });

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const categorySlug = slugify(cat.title);

    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: { sortOrder: i },
      create: {
        title: cat.title,
        slug: categorySlug,
        description: `High-quality AI image prompts for ${cat.title.toLowerCase()}.`,
        coverImage: coverImage(cat.title),
        sortOrder: i,
      },
    });

    await prisma.product.upsert({
      where: { slug: categorySlug },
      update: {},
      create: {
        type: ProductType.PROMPT_PACK,
        slug: categorySlug,
        title: cat.title,
        description: `Curated AI image prompt collection for ${cat.title.toLowerCase()}.`,
        price: 0,
        coverImage: coverImage(cat.title),
        categoryId: category.id,
        sortOrder: i,
      },
    });
  }

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
        price: 0,
        coverImage: coverImage(course.slug),
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

    const lessonCount = await prisma.lesson.count({ where: { courseId: product.id } });
    if (lessonCount === 0) {
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
  }

  console.log(`Seed complete. ${categories.length} categories, ${courses.length} courses.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
