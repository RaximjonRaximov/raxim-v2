# Raxim v2

Full-stack rebuild of the Raxim storefront — an AI visual designer shop selling prompt packs and video courses.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS 3 + custom design tokens
- Prisma + PostgreSQL
- Auth.js v5 (email/password)
- Stripe Checkout + webhooks
- Cloudflare R2 (signed URLs)
- Resend (transactional email)

## Getting started

1. Copy `.env.example` to `.env.local` and fill in the values.
2. Run `npm install`.
3. Run `npx prisma migrate dev` to apply the schema.
4. Run `npm run db:seed` to seed products and the admin user.
5. Run `npm run dev` and open `http://localhost:3000`.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
- `npm run db:migrate` — Prisma migrate
- `npm run db:seed` — seed the database

## Admin access

Seed creates an admin user:

- Email: `admin@raxim.design`
- Password: `admin123`

## Structure

- `src/app/` — Next.js App Router pages
- `src/actions/` — Server Actions
- `src/components/` — React components
- `src/lib/` — helpers and clients
- `prisma/` — schema and seed

## License

Proprietary — Raxim.
