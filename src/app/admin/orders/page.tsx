import Link from "next/link";
import { adminListOrders } from "@/actions/admin";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Orders — Admin — Raxim",
};

export default async function AdminOrdersPage() {
  const orders = await adminListOrders();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ink tracking-tight">Orders</h1>
        <Link href="/admin/orders/new"><Button size="sm">Manual order</Button></Link>
      </div>

      <div className="rounded-2xl border border-line bg-paper overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-page text-muted font-mono text-xs uppercase tracking-label">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-line">
                <td className="px-5 py-4 font-medium text-ink">#{order.id.slice(-8)}</td>
                <td className="px-5 py-4 text-muted">{order.user.email}</td>
                <td className="px-5 py-4">${(order.totalAmount / 100).toFixed(2)}</td>
                <td className="px-5 py-4"><Badge variant={order.status === "FULFILLED" ? "lime" : "default"}>{order.status}</Badge></td>
                <td className="px-5 py-4 text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-4">
                  <Link href={`/admin/orders/${order.id}`} className="text-blue hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
