import Link from "next/link";
import { getSiteContent, getPromptPacks, getCourses } from "@/actions/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

export default async function HomePage() {
  const [headline, subtitle, cta, packs, courses] = await Promise.all([
    getSiteContent("hero_headline"),
    getSiteContent("hero_subtitle"),
    getSiteContent("hero_cta"),
    getPromptPacks(),
    getCourses(),
  ]);

  return (
    <div className="space-y-20 pb-20">
      <section className="pt-20 pb-10 px-4">
        <div className="max-w-wrapper mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-4">AI Visual Designer</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-ink max-w-3xl leading-[1.05]">
            {headline || "AI visuals that win clients"}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl">
            {subtitle || "Prompt packs, video courses, and design services for modern freelancers."}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/prompts">
              <Button size="lg">{cta || "Shop prompts"}</Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline">Explore courses</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="max-w-wrapper mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured prompt packs</h2>
            <Link href="/prompts" className="text-sm font-medium text-blue hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packs.slice(0, 4).map((pack) => (
              <ProductCard key={pack.id} product={pack} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="max-w-wrapper mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
            <Link href="/courses" className="text-sm font-medium text-blue hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <ProductCard key={course.id} product={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
