# Subcategory Prompt Batch 13/20

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

- `abstract-conceptual-concept-art` — Abstract & Conceptual / Concept Art

- `abstract-conceptual-symbolic-allegorical` — Abstract & Conceptual / Symbolic / Allegorical

- `abstract-conceptual-optical-illusion` — Abstract & Conceptual / Optical Illusion

- `abstract-conceptual-psychedelic-art` — Abstract & Conceptual / Psychedelic Art

- `nature-animals-landscape` — Nature & Animals / Landscape

- `nature-animals-mountain-forest` — Nature & Animals / Mountain / Forest

- `nature-animals-desert-tundra` — Nature & Animals / Desert / Tundra

- `nature-animals-seascape-beach` — Nature & Animals / Seascape / Beach

- `nature-animals-sunset-sunrise` — Nature & Animals / Sunset / Sunrise

- `nature-animals-flowers-botanical` — Nature & Animals / Flowers / Botanical

- `nature-animals-trees-plants` — Nature & Animals / Trees / Plants

- `nature-animals-wildlife` — Nature & Animals / Wildlife

- `nature-animals-birds` — Nature & Animals / Birds

- `nature-animals-insects-macro` — Nature & Animals / Insects / Macro

- `nature-animals-pets` — Nature & Animals / Pets

- `nature-animals-farm-animals` — Nature & Animals / Farm Animals

- `nature-animals-underwater-life` — Nature & Animals / Underwater Life
