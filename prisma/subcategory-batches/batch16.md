# Subcategory Prompt Batch 16/20

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

- `video-cinematic-cinematic-portrait` — Video & Cinematic / Cinematic Portrait

- `video-cinematic-cinematic-landscape` — Video & Cinematic / Cinematic Landscape

- `video-cinematic-drone-shot` — Video & Cinematic / Drone Shot

- `video-cinematic-storyboard` — Video & Cinematic / Storyboard

- `video-cinematic-scene-concept` — Video & Cinematic / Scene Concept

- `video-cinematic-lighting-study` — Video & Cinematic / Lighting Study

- `video-cinematic-color-grading-reference` — Video & Cinematic / Color Grading Reference

- `video-cinematic-film-poster-composition` — Video & Cinematic / Film Poster Composition

- `3d-rendering-3d-character` — 3D & Rendering / 3D Character

- `3d-rendering-3d-environment` — 3D & Rendering / 3D Environment

- `3d-rendering-3d-product-render` — 3D & Rendering / 3D Product Render

- `3d-rendering-3d-typography` — 3D & Rendering / 3D Typography

- `3d-rendering-clay-render` — 3D & Rendering / Clay Render

- `3d-rendering-voxel-art` — 3D & Rendering / Voxel Art

- `3d-rendering-low-poly-art` — 3D & Rendering / Low Poly Art

- `3d-rendering-photorealistic-render` — 3D & Rendering / Photorealistic Render

- `3d-rendering-stylized-render` — 3D & Rendering / Stylized Render
