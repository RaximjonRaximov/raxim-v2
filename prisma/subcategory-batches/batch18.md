# Subcategory Prompt Batch 18/20

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

- `educational-diagrams-maps-cartography` — Educational & Diagrams / Maps / Cartography

- `educational-diagrams-timeline` — Educational & Diagrams / Timeline

- `educational-diagrams-how-to-process` — Educational & Diagrams / How-To / Process

- `educational-diagrams-educational-poster` — Educational & Diagrams / Educational Poster

- `educational-diagrams-textbook-illustration` — Educational & Diagrams / Textbook Illustration

- `educational-diagrams-instruction-manual` — Educational & Diagrams / Instruction Manual

- `holidays-seasonal-christmas` — Holidays & Seasonal / Christmas

- `holidays-seasonal-halloween` — Holidays & Seasonal / Halloween

- `holidays-seasonal-valentine-s-day` — Holidays & Seasonal / Valentine's Day

- `holidays-seasonal-easter` — Holidays & Seasonal / Easter

- `holidays-seasonal-new-year` — Holidays & Seasonal / New Year

- `holidays-seasonal-thanksgiving` — Holidays & Seasonal / Thanksgiving

- `holidays-seasonal-autumn-fall` — Holidays & Seasonal / Autumn / Fall

- `holidays-seasonal-winter` — Holidays & Seasonal / Winter

- `holidays-seasonal-spring` — Holidays & Seasonal / Spring

- `holidays-seasonal-summer` — Holidays & Seasonal / Summer

- `holidays-seasonal-back-to-school` — Holidays & Seasonal / Back to School
