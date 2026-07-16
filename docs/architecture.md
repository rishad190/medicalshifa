# Production architecture

## Application boundary

Public marketing pages are statically rendered where possible. Shared copy belongs in `lib/content.ts`, so later D1/CMS content can replace it behind a repository interface without changing the UI. Consultation submissions go through the server route and write only contact-level data to D1; medical documents should use an authenticated R2 upload workflow with short-lived signed URLs.

## Identity and authorisation

Auth.js owns sessions; D1 owns users, account records, verification tokens, and role fields. Roles are `ADMIN`, `STAFF`, and `PATIENT`. A route or server action must check its own authorisation: Proxy is a fast redirect convenience, never the security boundary. Use an Argon2id password hash per user (with unique salt), email-verification tokens, password-reset tokens with expiry, and a database session strategy for revocation. Do not use the present demo credentials provider as a production account system until it is changed to verify the D1 user’s Argon2id hash.

## D1 and schema

`db/schema.sql` is the canonical migration baseline. Apply it with `wrangler d1 execute medical_db --remote --file=db/schema.sql` after replacing the D1 id in `wrangler.toml`. Add a migration per schema change; never edit a migration already applied in production. Encrypt or minimise sensitive data, restrict staff access by role, and set a retention policy for inquiries.

## Cloudflare deployment

Use OpenNext for Cloudflare because the application uses server routes and authentication. Set `DB`, `AUTH_SECRET`, and any mail provider secret with `wrangler secret put`; do not put them in `NEXT_PUBLIC_*` variables. Deploy preview environments to a separate D1 database. Add Cloudflare Turnstile before accepting unauthenticated forms and rate-limit the consultation endpoint (by IP and email) with Workers/Rate Limiting.

## Security release checklist

- HTTPS only; secure, HttpOnly, SameSite cookies and a rotated `AUTH_SECRET`.
- CSP, HSTS, Referrer-Policy, Permissions-Policy, and X-Content-Type-Options headers.
- Server-side Zod validation, output encoding, CSRF validation for mutations, and per-route RBAC.
- Audit logging for staff actions; backups and tested restore procedure for D1.
- No health records in analytics, logs, URL parameters, or initial contact forms.
- Run dependency scanning, `npm run lint`, build, accessibility checks, and route smoke tests in CI.

## Next additions

Multilingual Bangla/English content, a secure patient portal, consented R2 medical-document uploads, a clinician-reviewed second-opinion workflow, online payment links, and a human-supervised multilingual chat assistant.
