# 02 — Architecture, information architecture and SEO plan

## Stack (decision)

The site reuses the engine of our Euravia build (`../../export-import/web`), a close match:
a produce/seafood trader with a quote basket and localised URLs.

- **Next.js 16, `output: 'export'`**: plain static HTML that any host serves, including
  the client's current host (ADK Media, Apache + PHP). No Node server, no database.
- **Pure CSS modules** with tokens in `web/app/globals.css`.
- **Two languages**: French (default, `x-default`) and English. Arabic was not requested.
- **Forms**: `public/api/contact.php` and `quote.php` send mail over SMTP from the client's
  own mailbox (`mail-config.php`, never committed). WhatsApp is the fallback on every form.
- **Build outside OneDrive** (`scripts/build.ps1`), because `.next` corrupts in a syncing folder.

## Information architecture

```
/fr/                                  /en/
├─ produits/                          ├─ products/
│  ├─ poisson-congele/                │  ├─ frozen-fish/
│  ├─ fruits-de-mer/                  │  ├─ seafood/
│  ├─ conserves-de-poisson/           │  ├─ canned-fish/
│  ├─ poisson-precuit/                │  ├─ precooked-fish/
│  ├─ fruits/                         │  ├─ fruits/
│  ├─ legumes/                        │  ├─ vegetables/
│  ├─ bois/                           │  ├─ wood/
│  ├─ alimentation-animale/           │  ├─ animal-feed/
│  └─ polymeres/                      │  └─ polymers/
├─ services/                          ├─ services/
├─ a-propos/                          ├─ about/
├─ blog/ (+3 articles)                ├─ blog/ (+3 articles)
├─ contact/                           ├─ contact/
├─ devis/ (noindex)                   ├─ quote/ (noindex)
└─ mentions-legales/                  └─ legal-notice/
```

21 pages per language, 42 in total, plus the root language picker and the 404.

**No page per product.** The reference publishes no specification per product, so 58
product pages would be 58 thin, near-duplicate pages. Each family page is rich instead
(intro, key facts, all its products, how we work, FAQ, related families), and each product
is an anchored card on it (`/fr/produits/fruits-de-mer/#poulpe`) with its own "add to quote"
button. When the client sends specifications, the best sellers can get their own pages.

The navigation groups the nine families into three divisions: **Produits de la mer**
(frozen fish, seafood, canned, precooked), **Fruits & légumes**, and **Matières & industrie**
(wood, animal feed, polymers). The groups are a menu and hub structure, not a URL level.

## SEO checklist (built in)

- One `<h1>` per page, carrying the page's primary keyword (see 01-research.md §3).
- Unique `<title>` (≤ 65 chars) and meta description (≤ 165) per page and language.
- `canonical` + `hreflang` fr / en / x-default on every page; the sitemap is generated
  from the built pages' own hreflang tags, so the two can never disagree.
- JSON-LD:
  - `Organization` site-wide, with legal name, address, phone, e-mail, founder,
    foundingDate and `taxID` (ICE).
  - `BreadcrumbList` on every inner page.
  - `ItemList` on the hub and family pages.
  - `FAQPage` on family pages (valid markup, though Google no longer shows the rich result
    for this kind of site).
  - `Article` on blog posts.
  - No `Product` markup, because there are no prices or offers.
- Open Graph image per page (family photo, article image, or the brand `og.jpg`).
- `robots.txt`, `sitemap.xml`, the quote page set to `noindex`, and a self-contained 404.
- `.htaccess`: https, www → apex, trailing slash, caching, gzip.
- Images: WebP, sized per use, `next/image` with `sizes`; hero = poster image for LCP +
  a 3.9 MB muted MP4 loop.
- `scripts/check-export.mjs` fails the build on missing h1/title/description/canonical,
  wrong hreflang set, broken internal links or images, duplicate titles, or UI text leaking
  across languages, and warns on over-long titles and descriptions.

## After launch

1. Point aliomtrading.com at the build (upload `web/out/` to the web root).
2. Search Console: verify the domain, submit `/sitemap.xml`.
3. Google Business Profile for the Casablanca office (same name, address and phone as the site).
4. List the company in the directories competitors use (Kerix, Telecontact, EspaceAgro) with
   a link to the matching family page.
5. Publish one guide a month on a keyword from 01-research.md (e.g. "prix palette europe",
   "calendrier des agrumes du Maroc", "farine de poisson : teneur en protéines").
