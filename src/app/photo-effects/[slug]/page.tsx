import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPromptPack } from "@/actions/catalog";
import { EffectGenerator } from "@/components/photo-effect/EffectGenerator";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pack = await getPromptPack(params.slug);
  if (!pack) return {};
  return {
    title: `${pack.title} — Raxim`,
    description: pack.description,
  };
}

export default async function PhotoEffectPage({ params }: Props) {
  const pack = await getPromptPack(params.slug);
  if (!pack) return notFound();

  const prompt = pack.promptItems[0];
  const metadata = (prompt?.metadata as { images?: string[] } | null) || {};
  const gallery = [pack.coverImage, ...(metadata.images || [])];

  return (
    <div className="p-6 lg:p-10 max-w-wrapper mx-auto">
      <Link href="/photo-effects" className="text-sm text-muted hover:text-accent mb-6 inline-block">← Back to effects</Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden border border-line bg-paper shadow-card">
          <div className="aspect-[4/3] relative">
            <Image
              src={pack.coverImage}
              alt={pack.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-label text-accent mb-3">Photo Effect</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight">{pack.title}</h1>
          <p className="mt-4 text-muted leading-relaxed">{pack.description}</p>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-ink tracking-tight mb-6">Generate your image</h2>
        <EffectGenerator slug={pack.slug} defaultPrompt={prompt?.promptText || ""} />
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-ink tracking-tight mb-6">Example results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-stagger">
          {gallery.map((img, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden border border-line bg-paper shadow-card">
              <div className="aspect-square relative">
                <Image
                  src={img}
                  alt={`${pack.title} example ${idx + 1}`}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
