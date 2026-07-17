import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(key);
}

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: "Raxim <hello@raxim.design>",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

export async function sendReceiptEmail(to: string, orderId: string, amount: number) {
  const formatted = (amount / 100).toFixed(2);
  await sendEmail(
    to,
    `Your Raxim order receipt (#${orderId})`,
    `<p>Thank you for your purchase. Order #${orderId} — $${formatted} USD.</p><p>Access your content in your account: <a href="${process.env.NEXTAUTH_URL}/account/purchases">My purchases</a></p>`
  );
}
