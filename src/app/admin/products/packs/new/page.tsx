import { redirect } from "next/navigation";
import { adminCreateProduct, adminListCategories } from "@/actions/admin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "New prompt pack — Admin — Raxim",
};

export default async function NewPackPage() {
  const categories = await adminListCategories();

  async function create(formData: FormData) {
    "use server";
    const title = String(formData.get("title"));
    const slug = String(formData.get("slug"));
    const description = String(formData.get("description"));
    const price = Number(formData.get("price")) * 100;
    const coverImage = String(formData.get("coverImage"));
    const categoryId = String(formData.get("categoryId"));

    const product = await adminCreateProduct({
      type: "PROMPT_PACK",
      slug,
      title,
      description,
      price,
      coverImage,
      categoryId: categoryId || undefined,
    });
    redirect(`/admin/products/packs/${product.id}/edit`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">New prompt pack</h1>
      <Card className="mt-8 p-6 max-w-2xl">
        <form action={create} className="space-y-6">
          <Input name="title" label="Title" required />
          <Input name="slug" label="Slug" required />
          <Input name="description" label="Description" required />
          <Input name="price" type="number" label="Price (USD)" min="0" step="0.01" required />
          <Input name="coverImage" label="Cover image URL" required />
          <div>
            <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Category</label>
            <select name="categoryId" className="w-full h-12 px-4 rounded-2xl border border-line bg-paper">
              <option value="">Uncategorized</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
          <Button type="submit">Create pack</Button>
        </form>
      </Card>
    </div>
  );
}
