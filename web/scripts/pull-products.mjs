/**
 * Brings the catalogue the client edits at /admin/ back into the sources, so the next
 * build bakes it into the static pages (and so it can be committed). Run by
 * scripts/build.ps1 before every build.
 *
 *   node scripts/pull-products.mjs                       # from https://aliomtrading.com
 *   node scripts/pull-products.mjs https://…/api/products.php
 *
 * Until the client's first save the server has no live list (`products: null`) and
 * data/products.json is left as it is. Once the admin is in use, the server's list is the
 * reference: edit products there, not in data/products.json.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'products.json');
const url = process.argv[2] ?? 'https://aliomtrading.com/api/products.php';

const response = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(20000) });
if (!response.ok) throw new Error(`${url} answered ${response.status}`);
const { products, updated } = await response.json();

if (products === null) {
  console.log('pull-products: no admin edits on the server yet, data/products.json kept');
  process.exit(0);
}
const valid =
  Array.isArray(products) &&
  products.every((p) => typeof p?.id === 'string' && typeof p?.category === 'string' && typeof p?.name?.fr === 'string');
if (!valid) throw new Error(`${url} did not return a product list`);

const before = JSON.parse(readFileSync(FILE, 'utf8'));
const ids = (list) => new Set(list.map((p) => p.id));
const [was, now] = [ids(before), ids(products)];
const added = [...now].filter((id) => !was.has(id));
const removed = [...was].filter((id) => !now.has(id));

writeFileSync(FILE, JSON.stringify(products, null, 2) + '\n');
console.log(
  `pull-products: ${products.length} products as saved on ${updated}` +
    (added.length ? `, added ${added.join(', ')}` : '') +
    (removed.length ? `, removed ${removed.join(', ')}` : '')
);
