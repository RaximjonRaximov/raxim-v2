# Subcategory Prompt Batch 9/20

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

- `architecture-environment-urban-street-scene` — Architecture & Environment / Urban / Street Scene

- `architecture-environment-cityscape-skyline` — Architecture & Environment / Cityscape / Skyline

- `architecture-environment-landscape-nature` — Architecture & Environment / Landscape / Nature

- `architecture-environment-fantasy-environment` — Architecture & Environment / Fantasy Environment

- `architecture-environment-sci-fi-environment` — Architecture & Environment / Sci-Fi Environment

- `architecture-environment-post-apocalyptic-environment` — Architecture & Environment / Post-Apocalyptic Environment

- `architecture-environment-medieval-castle-environment` — Architecture & Environment / Medieval / Castle Environment

- `architecture-environment-desert-environment` — Architecture & Environment / Desert Environment

- `architecture-environment-forest-jungle-environment` — Architecture & Environment / Forest / Jungle Environment

- `architecture-environment-arctic-snow-environment` — Architecture & Environment / Arctic / Snow Environment

- `architecture-environment-underwater-environment` — Architecture & Environment / Underwater Environment

- `architecture-environment-environment-design` — Architecture & Environment / Environment Design

- `architecture-environment-matte-painting` — Architecture & Environment / Matte Painting

- `fashion-beauty-fashion-editorial` — Fashion & Beauty / Fashion Editorial

- `fashion-beauty-runway-couture` — Fashion & Beauty / Runway / Couture

- `fashion-beauty-street-style` — Fashion & Beauty / Street Style

- `fashion-beauty-lookbook` — Fashion & Beauty / Lookbook
