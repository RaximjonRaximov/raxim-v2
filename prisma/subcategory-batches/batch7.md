# Subcategory Prompt Batch 7/20

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

- `characters-people-emotes-expressions` — Characters & People / Emotes / Expressions

- `characters-people-costume-design` — Characters & People / Costume Design

- `characters-people-fashion-model` — Characters & People / Fashion Model

- `characters-people-superhero-villain` — Characters & People / Superhero / Villain

- `characters-people-historical-figure` — Characters & People / Historical Figure

- `characters-people-fantasy-races` — Characters & People / Fantasy Races

- `characters-people-cyborg-android` — Characters & People / Cyborg / Android

- `characters-people-zombie-monster` — Characters & People / Zombie / Monster

- `characters-people-cartoon-mascot` — Characters & People / Cartoon Mascot

- `game-assets-game-character-sprite-sheet` — Game Assets / Game Character Sprite Sheet

- `game-assets-game-item-inventory-icon` — Game Assets / Game Item / Inventory Icon

- `game-assets-weapon-equipment` — Game Assets / Weapon / Equipment

- `game-assets-vehicle-transport` — Game Assets / Vehicle / Transport

- `game-assets-environment-tileset` — Game Assets / Environment / Tileset

- `game-assets-background-parallax` — Game Assets / Background / Parallax

- `game-assets-ui-hud-element` — Game Assets / UI / HUD Element

- `game-assets-isometric-building` — Game Assets / Isometric Building
