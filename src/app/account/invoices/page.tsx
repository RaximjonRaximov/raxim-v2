import { getMyOrders } from "@/actions/entitlements";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Invoices — Raxim",
};

export default async function InvoicesPage() {
  const orders = await getMyOrders();

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Invoices</h1>
      <p className="mt-2 text-muted">Order history and receipts.</p>

      <div className="mt-8 space-y-3">
        {orders.map((order) => (
          <Card key={order.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-ink">Order #{order.id.slice(-8)}</p>
              <p className="text-sm text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {order.items.map((item) => (
                  <Badge key={item.id} variant="default">{item.product.title}</Badge>
                ))}
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xl font-bold text-ink">${(order.totalAmount / 100).toFixed(2)}</p>
              <Badge variant={order.status === "FULFILLED" ? "lime" : "default"}>{order.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
