# Subcategory Prompt Batch 4/20

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

- `illustration-art-watercolor-painting` — Illustration & Art / Watercolor Painting

- `illustration-art-acrylic-painting` — Illustration & Art / Acrylic Painting

- `illustration-art-gouache-painting` — Illustration & Art / Gouache Painting

- `illustration-art-ink-line-art` — Illustration & Art / Ink / Line Art

- `illustration-art-sketch-pencil-drawing` — Illustration & Art / Sketch / Pencil Drawing

- `illustration-art-charcoal-drawing` — Illustration & Art / Charcoal Drawing

- `illustration-art-pastel-drawing` — Illustration & Art / Pastel Drawing

- `illustration-art-botanical-illustration` — Illustration & Art / Botanical Illustration

- `illustration-art-scientific-medical-illustration` — Illustration & Art / Scientific / Medical Illustration

- `illustration-art-children-s-book-illustration` — Illustration & Art / Children's Book Illustration

- `illustration-art-comic-book-art` — Illustration & Art / Comic Book Art

- `illustration-art-manga-anime` — Illustration & Art / Manga / Anime

- `illustration-art-cartoon-vector-art` — Illustration & Art / Cartoon / Vector Art

- `illustration-art-propaganda-poster` — Illustration & Art / Propaganda Poster

- `illustration-art-retro-vintage-illustration` — Illustration & Art / Retro / Vintage Illustration

- `illustration-art-ukiyo-e-japanese-woodblock` — Illustration & Art / Ukiyo-e / Japanese Woodblock

- `illustration-art-pixel-art` — Illustration & Art / Pixel Art
