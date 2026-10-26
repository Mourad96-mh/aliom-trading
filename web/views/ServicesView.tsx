import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href } from '@/data/routes';
import { breadcrumbs } from '@/data/schema';
import PageHeader from '@/components/PageHeader/PageHeader';
import NumberedPoints from '@/components/WhyMorocco/WhyMorocco';
import QuoteBand from '@/components/QuoteBand/QuoteBand';
import Reveal from '@/components/Reveal/Reveal';
import JsonLd from '@/components/JsonLd/JsonLd';
import s from './ServicesView.module.css';

/* One pictogram per service, in the dictionary's order. */
const ICONS = [
  /* Brand representation — a handshake-like pair of hands as two linked rings. */
  <svg key="brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5 14.4 8l5 .7-3.6 3.5.9 5L12 14.9l-4.7 2.3.9-5L4.6 8.7l5-.7Z" />
    <path d="M7 21h10" />
  </svg>,
  /* Sourcing — a magnifier over a box. */
  <svg key="sourcing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
  </svg>,
  /* Import — an arrow into a box. */
  <svg key="import" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13v6.5h16V13" />
    <path d="M12 3v11M7.5 9.5 12 14l4.5-4.5" />
  </svg>,
  /* Export — an arrow out of a box. */
  <svg key="export" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13v6.5h16V13" />
    <path d="M12 14V3M7.5 7.5 12 3l4.5 4.5" />
  </svg>,
  /* Quality control — a clipboard with a tick. */
  <svg key="qc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V2.5h6V4M8.8 13l2.2 2.2 4.2-4.4" />
  </svg>,
  /* Logistics — a container ship. */
  <svg key="logistics" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 14h19l-2.2 5.5H5Z" />
    <path d="M5.5 14V9.5h5V14M10.5 14V7h5v7M15.5 14v-3.5h3V14" />
  </svg>,
];

export default function ServicesView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const crumbs = [{ label: t.nav.home, href: href(locale, 'home') }, { label: t.services.title }];

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <PageHeader
        eyebrow={t.services.title}
        title={t.services.h1}
        lead={t.services.lead}
        crumbs={crumbs}
        crumbLabel={t.a11y.breadcrumb}
        image="/media/scenes/services.webp"
      />

      <section className="section">
        <div className="page">
          <ul className={s.grid}>
            {t.services.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 3) * 80} className={s.card}>
                  <span className={s.icon} aria-hidden="true">
                    {ICONS[i]}
                  </span>
                  <h2 className={s.title}>{item.title}</h2>
                  <p className={s.text}>{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NumberedPoints title={t.services.processTitle} points={t.services.steps} />

      <section className="section">
        <div className="page">
          <Reveal className={s.brands}>
            <div>
              <h2 className={s.brandsTitle}>{t.services.brandsTitle}</h2>
              <p className={s.brandsText}>{t.services.brandsText}</p>
            </div>
            <Link className="btn" href={href(locale, 'contact')}>
              {t.services.brandsCta}
            </Link>
          </Reveal>
        </div>
      </section>

      <QuoteBand locale={locale} />
    </>
  );
}
