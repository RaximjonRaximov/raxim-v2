import { LoginForm } from "@/components/auth/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Log in — Raxim",
  description: "Log in to your Raxim account.",
};

export default async function LoginPage({ searchParams }: { searchParams?: { redirect?: string } }) {
  const session = await auth();
  if (session?.user?.role === "ADMIN") redirect("/admin");
  if (session?.user) redirect(searchParams?.redirect || "/account");

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
