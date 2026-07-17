import { auth } from "@/lib/auth";
import { getMyOrders } from "@/actions/entitlements";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default async function AccountDashboardPage() {
  const session = await auth();
  const orders = await getMyOrders();

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Welcome, {session?.user?.name || "back"}</h1>
      <p className="mt-2 text-muted">Here is a summary of your recent activity.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm font-mono uppercase tracking-label text-muted">Total orders</p>
          <p className="mt-2 text-3xl font-bold text-ink">{orders.length}</p>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-ink mb-4">Recent purchases</h2>
        {orders.length === 0 ? (
          <p className="text-muted">You haven&apos;t purchased anything yet. <Link href="/prompts" className="text-blue hover:underline">Browse prompts</Link></p>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <Card key={order.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-ink">Order #{order.id.slice(-8)}</p>
                  <p className="text-sm text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
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
