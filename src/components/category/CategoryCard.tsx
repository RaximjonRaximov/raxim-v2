"use client";

import Link from "next/link";
import Image from "next/image";

export function CategoryCard({
  slug,
  title,
  description,
  coverImage,
  promptCount,
}: {
  slug: string;
  title: string;
  description?: string | null;
  coverImage?: string | null;
  promptCount?: number;
}) {
  return (
    <Link
      href={`/prompts/${slug}`}
      className="group block relative overflow-hidden rounded-2xl bg-paper shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-accent/20 to-blue/20">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/60 text-4xl font-bold">
            {title.slice(0, 1)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-ink text-base leading-tight group-hover:text-accent transition-colors">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-muted line-clamp-2">{description}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
            {promptCount ?? 0} prompts
          </span>
          <span className="text-xs font-medium text-muted group-hover:text-accent transition-colors">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
