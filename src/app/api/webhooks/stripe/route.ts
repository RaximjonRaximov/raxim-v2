import { NextRequest, NextResponse } from "next/server";
import { getStripe, stripeWebhookSecret } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { sendReceiptEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let event;
  const stripe = getStripe();
  try {
    event = stripe.webhooks.constructEvent(payload, signature, stripeWebhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: { include: { bundleChildren: { include: { child: true } } } } } }, user: true, payment: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { status: "FULFILLED", paymentProvider: "STRIPE", providerOrderId: session.id },
    });

    await prisma.payment.update({
      where: { orderId: order.id },
      data: { status: "COMPLETED", providerTxId: session.id, rawWebhookData: JSON.parse(JSON.stringify(event)) },
    });

    const productIds = new Set<string>();

    for (const item of order.items) {
      productIds.add(item.productId);
      if (item.product.isBundle) {
        for (const child of item.product.bundleChildren) {
          productIds.add(child.childId);
        }
      }
    }

    for (const productId of Array.from(productIds)) {
      await prisma.entitlement.upsert({
        where: { userId_productId: { userId: order.userId, productId } },
        update: {},
        create: { userId: order.userId, productId, source: "purchase" },
      });
    }

    if (order.user.email) {
      await sendReceiptEmail(order.user.email, order.id, order.totalAmount);
    }
  }

  return NextResponse.json({ received: true });
}
