import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { CONTACT } from '@/data/nav';
import { href } from '@/data/routes';
import { breadcrumbs } from '@/data/schema';
import PageHeader from '@/components/PageHeader/PageHeader';
import ContactCard from '@/components/ContactCard/ContactCard';
import ProductRequestForm from '@/components/forms/ProductRequestForm';
import Reveal from '@/components/Reveal/Reveal';
import JsonLd from '@/components/JsonLd/JsonLd';
import s from './ContactView.module.css';

/**
 * A product that is not in the catalogue yet: the list is not limited (client's brief of
 * 2026-10-29), so a buyer describes what they need and we source it.
 */
export default function ProductRequestView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const crumbs = [
    { label: t.nav.home, href: href(locale, 'home') },
    { label: t.products.title, href: href(locale, 'products') },
    { label: t.request.title },
  ];

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <PageHeader
        eyebrow={t.products.title}
        title={t.request.h1}
        lead={t.request.lead}
        crumbs={crumbs}
        crumbLabel={t.a11y.breadcrumb}
      />

      <section className="section">
        <div className={`page ${s.layout}`}>
          <div className={s.side}>
            <Reveal>
              <h2 className={s.formTitle}>{t.request.stepsTitle}</h2>
              <ol className={s.steps}>
                {t.request.steps.map((step) => (
                  <li key={step.title}>
                    <strong>{step.title}</strong>
                    <span>{step.text}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <ContactCard locale={locale} />
            </Reveal>
          </div>

          <Reveal delay={120} className={s.formCard}>
            <h2 className={s.formTitle}>{t.request.formTitle}</h2>
            <ProductRequestForm
              locale={locale}
              labels={{ ...t.request.form, orWhatsapp: t.contact.orWhatsapp, consent: t.contact.consent }}
              email={CONTACT.email}
              whatsapp={CONTACT.whatsapp}
              privacyHref={href(locale, 'legal')}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
