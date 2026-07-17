"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/prompts", label: "Prompts" },
  { href: "/courses", label: "Courses" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur border-b border-line">
      <nav className="max-w-wrapper mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main">
        <Link href="/" className="text-xl font-bold tracking-tight text-ink">
          Raxim
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-medium text-ink hover:text-blue transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
          {session?.user?.role === "ADMIN" && (
            <li>
              <Link href="/admin" className="text-sm font-medium text-blue hover:underline">
                Admin
              </Link>
            </li>
          )}
          {session ? (
            <>
              <li>
                <Link href="/account" className="text-sm font-medium text-ink hover:text-blue">
                  Account
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm font-medium text-muted hover:text-ink"
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="inline-flex h-10 px-5 rounded-full bg-ink text-white text-sm font-medium items-center hover:bg-blue transition-colors"
              >
                Log in
              </Link>
            </li>
          )}
        </ul>

        <button
          className="md:hidden p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-blue"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-line px-4 py-4 bg-paper">
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block text-sm font-medium text-ink" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            {session?.user?.role === "ADMIN" && (
              <li>
                <Link href="/admin" className="block text-sm font-medium text-blue" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              </li>
            )}
            {session ? (
              <>
                <li>
                  <Link href="/account" className="block text-sm font-medium text-ink" onClick={() => setOpen(false)}>
                    Account
                  </Link>
                </li>
                <li>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="block text-sm font-medium text-muted">
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="block text-sm font-medium text-blue" onClick={() => setOpen(false)}>
                  Log in
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
