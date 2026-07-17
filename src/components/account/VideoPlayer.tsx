"use client";

import { useEffect, useState } from "react";
import { getVideoUrl } from "@/actions/entitlements";

export function VideoPlayer({ lessonId }: { lessonId: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const signed = await getVideoUrl(lessonId);
      if (!signed) {
        setError("Unable to load video. Please refresh or purchase the course.");
        return;
      }
      setUrl(signed);
    }
    load();
  }, [lessonId]);

  if (error) return <p className="p-8 text-rose">{error}</p>;
  if (!url) return <div className="aspect-video flex items-center justify-center text-muted">Loading video...</div>;

  return (
    <video
      src={url}
      controls
      className="w-full aspect-video bg-ink"
      poster=""
      playsInline
    />
  );
}
