# Raxim v2 Bulk Prompt Generation Spec

## Goal
For each assigned main category, produce exactly 30 high-quality, reusable AI image prompts. These prompts will be sold in a Next.js prompt marketplace. Each prompt is a single text with changeable variables written inside `[ ]` brackets so users can control the output.

## Output format
Return a JSON array (or use the structured output schema) with one object per prompt:

```json
{
  "categorySlug": "photography",
  "subcategory": "Portrait / Headshot",
  "title": "Cinematic Studio Portrait",
  "aspectRatio": "4:5",
  "reusablePrompt": "A [mood] [subject] portrait in a [color] studio backdrop, lit by [lighting] light, wearing [style] clothing, shot on [camera/lens], shallow depth of field, [angle] composition, [detail] skin texture, color graded [mood], high-end editorial photography",
  "filledImagePrompt": "A confident fashion model portrait in a muted sage green studio backdrop, lit by soft window light, wearing an oversized camel coat, shot on a Hasselblad 90mm lens, shallow depth of field, centered composition, natural skin texture, color graded warm and calm, high-end editorial photography"
}
```

### Field rules
- `categorySlug`: use the exact slug from the category list below.
- `subcategory`: pick the most fitting subcategory title (or leave empty if you want a category-wide prompt).
- `title`: short, catchy, 2-5 words, no markdown.
- `aspectRatio`: one of `1:1`, `4:3`, `3:2`, `16:9`, `9:16`, `4:5`, `2:3`, `21:9`.
- `reusablePrompt`: single English sentence/paragraph. Must include at least 3 `[variable]` placeholders. Use only these common variable names: `[subject]`, `[color]`, `[style]`, `[mood]`, `[setting]`, `[lighting]`, `[angle]`, `[composition]`, `[medium]`, `[detail]`, `[texture]`, `[era]`, `[location]`, `[time]`, `[props]`, `[camera]`, `[format]`.
- `filledImagePrompt`: a concrete, fully specified English prompt. Replace every `[variable]` from `reusablePrompt` with a vivid example. Do NOT use `[]` brackets here. This is the prompt used to generate the preview image.

## Quality rules
- Prompts should be realistic, useful, and high-quality.
- Avoid brand names, copyrighted characters, or trademarks. Use generic, descriptive terms.
- Keep prompts reusable: the `[ ]` parts must be the obvious knobs a user would change.
- Cover a variety of subcategories/uses inside the assigned category so the 30 prompts are not repetitive.

## Category list

### Photography (slug: `photography`)
- Portrait / Headshot
- Lifestyle Photography
- Fashion Editorial
- Runway / Couture
- Street Style Fashion
- Beauty & Makeup
- Fine Art Portrait
- Conceptual / Surreal Portrait
- Black & White Photography
- Film Noir / Cinematic Portrait
- Documentary / Street Photography
- Wedding Photography
- Newborn / Family Photography
- Boudoir / Intimate Portrait
- Pet / Animal Photography
- Wildlife Photography
- Macro Photography
- Food Photography
- Drink / Beverage Photography
- Travel / Adventure Photography
- Landscape / Nature Photography
- Seascape / Beach Photography
- Astrophotography
- Aerial / Drone Photography
- Underwater Photography
- Architecture Photography
- Interior Photography
- Real Estate Photography
- Automotive / Car Photography
- Product Photography
- E-commerce Photography
- Flat Lay / Styling
- Event Photography
- Sports Photography
- Concert / Music Photography
- Behind the Scenes / Workspace
- Seasonal / Holiday Photography

### Illustration & Art (slug: `illustration-art`)
- Digital Painting
- Concept Art
- Character Design
- Fantasy Art
- Sci-Fi / Futuristic Art
- Abstract Art
- Minimalist Art
- Geometric Art
- Surrealism
- Pop Art
- Art Deco
- Art Nouveau
- Impressionism
- Oil Painting
- Watercolor Painting
- Acrylic Painting
- Gouache Painting
- Ink / Line Art
- Sketch / Pencil Drawing
- Charcoal Drawing
- Pastel Drawing
- Botanical Illustration
- Scientific / Medical Illustration
- Children's Book Illustration
- Comic Book Art
- Manga / Anime
- Cartoon / Vector Art
- Propaganda Poster
- Retro / Vintage Illustration
- Ukiyo-e / Japanese Woodblock
- Pixel Art
- Graffiti / Street Art

