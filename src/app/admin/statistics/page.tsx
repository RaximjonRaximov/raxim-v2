import { adminGetDashboard, adminListProducts } from "@/actions/admin";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Statistics — Admin — Raxim",
};

export default async function AdminStatisticsPage() {
  const [data, packs, courses] = await Promise.all([
    adminGetDashboard(),
    adminListProducts("PROMPT_PACK"),
    adminListProducts("COURSE"),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Statistics</h1>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Total revenue</p>
          <p className="mt-2 text-3xl font-bold text-ink">${(data.totalRevenue / 100).toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Revenue this month</p>
          <p className="mt-2 text-3xl font-bold text-ink">${(data.revenueThisMonth / 100).toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Total orders</p>
          <p className="mt-2 text-3xl font-bold text-ink">{data.totalOrders}</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Total customers</p>
          <p className="mt-2 text-3xl font-bold text-ink">{data.totalCustomers}</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Photo effects</p>
          <p className="mt-2 text-3xl font-bold text-ink">{packs.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-mono uppercase tracking-label text-muted">Courses</p>
          <p className="mt-2 text-3xl font-bold text-ink">{courses.length}</p>
        </Card>
      </div>
    </div>
  );
}
