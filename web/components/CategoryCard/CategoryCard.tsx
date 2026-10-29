import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { productsIn, type Category } from '@/data/catalog';
import { categoryHref } from '@/data/routes';
import { LiveCount } from '@/components/ProductItem/ProductItem';
import s from './CategoryCard.module.css';

/** A product family as a photo card — the products hub and "in the same division". */
export default function CategoryCard({
  category,
  locale,
  priority = false,
}: {
  category: Category;
  locale: Locale;
  priority?: boolean;
}) {
  const t = getDictionary(locale);
  const copy = category.copy[locale];

  return (
    <article className={s.card} style={{ '--accent': category.accent } as React.CSSProperties}>
      <div className={s.media}>
        <Image
          src={category.image}
          alt=""
          width={1200}
          height={800}
          sizes="(min-width: 1100px) 400px, (min-width: 640px) 50vw, 100vw"
          className={s.img}
          priority={priority}
        />
      </div>
      <div className={s.body}>
        <p className={s.count}>
          <LiveCount category={category.key} initial={productsIn(category.key)} labels={t.catalog.count} />
        </p>
        <h3 className={s.title}>
          <Link href={categoryHref(locale, category.key)}>{copy.name}</Link>
        </h3>
        <p className={s.lead}>{copy.lead}</p>
        <span className={s.more} aria-hidden="true">
          {t.catalog.seeRange}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </article>
  );
}
