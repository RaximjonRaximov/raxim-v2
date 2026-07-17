# Subcategory Prompt Batch 14/20

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

- `nature-animals-coral-reef` — Nature & Animals / Coral Reef

- `nature-animals-weather-storm` — Nature & Animals / Weather / Storm

- `nature-animals-seasons` — Nature & Animals / Seasons

- `nature-animals-national-park-wilderness` — Nature & Animals / National Park / Wilderness

- `technology-sci-fi-futuristic-city` — Technology & Sci-Fi / Futuristic City

- `technology-sci-fi-cyberpunk` — Technology & Sci-Fi / Cyberpunk

- `technology-sci-fi-steampunk` — Technology & Sci-Fi / Steampunk

- `technology-sci-fi-space-cosmos` — Technology & Sci-Fi / Space / Cosmos

- `technology-sci-fi-robots-mecha` — Technology & Sci-Fi / Robots / Mecha

- `technology-sci-fi-drones-uav` — Technology & Sci-Fi / Drones / UAV

- `technology-sci-fi-vehicles-spaceships` — Technology & Sci-Fi / Vehicles / Spaceships

- `technology-sci-fi-ai-cyberspace` — Technology & Sci-Fi / AI / Cyberspace

- `technology-sci-fi-holograms-interfaces` — Technology & Sci-Fi / Holograms / Interfaces

- `technology-sci-fi-biotechnology` — Technology & Sci-Fi / Biotechnology

- `technology-sci-fi-retro-futurism` — Technology & Sci-Fi / Retro-Futurism

- `technology-sci-fi-sci-fi-laboratory` — Technology & Sci-Fi / Sci-Fi Laboratory

- `technology-sci-fi-hacker-terminal-aesthetic` — Technology & Sci-Fi / Hacker / Terminal Aesthetic
