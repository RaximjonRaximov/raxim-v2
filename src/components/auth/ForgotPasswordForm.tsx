"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { forgotPasswordAction } from "@/actions/auth";

export function ForgotPasswordForm() {
  const [state, setState] = useState<{ success?: boolean; error?: string }>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await forgotPasswordAction(null, formData);
    setState(result);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <Input name="email" type="email" label="Email" placeholder="you@example.com" required />
      {state.error && <p className="text-sm text-rose">{state.error}</p>}
      {state.success && <p className="text-sm text-blue">Check your email for a reset link.</p>}
      <Button type="submit" className="w-full" isLoading={loading}>Send reset link</Button>
    </form>
  );
}