### Design & Graphics (slug: `design-graphics`)
- Logo Design
- Brand Identity / Branding
- Typography / Lettering
- Poster Design
- Flyer / Brochure Design
- Editorial / Magazine Layout
- Social Media Graphics
- UI / UX Mockup
- App Screenshot / Device Mockup
- Website / Landing Page Visual
- Icon Design
- Infographic
- Diagram / Chart
- Pattern / Texture
- Wallpaper Design
- Packaging Design
- Stationery / Business Card
- T-shirt / Merchandise Design
- Sticker / Emoji / Badge
- 3D Render
- Isometric Illustration
- Wireframe / Blueprint
- Mockup Scene
- Collage / Mixed Media

### Characters & People (slug: `characters-people`)
- Character Design
- Character Turnaround / Reference Sheet
- Game Character Sprite Sheet
- Avatar / Profile Picture
- 3D Character
- Stylized Character
- Realistic Character
- Anthropomorphic Character
- NPC / Crowd Character
- Emotes / Expressions
- Costume Design
- Fashion Model
- Superhero / Villain
- Historical Figure
- Fantasy Races
- Cyborg / Android
- Zombie / Monster
- Cartoon Mascot

### Game Assets (slug: `game-assets`)
- Game Character Sprite Sheet
- Game Item / Inventory Icon
- Weapon / Equipment
- Vehicle / Transport
- Environment / Tileset
- Background / Parallax
- UI / HUD Element
- Isometric Building
- Top-Down Game Asset
- Side-Scroller Game Asset
- 3D Game Asset
- Loot / Treasure
- Crafting Material
- Potion / Consumable
- Particle Effect / VFX
- Game Scene / Level Design
- Game Map / World Map
- Menu / Loading Screen

### Architecture & Environment (slug: `architecture-environment`)
- Exterior Architecture
- Interior Architecture
- Architectural Detail
- Modern Architecture
- Vintage / Historical Architecture
- Brutalist Architecture
- Futuristic Architecture
- Urban / Street Scene
- Cityscape / Skyline
- Landscape / Nature
- Fantasy Environment
- Sci-Fi Environment
- Post-Apocalyptic Environment
- Medieval / Castle Environment
- Desert Environment
- Forest / Jungle Environment
- Arctic / Snow Environment
- Underwater Environment
- Environment Design
- Matte Painting

### Fashion & Beauty (slug: `fashion-beauty`)
- Fashion Editorial
- Runway / Couture
- Street Style
- Lookbook
- Accessories / Jewelry
- Beauty / Makeup
- Skincare Product
- Hair Style
- Nail Art
- Vintage Fashion
- Swimwear
- Lingerie
- Activewear / Athleisure
- Formal Wear / Evening Gown
- Menswear / Suiting

### Product & Commercial (slug: `product-commercial`)
- Product Photography
- E-commerce Product
- Cosmetics Product
- Tech / Gadget Product
- Food / Beverage Product
- Apparel Product
- Packaging Shot
- Commercial Advertising
- Hero Shot
- Flat Lay
- 3D Product Render
- Catalog / Lookbook
- Lifestyle Product
- Studio Product

### Social Media Content (slug: `social-media-content`)
- Instagram Post / Carousel
- Instagram Story / Reel Cover
- Threads Post Visual
- Quote Card / Motivational
- Meme / Reaction Image
- Aesthetic / Moodboard
- Behind the Scenes
- Travel / Lifestyle
- Food / Recipe
- Fitness / Wellness
- Pet Content
- Seasonal / Holiday
- Personal Brand / Portrait
- Minimalist Brand Aesthetic
- Educational / Infographic
- Tech / App Showcase
- Sustainability / Eco-Friendly
- User-Generated Content Style

