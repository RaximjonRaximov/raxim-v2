# Subcategory Prompt Batch 10/20

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

- `fashion-beauty-accessories-jewelry` — Fashion & Beauty / Accessories / Jewelry

- `fashion-beauty-beauty-makeup` — Fashion & Beauty / Beauty / Makeup

- `fashion-beauty-skincare-product` — Fashion & Beauty / Skincare Product

- `fashion-beauty-hair-style` — Fashion & Beauty / Hair Style

- `fashion-beauty-nail-art` — Fashion & Beauty / Nail Art

- `fashion-beauty-vintage-fashion` — Fashion & Beauty / Vintage Fashion

- `fashion-beauty-swimwear` — Fashion & Beauty / Swimwear

- `fashion-beauty-lingerie` — Fashion & Beauty / Lingerie

- `fashion-beauty-activewear-athleisure` — Fashion & Beauty / Activewear / Athleisure

- `fashion-beauty-formal-wear-evening-gown` — Fashion & Beauty / Formal Wear / Evening Gown

- `fashion-beauty-menswear-suiting` — Fashion & Beauty / Menswear / Suiting

- `product-commercial-product-photography` — Product & Commercial / Product Photography

- `product-commercial-e-commerce-product` — Product & Commercial / E-commerce Product

- `product-commercial-cosmetics-product` — Product & Commercial / Cosmetics Product

- `product-commercial-tech-gadget-product` — Product & Commercial / Tech / Gadget Product

- `product-commercial-food-beverage-product` — Product & Commercial / Food / Beverage Product

- `product-commercial-apparel-product` — Product & Commercial / Apparel Product
