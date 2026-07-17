"use server";

import { sendEmail } from "@/lib/email";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendContactEmail(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return { error: "Please fill in all fields" };

  const { name, email, message } = parsed.data;
  await sendEmail("hello@raxim.design", `Contact form from ${name}`, `<p>From: ${name} &lt;${email}&gt;</p><p>${message}</p>`);
  return { success: true };
}