### Abstract & Conceptual (slug: `abstract-conceptual`)
- Abstract Photography
- Abstract Painting
- Generative Art
- Fractal Art
- Data Visualization Art
- Surreal Composition
- Dreamlike / Ethereal
- Minimal / Monochrome
- Concept Art
- Symbolic / Allegorical
- Optical Illusion
- Psychedelic Art

### Nature & Animals (slug: `nature-animals`)
- Landscape
- Mountain / Forest
- Desert / Tundra
- Seascape / Beach
- Sunset / Sunrise
- Flowers / Botanical
- Trees / Plants
- Wildlife
- Birds
- Insects / Macro
- Pets
- Farm Animals
- Underwater Life
- Coral Reef
- Weather / Storm
- Seasons
- National Park / Wilderness

### Technology & Sci-Fi (slug: `technology-sci-fi`)
- Futuristic City
- Cyberpunk
- Steampunk
- Space / Cosmos
- Robots / Mecha
- Drones / UAV
- Vehicles / Spaceships
- AI / Cyberspace
- Holograms / Interfaces
- Biotechnology
- Retro-Futurism
- Sci-Fi Laboratory
- Hacker / Terminal Aesthetic

### Vintage & Retro (slug: `vintage-retro`)
- Vintage Photography
- Retro Illustration
- Polaroid / Instant Film
- Analog / 35mm Film
- 80s Aesthetic
- 90s Aesthetic
- 70s Hippie / Disco
- 60s Mod / Psychedelic
- 50s Mid-Century
- 40s Film Noir
- 20s Art Deco
- Victorian / Edwardian
- Pin-up Art
- Retro Futurism

### Video & Cinematic (slug: `video-cinematic`)
- Movie Still / Film Look
- Music Video Still
- Documentary Style
- Cinematic Portrait
- Cinematic Landscape
- Drone Shot
- Storyboard
- Scene Concept
- Lighting Study
- Color Grading Reference
- Film Poster Composition

### 3D & Rendering (slug: `3d-rendering`)
- 3D Character
- 3D Environment
- 3D Product Render
- 3D Typography
- Clay Render
- Voxel Art
- Low Poly Art
- Photorealistic Render
- Stylized Render
- Isometric 3D
- Motion Graphics Still
- NFT / Digital Collectible Style

### Textiles & Patterns (slug: `textiles-patterns`)
- Fabric / Textile Design
- Wallpaper / Surface Pattern
- Tile / Mosaic
- Embroidery / Cross-Stitch
- Knitting / Crochet
- Rug / Carpet Design
- Fashion Print
- Batik / Ikat
- Lace / Macramé
- Quilt / Patchwork

### Educational & Diagrams (slug: `educational-diagrams`)
- Infographic
- Diagram / Chart
- Scientific Illustration
- Anatomy / Medical
- Maps / Cartography
- Timeline
- How-To / Process
- Educational Poster
- Textbook Illustration
- Instruction Manual

### Holidays & Seasonal (slug: `holidays-seasonal`)
- Christmas
- Halloween
- Valentine's Day
- Easter
- New Year
- Thanksgiving
- Autumn / Fall
- Winter
- Spring
- Summer
- Back to School
- Birthday / Celebration
- Wedding / Anniversary

### Music & Entertainment (slug: `music-entertainment`)
- Album Cover
- Concert Poster
- Music Artist Portrait
- Festival / Event
- Book Cover
- Movie Poster
- Podcast Cover
- Gaming Stream Overlay
- Stage Design
- Merchandise Art

### Marketing & Advertising (slug: `marketing-advertising`)
- Ad Creative
- Banner / Billboard
- Email Header
- Landing Page Visual
- Sales / Promo Graphic
- Testimonial / Review Card
- Case Study Visual
- Social Proof Graphic
- Lead Magnet Cover
- Coupon / Voucher Design
