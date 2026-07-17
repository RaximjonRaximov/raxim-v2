"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { rateLimitCheckout } from "@/lib/rate-limit";
import { getProductBySlug } from "./catalog";
import { headers } from "next/headers";

export async function createCheckoutSession(productSlug: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in" };
  }

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  if (!rateLimitCheckout(`${ip}:${session.user.id}`)) {
    return { error: "Too many checkout attempts. Please wait." };
  }

  const product = await getProductBySlug(productSlug);
  if (!product) {
    return { error: "Product not found" };
  }

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      totalAmount: product.price,
      currency: product.currency,
      paymentProvider: "STRIPE",
      status: "PENDING",
      items: {
        create: {
          productId: product.id,
          price: product.price,
          quantity: 1,
        },
      },
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order.id,
      provider: "STRIPE",
      status: "PENDING",
      amount: product.price,
      currency: product.currency,
    },
  });

  const successUrl = `${process.env.NEXTAUTH_URL}/checkout/success?orderId=${order.id}`;
  const cancelUrl = `${process.env.NEXTAUTH_URL}/checkout/cancel?orderId=${order.id}`;

  const stripe = getStripe();
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: product.currency.toLowerCase(),
          product_data: { name: product.title },
          unit_amount: product.price,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { orderId: order.id },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { providerOrderId: stripeSession.id },
  });

  return { url: stripeSession.url };
}

export async function getOrder(orderId: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.order.findFirst({
    where: { id: orderId, userId: session.user.id },
    include: { items: { include: { product: true } }, payment: true },
  });
}
