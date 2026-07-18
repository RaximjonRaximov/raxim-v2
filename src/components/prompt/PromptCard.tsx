"use client";

import Link from "next/link";
import Image from "next/image";

export function PromptCard({
  title,
  coverImage,
  aspectRatio,
  href,
}: {
  title: string;
  coverImage: string;
  aspectRatio?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block relative overflow-hidden rounded-2xl bg-paper shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-accent/20 to-blue/20">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-block text-[10px] uppercase tracking-wider font-mono text-white/80 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md">
            {aspectRatio || "1:1"}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-ink text-sm leading-tight group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </h3>
      </div>
    </Link>
  );
}
