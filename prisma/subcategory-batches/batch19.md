# Subcategory Prompt Batch 19/20

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

- `holidays-seasonal-birthday-celebration` — Holidays & Seasonal / Birthday / Celebration

- `holidays-seasonal-wedding-anniversary` — Holidays & Seasonal / Wedding / Anniversary

- `music-entertainment-album-cover` — Music & Entertainment / Album Cover

- `music-entertainment-concert-poster` — Music & Entertainment / Concert Poster

- `music-entertainment-music-artist-portrait` — Music & Entertainment / Music Artist Portrait

- `music-entertainment-festival-event` — Music & Entertainment / Festival / Event

- `music-entertainment-book-cover` — Music & Entertainment / Book Cover

- `music-entertainment-movie-poster` — Music & Entertainment / Movie Poster

- `music-entertainment-podcast-cover` — Music & Entertainment / Podcast Cover

- `music-entertainment-gaming-stream-overlay` — Music & Entertainment / Gaming Stream Overlay

- `music-entertainment-stage-design` — Music & Entertainment / Stage Design

- `music-entertainment-merchandise-art` — Music & Entertainment / Merchandise Art

- `marketing-advertising-ad-creative` — Marketing & Advertising / Ad Creative

- `marketing-advertising-banner-billboard` — Marketing & Advertising / Banner / Billboard

- `marketing-advertising-email-header` — Marketing & Advertising / Email Header

- `marketing-advertising-landing-page-visual` — Marketing & Advertising / Landing Page Visual

- `marketing-advertising-sales-promo-graphic` — Marketing & Advertising / Sales / Promo Graphic
