import { notFound } from "next/navigation";
import { adminGetCustomer, adminGrantEntitlement } from "@/actions/admin";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: { id: string };
}

export const metadata = {
  title: "Customer detail — Admin — Raxim",
};

export default async function AdminCustomerPage({ params }: Props) {
  const customer = await adminGetCustomer(params.id);
  if (!customer) return notFound();

  const products = await prisma.product.findMany({ where: { published: true }, orderBy: { title: "asc" } });

  async function grant(formData: FormData) {
    "use server";
    await adminGrantEntitlement(params.id, String(formData.get("productId")));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">{customer.name || customer.email}</h1>
      <p className="mt-2 text-muted">{customer.email}</p>

      <h2 className="mt-10 text-xl font-bold text-ink">Entitlements</h2>
      <div className="mt-4 space-y-3">
        {customer.entitlements.map((e) => (
          <Card key={e.id} className="p-4 flex items-center justify-between">
            <p className="font-medium text-ink">{e.product.title}</p>
            <Badge variant="lime">{e.source}</Badge>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-6 max-w-lg">
        <h3 className="text-lg font-bold text-ink mb-4">Grant entitlement</h3>
        <form action={grant} className="flex gap-3">
          <select name="productId" className="flex-1 h-12 px-4 rounded-2xl border border-line bg-paper" required>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          <Button type="submit">Grant</Button>
        </form>
      </Card>

      <h2 className="mt-10 text-xl font-bold text-ink">Order history</h2>
      <div className="mt-4 space-y-3">
        {customer.orders.map((order) => (
          <Card key={order.id} className="p-4 flex items-center justify-between">
            <p className="font-medium text-ink">Order #{order.id.slice(-8)}</p>
            <p className="font-bold text-ink">${(order.totalAmount / 100).toFixed(2)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
