"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";

export function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <MobileHeader />
      <Sidebar />
      <div className="lg:pl-64 min-h-screen flex flex-col">
        <main className="flex-1 pt-16 lg:pt-0">{children}</main>
      </div>
    </>
  );
}
