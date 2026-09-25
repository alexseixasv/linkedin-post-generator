# Visual identity

LinkedIn Content Studio should feel like a sober editorial product, not a generic AI wrapper. The interface opens on a large typographic claim over a white canvas, then uses generous empty space, thin rules, and a few rounded cards to make the journey feel controlled.

Color arrives in small doses: coral chips, blue links, and occasional deep green or navy bands. The shell stays black, white, and stone. Type is large, tight, and almost monospaced in spirit.

This file is the source of truth for UI work. Do not invent a second palette, type stack, or component language.

**Key characteristics**

- Monumental display headlines with tight line height and negative tracking.
- White editorial canvases interrupted by deep green or dark navy bands only when a stage needs contrast.
- Rounded media and content cards, usually 8px to 22px.
- Pill CTAs in near-black or white. Most secondary actions are underlined text or outlined pills.
- Quiet chrome. No decorative dashboards, neon, or generic SaaS gradients.
- Journey, persona, topics, angles, post, and image are the product surfaces. Marketing pages, blogs, and research indexes are out of scope.

## Colors

### Brand and accent

- **Ink Black** (`#000000`): Highest-contrast text and the brand anchor.
- **Near-Black** (`#17171c`): Primary CTAs, dark panels, and deep cards.
- **Deep Green** (`#003c33`): Full-width contrast bands for authority or result stages.
- **Dark Navy** (`#071829`): Alternate contrast band when green would compete with content.
- **Action Blue** (`#1863dc`): Inline links and secondary emphasis.
- **Coral** (`#ff7759`): Selected chips, taxonomy marks, and warm accents. Never the primary CTA fill.
- **Soft Coral** (`#ffad9d`): Pale chip borders and quiet labels.

### Surface and background

- **Canvas White** (`#ffffff`): Default page and form surface.
- **Soft Stone** (`#eeece7`): Journey cards, placeholders, and warm neutral blocks.
- **Pale Green Wash** (`#edfce9`): Backdrop behind a stacked dark capability or persona band.
- **Pale Blue Wash** (`#f1f5ff`): Rare cool wash behind supporting media.
- **Card Border** (`#f2f2f2`): Softest card line.

### Text and rules

- **Ink** (`#212121`): Default body text on light surfaces.
- **Muted Slate** (`#93939f`): Dates, metadata, and de-emphasized labels.
- **Slate** (`#75758a`): Tertiary text and separators.
- **Hairline** (`#d9d9dd`): List rules and section dividers.
- **Border Light** (`#e5e7eb`): Secondary utility rules.

### Semantic

- **Focus Blue** (`#4c6ee6`): Keyboard focus ring.
- **Form Focus Violet** (`#9b60aa`): Focus border for text inputs.
- **Error Red** (`#b30000`): Validation and recoverable failure.

### Gradients

Do not use gradients as a generic UI fill. Keep surfaces flat. Reserve color fields for photography, generated images, and large media panels.

## Typography

### Font family

Use public fonts. Do not reference proprietary typefaces.

- **Display**: `Space Grotesk`, then `Inter`, `ui-sans-serif`, `system-ui`.
- **Body / UI**: `Inter`, then `Arial`, `ui-sans-serif`, `system-ui`.
- **Technical labels**: `IBM Plex Mono`, then `ui-monospace`, `monospace`.

Load them from the existing Google Fonts setup in `apps/web/index.html`. Do not add a third display serif.

### Hierarchy

