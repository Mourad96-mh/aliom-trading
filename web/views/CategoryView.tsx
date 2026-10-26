import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { categoriesIn, getCategory, groupOf, productsIn, type CategoryKey } from '@/data/catalog';
import { href, productHref } from '@/data/routes';
import { breadcrumbs, faqPage, itemList } from '@/data/schema';
import PageHeader from '@/components/PageHeader/PageHeader';
import { ProductList } from '@/components/ProductItem/ProductItem';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import NumberedPoints from '@/components/WhyMorocco/WhyMorocco';
import Faq from '@/components/Faq/Faq';
import QuoteBand from '@/components/QuoteBand/QuoteBand';
import Reveal from '@/components/Reveal/Reveal';
import JsonLd from '@/components/JsonLd/JsonLd';
import s from './Catalog.module.css';

/**
 * One product family — the site's money pages. Intro and key facts, every product as an
 * anchored card, how we support you, the FAQ, then the other families of the division.
 */
export default function CategoryView({ locale, categoryKey }: { locale: Locale; categoryKey: CategoryKey }) {
  const t = getDictionary(locale);
  const category = getCategory(categoryKey)!;
  const copy = category.copy[locale];
  const products = productsIn(category.key);
  const group = groupOf(category.key);
  const siblings = categoriesIn(group.key).filter((c) => c.key !== category.key);

  const crumbs = [
    { label: t.nav.home, href: href(locale, 'home') },
    { label: t.products.title, href: href(locale, 'products') },
    { label: copy.name },
  ];

  return (
    <div style={{ '--accent': category.accent } as React.CSSProperties}>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd data={itemList(products.map((p) => ({ name: p.name[locale], href: productHref(locale, p) })))} />
      <JsonLd data={faqPage(copy.faq)} />

      <PageHeader
        eyebrow={group.name[locale]}
        title={copy.h1}
        lead={copy.lead}
        crumbs={crumbs}
        crumbLabel={t.a11y.breadcrumb}
        image={category.image}
        accent={category.accent}
      />

      <section className="section">
        <div className={`page ${s.introGrid}`}>
          <Reveal className={s.introText}>
            {copy.intro.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={120} className={s.facts}>
            <h2 className={s.factsTitle}>{t.catalog.factsTitle}</h2>
            <dl className={s.factsList}>
              {copy.facts.map((fact) => (
                <div key={fact.label} className={s.fact}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" id="references">
        <div className="page">
          <Reveal className="section-head">
            <h2>
              {t.catalog.productsTitle} <span className={s.count}>({products.length})</span>
            </h2>
          </Reveal>
          <ProductList products={products} locale={locale} />
        </div>
      </section>

      <NumberedPoints title={t.catalog.pointsTitle} points={copy.points} accent={category.accent} tint={false} />

      <section className="section section--tint">
        <div className={`page-narrow`}>
          <Reveal className="section-head">
            <h2>{t.catalog.faqTitle}</h2>
          </Reveal>
          <Faq items={copy.faq} />
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="section">
          <div className="page">
            <Reveal className="section-head">
              <h2>{t.catalog.otherTitle}</h2>
            </Reveal>
            <ul className={s.cards}>
              {siblings.map((sibling, i) => (
                <li key={sibling.key}>
                  <Reveal delay={i * 80} className={s.cardWrap}>
                    <CategoryCard category={sibling} locale={locale} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <QuoteBand locale={locale} title={t.catalog.askTitle} text={t.catalog.askText} />
    </div>
  );
}
