import { notFound } from "next/navigation";
import { getCategory } from "@/actions/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategory(params.slug);
  if (!category) return notFound();

  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <div className="mb-8">
        <Link href="/prompts" className="text-sm font-medium text-blue hover:underline">
          ← All prompt packs
        </Link>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-ink">{category.title}</h1>
        <p className="mt-4 text-lg text-muted max-w-2xl">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {category.products.map((pack) => (
          <ProductCard key={pack.id} product={pack} />
        ))}
      </div>
    </div>
  );
}
