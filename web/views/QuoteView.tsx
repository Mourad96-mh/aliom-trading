import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { CATEGORIES, PRODUCTS } from '@/data/catalog';
import { CONTACT } from '@/data/nav';
import { href } from '@/data/routes';
import PageHeader from '@/components/PageHeader/PageHeader';
import QuoteForm from '@/components/Quote/QuoteForm';
import MissingProduct from '@/components/MissingProduct/MissingProduct';

export default function QuoteView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const crumbs = [{ label: t.nav.home, href: href(locale, 'home') }, { label: t.quote.title }];

  return (
    <>
      <PageHeader title={t.quote.title} lead={t.quote.intro} crumbs={crumbs} crumbLabel={t.a11y.breadcrumb} />
      <section className="section">
        <div className="page">
          <QuoteForm
            locale={locale}
            products={PRODUCTS}
            images={Object.fromEntries(CATEGORIES.map((c) => [c.key, c.image]))}
            productsHref={href(locale, 'products')}
            privacyHref={href(locale, 'legal')}
            email={CONTACT.email}
            whatsapp={CONTACT.whatsapp}
            labels={{ ...t.quote, orWhatsapp: t.contact.orWhatsapp, consent: t.contact.consent }}
          />
          <MissingProduct locale={locale} />
        </div>
      </section>
    </>
  );
}
