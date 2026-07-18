import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPromptPack } from "@/actions/catalog";
import { CopyPromptButton } from "@/components/prompt/CopyPromptButton";
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

export default async function PromptPackPage({ params }: Props) {
  const pack = await getPromptPack(params.slug);
  if (!pack) return notFound();

  const prompt = pack.promptItems[0];
  const promptText = prompt?.promptText || "";
  const aspectRatio = prompt?.aspectRatio || "1:1";
  const metadata = (prompt?.metadata as { images?: string[] } | null) || {};
  const gallery = metadata.images || [];
  const allImages = [pack.coverImage, ...gallery];

  return (
    <div className="p-6 lg:p-10 max-w-wrapper mx-auto">
      <Link href="/prompts" className="text-sm text-muted hover:text-accent mb-6 inline-block">← Back to prompts</Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
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
          <p className="text-xs font-mono uppercase tracking-label text-accent mb-3">AI Prompt</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-ink tracking-tight">{pack.title}</h1>
          <p className="mt-4 text-muted leading-relaxed">{pack.description}</p>
          <div className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1.5 rounded-full">
            Aspect ratio: {aspectRatio}
          </div>

          <div className="mt-8 rounded-2xl bg-surface border border-line p-6">
            <p className="text-xs font-mono uppercase tracking-label text-muted mb-2">Prompt</p>
            <p className="text-ink leading-relaxed whitespace-pre-wrap font-medium">{promptText}</p>
            <CopyPromptButton text={promptText} />
          </div>
        </div>
      </div>

      {allImages.length > 1 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-ink tracking-tight mb-6">Generated images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-stagger">
            {allImages.map((img, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-line bg-paper shadow-card hover:shadow-card-hover transition-shadow">
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
      )}
    </div>
  );
}
