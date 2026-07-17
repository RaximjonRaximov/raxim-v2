import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register — Raxim",
  description: "Create a Raxim account.",
};

export default function RegisterPage() {
  return (
    <div className="max-w-wrapper mx-auto px-4 py-20 flex justify-center">
      <div className="w-full max-w-md">
        <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Account</p>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Create account</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
