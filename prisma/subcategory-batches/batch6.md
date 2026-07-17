# Subcategory Prompt Batch 6/20

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

- `design-graphics-stationery-business-card` — Design & Graphics / Stationery / Business Card

- `design-graphics-t-shirt-merchandise-design` — Design & Graphics / T-shirt / Merchandise Design

- `design-graphics-sticker-emoji-badge` — Design & Graphics / Sticker / Emoji / Badge

- `design-graphics-3d-render` — Design & Graphics / 3D Render

- `design-graphics-isometric-illustration` — Design & Graphics / Isometric Illustration

- `design-graphics-wireframe-blueprint` — Design & Graphics / Wireframe / Blueprint

- `design-graphics-mockup-scene` — Design & Graphics / Mockup Scene

- `design-graphics-collage-mixed-media` — Design & Graphics / Collage / Mixed Media

- `characters-people-character-design` — Characters & People / Character Design

- `characters-people-character-turnaround-reference-sheet` — Characters & People / Character Turnaround / Reference Sheet

- `characters-people-game-character-sprite-sheet` — Characters & People / Game Character Sprite Sheet

- `characters-people-avatar-profile-picture` — Characters & People / Avatar / Profile Picture

- `characters-people-3d-character` — Characters & People / 3D Character

- `characters-people-stylized-character` — Characters & People / Stylized Character

- `characters-people-realistic-character` — Characters & People / Realistic Character

- `characters-people-anthropomorphic-character` — Characters & People / Anthropomorphic Character

- `characters-people-npc-crowd-character` — Characters & People / NPC / Crowd Character
