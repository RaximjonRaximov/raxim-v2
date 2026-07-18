import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");

  return (
    <div className="min-h-screen flex bg-page">
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 left-0 border-r border-line bg-paper">
        <AdminSidebar />
      </aside>
      <main className="flex-1 md:ml-64 p-6 lg:p-10 overflow-auto">{children}</main>
    </div>
  );
}
