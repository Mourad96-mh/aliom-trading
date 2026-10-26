import Image from 'next/image';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { COMPANY } from '@/data/nav';
import { href } from '@/data/routes';
import { breadcrumbs } from '@/data/schema';
import PageHeader from '@/components/PageHeader/PageHeader';
import NumberedPoints from '@/components/WhyMorocco/WhyMorocco';
import ContactCard from '@/components/ContactCard/ContactCard';
import QuoteBand from '@/components/QuoteBand/QuoteBand';
import Reveal from '@/components/Reveal/Reveal';
import JsonLd from '@/components/JsonLd/JsonLd';
import s from './AboutView.module.css';

/** The client's own "À propos de nous", section by section. */
export default function AboutView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const crumbs = [{ label: t.nav.home, href: href(locale, 'home') }, { label: t.about.title }];

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <PageHeader
        eyebrow={t.about.title}
        title={t.about.h1}
        lead={t.about.lead}
        crumbs={crumbs}
        crumbLabel={t.a11y.breadcrumb}
        image="/media/scenes/about.webp"
      />

      {/* The story and the founder. */}
      <section className="section">
        <div className={`page ${s.story}`}>
          <Reveal className={s.storyText}>
            {t.about.story.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <p className={s.founder}>
              <strong>{COMPANY.founder}</strong>
              <span>{t.about.founderRole}</span>
            </p>
          </Reveal>
          <Reveal delay={120} className={s.engagement}>
            <h2 className={s.engagementTitle}>{t.about.engagementTitle}</h2>
            <p>{t.about.engagement}</p>
            <ul className={s.badges} aria-label="HACCP, IFS, BRC">
              <li>HACCP</li>
              <li>IFS</li>
              <li>BRC</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Strengths, availability, product quality, technical support. */}
      <section className="section section--tint">
        <div className={`page ${s.blocksLayout}`}>
          <Reveal className={s.blocksMedia}>
            <Image src="/media/scenes/quality.webp" alt="" width={1200} height={800} sizes="(min-width: 960px) 480px, 100vw" />
          </Reveal>
          <div className={s.blocks}>
            {t.about.blocks.map((block, i) => (
              <Reveal key={block.title} delay={i * 80} className={s.block}>
                <h2 className={s.blockTitle}>{block.title}</h2>
                <p>{block.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NumberedPoints title={t.about.valuesTitle} points={t.about.values} tint={false} />

      {/* The mission, then the company card. */}
      <section className={`section ${s.missionBand}`}>
        <div className="page">
          <Reveal className={s.mission}>
            <p className={s.missionEyebrow}>{t.about.missionTitle}</p>
            <p className={s.missionText}>{t.about.mission}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className={`page ${s.identityLayout}`}>
          <Reveal>
            <h2 className={s.identityTitle}>{t.about.identityTitle}</h2>
            <dl className={s.identity}>
              {t.about.identity.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120}>
            <ContactCard locale={locale} />
          </Reveal>
        </div>
      </section>

      <QuoteBand locale={locale} />
    </>
  );
}
