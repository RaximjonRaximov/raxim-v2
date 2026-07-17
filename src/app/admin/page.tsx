import { adminGetDashboard } from "@/actions/admin";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const metadata = {
  title: "Admin — Raxim",
};

export default async function AdminDashboardPage() {
  const data = await adminGetDashboard();

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Dashboard</h1>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Total revenue</p>
          <p className="mt-2 text-3xl font-bold text-ink">${(data.totalRevenue / 100).toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">This month</p>
          <p className="mt-2 text-3xl font-bold text-ink">${(data.revenueThisMonth / 100).toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Orders</p>
          <p className="mt-2 text-3xl font-bold text-ink">{data.totalOrders}</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Customers</p>
          <p className="mt-2 text-3xl font-bold text-ink">{data.totalCustomers}</p>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-ink mb-4">Recent orders</h2>
        <div className="space-y-3">
          {data.recentOrders.map((order) => (
            <Card key={order.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-ink">
                  <Link href={`/admin/orders/${order.id}`} className="hover:text-blue">Order #{order.id.slice(-8)}</Link>
                </p>
                <p className="text-sm text-muted">{order.user.email}</p>
              </div>
              <p className="font-bold text-ink">${(order.totalAmount / 100).toFixed(2)}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
