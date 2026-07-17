# Subcategory Prompt Batch 3/20

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

- `photography-concert-music-photography` — Photography / Concert / Music Photography

- `photography-behind-the-scenes-workspace` — Photography / Behind the Scenes / Workspace

- `photography-seasonal-holiday-photography` — Photography / Seasonal / Holiday Photography

- `illustration-art-digital-painting` — Illustration & Art / Digital Painting

- `illustration-art-concept-art` — Illustration & Art / Concept Art

- `illustration-art-character-design` — Illustration & Art / Character Design

- `illustration-art-fantasy-art` — Illustration & Art / Fantasy Art

- `illustration-art-sci-fi-futuristic-art` — Illustration & Art / Sci-Fi / Futuristic Art

- `illustration-art-abstract-art` — Illustration & Art / Abstract Art

- `illustration-art-minimalist-art` — Illustration & Art / Minimalist Art

- `illustration-art-geometric-art` — Illustration & Art / Geometric Art

- `illustration-art-surrealism` — Illustration & Art / Surrealism

- `illustration-art-pop-art` — Illustration & Art / Pop Art

- `illustration-art-art-deco` — Illustration & Art / Art Deco

- `illustration-art-art-nouveau` — Illustration & Art / Art Nouveau

- `illustration-art-impressionism` — Illustration & Art / Impressionism

- `illustration-art-oil-painting` — Illustration & Art / Oil Painting
