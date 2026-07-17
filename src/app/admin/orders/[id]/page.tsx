import { notFound } from "next/navigation";
import { adminGetOrder } from "@/actions/admin";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: { id: string };
}

export const metadata = {
  title: "Order detail — Admin — Raxim",
};

export default async function AdminOrderPage({ params }: Props) {
  const order = await adminGetOrder(params.id);
  if (!order) return notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Order #{order.id.slice(-8)}</h1>
      <p className="mt-2 text-muted">{new Date(order.createdAt).toLocaleString()}</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Customer</p>
          <p className="mt-2 font-bold text-ink">{order.user.email}</p>
          <p className="text-sm text-muted">{order.user.name}</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Payment</p>
          <p className="mt-2 font-bold text-ink">${(order.totalAmount / 100).toFixed(2)} {order.currency}</p>
          <Badge variant={order.status === "FULFILLED" ? "lime" : "default"}>{order.status}</Badge>
        </Card>
      </div>

      <h2 className="mt-10 text-xl font-bold text-ink">Items</h2>
      <div className="mt-4 space-y-3">
        {order.items.map((item) => (
          <Card key={item.id} className="p-4 flex items-center justify-between">
            <p className="font-medium text-ink">{item.product.title}</p>
            <p className="font-bold text-ink">${(item.price / 100).toFixed(2)}</p>
          </Card>
        ))}
      </div>

      {order.notes && (
        <Card className="mt-6 p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Notes</p>
          <p className="mt-2 text-ink">{order.notes}</p>
        </Card>
      )}
    </div>
  );
}
