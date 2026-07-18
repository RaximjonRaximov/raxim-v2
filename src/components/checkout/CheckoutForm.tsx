"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createCheckoutSession } from "@/actions/checkout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@prisma/client";

export function CheckoutForm({ product, telegramHandle }: { product: Product; telegramHandle: string }) {
  const [method, setMethod] = useState<"card" | "telegram">("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const isFree = product.price === 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (method === "telegram") {
      const text = encodeURIComponent(`Hi, I'd like to buy ${product.title}`);
      window.open(`https://t.me/${telegramHandle}?text=${text}`, "_blank");
      return;
    }

    setLoading(true);
    const result = await createCheckoutSession(product.slug);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.url) {
      router.push(result.url);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <Card className="p-6">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
          <Image src={product.coverImage || `/api/og?title=${encodeURIComponent(product.title)}`} alt={product.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <Badge variant="default">{product.type === "PROMPT_PACK" ? "Prompt pack" : product.type === "COURSE" ? "Course" : "Bundle"}</Badge>
        <h2 className="mt-3 text-2xl font-bold text-ink">{product.title}</h2>
        <p className="mt-2 text-muted">{product.description}</p>
      </Card>

      <Card className="p-8">
        <h2 className="text-2xl font-bold text-ink">Checkout</h2>
        <p className="mt-1 text-3xl font-bold text-ink">{isFree ? "Free" : `$${(product.price / 100).toFixed(2)}`}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!isFree && (
            <div className="space-y-3">
              <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${method === "card" ? "border-blue bg-page" : "border-line"}`}>
                <input type="radio" name="method" value="card" checked={method === "card"} onChange={() => setMethod("card")} />
                <div>
                  <p className="font-bold text-ink">Card</p>
                  <p className="text-sm text-muted">Pay securely with Stripe</p>
                </div>
              </label>
              <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${method === "telegram" ? "border-blue bg-page" : "border-line"}`}>
                <input type="radio" name="method" value="telegram" checked={method === "telegram"} onChange={() => setMethod("telegram")} />
                <div>
                  <p className="font-bold text-ink">Contact via Telegram</p>
                  <p className="text-sm text-muted">Send a message to complete manually</p>
                </div>
              </label>
            </div>
          )}

          {error && <p className="text-sm text-rose">{error}</p>}

          <Button type="submit" className="w-full" isLoading={loading}>
            {isFree ? "Get it free" : method === "telegram" ? "Open Telegram" : "Pay with card"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
