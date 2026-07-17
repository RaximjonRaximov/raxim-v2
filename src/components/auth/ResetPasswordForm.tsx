"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { resetPasswordAction } from "@/actions/auth";

export function ResetPasswordForm({ token, email }: { token: string; email: string }) {
  const [state, setState] = useState<{ success?: boolean; error?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await resetPasswordAction(null, formData);
    setState(result);
    setLoading(false);
    if (result.success) {
      setTimeout(() => router.push("/login"), 1500);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="email" value={email} />
      <Input name="password" type="password" label="New password" placeholder="••••••••" required />
      {state.error && <p className="text-sm text-rose">{state.error}</p>}
      {state.success && <p className="text-sm text-blue">Password updated. Redirecting...</p>}
      <Button type="submit" className="w-full" isLoading={loading}>Update password</Button>
    </form>
  );
}
