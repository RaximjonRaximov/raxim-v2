import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product, href }: { product: Product & { _count?: { promptItems?: number; lessons?: number } }; href?: string }) {
  const link = href || (product.type === "PROMPT_PACK" ? `/prompts/${product.slug}` : `/courses/${product.slug}`);
  const count = product._count?.promptItems || product._count?.lessons || 0;

  return (
    <Link href={link} className="group">
      <div className="rounded-2xl border border-line bg-paper overflow-hidden shadow-soft transition-shadow hover:shadow-card">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.coverImage}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default">{product.category || product.type.toLowerCase().replace("_", " ")}</Badge>
            {product.isBundle && <Badge variant="dark">Bundle</Badge>}
          </div>
          <h3 className="text-lg font-bold text-ink tracking-tight line-clamp-1">{product.title}</h3>
          <p className="mt-2 text-sm text-muted line-clamp-2">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-mono uppercase tracking-label text-muted">{count} {product.type === "PROMPT_PACK" ? "prompts" : "lessons"}</span>
            <span className="text-lg font-bold text-ink">${(product.price / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
