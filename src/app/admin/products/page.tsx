import Link from "next/link";
import { adminListProducts } from "@/actions/admin";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Products — Admin — Raxim",
};

export default async function AdminProductsPage() {
  const products = await adminListProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ink tracking-tight">Products</h1>
        <div className="flex gap-3">
          <Link href="/admin/products/packs/new"><Button size="sm">New pack</Button></Link>
          <Link href="/admin/products/courses/new"><Button size="sm" variant="outline">New course</Button></Link>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-page text-muted font-mono text-xs uppercase tracking-label">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-line">
                <td className="px-5 py-4 font-medium text-ink">{product.title}</td>
                <td className="px-5 py-4 text-muted">{product.type.replace(/_/g, " ")}</td>
                <td className="px-5 py-4 text-muted">{product.category?.title || "—"}</td>
                <td className="px-5 py-4">${(product.price / 100).toFixed(2)}</td>
                <td className="px-5 py-4">{product.published ? <Badge variant="lime">Published</Badge> : <Badge variant="default">Draft</Badge>}</td>
                <td className="px-5 py-4">
                  <Link
                    href={product.type === "PROMPT_PACK" ? `/admin/products/packs/${product.id}/edit` : product.type === "COURSE" ? `/admin/products/courses/${product.id}/edit` : "#"}
                    className="text-blue hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
