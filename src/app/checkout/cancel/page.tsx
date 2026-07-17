import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Payment cancelled — Raxim",
  description: "Your payment was cancelled.",
};

export default function CheckoutCancelPage() {
  return (
    <div className="max-w-wrapper mx-auto px-4 py-20 flex justify-center">
      <Card className="p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-ink">Payment cancelled</h1>
        <p className="mt-3 text-muted">No worries — you can try again whenever you&apos;re ready.</p>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/prompts">
            <Button className="w-full">Browse prompts</Button>
          </Link>
          <Link href="/courses">
            <Button variant="outline" className="w-full">Browse courses</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
