import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPromptPackWithSamples } from "@/actions/catalog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const pack = await getPromptPackWithSamples(params.slug);
  if (!pack) return {};
  return {
    title: `${pack.title} — Raxim`,
    description: pack.description,
    openGraph: { images: [pack.coverImage] },
  };
}

export default async function PromptPackPage({ params }: Props) {
  const pack = await getPromptPackWithSamples(params.slug);
  if (!pack) return notFound();

  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="rounded-2xl overflow-hidden border border-line shadow-soft aspect-[4/3] relative">
          <Image src={pack.coverImage} alt={pack.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Prompt pack</p>
          <h1 className="text-4xl font-bold tracking-tight text-ink">{pack.title}</h1>
          <p className="mt-4 text-lg text-muted">{pack.description}</p>
          <div className="mt-6 flex items-center gap-3">
            {pack.category && (
              <Link href={`/categories/${pack.category.slug}`}>
                <Badge variant="default">{pack.category.title}</Badge>
              </Link>
            )}
            <span className="font-mono text-sm text-muted">{pack.promptItems.length} prompts</span>
          </div>
          <p className="mt-8 text-3xl font-bold text-ink">{pack.price === 0 ? "Free" : `$${(pack.price / 100).toFixed(2)}`}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/checkout/${pack.slug}`}>
              <Button size="lg">{pack.price === 0 ? "Get it free" : "Buy now"}</Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Sample prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pack.promptItems.map((prompt) => (
            <div key={prompt.id} className="rounded-2xl border border-line bg-paper p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-ink">{prompt.title}</h3>
                <Badge variant={prompt.isFreeSample ? "lime" : "dark"}>{prompt.isFreeSample ? "Free sample" : "Premium"}</Badge>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <Image src={prompt.coverImage} alt={prompt.title} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              {(() => {
                const extra = ((prompt.metadata as { images?: string[] } | null)?.images || []).filter((url) => url !== prompt.coverImage);
                return extra.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {extra.map((url, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src={url} alt={`${prompt.title} variant ${idx + 1}`} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                      </div>
                    ))}
                  </div>
                ) : null;
              })()}
              {prompt.isFreeSample ? (
                <p className="text-sm font-mono bg-page p-4 rounded-xl leading-relaxed whitespace-pre-wrap">{prompt.promptText}</p>
              ) : (
                <div className="bg-page rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2">
                  <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-sm text-muted">Premium prompt locked</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
