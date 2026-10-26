import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { productAnchor, type Product } from '@/data/catalog';
import AddToQuote from '@/components/Quote/AddToQuote';
import s from './ProductItem.module.css';

/**
 * One product on its family page: name, one line, and the quote button. The card's id is
 * the anchor the quote basket and the blog link to (#poulpe).
 */
export default function ProductItem({ product, locale }: { product: Product; locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <article id={productAnchor(product)} className={s.item}>
      <h3 className={s.name}>{product.name[locale]}</h3>
      <p className={s.text}>{product.text[locale]}</p>
      <AddToQuote slug={product.id} size="small" labels={{ add: t.catalog.addToQuote, inQuote: t.catalog.inQuote }} />
    </article>
  );
}

/** A grid of product cards, with a heading per sub-group where there is one (citrus, fresh, frozen fruit). */
export function ProductList({ products, locale }: { products: Product[]; locale: Locale }) {
  const subs = [...new Set(products.map((p) => p.sub?.[locale] ?? ''))];
  return (
    <div className={s.groups}>
      {subs.map((sub) => (
        <div key={sub || 'all'}>
          {sub && <h3 className={s.sub}>{sub}</h3>}
          <ul className={s.grid}>
            {products
              .filter((p) => (p.sub?.[locale] ?? '') === sub)
              .map((p) => (
                <li key={p.id}>
                  <ProductItem product={p} locale={locale} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
