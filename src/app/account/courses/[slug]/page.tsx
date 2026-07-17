import { redirect } from "next/navigation";
import { getOwnedCourse } from "@/actions/entitlements";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export default async function OwnedCoursePage({ params }: Props) {
  const course = await getOwnedCourse(params.slug);
  if (!course) redirect(`/courses/${params.slug}`);

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">{course.title}</h1>
      <p className="mt-2 text-muted">{course.description}</p>

      <div className="mt-10 rounded-2xl border border-line bg-paper p-6 shadow-soft">
        <h2 className="text-xl font-bold text-ink mb-4">Lessons</h2>
        <ul className="space-y-2">
          {course.lessons.map((lesson, idx) => (
            <li key={lesson.id}>
              <Link
                href={`/account/courses/${course.slug}/${lesson.slug}`}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-page transition-colors"
              >
                <span>{idx + 1}. {lesson.title}</span>
                {lesson.duration && <span className="text-sm text-muted">{Math.floor(lesson.duration / 60)} min</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
