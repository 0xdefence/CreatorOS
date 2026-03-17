# CreatorOS Ship Gate

Use this at the end of every phase and before launch.

## A) Spec Conformance
- [ ] All must-have requirements from CREATOR_OS_SPEC.md are implemented.
- [ ] No v2/out-of-scope features were added without approval.
- [ ] Acceptance criteria are test-validated (not “looks good”).
- [ ] Non-goals were respected.

## 😎 Functional Completion
### Onboarding & Strategy
- [ ] User can complete onboarding end-to-end.
- [ ] Positioning + pillars + CTA map generate successfully.
- [ ] Strategy artifacts are saved and reloadable.

### Content Engine
- [ ] One input idea produces channel variants (X/LinkedIn/IG/TikTok).
- [ ] Hooks + drafts + CTA variants generate with valid structure.
- [ ] Draft/approve/edit flow works.

### Conversion Layer
- [ ] DM qualification score is produced consistently.
- [ ] Lead status progression works (new -> qualified -> booked prep).
- [ ] Call handoff brief is generated with pain/urgency/objections.

### Analytics
- [ ] Weekly report generates.
- [ ] Winners/losers/next-tests are included.
- [ ] Recommendation outputs are actionable.

## C) Prompt & Contract Integrity
- [ ] All agent outputs conform to PROMPT_CONTRACTS.md JSON schemas.
- [ ] Non-JSON outputs are rejected safely.
- [ ] Invalid outputs are logged + retried with fallback logic.
- [ ] Prompt versions are tracked.

## D) Safety & Compliance
- [ ] High-risk claims are flagged by Safety Checker.
- [ ] “Guaranteed income / certainty” language is blocked or rewritten.
- [ ] Publish is blocked when risk_level=high or approved=false.
- [ ] Human approval gate exists before publishing sensitive claims.

## E) Quality Gates (Engineering)
- [ ] Lint passes.
- [ ] Type checks pass.
- [ ] Unit tests pass.
- [ ] Integration tests pass for core workflow.
- [ ] No critical/high bugs open.
- [ ] Error handling exists for failed model/tool calls.
- [ ] Retries and timeouts configured.

## F) Data & Observability
- [ ] Core tables exist and migrations are applied.
- [ ] Trace IDs logged for each workflow run.
- [ ] Prompt, output, timestamp, and agent name logged.
- [ ] Basic dashboards/metrics visible (or export available).

## G) UX Readiness
- [ ] New user can get first output in <10 minutes.
- [ ] UI copy is clear (no internal jargon).
- [ ] Empty states and failure states are handled.
- [ ] Manual fallback path exists when integrations fail.

## H) Performance Baseline
- [ ] Content generation p95 latency acceptable for MVP.
- [ ] Weekly report generation time acceptable.
- [ ] Queue/backpressure behavior tested.
- [ ] No blocking workflow deadlocks.

## I) Launch Readiness
- [ ] Deployment config validated (env vars, secrets, DB).
- [ ] Rollback plan documented and tested.
- [ ] Demo script prepared.
- [ ] Launch messaging and offer CTA are ready.
- [ ] Support path defined for first users.

## J) Final “Done” Decision
### Must all be true:
- [ ] Spec conformance complete
- [ ] Critical workflows stable
- [ ] Safety checker active
- [ ] No critical defects
- [ ] Team agrees ship criteria are met

If any item above is false -> NOT DONE.
