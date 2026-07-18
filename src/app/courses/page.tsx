import { getCourses } from "@/actions/catalog";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata = {
  title: "Courses — Raxim",
  description: "Video courses for prompt engineering, AI portraits, product visuals, cinematic video, and freelancing.",
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="p-6 lg:p-10 max-w-wrapper mx-auto">
      <div className="mb-10 animate-fade-in">
        <p className="text-xs font-mono uppercase tracking-label text-accent mb-3">Video Courses</p>
        <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight">Learn AI visual design</h1>
        <p className="mt-3 text-muted max-w-2xl">
          Practical courses that teach you how to craft prompts, build client-ready assets, and grow a freelance AI design business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
        {courses.map((course) => (
          <ProductCard key={course.id} product={course} />
        ))}
      </div>
    </div>
  );
}
