# Subcategory Prompt Batch 15/20

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

- `vintage-retro-vintage-photography` — Vintage & Retro / Vintage Photography

- `vintage-retro-retro-illustration` — Vintage & Retro / Retro Illustration

- `vintage-retro-polaroid-instant-film` — Vintage & Retro / Polaroid / Instant Film

- `vintage-retro-analog-35mm-film` — Vintage & Retro / Analog / 35mm Film

- `vintage-retro-80s-aesthetic` — Vintage & Retro / 80s Aesthetic

- `vintage-retro-90s-aesthetic` — Vintage & Retro / 90s Aesthetic

- `vintage-retro-70s-hippie-disco` — Vintage & Retro / 70s Hippie / Disco

- `vintage-retro-60s-mod-psychedelic` — Vintage & Retro / 60s Mod / Psychedelic

- `vintage-retro-50s-mid-century` — Vintage & Retro / 50s Mid-Century

- `vintage-retro-40s-film-noir` — Vintage & Retro / 40s Film Noir

- `vintage-retro-20s-art-deco` — Vintage & Retro / 20s Art Deco

- `vintage-retro-victorian-edwardian` — Vintage & Retro / Victorian / Edwardian

- `vintage-retro-pin-up-art` — Vintage & Retro / Pin-up Art

- `vintage-retro-retro-futurism` — Vintage & Retro / Retro Futurism

- `video-cinematic-movie-still-film-look` — Video & Cinematic / Movie Still / Film Look

- `video-cinematic-music-video-still` — Video & Cinematic / Music Video Still

- `video-cinematic-documentary-style` — Video & Cinematic / Documentary Style
