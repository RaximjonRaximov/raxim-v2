import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot password — Raxim",
  description: "Reset your Raxim password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-wrapper mx-auto px-4 py-20 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Forgot password</h1>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
