import { redirect } from "next/navigation";
import { adminCreateManualOrder } from "@/actions/admin";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "New manual order — Admin — Raxim",
};

export default async function NewManualOrderPage() {
  const [users, products] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.product.findMany({ where: { published: true }, orderBy: { title: "asc" } }),
  ]);

  async function create(formData: FormData) {
    "use server";
    const userId = String(formData.get("userId"));
    const productIds = formData.getAll("productIds") as string[];
    const totalAmount = Number(formData.get("totalAmount")) * 100;
    const currency = String(formData.get("currency"));
    const notes = String(formData.get("notes"));

    await adminCreateManualOrder({ userId, productIds, totalAmount, currency, notes });
    redirect("/admin/orders");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">New manual order</h1>
      <form action={create} className="mt-8 max-w-2xl space-y-6">
        <div>
          <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Customer</label>
          <select name="userId" className="w-full h-12 px-4 rounded-2xl border border-line bg-paper" required>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.email}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Products</label>
          <select name="productIds" multiple className="w-full h-48 px-4 py-2 rounded-2xl border border-line bg-paper" required>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.title} — ${(p.price / 100).toFixed(2)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Total amount (USD)</label>
          <input type="number" name="totalAmount" min="0" step="0.01" className="w-full h-12 px-4 rounded-2xl border border-line bg-paper" required />
        </div>

        <div>
          <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Currency</label>
          <input type="text" name="currency" defaultValue="USD" className="w-full h-12 px-4 rounded-2xl border border-line bg-paper" required />
        </div>

        <div>
          <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Notes</label>
          <textarea name="notes" rows={4} className="w-full p-4 rounded-2xl border border-line bg-paper" />
        </div>

        <Button type="submit">Create order</Button>
      </form>
    </div>
  );
}
