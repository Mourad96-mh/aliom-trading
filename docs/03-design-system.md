# 03 — Design system

Direction: **a premium B2B trading house**, calm and trustworthy. The palette and the serif
come straight from the logo, so the site and the brand read as one.

## Logo

Redrawn as an inline SVG (`web/components/Logo/Logo.tsx`) from the low-resolution capture
in `../extract-logo-from-here.jpeg`: an "A" with a hairline left leg and a leaf at its foot,
"liom" in a heavy serif, "trading" in a light sans. It uses `currentColor`, so it is slate
on light backgrounds and white over the hero video. **Ask the client for the original
vector file (AI, SVG or PDF)** and replace that one component.

## Colour tokens (`web/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--brand` | #34463f | the logo's slate green: buttons, links, icons |
| `--brand-darker` | #1b2523 | dark bands (mission, quote CTA), 404 |
| `--gold` | #c9a24a | single accent: rules, numbers, the gold CTA (dark text on it) |
| `--gold-light` | #e3c57f | accent on dark backgrounds |
| `--gold-dark` | #8a6a1f | accent text on light backgrounds (contrast ≥ 4.5:1) |
| `--cat-sea` | #2b6a87 | Seafood division |
| `--cat-land` | #4f7a35 | Fruit & vegetables division |
| `--cat-industry` | #8a5a34 | Materials & industry division |
| `--ink` / `--ink-2` / `--ink-3` | #1b2523 / #3f4b47 / #5d6864 | text |
| `--paper` / `--paper-2` / `--paper-3` | #fff / #f7f5ef / #eeeae0 | backgrounds (warm sand whites) |

## Type

- **Fraunces** 600/700 (`--font-serif`) for headings, the hero title, big numbers and quotes.
  It echoes the logo's serif.
- **Inter** 400–700 (`--font-sans`) for body text, UI, labels and eyebrows.
- Fluid scale `--step--1` … `--step-5` (clamp). The hero title is capped at about 68 px
  and 20 characters per line, so it stays at about 3 lines.

## Layout and components

- Page width 1320 px, reading width 780 px, fluid gutter.
- **Hero**: full screen (100 svh), muted video loop (port, ship, nets), dark wash,
  eyebrow + title + subtitle + 2 buttons. It has no pause button.
- **Header**: utility bar (phone, e-mail, FR/EN) and main bar (logo, mega panel
  "Produits" with three division columns, quote basket button). It is transparent over the
  hero and turns solid on scroll. Burger drawer on mobile.
- **FeatureRow**: alternating 3:2 photo + text, photo capped at 50 vh.
- **CategoryCard**: photo card with the division colour strip.
- **ProductItem**: a text card with the division colour on its left edge, plus "Ajouter au devis".
- **Key facts** panel, **numbered points**, **FAQ** (`<details>`), **QuoteBand** (dark CTA
  flush with the footer).
- Motion: reveal on scroll, cards lift on hover; everything is off under
  `prefers-reduced-motion`.

## Imagery

Wikimedia Commons stand-ins (CC0 / public domain, Unsplash archive) listed in
`web/public/media/CREDITS.json`, plus the Mixkit hero clips (Mixkit free licence).
**Replace them with the client's own photos** (warehouse, products, team) as soon as possible.
That is the single biggest credibility gain left.
