import { getPromptPacks } from "@/actions/catalog";
import { PromptPackCard } from "@/components/prompt/PromptPackCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Effects — Raxim",
  description: "Upload your photo and transform it with AI-powered photo effects.",
};

export default async function PhotoEffectsPage() {
  const packs = await getPromptPacks();

  return (
    <div className="p-6 lg:p-10 max-w-wrapper mx-auto">
      <div className="mb-10 animate-fade-in">
        <p className="text-xs font-mono uppercase tracking-label text-accent mb-3">Photo Effects</p>
        <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight">AI Photo Effects</h1>
        <p className="mt-3 text-muted max-w-2xl">
          Upload your photo, pick an effect, and get a stylized result in seconds.
        </p>
      </div>

      {packs.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-line bg-surface">
          <p className="text-muted">No effects yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 animate-stagger">
          {packs.map((pack) => (
            <PromptPackCard key={pack.id} product={pack} href={`/photo-effects/${pack.slug}`} />
          ))}
        </div>
      )}
    </div>
  );
}
