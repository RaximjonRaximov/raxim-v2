import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Services — Raxim",
  description: "Design services and AI art direction for brands and creators.",
};

const services = [
  { title: "AI Brand Systems", description: "Complete visual identity built with AI-first workflows." },
  { title: "Prompt Engineering", description: "Custom prompt packs tailored to your product or niche." },
  { title: "Campaign Art Direction", description: "Seasonal or launch visuals from concept to final assets." },
  { title: "Course Co-Creation", description: "Partner on a video course for your audience." },
  { title: "1:1 AI Consultation", description: "Hands-on sessions to build your AI design stack." },
];

export default function ServicesPage() {
  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Services</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">Ways to work together</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <Card key={i} className="p-8">
            <h3 className="text-xl font-bold text-ink">{s.title}</h3>
            <p className="mt-3 text-muted">{s.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