| Role | Font | Size | Weight | Line height | Letter spacing | Notes |
|---|---|---:|---:|---:|---:|---|
| Hero display | Space Grotesk | 64px–96px | 400 | 1.12 | -0.03em | Welcome headline only. Keep spaces readable. |
| Section display | Space Grotesk | 48px–60px | 400 | 1.15 | -0.02em | Stage titles on contrast bands. |
| Section heading | Inter | 32px–40px | 500 | 1.20 | -0.02em | In-flow panel titles. |
| Card heading | Inter | 24px | 500 | 1.25 | 0 | Journey, topic, and angle titles. |
| Body large | Inter | 18px | 400 | 1.50 | 0 | Lead copy. |
| Body | Inter | 16px | 400 | 1.50 | 0 | Default copy and fields. |
| Button | Inter | 14px | 500 | 1.40 | 0 | Compact CTA labels. |
| Caption | Inter | 14px | 400 | 1.40 | 0 | Metadata and helper text. |
| Mono label | IBM Plex Mono | 12px–14px | 400 | 1.40 | 0.04em | Uppercase eyebrows and step markers. |
| Micro | Inter | 12px | 400 | 1.40 | 0 | Status, legal, and nav microcopy. |

### Principles

- One oversized headline per screen, then settle into 14px–18px UI copy.
- Keep display type tight, but never so tight that words collide. Hero line-height stays at or above 1.12.
- Avoid heavy bold. Size, spacing, and surface contrast do the hierarchy work.
- Use uppercase mono labels for stage eyebrows (`THE JOURNEY`, `CONTENT AUTHORITY`).
- Coral chips and blue links are accents. Base type stays black and measured.

## Layout

### Spacing

8px base. Prefer `8`, `12`, `16`, `24`, `32`, `40`, `48`, `64`, and `80`.

Large sections need breathing room. The welcome hero sits above a journey grid, then a quieter promise row. Dense content appears only where the task is dense: profile fields, topic lists, angle comparison.

### Grid and container

- Page shell: `min(1120px, calc(100% - 32px))`, centered.
- Top bar: brand left, tagline and language switcher right.
- Welcome: single-column hero, then 3-column journey cards, then 3-column promise cards.
- Profile and later stages: one white panel with step pills, then the stage body.
- Forms: two columns on desktop, one column below 840px.
- Topic and angle lists: stacked cards, not a masonry gallery.

### Whitespace

Whitespace is a trust signal. Separate the claim, the journey, the form, and the result. Do not fill empty intervals with extra cards.

## Elevation and depth

Mostly flat. Depth comes from surface alternation, media contrast, rounded corners, and thin borders.

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, white or dark field | Hero copy, lists, editorial surfaces |
| Bordered | 1px `#d9d9dd` or `#e5e7eb` | Forms, topic cards, angle cards |
| Soft lift | Stone fill, no heavy shadow | Journey and promise cards |
| Media | Rounded image on a contrasting field | Generated image, reference photos |
| Contrast band | Deep green or navy full-width | Optional persona or final-result emphasis |

Do not add large drop shadows to cards.

## Shapes

| Token | Value | Role |
|---|---:|---|
| `xs` | 4px | Thumbnails and utility controls |
| `sm` | 8px | Chips, small cards, language flags |
| `md` | 16px | Form fields and grouped blocks |
| `lg` | 22px | Journey, topic, angle, and image cards |
| `pill` | 999px | Primary CTAs and step pills |

Images sit as rounded cards with visible corners. Do not place text over decorative stock backgrounds.

## Product surfaces

Map the visual system to the existing journey. Do not invent marketing pages.

1. **Welcome** — white canvas, one display headline, one lead, one primary CTA, journey cards, three promise cards.
2. **Profile** — white panel, step pills, two-column fields, stone experience cards.
3. **Persona** — authority map. Strong / credible / adjacent / risky bands use pale washes, not rainbow cards.
4. **Topics** — source, date, title. Empty stays empty.
5. **Angles** — comparison cards with Why this post. Selected card gets a 1px near-black or deep-green rule, not a glow.
6. **Post** — the draft is the hero. Reviews sit below as rule-separated blocks.
7. **Image** — generated asset as a media card. Brief stays caption-scale. Retry does not restyle as a new product.

The top bar and language switcher persist on every surface.

## Components

### `button-primary`

Near-black pill on light surfaces, white pill on dark bands. Inter 14px / 500, padding `12px 24px`, full pill radius. One per view.

### `button-secondary`

