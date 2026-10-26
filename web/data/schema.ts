import { SITE_URL, type Locale } from '@/i18n/config';
import { ADDRESS, COMPANY, CONTACT } from './nav';

/**
 * JSON-LD builders. No `Product` markup: Google wants a price, offers or reviews for it,
 * and a B2B trader publishes none of them.
 */
export function organization(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.name,
    url: `${SITE_URL}/${locale}/`,
    logo: `${SITE_URL}/media/brand/aliom-logo.png`,
    email: CONTACT.email,
    telephone: CONTACT.phone.href.replace('tel:', ''),
    description,
    foundingDate: COMPANY.founded,
    taxID: COMPANY.ice,
    founder: { '@type': 'Person', name: COMPANY.founder },
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressCountry: ADDRESS.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: CONTACT.phone.href.replace('tel:', ''),
      email: CONTACT.email,
      availableLanguage: ['fr', 'en', 'ar'],
    },
  };
}

export function breadcrumbs(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export function itemList(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.href}`,
    })),
  };
}

/** Valid markup that search engines and answer engines read; Google no longer shows it as a rich result for this kind of site. */
export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function article(a: { title: string; description: string; date: string; image: string; href: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    image: `${SITE_URL}${a.image}`,
    mainEntityOfPage: `${SITE_URL}${a.href}`,
    author: { '@type': 'Organization', name: COMPANY.name, '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}
