import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Log in — Raxim",
  description: "Log in to your Raxim account.",
};

export default function LoginPage({ searchParams }: { searchParams?: { redirect?: string } }) {
  return (
    <div className="max-w-wrapper mx-auto px-4 py-20 flex justify-center">
      <div className="w-full max-w-md">
        <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Account</p>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Log in</h1>
        <LoginForm redirect={searchParams?.redirect} />
      </div>
    </div>
  );
}
