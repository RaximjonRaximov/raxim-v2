"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function LoginForm({ redirect }: { redirect?: string }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackUrl: redirect || "/account",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <Input name="email" type="email" label="Email" placeholder="you@example.com" required />
      <Input name="password" type="password" label="Password" placeholder="••••••••" required />
      <Button type="submit" className="w-full" isLoading={loading}>Log in</Button>
      <p className="text-sm text-center text-muted">
        Don&apos;t have an account? <Link href="/register" className="text-blue hover:underline">Register</Link>
      </p>
    </form>
  );
}
