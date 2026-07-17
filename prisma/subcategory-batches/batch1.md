# Subcategory Prompt Batch 1/20

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

- `photography-portrait-headshot` — Photography / Portrait / Headshot

- `photography-lifestyle-photography` — Photography / Lifestyle Photography

- `photography-fashion-editorial` — Photography / Fashion Editorial

- `photography-runway-couture` — Photography / Runway / Couture

- `photography-street-style-fashion` — Photography / Street Style Fashion

- `photography-beauty-makeup` — Photography / Beauty & Makeup

- `photography-fine-art-portrait` — Photography / Fine Art Portrait

- `photography-conceptual-surreal-portrait` — Photography / Conceptual / Surreal Portrait

- `photography-black-white-photography` — Photography / Black & White Photography

- `photography-film-noir-cinematic-portrait` — Photography / Film Noir / Cinematic Portrait

- `photography-documentary-street-photography` — Photography / Documentary / Street Photography

- `photography-wedding-photography` — Photography / Wedding Photography

- `photography-newborn-family-photography` — Photography / Newborn / Family Photography

- `photography-boudoir-intimate-portrait` — Photography / Boudoir / Intimate Portrait

- `photography-pet-animal-photography` — Photography / Pet / Animal Photography

- `photography-wildlife-photography` — Photography / Wildlife Photography

- `photography-macro-photography` — Photography / Macro Photography
