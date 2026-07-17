"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { registerAction } from "@/actions/auth";
import Link from "next/link";

export function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await registerAction(null, formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      router.push("/account");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <Input name="name" label="Name" placeholder="Your name" required />
      <Input name="email" type="email" label="Email" placeholder="you@example.com" required />
      <Input name="password" type="password" label="Password" placeholder="••••••••" required />
      <Input name="confirmPassword" type="password" label="Confirm password" placeholder="••••••••" required />
      {error && <p className="text-sm text-rose">{error}</p>}
      <Button type="submit" className="w-full" isLoading={loading}>Create account</Button>
      <p className="text-sm text-center text-muted">
        Already have an account? <Link href="/login" className="text-blue hover:underline">Log in</Link>
      </p>
    </form>
  );
}
