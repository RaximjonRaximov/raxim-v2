import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata = {
  title: "Reset password — Raxim",
  description: "Set a new password for your Raxim account.",
};

export default function ResetPasswordPage({ searchParams }: { searchParams?: { token?: string; email?: string } }) {
  return (
    <div className="max-w-wrapper mx-auto px-4 py-20 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Reset password</h1>
        <ResetPasswordForm token={searchParams?.token || ""} email={searchParams?.email || ""} />
      </div>
    </div>
  );
}
