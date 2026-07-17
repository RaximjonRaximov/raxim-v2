# Subcategory Prompt Batch 2/20

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

- `photography-food-photography` — Photography / Food Photography

- `photography-drink-beverage-photography` — Photography / Drink / Beverage Photography

- `photography-travel-adventure-photography` — Photography / Travel / Adventure Photography

- `photography-landscape-nature-photography` — Photography / Landscape / Nature Photography

- `photography-seascape-beach-photography` — Photography / Seascape / Beach Photography

- `photography-astrophotography` — Photography / Astrophotography

- `photography-aerial-drone-photography` — Photography / Aerial / Drone Photography

- `photography-underwater-photography` — Photography / Underwater Photography

- `photography-architecture-photography` — Photography / Architecture Photography

- `photography-interior-photography` — Photography / Interior Photography

- `photography-real-estate-photography` — Photography / Real Estate Photography

- `photography-automotive-car-photography` — Photography / Automotive / Car Photography

- `photography-product-photography` — Photography / Product Photography

- `photography-e-commerce-photography` — Photography / E-commerce Photography

- `photography-flat-lay-styling` — Photography / Flat Lay / Styling

- `photography-event-photography` — Photography / Event Photography

- `photography-sports-photography` — Photography / Sports Photography
