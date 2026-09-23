# LinkedIn Content Studio

Professional LinkedIn content for technology specialists, grounded in their real experience and relevant current events.

This repository started with specialized agents under `.agents/` and no application. Product, domain, and architecture were defined before application scaffolding.

## Current status

Discovery and planning are in `docs/`. Implementation follows vertical slices in `docs/plans/mvp.md`.

## Knowledge

- Product: `docs/product/`
- Architecture: `docs/architecture/`
- Decisions: `docs/decisions/`
- Plans: `docs/plans/`
- Learnings: `docs/learnings/`
- Agents: `.agents/`
- Skills: `.skills/`

## Local run

```bash
cp .env.example .env
docker compose up --build
```

Then open `http://localhost:5173`.

Slice 1 is available: progressive professional profile, experiences, positioning, writing preferences, and up to three reference photos.

Slice 2 is available: generate a structured professional persona and authority map from the saved profile. Set `OPENAI_API_KEY` in `.env` before generating.

Slice 3 is available: discover recent technology events from the persona. Set `NEWS_API_KEY` in `.env` before discovering.

Slice 4 is available: generate up to three content opportunities with Why this post? and select an angle.

Slice 5 is available: write a post from the selected angle, with story strategy, reviews, score, copy, and limited regeneration.

Slice 6 is available: generate a supporting image from a creative brief and retry it without regenerating the post.

Without Docker:

```bash
npm install
docker compose up postgres -d
npm run dev
```

The API expects `DATABASE_URL` from `.env.example`.
