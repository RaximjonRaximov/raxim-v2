#!/usr/bin/env python3
"""
Download all prompt images from the Raxim v2 manifest.

Usage:
    python3 download-all-images.py

The script reads data/prompt-manifest.json.gz (or the uncompressed .json),
creates an `images/` directory, and downloads every cover image plus variant
images while respecting Pollinations rate limits.

If a download fails (e.g. HTTP 429), the script retries with exponential
backoff. Increase `DELAY` if you still see rate limits.
"""

import gzip
import json
import os
import re
import time
from urllib.parse import urlparse

import requests

MANIFEST = "data/prompt-manifest.json.gz"
MANIFEST_FALLBACK = "data/prompt-manifest.json"
OUT_DIR = "images"
DELAY = 2.0
RETRIES = 5


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9_-]+", "-", name.lower()).strip("-") or "image"


def load_manifest() -> list:
    if os.path.exists(MANIFEST):
        with gzip.open(MANIFEST, "rt", encoding="utf-8") as f:
            return json.load(f)
    if os.path.exists(MANIFEST_FALLBACK):
        with open(MANIFEST_FALLBACK, "r", encoding="utf-8") as f:
            return json.load(f)
    raise FileNotFoundError("Manifest not found. Run `npx tsx prisma/export-prompt-manifest.ts` first.")


def filename_for(item: dict, variant: str, url: str) -> str:
    pack_slug = slugify(item.get("packSlug") or "pack")
    item_id = item["id"]
    ext = os.path.splitext(urlparse(url).path)[1] or ".jpg"
    return f"{pack_slug}_{item_id}_{variant}{ext}"


def download(url: str, dest: str, attempt: int = 1) -> bool:
    try:
        r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=60)
        if r.status_code == 429 and attempt < RETRIES:
            wait = 2 ** attempt
            print(f"  429 for {os.path.basename(dest)}, waiting {wait}s...")
            time.sleep(wait)
            return download(url, dest, attempt + 1)
        r.raise_for_status()
        if len(r.content) < 100:
            print(f"  too small {len(r.content)} bytes for {os.path.basename(dest)}")
            return False
        with open(dest, "wb") as f:
            f.write(r.content)
        return True
    except Exception as e:
        print(f"  error {e} for {os.path.basename(dest)}")
        return False


def main():
    items = load_manifest()
    os.makedirs(OUT_DIR, exist_ok=True)

    total_urls = 0
    for item in items:
        total_urls += 1
        meta = item.get("metadata") or {}
        total_urls += len(meta.get("images") or [])

    print(f"Found {len(items)} prompts with {total_urls} total image URLs.")
    print(f"Images will be saved to ./{OUT_DIR}/")
    print(f"Delay between requests: {DELAY}s")

    done = 0
    ok = 0

    for item in items:
        urls = [("cover", item["coverImage"])]
        meta = item.get("metadata") or {}
        for idx, img_url in enumerate(meta.get("images") or [], start=1):
            if img_url and img_url not in [u[1] for u in urls]:
                urls.append((f"v{idx}", img_url))

        for variant, url in urls:
            if not url:
                continue
            dest = os.path.join(OUT_DIR, filename_for(item, variant, url))
            if os.path.exists(dest):
                ok += 1
                done += 1
                continue

            print(f"[{done+1}/{total_urls}] {os.path.basename(dest)}")
            if download(url, dest):
                ok += 1
            done += 1
            time.sleep(DELAY)

    print(f"\nDone. {ok}/{done} images saved to ./{OUT_DIR}/")


if __name__ == "__main__":
    main()
