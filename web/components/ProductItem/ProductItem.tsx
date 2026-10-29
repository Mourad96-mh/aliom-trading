'use client';

import type { Locale } from '@/i18n/config';
import type { CategoryKey, Product } from '@/data/catalog';
import AddToQuote from '@/components/Quote/AddToQuote';
import Reveal from '@/components/Reveal/Reveal';
import { local, useLiveProducts } from '@/components/Catalog/liveProducts';
import s from './ProductItem.module.css';

type Labels = { add: string; inQuote: string };

/**
 * One product on its family page: name, one line, and the quote button. The card's id is
 * the anchor the quote basket and the blog link to (#poulpe).
 */
export default function ProductItem({ product, locale, labels }: { product: Product; locale: Locale; labels: Labels }) {
  return (
    <article id={product.id} className={s.item}>
      <h3 className={s.name}>{local(product.name, locale)}</h3>
      <p className={s.text}>{local(product.text, locale)}</p>
      <AddToQuote slug={product.id} size="small" labels={labels} />
    </article>
  );
}

/** A grid of product cards, with a heading per sub-group where there is one (citrus, fresh, frozen fruit). */
export function ProductList({ products, locale, labels }: { products: Product[]; locale: Locale; labels: Labels }) {
  const subOf = (p: Product) => (p.sub ? local(p.sub, locale) : '');
  const subs = [...new Set(products.map(subOf))];
  return (
    <div className={s.groups}>
      {subs.map((sub) => (
        <div key={sub || 'all'}>
          {sub && <h3 className={s.sub}>{sub}</h3>}
          <ul className={s.grid}>
            {products
              .filter((p) => subOf(p) === sub)
              .map((p) => (
                <li key={p.id}>
                  <ProductItem product={p} locale={locale} labels={labels} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * A family's products as the admin last saved them: the built list first, the server's
 * copy once it has loaded. The heading carries the count, so it is drawn here too.
 */
export function LiveProductList({
  category,
  initial,
  locale,
  labels,
  title,
  countClassName,
}: {
  category: CategoryKey;
  initial: Product[];
  locale: Locale;
  labels: Labels;
  title: string;
  countClassName: string;
}) {
  const products = useLiveProducts(initial).filter((p) => p.category === category);
  return (
    <>
      <Reveal className="section-head">
        <h2>
          {title} <span className={countClassName}>({products.length})</span>
        </h2>
      </Reveal>
      <ProductList products={products} locale={locale} labels={labels} />
    </>
  );
}

/** A family card's "12 products", kept in step with the admin's list. */
export function LiveCount({
  category,
  initial,
  labels,
}: {
  category: CategoryKey;
  initial: Product[];
  labels: { one: string; other: string };
}) {
  const count = useLiveProducts(initial).filter((p) => p.category === category).length;
  return (
    <>
      {count} {count > 1 ? labels.other : labels.one}
    </>
  );
}
