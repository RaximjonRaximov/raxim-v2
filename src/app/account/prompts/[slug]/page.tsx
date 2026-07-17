import { redirect } from "next/navigation";
import { getOwnedPromptPack } from "@/actions/entitlements";
import { CopyButton } from "@/components/account/CopyButton";
import { Badge } from "@/components/ui/Badge";

interface Props {
  params: { slug: string };
}

export default async function OwnedPromptPackPage({ params }: Props) {
  const pack = await getOwnedPromptPack(params.slug);
  if (!pack) redirect(`/prompts/${params.slug}`);

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">{pack.title}</h1>
      <p className="mt-2 text-muted">{pack.description}</p>

      <div className="mt-10 space-y-6">
        {pack.promptItems.map((prompt) => (
          <div key={prompt.id} className="rounded-2xl border border-line bg-paper p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ink">{prompt.title}</h3>
              <div className="flex items-center gap-3">
                <Badge variant="default">{prompt.aspectRatio}</Badge>
                <CopyButton text={prompt.promptText} />
              </div>
            </div>
            <PromptText text={prompt.promptText} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PromptText({ text }: { text: string }) {
  const parts = text.split(/(\[[A-Z_]+\])/g);

  return (
    <p className="text-sm font-mono bg-page p-4 rounded-xl leading-relaxed whitespace-pre-wrap">
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span key={i} className="bg-lime text-ink px-1 rounded">{part}</span>
        ) : (
          part
        )
      )}
    </p>
  );
}
