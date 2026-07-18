import { notFound, redirect } from "next/navigation";
import { adminGetProduct, adminUpdateProduct, adminUpdatePromptItem, adminDeletePromptItem, adminCreatePromptItem } from "@/actions/admin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Props {
  params: { id: string };
}

export const metadata = {
  title: "Edit prompt pack — Admin — Raxim",
};

export default async function EditPackPage({ params }: Props) {
  const product = await adminGetProduct(params.id);
  if (!product || product.type !== "PROMPT_PACK") return notFound();

  async function updatePack(formData: FormData) {
    "use server";
    await adminUpdateProduct(params.id, {
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),
      description: String(formData.get("description")),
      coverImage: String(formData.get("coverImage")),
      published: formData.get("published") === "on",
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
          <Input name="coverImage" label="Cover image URL" defaultValue={product.coverImage} required />
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="published" defaultChecked={product.published} />
            Published
          </label>
          <Button type="submit">Update pack</Button>
        </form>
      </Card>

      <h2 className="mt-12 text-2xl font-bold text-ink">Prompt</h2>
      <div className="mt-4">
        {product.promptItems[0] ? (
          <PromptCard prompt={product.promptItems[0]} packId={params.id} />
        ) : (
          <CreatePromptForm packId={params.id} />
        )}
      </div>
    </div>
  );
}

function galleryFromPrompt(prompt: { metadata?: unknown }) {
  const meta = (prompt.metadata as { images?: string[] } | null) || {};
  return (meta.images || []).join("\n");
}

function PromptCard({ prompt, packId }: { prompt: { id: string; title: string; aspectRatio: string; promptText: string; coverImage: string; isFreeSample: boolean; metadata?: unknown }; packId: string }) {
  async function updatePrompt(formData: FormData) {
    "use server";
    const galleryRaw = String(formData.get("galleryImages") || "");
    const galleryImages = galleryRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    await adminUpdatePromptItem(prompt.id, {
      title: String(formData.get("title")),
      aspectRatio: String(formData.get("aspectRatio")),
      promptText: String(formData.get("promptText")),
      coverImage: String(formData.get("coverImage")),
      isFreeSample: formData.get("isFreeSample") === "on",
      metadata: { images: galleryImages },
    });
    redirect(`/admin/products/packs/${packId}/edit`);
  }

  return (
    <Card className="p-5">
      <form action={updatePrompt} className="space-y-4">
        <Input name="title" label="Title" defaultValue={prompt.title} />
        <Input name="aspectRatio" label="Aspect ratio" defaultValue={prompt.aspectRatio} />
        <Input name="coverImage" label="Cover / example image URL" defaultValue={prompt.coverImage} />
        <div>
          <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Prompt text</label>
          <textarea name="promptText" defaultValue={prompt.promptText} rows={6} className="w-full p-4 rounded-2xl border border-line bg-paper" />
        </div>
        <div>
          <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">
            Gallery image URLs (one per line)
          </label>
          <textarea name="galleryImages" defaultValue={galleryFromPrompt(prompt)} rows={5} className="w-full p-4 rounded-2xl border border-line bg-paper" placeholder="https://..." />
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

function CreatePromptForm({ packId }: { packId: string }) {
  async function createPrompt(formData: FormData) {
    "use server";
    const galleryRaw = String(formData.get("galleryImages") || "");
    const galleryImages = galleryRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    await adminCreatePromptItem({
      packId,
      title: String(formData.get("title")),
      aspectRatio: String(formData.get("aspectRatio")),
      promptText: String(formData.get("promptText")),
      coverImage: String(formData.get("coverImage")),
      sortOrder: 0,
      isFreeSample: true,
      metadata: { images: galleryImages },
    });
    redirect(`/admin/products/packs/${packId}/edit`);
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-ink mb-4">Add prompt</h3>
      <form action={createPrompt} className="space-y-4">
        <Input name="title" label="Title" required />
        <Input name="aspectRatio" label="Aspect ratio" defaultValue="1:1" required />
        <Input name="coverImage" label="Cover / example image URL" required />
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
        <Button type="submit">Add prompt</Button>
      </form>
    </Card>
  );
}
