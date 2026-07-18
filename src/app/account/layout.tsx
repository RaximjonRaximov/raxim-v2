import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?redirect=/account");
  if (session.user.role === "ADMIN") redirect("/admin");

  return (
    <div className="max-w-wrapper mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="space-y-1">
            {[
              { href: "/account", label: "Dashboard" },
              { href: "/account/purchases", label: "My purchases" },
              { href: "/account/invoices", label: "Invoices" },
              { href: "/account/profile", label: "Profile" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 rounded-xl text-sm font-medium text-ink hover:bg-paper border border-transparent hover:border-line"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
