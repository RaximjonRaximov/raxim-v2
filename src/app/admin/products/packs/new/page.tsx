import { redirect } from "next/navigation";
import { adminCreateProduct, adminCreatePromptItem } from "@/actions/admin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "New prompt pack — Admin — Raxim",
};

export default async function NewPackPage() {
  async function create(formData: FormData) {
    "use server";
    const title = String(formData.get("title"));
    const slug = String(formData.get("slug"));
    const description = String(formData.get("description"));
    const coverImage = String(formData.get("coverImage"));
    const aspectRatio = String(formData.get("aspectRatio") || "1:1");
    const promptText = String(formData.get("promptText"));
    const galleryRaw = String(formData.get("galleryImages") || "");
    const galleryImages = galleryRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const product = await adminCreateProduct({
      type: "PROMPT_PACK",
      slug,
      title,
      description,
      price: 0,
      coverImage,
    });

    await adminCreatePromptItem({
      packId: product.id,
      title: `${title} Prompt`,
      aspectRatio,
      promptText,
      coverImage,
      sortOrder: 0,
      isFreeSample: true,
      metadata: { images: galleryImages },
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
          <Input name="coverImage" label="Cover image URL" required />
          <Input name="aspectRatio" label="Aspect ratio" defaultValue="1:1" required />
          <div>
            <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Prompt text</label>
            <textarea name="promptText" rows={6} className="w-full p-4 rounded-2xl border border-line bg-paper" required />
          </div>
          <div>
            <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">
              Gallery image URLs (one per line)
            </label>
            <textarea name="galleryImages" rows={5} className="w-full p-4 rounded-2xl border border-line bg-paper" placeholder="https://..." />
          </div>
          <Button type="submit">Create prompt pack</Button>
        </form>
      </Card>
    </div>
  );
}
