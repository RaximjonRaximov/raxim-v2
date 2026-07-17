import { redirect } from "next/navigation";
import { adminListCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory } from "@/actions/admin";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const metadata = {
  title: "Categories — Admin — Raxim",
};

export default async function AdminCategoriesPage() {
  const categories = await adminListCategories();

  async function create(formData: FormData) {
    "use server";
    const title = String(formData.get("title"));
    await adminCreateCategory({
      title,
      slug: slugify(title) || slugify(String(Date.now())),
      description: String(formData.get("description")),
      coverImage: String(formData.get("coverImage")),
      sortOrder: Number(formData.get("sortOrder")),
    });
    redirect("/admin/categories");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Categories</h1>

      <Card className="mt-8 p-6 max-w-2xl">
        <h2 className="text-lg font-bold text-ink mb-4">New category</h2>
        <form action={create} className="space-y-4">
          <Input name="title" label="Title" required />
          <Input name="description" label="Description" />
          <Input name="coverImage" label="Cover image URL" />
          <Input name="sortOrder" type="number" label="Sort order" defaultValue={categories.length} required />
          <Button type="submit">Create category</Button>
        </form>
      </Card>

      <div className="mt-12 rounded-2xl border border-line bg-paper overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-page text-muted font-mono text-xs uppercase tracking-label">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Slug</th>
              <th className="px-5 py-3">Products</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <CategoryRow key={category.id} category={category} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoryRow({ category }: { category: { id: string; title: string; slug: string; description: string | null; coverImage: string | null; sortOrder: number; _count: { products: number } } }) {
  async function update(formData: FormData) {
    "use server";
    await adminUpdateCategory(category.id, {
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),
      description: String(formData.get("description")),
      coverImage: String(formData.get("coverImage")),
      sortOrder: Number(formData.get("sortOrder")),
    });
    redirect("/admin/categories");
  }

  async function remove() {
    "use server";
    await adminDeleteCategory(category.id);
    redirect("/admin/categories");
  }

  return (
    <tr className="border-t border-line">
      <td className="px-5 py-4 font-medium text-ink">{category.title}</td>
      <td className="px-5 py-4 text-muted">{category.slug}</td>
      <td className="px-5 py-4 text-muted">{category._count.products}</td>
      <td className="px-5 py-4">
        <details className="group">
          <summary className="cursor-pointer text-blue hover:underline">Edit</summary>
          <div className="mt-4 space-y-3">
            <form action={update} className="space-y-3">
              <Input name="title" label="Title" defaultValue={category.title} required />
              <Input name="slug" label="Slug" defaultValue={category.slug} required />
              <Input name="description" label="Description" defaultValue={category.description || ""} />
              <Input name="coverImage" label="Cover image URL" defaultValue={category.coverImage || ""} />
              <Input name="sortOrder" type="number" label="Sort order" defaultValue={category.sortOrder} />
              <Button type="submit" size="sm">Save</Button>
            </form>
            <form action={remove}>
              <Button type="submit" size="sm" variant="outline">Delete</Button>
            </form>
          </div>
        </details>
      </td>
    </tr>
  );
}
