/**
 * Raster copies of the wordmark (components/Logo/Logo.tsx) for the places that can't take
 * inline SVG: the JSON-LD logo (brand/aliom-logo.png) and the share image (og.jpg,
 * 1200×630: hero poster, dark wash, logo and tagline). Re-run after replacing the logo:
 *   node scripts/make-brand-assets.mjs
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const BRAND = '#34463f';
const DARK = '#1b2523';
const GOLD = '#c9a24a';

/* Same drawing as Logo.tsx, with system fonts: sharp's renderer has no web fonts. */
const logo = (ink, vein) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 64" width="168" height="64">
  <path d="M27 5h9.5l15 41h-10.2Z" fill="${ink}"/>
  <path d="M27.8 6.5 17.6 34.5" stroke="${ink}" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M5 47.5c1.8-8.7 7.4-13.6 15.6-14.3-.9 8.4-6.6 13.6-15.6 14.3Z" fill="${ink}"/>
  <path d="M6.8 45.6c3.3-3.6 6.8-6.6 11.2-9.2" stroke="${vein}" stroke-width="1.1" stroke-linecap="round" fill="none"/>
  <text x="50" y="46" fill="${ink}" font-family="Georgia, 'Times New Roman', serif" font-size="48" font-weight="700" textLength="114" lengthAdjust="spacingAndGlyphs">liom</text>
  <text x="64" y="61" fill="${ink}" font-family="Segoe UI, Arial, sans-serif" font-size="12.5" opacity="0.78" textLength="56" lengthAdjust="spacingAndGlyphs">trading</text>
</svg>`;

mkdirSync('public/media/brand', { recursive: true });

// JSON-LD logo: Google wants at least 112×112, so render wide and pad onto white.
await sharp(Buffer.from(logo(BRAND, '#fff')), { density: 600 })
  .resize({ width: 840 })
  .extend({ top: 80, bottom: 80, left: 80, right: 80, background: '#ffffff' })
  .flatten({ background: '#ffffff' })
  .png()
  .toFile('public/media/brand/aliom-logo.png');

// Share image: the hero poster under a dark wash, the logo in white and a gold rule.
const shade = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${DARK}" stop-opacity="0.92"/>
    <stop offset="0.65" stop-color="${DARK}" stop-opacity="0.55"/>
    <stop offset="1" stop-color="${DARK}" stop-opacity="0.15"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="80" y="372" width="72" height="4" fill="${GOLD}"/>
  <text x="80" y="430" fill="#fff" font-family="Georgia, serif" font-size="40" font-weight="700">Import · Export · Représentation de marques</text>
  <text x="80" y="480" fill="#e3c57f" font-family="Segoe UI, Arial, sans-serif" font-size="26">Casablanca, Maroc — aliomtrading.com</text>
</svg>`);
const mark = await sharp(Buffer.from(logo('#ffffff', DARK)), { density: 500 }).resize({ width: 520 }).png().toBuffer();

await sharp('public/media/hero/hero-poster.webp')
  .resize(1200, 630, { fit: 'cover' })
  .composite([
    { input: shade, top: 0, left: 0 },
    { input: mark, left: 72, top: 120 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/media/og.jpg');

console.log('wrote public/media/brand/aliom-logo.png and public/media/og.jpg');
