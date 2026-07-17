import { getSiteContent } from "@/actions/catalog";

export const metadata = {
  title: "About — Raxim",
  description: "Independent AI visual designer and educator.",
};

export default async function AboutPage() {
  const about = await getSiteContent("about_text");

  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">About</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink max-w-3xl">Designing the future of freelance visuals</h1>
      <p className="mt-8 text-lg text-muted max-w-2xl leading-relaxed">
        {about || "Raxim is an independent AI visual designer helping freelancers ship high-end imagery without the high-end budget."}
      </p>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Prompts sold", value: "75+" },
          { label: "Courses", value: "6" },
          { label: "Students", value: "1,200+" },
          { label: "Countries", value: "40+" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-paper p-6 text-center">
            <p className="text-3xl font-bold text-ink">{s.value}</p>
            <p className="mt-1 text-xs font-mono uppercase tracking-label text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
