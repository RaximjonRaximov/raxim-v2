import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCourse } from "@/actions/catalog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const course = await getCourse(params.slug);
  if (!course) return {};
  return {
    title: `${course.title} — Raxim`,
    description: course.description,
    openGraph: { images: [course.coverImage] },
  };
}

export default async function CoursePage({ params }: Props) {
  const course = await getCourse(params.slug);
  if (!course) return notFound();

  const metadata = (course.metadata as Record<string, unknown>) || {};
  const learn = (metadata.learn as string[]) || [];

  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="rounded-2xl overflow-hidden border border-line shadow-soft aspect-[4/3] relative">
          <Image src={course.coverImage} alt={course.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Course</p>
          <h1 className="text-4xl font-bold tracking-tight text-ink">{course.title}</h1>
          <p className="mt-4 text-lg text-muted">{course.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {course.category && <Badge variant="default">{course.category.title}</Badge>}
            <Badge variant="blue">{course.level}</Badge>
            <Badge variant="default">{course.lessons.length} lessons</Badge>
          </div>
          <p className="mt-8 text-3xl font-bold text-ink">{course.price === 0 ? "Free" : `$${(course.price / 100).toFixed(2)}`}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/checkout/${course.slug}`}>
              <Button size="lg">{course.price === 0 ? "Get it free" : "Buy now"}</Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight mb-6">What you&apos;ll learn</h2>
          <ul className="space-y-4">
            {learn.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 rounded-full bg-lime flex items-center justify-center text-ink text-xs">✓</span>
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Curriculum</h2>
          <div className="rounded-2xl border border-line bg-paper overflow-hidden">
            {course.lessons.map((lesson, idx) => (
              <div key={lesson.id} className="flex items-center justify-between px-5 py-4 border-b border-line last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-ink">{idx + 1}. {lesson.title}</p>
                  {lesson.duration && (
                    <p className="text-xs text-muted">{Math.floor(lesson.duration / 60)} min</p>
                  )}
                </div>
                <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
