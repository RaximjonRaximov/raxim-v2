"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function LoginForm({ redirect }: { redirect?: string }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push(redirect || "/account");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <Input name="email" type="email" label="Email" placeholder="you@example.com" required />
      <Input name="password" type="password" label="Password" placeholder="••••••••" required />
      {error && <p className="text-sm text-rose">{error}</p>}
      <Button type="submit" className="w-full" isLoading={loading}>Log in</Button>
      <p className="text-sm text-center text-muted">
        Don&apos;t have an account? <Link href="/register" className="text-blue hover:underline">Register</Link>
      </p>
    </form>
  );
}
