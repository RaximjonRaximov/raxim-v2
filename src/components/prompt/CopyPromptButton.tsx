"use client";

import { useState } from "react";

export function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="mt-4 w-full py-2.5 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent/90 transition-colors"
    >
      {copied ? "Copied!" : "Copy prompt"}
    </button>
  );
}
