import Link from "next/link";
import { getOrder } from "@/actions/checkout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Payment successful — Raxim",
  description: "Your payment was successful.",
};

export default async function CheckoutSuccessPage({ searchParams }: { searchParams?: { orderId?: string } }) {
  const order = searchParams?.orderId ? await getOrder(searchParams.orderId) : null;

  return (
    <div className="max-w-wrapper mx-auto px-4 py-20 flex justify-center">
      <Card className="p-10 max-w-lg w-full text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-lime flex items-center justify-center text-ink text-2xl">✓</div>
        <h1 className="mt-6 text-3xl font-bold text-ink">Payment successful</h1>
        <p className="mt-3 text-muted">Thank you for your purchase. Your content is now available in your account.</p>
        {order && (
          <p className="mt-2 text-sm font-mono text-muted">Order #{order.id.slice(-8)}</p>
        )}
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/account/purchases">
            <Button className="w-full">Go to my purchases</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">Back to home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
