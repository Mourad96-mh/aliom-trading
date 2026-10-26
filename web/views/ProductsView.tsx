import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { CATEGORIES, GROUPS, categoriesIn } from '@/data/catalog';
import { categoryHref, href } from '@/data/routes';
import { breadcrumbs, itemList } from '@/data/schema';
import PageHeader from '@/components/PageHeader/PageHeader';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import QuoteBand from '@/components/QuoteBand/QuoteBand';
import Reveal from '@/components/Reveal/Reveal';
import JsonLd from '@/components/JsonLd/JsonLd';
import s from './Catalog.module.css';

/** The products hub: the three divisions, each with its family cards. */
export default function ProductsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const crumbs = [{ label: t.nav.home, href: href(locale, 'home') }, { label: t.products.title }];

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd data={itemList(CATEGORIES.map((c) => ({ name: c.copy[locale].name, href: categoryHref(locale, c.key) })))} />
      <PageHeader
        eyebrow={t.products.title}
        title={t.products.h1}
        lead={t.products.lead}
        crumbs={crumbs}
        crumbLabel={t.a11y.breadcrumb}
        image="/media/scenes/products.webp"
      />

      {GROUPS.map((group, i) => (
        <section
          key={group.key}
          id={group.key}
          className={`section ${i % 2 ? 'section--tint' : ''} ${s.group}`}
          style={{ '--accent': group.accent } as React.CSSProperties}
        >
          <div className="page">
            <Reveal className={s.groupHead}>
              <span className={s.groupNumber} aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h2 className={s.groupTitle}>{group.name[locale]}</h2>
                <p className={s.groupText}>{group.text[locale]}</p>
              </div>
            </Reveal>
            <ul className={s.cards}>
              {categoriesIn(group.key).map((category, j) => (
                <li key={category.key}>
                  <Reveal delay={j * 80} className={s.cardWrap}>
                    <CategoryCard category={category} locale={locale} priority={i === 0 && j < 2} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <QuoteBand locale={locale} />
    </>
  );
}
