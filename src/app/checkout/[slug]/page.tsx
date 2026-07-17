import { notFound } from "next/navigation";
import { getProductBySlug, getSiteContent } from "@/actions/catalog";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return { title: `Checkout — ${product.title} — Raxim` };
}

export default async function CheckoutPage({ params }: Props) {
  const [product, telegramHandle] = await Promise.all([
    getProductBySlug(params.slug),
    getSiteContent("telegram_handle"),
  ]);

  if (!product) return notFound();

  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <CheckoutForm product={product} telegramHandle={telegramHandle || "raximdesign"} />
    </div>
  );
}
