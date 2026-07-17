# Subcategory Prompt Batch 8/20

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

- `game-assets-top-down-game-asset` — Game Assets / Top-Down Game Asset

- `game-assets-side-scroller-game-asset` — Game Assets / Side-Scroller Game Asset

- `game-assets-3d-game-asset` — Game Assets / 3D Game Asset

- `game-assets-loot-treasure` — Game Assets / Loot / Treasure

- `game-assets-crafting-material` — Game Assets / Crafting Material

- `game-assets-potion-consumable` — Game Assets / Potion / Consumable

- `game-assets-particle-effect-vfx` — Game Assets / Particle Effect / VFX

- `game-assets-game-scene-level-design` — Game Assets / Game Scene / Level Design

- `game-assets-game-map-world-map` — Game Assets / Game Map / World Map

- `game-assets-menu-loading-screen` — Game Assets / Menu / Loading Screen

- `architecture-environment-exterior-architecture` — Architecture & Environment / Exterior Architecture

- `architecture-environment-interior-architecture` — Architecture & Environment / Interior Architecture

- `architecture-environment-architectural-detail` — Architecture & Environment / Architectural Detail

- `architecture-environment-modern-architecture` — Architecture & Environment / Modern Architecture

- `architecture-environment-vintage-historical-architecture` — Architecture & Environment / Vintage / Historical Architecture

- `architecture-environment-brutalist-architecture` — Architecture & Environment / Brutalist Architecture

- `architecture-environment-futuristic-architecture` — Architecture & Environment / Futuristic Architecture
