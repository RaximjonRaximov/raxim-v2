import { getCourses, getBundleBySlug } from "@/actions/catalog";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata = {
  title: "Courses — Raxim",
  description: "Video courses for prompt engineering, AI portraits, product visuals, cinematic video, and freelancing.",
};

export default async function CoursesPage() {
  const [courses, bundle] = await Promise.all([getCourses(), getBundleBySlug("all-access")]);

  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Courses</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">Video courses</h1>
        <p className="mt-4 text-lg text-muted max-w-2xl">Learn the exact workflow used to build sellable AI visuals for clients.</p>
      </div>

      {bundle && (
        <div className="mb-12 p-8 rounded-2xl bg-ink text-white shadow-card relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-label text-lime mb-2">Bundle</p>
            <h2 className="text-2xl font-bold tracking-tight">{bundle.title}</h2>
            <p className="mt-2 text-white/70">All courses + the full prompt library. The complete toolkit.</p>
            <p className="mt-4 text-2xl font-bold">${(bundle.price / 100).toFixed(2)}</p>
          </div>
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-violet/20 to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <ProductCard key={course.id} product={course} />
        ))}
      </div>
    </div>
  );
}
