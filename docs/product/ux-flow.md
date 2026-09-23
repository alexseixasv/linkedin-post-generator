# Minimum viable UX

## User goal

Leave with a post and image I would publish, after understanding why the system recommended the topic.

## Flow

1. **Welcome** — one screen: what the product does, the six-step journey, and what it will not do (no LinkedIn scraping, no fake experience). Language can be switched in the top bar (English, Portuguese, Spanish).
2. **Profile** — progressive sections: identity, experience, positioning, writing, photos. Save per section. Never one infinite HR form.
3. **Persona** — explicit generating state, then a readable authority map. Warn if evidence is thin. Retry on failure.
4. **Topics** — cards with source and date. Empty state if nothing is credible. Do not fill the page with weak news.
5. **Opportunities** — up to three angles with Why This Post. User selects one. No silent auto-pick.
6. **Post** — staged generating copy (strategy → draft → review). Result shows post, score, notes, source. Actions: copy, regenerate, alternative hook, tone, angle, rewrite section.
7. **Image** — brief in human language, then generating state, then image. Retry image only. Optional: show that reference photos were used.

## Key interactions

- User always knows the current step.
- Why This Post is visible before generation.
- Scores have one or two sentences, not dashboards.
- Provider failures offer retry on the same step.

## States

Every network/AI step: loading, success, empty, error, retry.

Photo upload: preview, type/size/count errors, remove.

## Edge cases

- Profile with only a name
- No news matches
- News provider down
- OpenAI malformed JSON
- Image provider rejection with a post already saved
- User changes profile after persona exists — prompt to refresh persona

## UX risks

- Magical one-button generation
- Exposing internal weights
- Blocking on complete profile completeness
- Looking like an admin CRUD console
