import { adminGetDashboard, adminListProducts } from "@/actions/admin";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "Admin — Raxim",
};

export default async function AdminDashboardPage() {
  const [data, packs, courses] = await Promise.all([
    adminGetDashboard(),
    adminListProducts("PROMPT_PACK"),
    adminListProducts("COURSE"),
  ]);

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

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-label text-accent">Photo Effects</p>
            <p className="mt-2 text-3xl font-bold text-ink">{packs.length}</p>
          </div>
          <Link href="/admin/photo-effects" className="mt-4">
            <Button size="sm" className="w-full">Manage effects</Button>
          </Link>
        </Card>
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-label text-accent">Courses</p>
            <p className="mt-2 text-3xl font-bold text-ink">{courses.length}</p>
          </div>
          <Link href="/admin/courses" className="mt-4">
            <Button size="sm" className="w-full">Manage courses</Button>
          </Link>
        </Card>
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-label text-accent">Users</p>
            <p className="mt-2 text-3xl font-bold text-ink">{data.totalCustomers}</p>
          </div>
          <Link href="/admin/statistics" className="mt-4">
            <Button size="sm" variant="outline" className="w-full">View stats</Button>
          </Link>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-ink mb-4">Recent orders</h2>
        {data.recentOrders.length === 0 ? (
          <p className="text-muted">No orders yet.</p>
        ) : (
          <div className="space-y-3">
            {data.recentOrders.map((order) => (
              <Card key={order.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-ink">
                    <Link href={`/admin/orders/${order.id}`} className="hover:text-accent">Order #{order.id.slice(-8)}</Link>
                  </p>
                  <p className="text-sm text-muted">{order.user.email}</p>
                </div>
                <p className="font-bold text-ink">${(order.totalAmount / 100).toFixed(2)}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
