import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Motion — Raxim",
  description: "AI-powered motion and video showcases.",
};

export default function MotionPage() {
  return (
    <div className="max-w-wrapper mx-auto px-4 py-16">
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-label text-blue mb-3">Motion</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">Video & motion</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="aspect-video flex items-center justify-center bg-ink text-white">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-label text-lime">Showcase 1</p>
            <p className="mt-2 text-lg font-bold">Cinematic AI Reel</p>
          </div>
        </Card>
        <Card className="aspect-video flex items-center justify-center bg-ink text-white">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-label text-cyan">Showcase 2</p>
            <p className="mt-2 text-lg font-bold">Product Motion Study</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
