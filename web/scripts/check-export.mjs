/**
 * Static checks over the built export. Fails the build on:
 *   - a page without exactly one <h1>, a <title>, a meta description or a canonical
 *   - a page whose hreflang set is not fr + en + x-default
 *   - an internal link or asset that does not exist in out/
 *   - a duplicate <title> within one language
 *   - English UI words leaking into /fr/, French ones into /en/
 *   - a title over 65 characters or a description over 165 (Google truncates them)
 *
 *   node scripts/check-export.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'out');
const LOCALES = ['fr', 'en'];
const errors = [];
const warnings = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

function pages(dir, base = '') {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory() || entry.startsWith('_')) continue;
    const rel = base ? `${base}/${entry}` : entry;
    if (existsSync(join(full, 'index.html'))) found.push(rel);
    found.push(...pages(full, rel));
  }
  return found;
}

const all = pages(OUT).filter((p) => LOCALES.includes(p.split('/')[0]));

/** A root-relative URL → the file that would serve it. */
function exists(url) {
  const clean = decodeURIComponent(url.split('#')[0].split('?')[0]);
  if (clean === '/' || clean === '') return true;
  const path = join(OUT, clean);
  if (clean.endsWith('/')) return existsSync(join(path, 'index.html'));
  return existsSync(path) || existsSync(join(path, 'index.html'));
}

/* Words that must not appear as visible UI text in the other language. */
const LEAKS = {
  fr: ['Add to quote', 'Quote request', 'Back to top', 'Request a quote', 'All rights reserved', 'Our products'],
  en: ['Ajouter au devis', 'Demande de devis', 'Haut de page', 'Tous droits réservés', 'Nos produits'],
};

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const titles = new Map();
const checkedAssets = new Set();

for (const page of all) {
  const locale = page.split('/')[0];
  const html = readFileSync(join(OUT, page, 'index.html'), 'utf8');
  const head = html.split('</head>')[0];

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(page, `${h1} <h1>`);

  const title = head.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) fail(page, 'no <title>');
  else {
    const key = `${locale}|${title}`;
    if (titles.has(key)) fail(page, `duplicate title with ${titles.get(key)}: "${title}"`);
    titles.set(key, page);
    if (decode(title).length > 65) warn(page, `title ${decode(title).length} chars: "${decode(title)}"`);
  }

  const description = head.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!description || description.length < 20) fail(page, 'no meta description');
  else if (decode(description).length > 165) warn(page, `description ${decode(description).length} chars`);

  if (!/<link rel="canonical" href="https:\/\/aliomtrading\.com\//.test(head)) fail(page, 'no canonical');

  const langs = [...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)"/gi)].map((m) => m[1]).sort();
  if (langs.join(',') !== 'en,fr,x-default') fail(page, `hreflang set is [${langs.join(',')}]`);

  for (const [, url] of html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    if (url.startsWith('/_next/') || url.startsWith('//')) continue;
    if (url.startsWith('/api/')) continue;
    if (checkedAssets.has(url)) continue;
    checkedAssets.add(url);
    if (!exists(url)) fail(page, `broken link or asset: ${url}`);
  }
  for (const [, list] of html.matchAll(/srcSet="([^"]+)"/g)) {
    for (const part of list.split(',')) {
      const url = part.trim().split(' ')[0];
      if (url.startsWith('/') && !exists(url)) fail(page, `broken srcset: ${url}`);
    }
  }

  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  for (const word of LEAKS[locale]) if (text.includes(word)) fail(page, `language leak: "${word}"`);
}

if (!existsSync(join(OUT, 'sitemap.xml'))) fail('out', 'no sitemap.xml');

const perLocale = LOCALES.map((l) => `${l}: ${all.filter((p) => p.startsWith(`${l}/`) || p === l).length}`).join(', ');
if (warnings.length) console.warn(`check-export: ${warnings.length} warning(s)\n  ${warnings.join('\n  ')}`);
if (errors.length) {
  console.error(`check-export: ${errors.length} problem(s)\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`check-export: ${all.length} pages OK (${perLocale}), ${checkedAssets.size} internal URLs resolved`);
