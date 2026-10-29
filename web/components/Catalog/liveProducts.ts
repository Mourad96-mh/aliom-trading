'use client';

import { useEffect, useState } from 'react';

import type { Locale } from '@/i18n/config';
import type { Product } from '@/data/catalog';

/**
 * The products as the admin last saved them. The pages are built with the snapshot in
 * data/products.json; once the client edits the catalogue at /admin/, the server's copy is
 * newer, so every product list asks public/api/products.php for it after load and swaps it
 * in. Until then — and wherever PHP does not run (next dev, a static preview) — the built
 * list stays, so a page never shows less than it was built with.
 *
 * Only types come from data/catalog: importing a value would ship every family's copy to
 * the browser.
 */

let request: Promise<Product[] | null> | null = null;

/** One request per page view, shared by every list on the page. */
function fetchLive(): Promise<Product[] | null> {
  request ??= fetch('/api/products.php', { cache: 'no-store', headers: { Accept: 'application/json' } })
    .then((response) => (response.ok ? response.json() : null))
    .then((data: unknown) => normalize((data as { products?: unknown } | null)?.products))
    .catch(() => null);
  return request;
}

const text = (value: unknown): string => (typeof value === 'string' ? value : '');
const words = (value: unknown) => ({
  fr: text((value as Record<string, unknown> | undefined)?.fr),
  en: text((value as Record<string, unknown> | undefined)?.en),
});

/** The server's answer, kept only if it looks like a product list. */
function normalize(raw: unknown): Product[] | null {
  if (!Array.isArray(raw)) return null;
  const products: Product[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const p = item as Record<string, unknown>;
    const name = words(p.name);
    if (!text(p.id) || !text(p.category) || !name.fr) continue;
    const sub = words(p.sub);
    products.push({
      id: text(p.id),
      category: text(p.category) as Product['category'],
      ...(sub.fr ? { sub } : {}),
      name,
      text: words(p.text),
    });
  }
  return products;
}

/** The live list once it has arrived, the built one until then. */
export function useLiveProducts(initial: Product[]): Product[] {
  const [products, setProducts] = useState(initial);
  useEffect(() => {
    let alive = true;
    fetchLive().then((live) => {
      if (alive && live) setProducts(live);
    });
    return () => {
      alive = false;
    };
  }, []);
  return products;
}

/** A product's words in the reader's language; the admin may leave the English empty. */
export const local = (words: Record<Locale, string>, locale: Locale): string => words[locale] || words.fr;