Text action, underlined or hairline-aligned, no fill. Used for Back companions only when a quieter action is needed. Default Back is an outlined pill.

### `button-outline`

Transparent pill, 1px `#17171c` or `#d9d9dd` border. Back, copy, retry, and secondary stage actions.

### `language-switcher`

Three compact flag buttons in the top bar. Active state is a 1px near-black border plus a 2px focus-like ring. Flags are SVG, not emoji. Labels stay in `aria-label` / `title`.

### `topbar`

Brand wordmark left (`Content` + accent `Studio` in coral or near-black, not a logo mark). Tagline as a mono eyebrow. Language switcher on the right. Brand click returns to welcome.

### `step-pill`

Outlined pill for Identity through Image. Active pill inverts to near-black with white text.

### `journey-card`

Stone or white card, 22px radius, mono step number in coral or muted slate, Inter heading, 16px body. Six cards in a 3-column grid.

### `promise-card`

Same radius, quieter type. Three cards: no invented experience, no LinkedIn scraping, no empty engagement.

### `field`

16px Inter label above a rectangular input. 16px radius, 1px `#e5e7eb`, 12px–14px padding. Focus uses Form Focus Violet.

### `chip`

Coral outline by default, coral fill with dark text when selected. Used for positioning, tone, length, and removable tags.

### `notice` / `error` / `empty`

Flat tinted blocks, 16px radius, no icons required. Error uses Error Red text on a pale wash. Empty is muted slate, not a cartoon illustration.

### `topic-card` / `angle-card`

White, 22px radius, hairline border. Eyebrow for source and date or match score. Selected angle uses a 1px Deep Green rule.

### `authority-band`

Four quiet bands for strong, credible, adjacent, and risky topics. Pale green / stone / wash / pale error. No gauges.

### `post-body`

The generated post is 18px Inter, 1.55 line-height, pre-wrap. Score is display-scale Space Grotesk, not a dashboard.

### `image-frame`

Generated image as a 22px media card, max width about 520px. Brief underneath as caption, not a second hero.

## Do

- Start from a white canvas. Use deep green or navy only as a full-width band.
- Keep the primary CTA pill-shaped and near-black on light surfaces.
- Use 22px radius on major cards and media.
- Use coral for chips and small accents, not as the main button system.
- Keep the UI shell restrained. Let the generated post and image carry richness.
- Pull all user-facing copy from `apps/web/src/i18n`. English, Portuguese, and Spanish must stay in lockstep.

## Don't

- Do not mention or reuse another company's name, fonts, or product surfaces.
- Do not turn coral or blue into page backgrounds.
- Do not add heavy drop shadows.
- Do not make every block a card. Lists and forms can sit open on the panel.
- Do not bring back a display serif or the warm paper / copper palette when touching UI.
- Do not use saturated gradients as normal backgrounds.
- Do not invent extra marketing sections, trust-logo walls, or announcement bars.

## Responsive behavior

| Name | Width | Key changes |
|---|---:|---|
| Mobile | <840px | One-column cards, forms, and photos. Top-bar tagline hides. Actions stack. |
| Desktop | ≥840px | Two-column forms. Journey and promises at 3 columns above 1100px, 2 columns between 841px and 1100px. |

Primary pills keep 12px–24px padding. Language flags stay at least 38×28px.

## Implementation notes

1. Tokens belong in `apps/web/src/styles.css` as CSS custom properties that match this file.
2. New UI must read this document before choosing color, type, radius, or a new component.
3. Prefer extending an existing class over adding a one-off look.
4. Screenshots that appear to eat spaces are usually OCR. Verify heading text in the DOM.

## Known gaps

- `apps/web` implements this identity: white canvas, Space Grotesk, Inter, IBM Plex Mono, near-black pills, and coral chips.
- Deep green and navy contrast bands are defined but not used on every stage. Add one only when a surface needs it.
- Proprietary type samples from the original reference are not used. Space Grotesk, Inter, and IBM Plex Mono are the implementation fonts.
