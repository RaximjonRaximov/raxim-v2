# Subcategory Prompt Batch 17/20

For each subcategory listed below, generate exactly 30 reusable AI image prompts.

## Output format
Return JSON with a top-level key `prompts` that is an array of objects:
```json
{
  "categorySlug": "photography",
  "subcategoryTitle": "Portrait / Headshot",
  "title": "Cinematic Studio Portrait",
  "aspectRatio": "4:5",
  "reusablePrompt": "A [mood] [subject] portrait against a [color] studio backdrop, lit by [lighting], wearing [style] clothing, shot on [camera], shallow depth of field, [angle] composition, [detail] skin texture, high-end editorial photography",
  "filledImagePrompt": "A confident businesswoman portrait against a muted charcoal studio backdrop, lit by soft key light with a subtle rim, wearing a tailored navy blazer, shot on an 85mm prime lens, shallow depth of field, chest-up frontal composition, natural pore-level skin texture, high-end editorial photography"
}
```

Rules:
- Use at least 3 `[variable]` placeholders in every `reusablePrompt`.
- `filledImagePrompt` must be concrete, bracket-free, and used for the preview image.
- `aspectRatio` one of: 1:1, 4:3, 3:2, 16:9, 9:16, 4:5, 2:3, 21:9.
- Avoid brand names, copyrighted characters, or trademarks.
- Research current Instagram/Threads/Midjourney/Flux/DALL-E prompt styles for each subcategory online.

## Your batch (17 subcategories)

- `3d-rendering-isometric-3d` — 3D & Rendering / Isometric 3D

- `3d-rendering-motion-graphics-still` — 3D & Rendering / Motion Graphics Still

- `3d-rendering-nft-digital-collectible-style` — 3D & Rendering / NFT / Digital Collectible Style

- `textiles-patterns-fabric-textile-design` — Textiles & Patterns / Fabric / Textile Design

- `textiles-patterns-wallpaper-surface-pattern` — Textiles & Patterns / Wallpaper / Surface Pattern

- `textiles-patterns-tile-mosaic` — Textiles & Patterns / Tile / Mosaic

- `textiles-patterns-embroidery-cross-stitch` — Textiles & Patterns / Embroidery / Cross-Stitch

- `textiles-patterns-knitting-crochet` — Textiles & Patterns / Knitting / Crochet

- `textiles-patterns-rug-carpet-design` — Textiles & Patterns / Rug / Carpet Design

- `textiles-patterns-fashion-print` — Textiles & Patterns / Fashion Print

- `textiles-patterns-batik-ikat` — Textiles & Patterns / Batik / Ikat

- `textiles-patterns-lace-macram` — Textiles & Patterns / Lace / Macramé

- `textiles-patterns-quilt-patchwork` — Textiles & Patterns / Quilt / Patchwork

- `educational-diagrams-infographic` — Educational & Diagrams / Infographic

- `educational-diagrams-diagram-chart` — Educational & Diagrams / Diagram / Chart

- `educational-diagrams-scientific-illustration` — Educational & Diagrams / Scientific Illustration

- `educational-diagrams-anatomy-medical` — Educational & Diagrams / Anatomy / Medical
