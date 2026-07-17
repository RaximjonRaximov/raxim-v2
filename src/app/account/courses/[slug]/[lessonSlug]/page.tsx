import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { VideoPlayer } from "@/components/account/VideoPlayer";
import Link from "next/link";

interface Props {
  params: { slug: string; lessonSlug: string };
}

export default async function LessonPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const course = await prisma.product.findUnique({
    where: { slug: params.slug, type: "COURSE" },
    include: { lessons: { orderBy: { sortOrder: "asc" } } },
  });

  if (!course) return notFound();

  const lesson = course.lessons.find((l) => l.slug === params.lessonSlug);
  if (!lesson) return notFound();

  const entitlement = await prisma.entitlement.findUnique({
    where: { userId_productId: { userId: session.user.id, productId: course.id } },
  });

  if (!entitlement) redirect(`/courses/${course.slug}`);

  return (
    <div>
      <Link href={`/account/courses/${course.slug}`} className="text-sm text-blue hover:underline">&larr; Back to course</Link>
      <h1 className="mt-4 text-3xl font-bold text-ink tracking-tight">{lesson.title}</h1>
      <div className="mt-8 rounded-2xl overflow-hidden border border-line bg-paper shadow-card">
        <VideoPlayer lessonId={lesson.id} />
      </div>
      {lesson.description && <p className="mt-6 text-muted">{lesson.description}</p>}
    </div>
  );
}
