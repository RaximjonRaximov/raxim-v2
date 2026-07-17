# Subcategory Prompt Batch 11/20

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

- `product-commercial-packaging-shot` — Product & Commercial / Packaging Shot

- `product-commercial-commercial-advertising` — Product & Commercial / Commercial Advertising

- `product-commercial-hero-shot` — Product & Commercial / Hero Shot

- `product-commercial-flat-lay` — Product & Commercial / Flat Lay

- `product-commercial-3d-product-render` — Product & Commercial / 3D Product Render

- `product-commercial-catalog-lookbook` — Product & Commercial / Catalog / Lookbook

- `product-commercial-lifestyle-product` — Product & Commercial / Lifestyle Product

- `product-commercial-studio-product` — Product & Commercial / Studio Product

- `social-media-content-instagram-post-carousel` — Social Media Content / Instagram Post / Carousel

- `social-media-content-instagram-story-reel-cover` — Social Media Content / Instagram Story / Reel Cover

- `social-media-content-threads-post-visual` — Social Media Content / Threads Post Visual

- `social-media-content-quote-card-motivational` — Social Media Content / Quote Card / Motivational

- `social-media-content-meme-reaction-image` — Social Media Content / Meme / Reaction Image

- `social-media-content-aesthetic-moodboard` — Social Media Content / Aesthetic / Moodboard

- `social-media-content-behind-the-scenes` — Social Media Content / Behind the Scenes

- `social-media-content-travel-lifestyle` — Social Media Content / Travel / Lifestyle

- `social-media-content-food-recipe` — Social Media Content / Food / Recipe
