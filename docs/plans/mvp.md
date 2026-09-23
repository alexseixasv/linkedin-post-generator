# MVP Plan

## Status

Shipped for local Docker Compose. All six slices below are implemented.

## Objective

Ship the smallest complete LinkedIn Content Studio journey: profile → persona → relevant topic → angle → post → reviews → image, running locally with Docker Compose.

## User value

A technology professional can enter their background, see why a topic fits them, and copy a post plus image they could publish without sounding generic.

## Scope

The six vertical slices below. Shared foundation (monorepo, Compose, shared types, provider interfaces, env examples) is created with Slice 1, not as a disconnected infra project.

## Out of scope

Accounts, LinkedIn publish/scrape, cloud storage, job queues, multi-profile SaaS, analytics, and speculative packages.

## Slice 1 — Profile

User value: I can record who I am professionally and come back to it.

Scope:

- Turborepo, web, api, Postgres, Compose
- `packages/shared` contracts for profile
- progressive profile UI
- photo upload with validation and local storage
- profile persistence

Out: persona generation, news, posts.

Acceptance:

- user can save a partial profile
- experiences can be added
- up to three PNG/JPEG/WEBP photos, rejected when invalid
- photos are stored under server IDs
- empty and validation states exist
- `docker compose up --build` starts web, api, postgres

Tests: payload validation, file limits, persistence, API errors. No OpenAI.

Risks: overbuilding the form. Mitigate with sections, not one wall of fields.

## Slice 2 — Persona

User value: I can see how the system interprets my authority.

Scope:

- `TextGenerationProvider` + OpenAI adapter + prompt template
- structured persona and authority output
- validation before persist
- persona and authority UI

Acceptance:

- generation uses saved profile evidence only
- malformed model output is an error, not saved
- OpenAI failure is retryable
- UI shows core expertise, pillars, and topic bands
- thin profiles show a credibility warning

Tests: prompt context includes profile fields; schema validation; mocked provider success/failure.

Risks: inflated seniority. Reject claims not supported by the profile.

## Slice 3 — Research

User value: I see current events that could be mine to discuss.

Scope:

- `NewsProvider` + NewsAPI adapter
- article normalization and persistence
- topic list UI with source and date
- empty and provider-failure states

Acceptance:

- queries derive from persona/profile topics
- articles have title, source, url, publishedAt
- no fabricated events
- failure does not crash the journey

Tests: adapter mapping with fixtures; API behavior with mocked news; no live NewsAPI in CI.

Risks: junk sources. Prefer quality domains, then let Slice 4 reject.

## Slice 4 — Opportunity

User value: I understand why a topic fits me and can pick an angle.

Scope:

- deterministic prefilters + semantic relevance
- three opportunities or fewer
- Why This Post? UI
- angle selection

Acceptance:

- every shown opportunity answers why this professional
- weak matches are rejected
- user must select an opportunity before writing
- scores are explained without chain-of-thought

Tests: rejection rules; scoring combination; mocked semantic evaluation.

Risks: ranking by popularity. Recency and fame are not sufficient.

## Slice 5 — Post

User value: I get a post I might actually publish.

Scope:

- story strategy, draft, writing review, fact review, SEO, score
- result UI with copy, tone/angle/hook regeneration later if time, at least copy + regenerate post + rewrite is in the product success list and should land here or as Slice 5b if needed
- persist post on the run

MVP regeneration on the result screen:

- copy post
- regenerate post
- generate alternative hook
- change tone
- change angle
- rewrite section

If delivery pressure appears, keep copy, regenerate, and hook first; remaining controls follow inside this slice before Slice 6 is considered done for demo polish.

Acceptance:

- no fabricated first-person experience
- factual claims point at the source article
- writing review revises only weak sections
- quality score and notes are visible
- OpenAI failure retries this stage only

Tests: grounding rules, schema, mocked reviews, unsupported-claim rejection.

## Slice 6 — Image

User value: I get a supporting image and can retry it without losing the post.

Scope:

- creative brief and prompt templates
- `ImageGenerationProvider` + OpenAI adapter
- reference photos when present
- persist via StorageProvider
- final result UI

Acceptance:

- raw post text is not sent as the image prompt
- image retry does not regenerate persona, topic, or post
- provider failures are user-safe
- generated asset is stored by the app, not a temporary third-party URL

Tests: brief/prompt propagation, reference image passing, failure mapping, persistence, UI states via API contracts.

## Implementation path

1. Slice 1 foundation + profile — done
2. Slice 2 AI text boundary — done
3. Slice 3 news boundary — done
4. Slice 4 relevance and opportunities — done
5. Slice 5 writing pipeline — done
6. Slice 6 image pipeline and final screen polish — done

Each slice updates docs/learnings when something non-obvious is discovered. Skills are updated when a procedure repeats or fails.

## Test strategy

Cheapest test that gives confidence. Mock OpenAI and NewsAPI. Use Postgres in integration tests. Exercise empty, invalid, and provider-failure paths in every slice.

## Security

Untrusted: profile text, photos, article bodies, URLs, model output.

Validate uploads by type, size, and count. Randomize storage names. Keep keys on the server. Treat retrieved news as data in prompts.

## UX states required in every AI or network step

Loading, success, empty, error, retry.

## Risks

- NewsAPI free tier is development-oriented; acceptable for local MVP, behind an interface.
- OpenAI image identity preservation is best-effort.
- Sequential AI calls are slow; stepwise UI is the mitigation.
- A polished UI is part of the MVP, not a later skin.
