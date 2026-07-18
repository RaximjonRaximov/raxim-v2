import { getPromptPacks } from "@/actions/catalog";
import { PromptPackCard } from "@/components/prompt/PromptPackCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Prompts — Raxim",
  description: "Browse curated AI image prompt formulas with example images for Midjourney, Stable Diffusion, DALL-E and more.",
};

export default async function PromptsPage() {
  const packs = await getPromptPacks();

  return (
    <div className="p-6 lg:p-10 max-w-wrapper mx-auto">
      <div className="mb-10 animate-fade-in">
        <p className="text-xs font-mono uppercase tracking-label text-accent mb-3">Prompt Library</p>
        <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight">AI Image Prompts</h1>
        <p className="mt-3 text-muted max-w-2xl">
          Curated, reusable prompt formulas. Each card shows a cover image; inside you’ll find the prompt and example images generated from it.
        </p>
      </div>

      {packs.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-line bg-surface">
          <p className="text-muted">No prompts yet.</p>
          <p className="text-sm text-muted mt-1">New prompts are being added.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 animate-stagger">
          {packs.map((pack) => (
            <PromptPackCard key={pack.id} product={pack} />
          ))}
        </div>
      )}
    </div>
  );
}
