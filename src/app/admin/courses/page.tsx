import Link from "next/link";
import Image from "next/image";
import { adminListProducts } from "@/actions/admin";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Courses — Admin — Raxim",
};

export default async function AdminCoursesPage() {
  const courses = await adminListProducts("COURSE");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ink tracking-tight">Courses</h1>
        <Link href="/admin/products/courses/new">
          <Button size="sm">New course</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="p-0 overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image
                src={course.coverImage}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-ink">{course.title}</h3>
              <p className="mt-1 text-sm text-muted line-clamp-2">{course.description}</p>
              <p className="mt-2 text-xs text-muted uppercase tracking-label">{course._count?.lessons ?? 0} lessons</p>
              <div className="mt-4">
                <Link href={`/admin/products/courses/${course.id}/edit`}>
                  <Button size="sm" variant="outline">Edit course</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
