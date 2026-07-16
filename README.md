# Shifa Global Care

A Next.js App Router website for Shifa Global Care Solution Limited, built for international patient coordination and medical tourism to India.

## Local development

1. Copy `.env.example` to `.env.local` and set `AUTH_SECRET`.
2. Run `npm run dev`.
3. Open `http://localhost:3000`.

Use `npm run lint` and `npm run build` before release.

## Application map

- `app/` — App Router pages and API routes.
- `components/` — shared navigation, footer, and consultation dialog.
- `lib/content.ts` — reusable public-facing company content.
- `db/schema.sql` — canonical D1 schema baseline.
- `docs/architecture.md` — Cloudflare, authentication, security, and future-roadmap decisions.

## Cloudflare release

1. Create a D1 database, then add its id to `wrangler.toml`.
2. Apply the baseline: `wrangler d1 execute medical_db --remote --file=db/schema.sql`.
3. Set `AUTH_SECRET` and mail-provider credentials with `wrangler secret put`.
4. Use an OpenNext-compatible Cloudflare build/deploy pipeline; keep production and preview D1 databases separate.
5. Enable Turnstile and rate limiting on public submission endpoints before accepting live traffic.

See [the architecture guide](docs/architecture.md) for authentication and security requirements. The account credentials provider included in the starter must be migrated to D1-backed Argon2id verification, verified email flows, and reset tokens before a production launch.
