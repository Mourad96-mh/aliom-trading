import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';
import { GROUPS, categoriesIn } from './catalog';
import { categoryHref, href } from './routes';

/**
 * Accueil · Produits · Services · À propos · Blog · Contact, plus the quote basket on the
 * right. "Produits" opens a mega panel with one column per pole (sea, land, industry).
 */
export interface NavLink {
  label: string;
  href: string;
  accent?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  accent: string;
  links: NavLink[];
}

export interface NavItem extends NavLink {
  /** A plain dropdown. */
  children?: NavLink[];
  /** A mega panel: one column per group. */
  groups?: NavGroup[];
  /** Closing row of a panel — "all products". */
  footer?: NavLink;
}

export function mainNav(locale: Locale, t: Dictionary): NavItem[] {
  return [
    { label: t.nav.home, href: href(locale, 'home') },
    {
      label: t.nav.products,
      href: href(locale, 'products'),
      groups: GROUPS.map((group) => ({
        label: group.name[locale],
        href: `${href(locale, 'products')}#${group.key}`,
        accent: group.accent,
        links: categoriesIn(group.key).map((c) => ({ label: c.copy[locale].name, href: categoryHref(locale, c.key) })),
      })),
      footer: { label: t.nav.allProducts, href: href(locale, 'products') },
    },
    { label: t.nav.services, href: href(locale, 'services') },
    { label: t.nav.about, href: href(locale, 'about') },
    { label: t.nav.blog, href: href(locale, 'blog') },
    { label: t.nav.contact, href: href(locale, 'contact') },
  ];
}

/** The company, as registered (Registre du commerce de Casablanca, copy of 2024-03-05). */
export const COMPANY = {
  name: 'ALIOM TRADING',
  legalForm: 'SARL à associé unique',
  legalFormEn: 'Single-member limited liability company (SARL AU)',
  capital: '500 000 MAD',
  ice: '002810898000009',
  rc: '502559',
  rcCourt: 'Casablanca',
  founded: '2021-05-10',
  /* Spelled as in the client's own presentation; the register reads "OULIAS". */
  founder: 'Habiba Ouliass',
};

export const ADDRESS = {
  street: '2-4, rue Abou Dhabi, Oasis',
  city: 'Casablanca',
  country: 'MA',
  lines: ['2-4, rue Abou Dhabi', 'Oasis', 'Casablanca, Maroc'],
  map: 'https://www.google.com/maps/search/?api=1&query=2+rue+Abou+Dhabi+Oasis+Casablanca',
};

export const CONTACT = {
  company: COMPANY.name,
  email: 'info@aliomtrading.com',
  phone: { label: '+212 6 60 16 11 57', href: 'tel:+212660161157' },
  /* Assumed to be the same mobile — listed in docs/CONTENT-TO-VALIDATE.md. */
  whatsapp: 'https://wa.me/212660161157',
};
