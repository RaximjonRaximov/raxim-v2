# Subcategory Prompt Batch 5/20

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

- `illustration-art-graffiti-street-art` — Illustration & Art / Graffiti / Street Art

- `design-graphics-logo-design` — Design & Graphics / Logo Design

- `design-graphics-brand-identity-branding` — Design & Graphics / Brand Identity / Branding

- `design-graphics-typography-lettering` — Design & Graphics / Typography / Lettering

- `design-graphics-poster-design` — Design & Graphics / Poster Design

- `design-graphics-flyer-brochure-design` — Design & Graphics / Flyer / Brochure Design

- `design-graphics-editorial-magazine-layout` — Design & Graphics / Editorial / Magazine Layout

- `design-graphics-social-media-graphics` — Design & Graphics / Social Media Graphics

- `design-graphics-ui-ux-mockup` — Design & Graphics / UI / UX Mockup

- `design-graphics-app-screenshot-device-mockup` — Design & Graphics / App Screenshot / Device Mockup

- `design-graphics-website-landing-page-visual` — Design & Graphics / Website / Landing Page Visual

- `design-graphics-icon-design` — Design & Graphics / Icon Design

- `design-graphics-infographic` — Design & Graphics / Infographic

- `design-graphics-diagram-chart` — Design & Graphics / Diagram / Chart

- `design-graphics-pattern-texture` — Design & Graphics / Pattern / Texture

- `design-graphics-wallpaper-design` — Design & Graphics / Wallpaper Design

- `design-graphics-packaging-design` — Design & Graphics / Packaging Design
