# CreatorOS

CreatorOS is an agentic growth operating system that turns a single offer into a predictable content-to-calls pipeline. This repository holds the MVP implementation across four phases (Onboarding → Content → Conversion → Analytics) plus all the governance docs (spec, contracts, done checklist).

## What’s here
- `app/` — Next.js app with landing pages for each phase plus API routes (`/api/strategist`, `/api/content`, `/api/conversion`, `/api/analytics`, `/api/safety`).
- `lib/` — Core helpers (strategist, writer, repurposer, conversion, analytics, safety) that follow the strict JSON contracts.
- `CREATOR_OS_SPEC.md`, `PHASE_PLAN.md`, `PROMPT_CONTRACTS.md`, `DONE_CHECKLIST.md` — Product definition, roadmap, agent contracts, and ship gate checklist.

## Tech stack
- **Frontend**: Next.js 15.5.13 (app router), Tailwind + custom terminal-inspired styling.
- **Backend**: Next API routes (no separate server) for strategy, content, conversion, analytics, safety.
- **Data storage**: In-memory stores (`lib/*-store.ts`) to simplify the MVP.
- **Agent contracts**: All endpoint responses strictly follow the PROMPT_CONTRACTS schemas.
- **Build tools**: Node 20+, npm, TypeScript, ESLint (via Next build), `next build` runs lint + type checks.

## Development setup
1. **Prerequisites**: Node 20+ (>= 20.0), npm, Git.
2. **Install**
   ```bash
   cd ~/Documents/GitHub/CreatorOS
   npm install
   ```
3. **Run locally**
   ```bash
   npm run dev
   ```
   This starts the Next.js dev server (default port 3000). Visit `http://localhost:3000` to run Phase 1–4 flows.
4. **Build**
   ```bash
   npm run build
   ```
   Ensures the entire stack compiles, typescript checks, and generates production artifacts.

## Execution roadmap
Follow the phases in order. Each phase should be committed separately and satisfy the `DONE_CHECKLIST.md` before moving on.
1. **Phase 1** (Onboarding + Strategist): `GET`/`POST /api/strategist`, plus `app/page.tsx`. Users submit onboarding data and receive positioning/pillars/CTA JSON.
2. **Phase 2** (Content Engine): `/api/content` calls `lib/writer.ts` + `lib/repurposer.ts`, persists assets, exposes quality scores, and surfaces results in `app/content/page.tsx`.
3. **Phase 3** (Conversion Layer): `/api/conversion` qualifies leads via `lib/closer.ts`, tracks status in `lib/leads.ts`, and the UI at `app/conversion/page.tsx` displays the flows.
4. **Phase 4** (Analytics + Safety): `/api/analytics` + `/api/safety` provide weekly insights and claim safety checks, with `app/analytics/page.tsx` for review.

## Testing & quality gates
- `npm run build` includes `next lint`/type checks and should pass cleanly before merging.
- Follow the DONE checklist and ensure no high-severity issues remain. Keep each feature in its own commit and push immediately (per the working agreement).
- There are no automated tests yet; add Jest/Playwright suites as needed in future phases.

## Deployment
This is a static + server-route Next app—deploy via Vercel/Next-compatible host. Make sure to:
- Set `NEXT_PUBLIC_API_BASE` to the deployed backend host if split.
- Keep the `lib` stores idempotent (the MVP currently uses in-memory persistence).

## Collaboration notes
- All agent outputs must be valid JSON (PROMPT_CONTRACTS). Invalid outputs should block publishing in the UI.
- Phase plan and Done checklist are the single source of truth for deliverables and exit criteria; update them when scope changes.
- Use `start-mvp.sh` (or `npm run dev`) for local MVP experimentation before adding production-grade infra.

## Contact
Ping the creator/owner for onboarding, or refer to the README in `frontend/next-app` for UI-specific notes (colors, hyperliquid brand kit references).
