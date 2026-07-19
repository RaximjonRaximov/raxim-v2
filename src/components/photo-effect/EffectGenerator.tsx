"use client";

import { useState, useRef } from "react";
import { generatePhotoEffect } from "@/actions/effects";

export function EffectGenerator({ slug, defaultPrompt }: { slug: string; defaultPrompt: string }) {
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const result = await generatePhotoEffect(new FormData(e.currentTarget));
      if (result?.error) {
        setError(result.error);
      } else if (result?.outputUrl) {
        setOutput(result.outputUrl);
      } else {
        setError("No response from image generator");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 lg:p-8">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="slug" value={slug} />

        <div>
          <label className="block mb-2 text-sm font-semibold text-ink">Upload your photo</label>
          <label className="flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-line bg-paper cursor-pointer hover:bg-surface transition-colors">
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={onFileChange}
              className="hidden"
            />
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="h-full w-full object-contain p-2" />
            ) : (
              <div className="text-center p-6">
                <span className="text-3xl">📸</span>
                <p className="mt-2 text-sm text-muted">Drop your photo here or click to upload</p>
                <p className="text-xs text-muted mt-1">JPG, PNG, WebP up to 10 MB</p>
              </div>
            )}
          </label>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-ink">Prompt</label>
          <textarea
            name="prompt"
            defaultValue={defaultPrompt}
            rows={5}
            className="w-full p-4 rounded-2xl border border-line bg-paper text-sm"
            placeholder="Describe how you want the result to look..."
          />
          <p className="mt-1 text-xs text-muted">You can edit the prompt. The uploaded photo is used as the reference.</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 rounded-2xl bg-rose/10 text-rose text-sm">{error}</div>
      )}

      {output && (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-ink mb-4">Generated result</h3>
          <div className="rounded-3xl overflow-hidden border border-line bg-paper shadow-card max-w-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={output} alt="Generated result" className="w-full h-auto" />
          </div>
          <a
            href={output}
            download
            className="inline-flex mt-4 px-6 py-3 rounded-xl bg-ink text-white font-bold hover:bg-ink/90 transition-colors"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
