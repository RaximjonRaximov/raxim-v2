import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Work — Raxim",
  description: "Selected AI visual design case studies.",
};

const projects = [
  { title: "Moonlight Skincare", category: "Product" },
  { title: "Nomad Coffee", category: "Branding" },
  { title: "Serena Fashion", category: "Editorial" },
  { title: "Pulse Fitness", category: "Social" },
  { title: "Aurora Tech", category: "Cinematic" },
  { title: "Velvet Records", category: "Portrait" },
  { title: "Kintsu Ceramics", category: "Product" },
  { title: "Rise Agency", category: "Personal Brand" },
];

export default function WorkPage() {
  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Portfolio</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">Selected work</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((p, i) => (
          <Card key={i} className="p-6 aspect-[3/4] flex flex-col justify-end">
            <p className="font-mono text-[10px] uppercase tracking-label text-blue">{p.category}</p>
            <h3 className="mt-2 text-xl font-bold text-ink">{p.title}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
}
