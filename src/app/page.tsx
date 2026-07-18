import Link from "next/link";
import { getPromptPacks, getCourses, getSiteContent } from "@/actions/catalog";
import { PromptPackCard } from "@/components/prompt/PromptPackCard";
import { ProductCard } from "@/components/product/ProductCard";

export default async function HomePage() {
  const [headline, subtitle, cta, packs, courses] = await Promise.all([
    getSiteContent("hero_headline"),
    getSiteContent("hero_subtitle"),
    getSiteContent("hero_cta"),
    getPromptPacks(),
    getCourses(),
  ]);

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-surface px-6 lg:px-10 py-16 lg:py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-violet/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-wrapper mx-auto">
          <p className="text-xs font-mono uppercase tracking-label text-accent mb-4">AI Visual Toolkit</p>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-ink max-w-3xl leading-[1.05]">
            {headline || "High-quality AI prompts for creators"}
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl">
            {subtitle || "Curated image prompts, reusable formulas, and video courses for modern freelancers."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/photo-effects"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
            >
              {cta || "Explore effects"}
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-paper border border-line font-bold hover:bg-surface transition-colors"
            >
              Browse courses
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 max-w-wrapper mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-label text-accent mb-2">Photo Effects</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-ink tracking-tight">Featured photo effects</h2>
          </div>
          <Link href="/photo-effects" className="text-sm font-bold text-accent hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 animate-stagger">
          {packs.slice(0, 8).map((pack) => (
            <PromptPackCard key={pack.id} product={pack} href={`/photo-effects/${pack.slug}`} />
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-14 max-w-wrapper mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-label text-accent mb-2">Learn</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-ink tracking-tight">Video courses</h2>
          </div>
          <Link href="/courses" className="text-sm font-bold text-accent hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
          {courses.slice(0, 3).map((course) => (
            <ProductCard key={course.id} product={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
