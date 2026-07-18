"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard", icon: HomeIcon },
  { href: "/admin/photo-effects", label: "Photo Effects", icon: SparklesIcon },
  { href: "/admin/courses", label: "Courses", icon: PlayIcon },
  { href: "/admin/statistics", label: "Statistics", icon: ChartIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0">
      <nav className="space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                active ? "bg-accent/10 text-accent" : "text-muted hover:text-ink hover:bg-surface"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function HomeIcon(props: { className?: string }) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function SparklesIcon(props: { className?: string }) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.3 6.9L19 8l-5.7 2.1L13 16l-2.3-6.9L7 8l5.7-2.1L11 0z" />
    </svg>
  );
}

function PlayIcon(props: { className?: string }) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M14.75 11.35l-6.4-3.7A1 1 0 007 8.6v6.8a1 1 0 001.35.95l6.4-3.7a1 1 0 000-1.7z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function ChartIcon(props: { className?: string }) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 20V10M12 20V4M6 20v6" />
    </svg>
  );
}
