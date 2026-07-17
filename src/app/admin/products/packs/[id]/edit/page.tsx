import { notFound, redirect } from "next/navigation";
import { adminGetProduct, adminUpdateProduct, adminCreatePromptItem, adminUpdatePromptItem, adminDeletePromptItem, adminListCategories } from "@/actions/admin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: { id: string };
}

export const metadata = {
  title: "Edit prompt pack — Admin — Raxim",
};

export default async function EditPackPage({ params }: Props) {
  const product = await adminGetProduct(params.id);
  const categories = await adminListCategories();
  if (!product || product.type !== "PROMPT_PACK") return notFound();

  async function updatePack(formData: FormData) {
    "use server";
    await adminUpdateProduct(params.id, {
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),
      description: String(formData.get("description")),
      price: Math.round(Number(formData.get("price")) * 100),
      coverImage: String(formData.get("coverImage")),
      categoryId: String(formData.get("categoryId")) || undefined,
      published: formData.get("published") === "on",
    });
    redirect(`/admin/products/packs/${params.id}/edit`);
  }

  async function addPrompt(formData: FormData) {
    "use server";
    await adminCreatePromptItem({
      packId: params.id,
      title: String(formData.get("title")),
      aspectRatio: String(formData.get("aspectRatio")),
      promptText: String(formData.get("promptText")),
      coverImage: String(formData.get("coverImage")),
      sortOrder: Number(formData.get("sortOrder")),
      isFreeSample: formData.get("isFreeSample") === "on",
    });
    redirect(`/admin/products/packs/${params.id}/edit`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Edit {product.title}</h1>

      <Card className="mt-8 p-6">
        <form action={updatePack} className="space-y-6">
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
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="published" defaultChecked={product.published} />
            Published
          </label>
          <Button type="submit">Update pack</Button>
        </form>
      </Card>

      <h2 className="mt-12 text-2xl font-bold text-ink">Prompts</h2>
      <div className="mt-4 space-y-4">
        {product.promptItems.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} packId={params.id} />
        ))}
      </div>

      <Card className="mt-8 p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Add prompt</h3>
        <form action={addPrompt} className="space-y-4">
          <Input name="title" label="Title" required />
          <Input name="aspectRatio" label="Aspect ratio" defaultValue="1:1" required />
          <Input name="coverImage" label="Cover image URL" required />
          <div>
            <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Prompt text</label>
            <textarea name="promptText" rows={4} className="w-full p-4 rounded-2xl border border-line bg-paper" required />
          </div>
          <Input name="sortOrder" type="number" label="Sort order" defaultValue={product.promptItems.length} required />
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="isFreeSample" />
            Free sample
          </label>
          <Button type="submit">Add prompt</Button>
        </form>
      </Card>
    </div>
  );
}

function PromptCard({ prompt, packId }: { prompt: { id: string; title: string; aspectRatio: string; promptText: string; coverImage: string; isFreeSample: boolean }; packId: string }) {
  async function updatePrompt(formData: FormData) {
    "use server";
    await adminUpdatePromptItem(prompt.id, {
      title: String(formData.get("title")),
      aspectRatio: String(formData.get("aspectRatio")),
      promptText: String(formData.get("promptText")),
      coverImage: String(formData.get("coverImage")),
      isFreeSample: formData.get("isFreeSample") === "on",
    });
    redirect(`/admin/products/packs/${packId}/edit`);
  }

  return (
    <Card className="p-5">
      <form action={updatePrompt} className="space-y-4">
        <div className="flex items-center justify-between">
          <Input name="title" label="Title" defaultValue={prompt.title} />
          <Badge variant={prompt.isFreeSample ? "lime" : "dark"}>{prompt.isFreeSample ? "Free" : "Premium"}</Badge>
        </div>
        <Input name="aspectRatio" label="Aspect ratio" defaultValue={prompt.aspectRatio} />
        <Input name="coverImage" label="Cover image URL" defaultValue={prompt.coverImage} />
        <div>
          <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Prompt text</label>
          <textarea name="promptText" defaultValue={prompt.promptText} rows={4} className="w-full p-4 rounded-2xl border border-line bg-paper" />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="isFreeSample" defaultChecked={prompt.isFreeSample} />
          Free sample
        </label>
        <Button type="submit" size="sm">Save prompt</Button>
      </form>

      <form
        action={async () => {
          "use server";
          await adminDeletePromptItem(prompt.id);
          redirect(`/admin/products/packs/${packId}/edit`);
        }}
        className="mt-4 pt-4 border-t border-line"
      >
        <Button type="submit" size="sm" variant="outline">Delete prompt</Button>
      </form>
    </Card>
  );
}
