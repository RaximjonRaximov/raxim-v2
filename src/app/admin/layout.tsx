import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");

  return (
    <div className="max-w-wrapper mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-1">
          <AdminSidebar />
        </div>
        <div className="md:col-span-4">{children}</div>
      </div>
    </div>
  );
}
