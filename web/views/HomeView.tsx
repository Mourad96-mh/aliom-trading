import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { CATEGORIES, GROUPS, categoriesIn } from '@/data/catalog';
import { ARTICLES } from '@/data/blog';
import { articleHref, categoryHref, href } from '@/data/routes';
import HeroVideo from '@/components/Hero/HeroVideo';
import FeatureRow from '@/components/FeatureRow/FeatureRow';
import QuoteBand from '@/components/QuoteBand/QuoteBand';
import Reveal from '@/components/Reveal/Reveal';
import { formatDate } from './BlogView';
import s from './HomeView.module.css';

const GROUP_IMAGE = {
  export: '/media/scenes/sea.webp',
  import: '/media/scenes/mission.webp',
} as const;

export default function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const articles = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      <HeroVideo
        eyebrow={t.home.heroEyebrow}
        title={t.home.heroTitle}
        subtitle={t.home.heroText}
        ctas={[
          { label: t.home.heroPrimary, href: href(locale, 'products') },
          { label: t.home.heroSecondary, href: href(locale, 'quote') },
        ]}
        poster="/media/hero/hero-poster.webp"
        sources={[{ src: '/media/hero/hero.mp4', type: 'video/mp4' }]}
      />

      {/* Who we are: the h1 and the client's own words. */}
      <section className={`section ${s.intro}`}>
        <div className="page">
          <Reveal>
            <header className={s.introHead}>
              <p className={s.introEyebrow}>{t.home.eyebrow}</p>
              <h1 className={s.introTitle}>{t.home.title}</h1>
            </header>
          </Reveal>

          <div className={s.introBody}>
            <Reveal delay={80}>
              <p className={s.introLead}>{t.home.lead}</p>
            </Reveal>
            <Reveal delay={160} className={s.introAside}>
              {t.home.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Export and import as alternating rows, each listing its product families. */}
      <section className="section section--tint" id="poles">
        <div className="page">
          <Reveal className="section-head section-head--center">
            <h2>{t.home.polesTitle}</h2>
            <p>{t.home.polesLead}</p>
          </Reveal>
          {GROUPS.map((group, i) => (
            <FeatureRow
              key={group.key}
              index={i}
              eyebrow={`0${i + 1}`}
              title={group.name[locale]}
              body={<p>{group.text[locale]}</p>}
              image={GROUP_IMAGE[group.key]}
              imageAlt={group.name[locale]}
              accent={group.accent}
              aside={
                <ul className={s.tags}>
                  {categoriesIn(group.key).map((c) => (
                    <li key={c.key}>
                      <Link href={categoryHref(locale, c.key)}>{c.copy[locale].name}</Link>
                    </li>
                  ))}
                </ul>
              }
              link={{ label: t.nav.allProducts, href: `${href(locale, 'products')}#${group.key}` }}
            />
          ))}
        </div>
      </section>

      {/* Mission and values on the brand colour. */}
      <section className={`section ${s.mission}`}>
        <div className={`page ${s.missionInner}`}>
          <Reveal>
            <p className={s.missionEyebrow}>{t.home.missionEyebrow}</p>
            <p className={s.missionText}>{t.home.mission}</p>
          </Reveal>
          <Reveal delay={120} className={s.values}>
            <h2 className={s.valuesTitle}>{t.home.valuesTitle}</h2>
            <ul className={s.valueList}>
              {t.home.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Facts band — only stated, checkable figures. */}
      <section className="section">
        <div className="page">
          <ul className={s.stats}>
            {t.home.facts.map((fact, i) => (
              <li key={fact.label}>
                <Reveal className={s.stat} delay={i * 110}>
                  <p className={s.statNumber}>{fact.value.replace('{families}', String(CATEGORIES.length))}</p>
                  <p className={s.statLabel}>{fact.label}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tint">
        <div className="page">
          <Reveal className={s.blogHead}>
            <div className="section-head">
              <h2>{t.home.blogTitle}</h2>
              <p>{t.home.blogLead}</p>
            </div>
            <Link className="btn btn--ghost" href={href(locale, 'blog')}>
              {t.home.blogAll}
            </Link>
          </Reveal>
          <ul className={s.posts}>
            {articles.map((article, i) => (
              <li key={article.id}>
                <Reveal delay={i * 90} className={s.post}>
                  <div className={s.postMedia}>
                    <Image src={article.image} alt="" width={1200} height={800} sizes="(min-width: 900px) 400px, 100vw" className={s.postImg} />
                  </div>
                  <time className={s.postDate} dateTime={article.date}>
                    {formatDate(article.date, locale)}
                  </time>
                  <h3 className={s.postTitle}>
                    <Link href={articleHref(locale, article.id)}>{article.copy[locale].title}</Link>
                  </h3>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteBand locale={locale} />
    </>
  );
}
