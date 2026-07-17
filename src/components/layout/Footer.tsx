import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="max-w-wrapper mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">&copy; {new Date().getFullYear()} Raxim. All rights reserved.</p>
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link href="/prompts" className="hover:text-ink">Prompts</Link>
          <Link href="/courses" className="hover:text-ink">Courses</Link>
          <Link href="/contact" className="hover:text-ink">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
