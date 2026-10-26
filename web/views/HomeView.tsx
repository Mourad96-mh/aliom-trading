import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { GROUPS, categoriesIn } from '@/data/catalog';
import { ARTICLES } from '@/data/blog';
import { articleHref, categoryHref, href } from '@/data/routes';
import HeroVideo from '@/components/Hero/HeroVideo';
import FeatureRow from '@/components/FeatureRow/FeatureRow';
import QuoteBand from '@/components/QuoteBand/QuoteBand';
import Reveal from '@/components/Reveal/Reveal';
import { formatDate } from './BlogView';
import s from './HomeView.module.css';

/* Line pictograms at currentColor, one per commitment, in the dictionary's order. */
const PILLAR_ICONS = [
  /* Quality — a shield with a tick. */
  <svg key="quality" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21.5s7.5-3.2 7.5-9.5V5.2L12 2.5 4.5 5.2V12c0 6.3 7.5 9.5 7.5 9.5Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </svg>,
  /* Product quality — a magnifier. */
  <svg key="selection" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5M8 10.5l1.8 1.8 3.2-3.6" />
  </svg>,
  /* Always available — a speech bubble. */
  <svg key="dialogue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M4 5.5h16v10H9.5L5 19.5v-4H4Z" />
    <path d="M8 9.5h8M8 12.5h5" strokeLinecap="round" />
  </svg>,
  /* Logistics — a container ship. */
  <svg key="logistics" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 14h19l-2.2 5.5H5Z" />
    <path d="M5.5 14V9.5h5V14M10.5 14V7h5v7M15.5 14v-3.5h3V14" />
  </svg>,
  /* Technical support — a headset. */
  <svg key="support" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
    <rect x="3" y="13.5" width="4" height="6" rx="1.5" />
    <rect x="17" y="13.5" width="4" height="6" rx="1.5" />
    <path d="M19 19.5c0 1.4-1.6 2-4 2h-1.5" />
  </svg>,
];

const GROUP_IMAGE = {
  sea: '/media/scenes/sea.webp',
  land: '/media/scenes/land.webp',
  industry: '/media/scenes/industry.webp',
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

      {/* Who we are: the h1, the client's own words, then the five commitments. */}
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

          <Reveal>
            <h2 className={s.pillarsTitle}>{t.home.pillarsTitle}</h2>
          </Reveal>
          <ol className={s.pillars}>
            {t.home.pillars.map((pillar, i) => (
              <li key={pillar.title} className={s.pillar}>
                <Reveal delay={i * 70} className={s.pillarInner}>
                  <span className={s.pillarHead} aria-hidden="true">
                    <span className={s.pillarIcon}>{PILLAR_ICONS[i]}</span>
                    <span className={s.pillarNumber}>{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <strong className={s.pillarTitle}>{pillar.title}</strong>
                  <span className={s.pillarText}>{pillar.text}</span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The three divisions as alternating rows, each listing its product families. */}
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
                  <p className={s.statNumber}>{fact.value}</p>
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
