# LinkedIn Content Studio

Professional LinkedIn content for technology specialists, grounded in their real experience and relevant current events.

This repository started with specialized agents under `.agents/` and no application. Product, domain, and architecture were defined before application scaffolding.

## Current status

The local MVP journey is complete:

**Profile → Persona → Topics → Angles → Post → Image**

Implementation notes live in `docs/plans/mvp.md`. Slice learnings are in `docs/learnings/`.

## Knowledge

- Product: `docs/product/`
- Architecture: `docs/architecture/`
- Decisions: `docs/decisions/`
- Plans: `docs/plans/`
- Learnings: `docs/learnings/`
- Original brief: `docs/prompts/linkedin-post-generator-prompt.md`
- Agents: `.agents/`
- Skills: `.skills/`

## Local run

```bash
cp .env.example .env
```

Fill in:

- `OPENAI_API_KEY` — persona, angles, post, and image ([OpenAI](https://platform.openai.com/api-keys))
- `NEWS_API_KEY` — topic discovery ([NewsAPI.org](https://newsapi.org/register))

Then:

```bash
docker compose up --build
```

Open `http://localhost:5173`.

After changing `.env`, recreate the API so the container rereads the keys:

```bash
docker compose up -d api
```

`docker compose restart` is not enough for new environment variables.

Without Docker:

```bash
npm install
docker compose up postgres -d
npm run dev
```

The API expects `DATABASE_URL` from `.env.example`.

## Journey

1. Record identity, experience, positioning, writing preferences, and up to three reference photos.
2. Generate an evidence-based persona. Thin profiles are warned, not blocked.
3. Discover recent technology events from that authority. Empty results stay empty.
4. Compare up to three angles with Why this post? and select one.
5. Write a post with story strategy, reviews, score, copy, and limited regeneration.
6. Generate a supporting image from a creative brief. Retry the image without rewriting the post.

The UI is English. Failures are retryable on the same step.

## Checks

```bash
npm test
npm run typecheck
```

Automated tests use fakes. They do not call OpenAI or NewsAPI.
