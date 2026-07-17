"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { registerSchema, forgotPasswordSchema, resetPasswordSchema } from "@/lib/validations";
import { signIn, auth } from "@/lib/auth";
import { AuthError } from "next-auth";
import { randomBytes, createHash } from "crypto";
import { sendEmail } from "@/lib/email";

export async function registerAction(prevState: unknown, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  await signIn("credentials", { email, password, redirectTo: "/account" });
  return { success: true, userId: user.id };
}

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/account",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;
  }
}

export async function forgotPasswordAction(prevState: unknown, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = forgotPasswordSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid email" };
  }

  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const token = randomBytes(32).toString("hex");
    const hashed = createHash("sha256").update(token).digest("hex");

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashed,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const url = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    await sendEmail(email, "Reset your Raxim password", `<p><a href="${url}">Reset password</a></p>`);
  }

  return { success: true };
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const name = String(formData.get("name") || "");
  await prisma.user.update({
    where: { id: session.user.id },
    data: { name },
  });

  return { success: true };
}

export async function resetPasswordAction(prevState: unknown, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = resetPasswordSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  const { token, password } = parsed.data;
  const email = String(formData.get("email") || "");
  const hashed = createHash("sha256").update(token).digest("hex");

  const vt = await prisma.verificationToken.findUnique({
    where: { identifier_token: { identifier: email, token: hashed } },
  });

  if (!vt || vt.expires < new Date()) {
    return { error: "Token expired or invalid" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email },
    data: { passwordHash },
  });

  await prisma.verificationToken.delete({ where: { token: vt.token } });

  return { success: true };
}
