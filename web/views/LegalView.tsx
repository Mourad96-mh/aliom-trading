import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href } from '@/data/routes';
import PageHeader from '@/components/PageHeader/PageHeader';
import s from './Shared.module.css';

/** Legal notice + privacy (Law 09-08), to be validated by the client (docs/CONTENT-TO-VALIDATE.md). */
export default function LegalView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const crumbs = [{ label: t.nav.home, href: href(locale, 'home') }, { label: t.legal.title }];

  return (
    <>
      <PageHeader title={t.legal.h1} lead={t.legal.lead} crumbs={crumbs} crumbLabel={t.a11y.breadcrumb} />
      <section className="section">
        <div className={`page-narrow ${s.prose}`}>
          {t.legal.sections.map((section) => (
            <div key={section.h}>
              <h2>{section.h}</h2>
              <p>{section.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
