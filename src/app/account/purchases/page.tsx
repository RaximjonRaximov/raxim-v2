import { getMyEntitlements } from "@/actions/entitlements";
import { ProductCard } from "@/components/product/ProductCard";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "My purchases — Raxim",
};

export default async function PurchasesPage() {
  const entitlements = await getMyEntitlements();

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">My purchases</h1>
      <p className="mt-2 text-muted">Access your prompt packs and courses.</p>

      {entitlements.length === 0 ? (
        <Card className="mt-8 p-10 text-center">
          <p className="text-muted">No purchases yet.</p>
        </Card>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entitlements.map((entitlement) => {
            const product = entitlement.product;
            const href = product.type === "PROMPT_PACK" ? `/account/prompts/${product.slug}` : `/account/courses/${product.slug}`;
            return <ProductCard key={entitlement.id} product={product} href={href} />;
          })}
        </div>
      )}
    </div>
  );
}
