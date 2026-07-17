import { getSiteContent } from "@/actions/catalog";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { sendContactEmail } from "@/actions/email";

export const metadata = {
  title: "Contact — Raxim",
  description: "Get in touch for design services, partnerships, or questions.",
};

async function handleContact(formData: FormData) {
  "use server";
  await sendContactEmail(formData);
}

export default async function ContactPage() {
  const handle = await getSiteContent("telegram_handle");

  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">Let&apos;s work together</h1>
          <p className="mt-4 text-lg text-muted max-w-lg">
            Have a project, partnership, or question? Send a message or reach out directly.
          </p>
          <div className="mt-8 space-y-4">
            <a href={`https://t.me/${handle || "raximdesign"}`} className="flex items-center gap-3 text-ink hover:text-blue">
              <span className="font-mono text-xs uppercase tracking-label text-muted">Telegram</span>
              <span>@{handle || "raximdesign"}</span>
            </a>
            <a href="mailto:hello@raxim.design" className="flex items-center gap-3 text-ink hover:text-blue">
              <span className="font-mono text-xs uppercase tracking-label text-muted">Email</span>
              <span>hello@raxim.design</span>
            </a>
          </div>
        </div>

        <Card className="p-8">
          <form action={handleContact} className="space-y-6">
            <Input name="name" label="Name" placeholder="Your name" required />
            <Input type="email" name="email" label="Email" placeholder="you@example.com" required />
            <div>
              <label htmlFor="message" className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full p-4 rounded-2xl border border-line bg-paper text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                placeholder="Tell me about your project"
                required
              />
            </div>
            <Button type="submit" className="w-full">Send message</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
