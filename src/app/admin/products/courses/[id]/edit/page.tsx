import { notFound, redirect } from "next/navigation";
import { adminGetProduct, adminUpdateProduct, adminCreateLesson, adminUpdateLesson, adminDeleteLesson, adminListCategories } from "@/actions/admin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Props {
  params: { id: string };
}

export const metadata = {
  title: "Edit course — Admin — Raxim",
};

export default async function EditCoursePage({ params }: Props) {
  const product = await adminGetProduct(params.id);
  const categories = await adminListCategories();
  if (!product || product.type !== "COURSE") return notFound();

  async function updateCourse(formData: FormData) {
    "use server";
    if (!product) throw new Error("Product not found");
    const metadata = (product.metadata as Record<string, unknown>) || {};
    await adminUpdateProduct(params.id, {
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),
      description: String(formData.get("description")),
      price: Math.round(Number(formData.get("price")) * 100),
      coverImage: String(formData.get("coverImage")),
      categoryId: String(formData.get("categoryId")) || undefined,
      level: String(formData.get("level")),
      published: formData.get("published") === "on",
      metadata: { ...metadata, learn: [String(formData.get("learn1")), String(formData.get("learn2")), String(formData.get("learn3"))] },
    });
    redirect(`/admin/products/courses/${params.id}/edit`);
  }

  async function addLesson(formData: FormData) {
    "use server";
    if (!product) throw new Error("Product not found");
    await adminCreateLesson({
      courseId: params.id,
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),
      videoKey: String(formData.get("videoKey")),
      duration: Number(formData.get("duration")) * 60,
      sortOrder: Number(formData.get("sortOrder")),
    });
    redirect(`/admin/products/courses/${params.id}/edit`);
  }

  const metadata = (product.metadata as Record<string, unknown>) || {};
  const learn = (metadata.learn as string[]) || ["", "", ""];

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Edit {product.title}</h1>

      <Card className="mt-8 p-6">
        <form action={updateCourse} className="space-y-6">
          <Input name="title" label="Title" defaultValue={product.title} required />
          <Input name="slug" label="Slug" defaultValue={product.slug} required />
          <Input name="description" label="Description" defaultValue={product.description} required />
          <Input name="price" type="number" label="Price (USD)" defaultValue={(product.price / 100).toFixed(2)} min="0" step="0.01" required />
          <Input name="coverImage" label="Cover image URL" defaultValue={product.coverImage} required />
          <div>
            <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Category</label>
            <select name="categoryId" defaultValue={product.categoryId || ""} className="w-full h-12 px-4 rounded-2xl border border-line bg-paper">
              <option value="">Uncategorized</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
          <Input name="level" label="Level" defaultValue={product.level || ""} />
          <Input name="learn1" label="Learning point 1" defaultValue={learn[0]} />
          <Input name="learn2" label="Learning point 2" defaultValue={learn[1]} />
          <Input name="learn3" label="Learning point 3" defaultValue={learn[2]} />
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="published" defaultChecked={product.published} />
            Published
          </label>
          <Button type="submit">Update course</Button>
        </form>
      </Card>

      <h2 className="mt-12 text-2xl font-bold text-ink">Lessons</h2>
      <div className="mt-4 space-y-4">
        {product.lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} courseId={params.id} />
        ))}
      </div>

      <Card className="mt-8 p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Add lesson</h3>
        <form action={addLesson} className="space-y-4">
          <Input name="title" label="Title" required />
          <Input name="slug" label="Slug" required />
          <Input name="videoKey" label="R2 video key" required />
          <Input name="duration" type="number" label="Duration (minutes)" required />
          <Input name="sortOrder" type="number" label="Sort order" defaultValue={product.lessons.length} required />
          <Button type="submit">Add lesson</Button>
        </form>
      </Card>
    </div>
  );
}

function LessonCard({ lesson, courseId }: { lesson: { id: string; title: string; slug: string; videoKey: string; duration: number | null }; courseId: string }) {
  async function updateLesson(formData: FormData) {
    "use server";
    await adminUpdateLesson(lesson.id, {
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),
      videoKey: String(formData.get("videoKey")),
      duration: Number(formData.get("duration")) * 60,
    });
    redirect(`/admin/products/courses/${courseId}/edit`);
  }

  return (
    <Card className="p-5">
      <form action={updateLesson} className="space-y-4">
        <Input name="title" label="Title" defaultValue={lesson.title} />
        <Input name="slug" label="Slug" defaultValue={lesson.slug} />
        <Input name="videoKey" label="R2 video key" defaultValue={lesson.videoKey} />
        <Input name="duration" type="number" label="Duration (minutes)" defaultValue={lesson.duration ? Math.round(lesson.duration / 60) : 0} />
        <Button type="submit" size="sm">Save lesson</Button>
      </form>

      <form
        action={async () => {
          "use server";
          await adminDeleteLesson(lesson.id);
          redirect(`/admin/products/courses/${courseId}/edit`);
        }}
        className="mt-4 pt-4 border-t border-line"
      >
        <Button type="submit" size="sm" variant="outline">Delete lesson</Button>
      </form>
    </Card>
  );
}
