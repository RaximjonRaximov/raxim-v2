"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/photo-effects", label: "Photo Effects" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur border-b border-line h-16 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-ink">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-violet flex items-center justify-center text-white text-sm font-bold shadow-md shadow-accent/20">
            R
          </div>
          Raxim
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-xl hover:bg-surface"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-paper pt-20 px-6 pb-6 shadow-2xl">
          <nav className="space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-ink hover:bg-surface font-semibold"
              >
                {item.label}
              </Link>
            ))}
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-ink hover:bg-surface font-semibold"
              >
                Admin
              </Link>
            )}
          </nav>
          <div className="mt-6 pt-6 border-t border-line">
            {session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full py-3 rounded-xl bg-surface text-ink font-bold"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full text-center py-3 rounded-xl bg-accent text-white font-bold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
