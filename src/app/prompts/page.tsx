import { getCategories, getBundleBySlug } from "@/actions/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Prompt Packs — Raxim",
  description: "Production-ready AI prompt packs for portraits, branding, product, fashion, social, cinematic, and personal brand work.",
};

export default async function PromptsPage() {
  const [categories, bundle] = await Promise.all([getCategories(), getBundleBySlug("full-prompt-library")]);

  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Prompts</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">Prompt packs</h1>
        <p className="mt-4 text-lg text-muted max-w-2xl">
          20 curated categories and 300+ subcategory prompt packs. Drop in your subject and generate client-ready work.
        </p>
      </div>

      {bundle && (
        <div className="mb-12 p-8 rounded-2xl bg-ink text-white shadow-card relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue/20 to-lime/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-label text-lime mb-2">Bundle</p>
            <h2 className="text-2xl font-bold tracking-tight">{bundle.title}</h2>
            <p className="mt-2 text-white/70">Every prompt pack in one place. Save big and unlock the full library.</p>
            <p className="mt-4 text-2xl font-bold">${(bundle.price / 100).toFixed(2)}</p>
          </div>
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue/20 to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-16 animate-fade-in">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-ink shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={category.coverImage || ""}
              alt={category.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-lg">{category.title}</h3>
              <p className="text-white/70 text-sm">{category.products.length} packs</p>
            </div>
          </Link>
        ))}
      </div>

      {categories.map((category) => (
        <section key={category.id} className="mb-16">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-bold text-ink">{category.title}</h2>
            <Link href={`/categories/${category.slug}`} className="text-sm font-medium text-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.products.slice(0, 8).map((pack) => (
              <ProductCard key={pack.id} product={pack} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
