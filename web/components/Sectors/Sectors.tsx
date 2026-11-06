import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { SECTORS } from '@/data/sectors';
import { categoryHref, href } from '@/data/routes';
import Reveal from '@/components/Reveal/Reveal';
import s from './Sectors.module.css';

/**
 * Where ALIOM TRADING works: established ranges (linked to the catalogue) and sectors
 * handled as sourcing on request (linked to the product request form).
 */
export default function Sectors({ locale, tint = false }: { locale: Locale; tint?: boolean }) {
  const t = getDictionary(locale);
  const request = href(locale, 'request');

  return (
    <section className={`section ${tint ? 'section--tint' : ''}`} id="sectors">
      <div className="page">
        <Reveal className="section-head section-head--center">
          <h2>{t.sectors.title}</h2>
          <p>{t.sectors.lead}</p>
        </Reveal>
        <ul className={s.grid}>
          {SECTORS.map((sector, i) => {
            const established = Boolean(sector.group || sector.category);
            const target = sector.heritage
              ? `${href(locale, 'services')}#brands`
              : sector.category
              ? categoryHref(locale, sector.category)
              : sector.group
                ? `${href(locale, 'products')}#${sector.group}`
                : request;
            return (
              <li key={sector.key}>
                <Reveal delay={(i % 3) * 80} className={`${s.card} ${established || sector.heritage ? s.established : ''}`}>
                  <span className={s.badge}>
                    {sector.heritage ? t.sectors.heritage : established ? t.sectors.established : t.sectors.onRequest}
                  </span>
                  <h3 className={s.title}>
                    <Link href={target}>{sector.name[locale]}</Link>
                  </h3>
                  <p className={s.text}>{sector.text[locale]}</p>
                  <ul className={s.flows} aria-label={t.sectors.flowsLabel}>
                    {sector.flows.map((flow) => (
                      <li key={flow}>{t.sectors.flows[flow]}</li>
                    ))}
                  </ul>
                  <span className={s.more} aria-hidden="true">
                    {sector.heritage ? t.sectors.discover : established ? t.sectors.seeRange : t.sectors.ask} →
                  </span>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <Reveal className={s.note}>
          <p>{t.sectors.note}</p>
          <Link className="btn" href={request}>
            {t.request.bandCta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
