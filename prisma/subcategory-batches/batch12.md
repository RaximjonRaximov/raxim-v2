# Subcategory Prompt Batch 12/20

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

- `social-media-content-fitness-wellness` — Social Media Content / Fitness / Wellness

- `social-media-content-pet-content` — Social Media Content / Pet Content

- `social-media-content-seasonal-holiday` — Social Media Content / Seasonal / Holiday

- `social-media-content-personal-brand-portrait` — Social Media Content / Personal Brand / Portrait

- `social-media-content-minimalist-brand-aesthetic` — Social Media Content / Minimalist Brand Aesthetic

- `social-media-content-educational-infographic` — Social Media Content / Educational / Infographic

- `social-media-content-tech-app-showcase` — Social Media Content / Tech / App Showcase

- `social-media-content-sustainability-eco-friendly` — Social Media Content / Sustainability / Eco-Friendly

- `social-media-content-user-generated-content-style` — Social Media Content / User-Generated Content Style

- `abstract-conceptual-abstract-photography` — Abstract & Conceptual / Abstract Photography

- `abstract-conceptual-abstract-painting` — Abstract & Conceptual / Abstract Painting

- `abstract-conceptual-generative-art` — Abstract & Conceptual / Generative Art

- `abstract-conceptual-fractal-art` — Abstract & Conceptual / Fractal Art

- `abstract-conceptual-data-visualization-art` — Abstract & Conceptual / Data Visualization Art

- `abstract-conceptual-surreal-composition` — Abstract & Conceptual / Surreal Composition

- `abstract-conceptual-dreamlike-ethereal` — Abstract & Conceptual / Dreamlike / Ethereal

- `abstract-conceptual-minimal-monochrome` — Abstract & Conceptual / Minimal / Monochrome
