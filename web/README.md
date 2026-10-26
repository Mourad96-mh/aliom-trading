# ALIOM TRADING — aliomtrading.com

Static website for ALIOM TRADING (Casablanca): agent for international brands and
import-export trader. Next.js 16 static export, pure CSS modules, French (default) and
English, quote basket, PHP mailers. The research and decisions behind it are in `../docs/`.

## Everyday tasks

| I want to… | Edit |
|---|---|
| Change a family page's text (intro, facts, FAQ…) | `data/catalog.ts` → `CATEGORIES` (fr + en side by side) |
| Add or remove a product | `data/catalog.ts` → `PRODUCTS` (one line) |
| Remove a whole family | delete it from `CATEGORIES`, from its group in `GROUPS`, and its products |
| Change any interface text | `i18n/dictionaries/fr.json` (+ `en.json`; French is the reference shape, a missing key fails the build) |
| Phone, e-mail, address, legal identity | `data/nav.ts` (`CONTACT`, `ADDRESS`, `COMPANY`) |
| Write a blog article | `data/blog.ts` + a photo in `public/media/blog/` |
| Replace a photo | drop a file with the same name in `public/media/…` |
| Replace the logo | `components/Logo/Logo.tsx` (+ `public/favicon.svg`), then `node scripts/make-brand-assets.mjs` |
| Change the colours | the tokens at the top of `app/globals.css` |
| Change the hero film | `public/media/hero/hero.mp4` + `hero-poster.webp` |

## Commands

```bash
npm install
npm run dev            # http://localhost:3000/fr/  (forms fail here: no PHP)
npx next typegen && npx tsc --noEmit
```

**Build**: always outside OneDrive, because `.next` corrupts under a syncing folder.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build.ps1
```

This mirrors the sources to `%TEMP%\aliom-build` and runs `next build`. It then runs
`scripts/finalize-export.mjs`, which writes the language picker at `/`, `.htaccess`,
`sitemap.xml`, `robots.txt` and `404.html`. Last, `scripts/check-export.mjs` checks every
page: exactly one h1, a title, a description and a canonical, hreflang fr/en/x-default, no
dead links or missing images, and no text from the other language. The result is copied
to `out/`.

## Deploy (client host, Apache + PHP)

1. Upload the **contents** of `out/` to the web root of aliomtrading.com.
2. On the server, copy `api/mail-config.example.php` to `api/mail-config.php` and fill in
   the SMTP settings of info@aliomtrading.com. That file is never committed and never served.
3. Send a test contact message and a test quote.
4. Search Console: add the property, submit `/sitemap.xml`.

## Photos

`scripts/photo-search.mjs` finds candidates and builds contact sheets.
`scripts/fetch-photos.mjs` downloads the choices listed in `scripts/photo-selection.json`,
crops them, encodes WebP and writes `public/media/CREDITS.json`. All current photos are
CC0 / public-domain stand-ins from Wikimedia Commons. The hero film is a Mixkit montage
(Mixkit free licence).
