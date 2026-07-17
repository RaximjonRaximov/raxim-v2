import Link from "next/link";
import { adminListCustomers } from "@/actions/admin";

export const metadata = {
  title: "Customers — Admin — Raxim",
};

export default async function AdminCustomersPage() {
  const customers = await adminListCustomers();

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight mb-8">Customers</h1>
      <div className="rounded-2xl border border-line bg-paper overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-page text-muted font-mono text-xs uppercase tracking-label">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Orders</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t border-line">
                <td className="px-5 py-4 font-medium text-ink">{customer.name || "—"}</td>
                <td className="px-5 py-4 text-muted">{customer.email}</td>
                <td className="px-5 py-4">{customer._count.orders}</td>
                <td className="px-5 py-4">
                  <Link href={`/admin/customers/${customer.id}`} className="text-blue hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
