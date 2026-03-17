## Phase 1 (Days 1–3) — Foundation

### Deliverables
- Auth + user workspace
- Onboarding forms
- Strategy generation endpoint (positioning, pillars, CTA map)
- Initial DB schema

### Exit criteria
- User completes onboarding end-to-end
- Strategy JSON generated and stored
- Basic UI shows generated strategy

## Phase 2 (Days 4–7) — Content Core

### Deliverables
- Hook generator
- Post/thread/script generator
- Channel repurposing transforms (X/LinkedIn/IG/TikTok)
- Content asset storage + status workflow (draft/approved)

### Exit criteria
- One input idea generates at least 4 channel outputs
- Manual approve/edit flow works
- Output quality score visible (clarity/curiosity/relevance)

## Phase 3 (Days 8–10) — Conversion Layer

### Deliverables
- DM qualification logic
- Lead records + status pipeline
- Call handoff brief generator
- Objection response generator

### Exit criteria
- Inbound lead can be qualified and moved to “booked call prep”
- Call brief generated with pain/urgency/objections

## Phase 4 (Days 11–14) — Analytics + Launch

### Deliverables
- Weekly analytics report generator
- Kill/keep/scale recommendation engine
- Safety/compliance checker for claims
- Polishing + bug fixes + launch docs

### Exit criteria
- Weekly report includes top performers + losers + next tests
- Safety checker catches risky guarantee claims
- MVP deployable and demo-ready

## Cross-phase Quality Gates
- Lint/typecheck/test pass before merge
- No critical defect open at phase close
- All outputs logged with trace IDs
- Rollback plan documented for each deploy

## Risks & Mitigations
- LLM output drift -> enforce JSON schemas + validator
- Noisy metrics -> start with simple assisted attribution
- Channel API friction -> manual publish fallback in v1
- Compliance risk -> mandatory claim checker + human approval gate

## Definition of Done (MVP)
- Onboarding -> strategy -> content -> qualification -> report works in one loop
- User can operate daily workflow without custom engineering support
- At least 3 measurable optimization recommendations generated weekly
