import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";

export function PromptPackCard({
  product,
  href,
}: {
  product: Product & {
    promptItems?: { metadata?: unknown }[];
  };
  href?: string;
}) {
  const prompt = product.promptItems?.[0];
  const gallery = (prompt?.metadata as { images?: string[] } | null)?.images || [];
  const imageCount = gallery.length + 1;

  return (
    <Link href={href || `/prompts/${product.slug}`} className="group block">
      <div className="rounded-2xl bg-paper border border-line overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-accent/10 to-violet/10">
          <Image
            src={product.coverImage}
            alt={product.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors" />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-ink tracking-tight line-clamp-1 group-hover:text-accent transition-colors">
            {product.title}
          </h3>
          <p className="mt-2 text-sm text-muted line-clamp-2">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
              {`${imageCount} ${imageCount === 1 ? "image" : "images"}`}
            </span>
            <span className="text-sm font-bold text-muted group-hover:text-accent transition-colors">Explore →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
