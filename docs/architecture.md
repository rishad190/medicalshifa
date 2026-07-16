# Architecture overview

## Goals

- Deliver a premium healthcare website with reusable content and strong SEO.
- Support secure admin access for content and operations.
- Prepare the project for Cloudflare Pages and Cloudflare D1 deployment.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Auth.js with Credentials provider
- Cloudflare D1 + D1 adapter
- Cloudflare Pages deployment

## Content structure

- Shared content lives in lib/content.ts.
- Public pages consume that content for services, treatments, hospitals, doctors, FAQs, and testimonials.
- Admin content routes can be used to manage dynamic content later.

## Authentication design

- Credentials-based sign-in with server-side session management.
- Passwords are verified using SHA-256 hashes stored in environment variables.
- Admin-only routes are protected by role checks on the content API.

## Deployment notes

1. Create a Cloudflare D1 database and populate the schema.
2. Set Auth.js environment variables in Cloudflare Pages.
3. Configure the wrangler.toml database binding.
4. Build with next build and deploy through Cloudflare Pages or Wrangler.
