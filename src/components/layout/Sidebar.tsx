"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const nav = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/photo-effects", label: "Photo Effects", icon: SparklesIcon },
  { href: "/courses", label: "Courses", icon: PlayIcon },
  { href: "/about", label: "About", icon: InfoIcon },
  { href: "/contact", label: "Contact", icon: MailIcon },
];

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-paper border-r border-line hidden lg:flex flex-col shadow-card">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent to-violet flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent/25">
          R
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-ink">Raxim</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-ink hover:bg-surface"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-line space-y-2">
        {session?.user ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-muted hover:text-ink hover:bg-surface transition-colors"
          >
            <LogoutIcon className="w-5 h-5" />
            Sign out
          </button>
        ) : (
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent text-white text-sm font-bold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
          >
            Sign In
          </Link>
        )}
      </div>
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

function InfoIcon(props: { className?: string }) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function MailIcon(props: { className?: string }) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 8l7.9 5.26a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function LogoutIcon(props: { className?: string }) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
    </svg>
  );
}
