import { getPromptPacks, getBundleBySlug } from "@/actions/catalog";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata = {
  title: "Prompt Packs — Raxim",
  description: "Production-ready AI prompt packs for portraits, branding, product, fashion, social, cinematic, and personal brand work.",
};

export default async function PromptsPage() {
  const [packs, bundle] = await Promise.all([getPromptPacks(), getBundleBySlug("full-prompt-library")]);

  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Prompts</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">Prompt packs</h1>
        <p className="mt-4 text-lg text-muted max-w-2xl">
          Curated prompt collections for every visual use case. Drop in your subject and generate client-ready work.
        </p>
      </div>

      {bundle && (
        <div className="mb-12 p-8 rounded-2xl bg-ink text-white shadow-card relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-label text-lime mb-2">Bundle</p>
            <h2 className="text-2xl font-bold tracking-tight">{bundle.title}</h2>
            <p className="mt-2 text-white/70">Every prompt pack in one place. Save big and unlock the full library.</p>
            <p className="mt-4 text-2xl font-bold">${(bundle.price / 100).toFixed(2)}</p>
          </div>
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue/20 to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {packs.map((pack) => (
          <ProductCard key={pack.id} product={pack} />
        ))}
      </div>
    </div>
  );
}
