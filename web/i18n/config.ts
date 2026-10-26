export const LOCALES = ['fr', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

/** French is the client's language and the language of Moroccan B2B trade. */
export const DEFAULT_LOCALE: Locale = 'fr';

export const LOCALE_NAMES: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
};

/** `hreflang` values — plain language codes: the site targets buyers in Morocco and abroad. */
export const LOCALE_HREFLANG: Record<Locale, string> = { fr: 'fr', en: 'en' };

/** Open Graph locales. */
export const LOCALE_OG: Record<Locale, string> = { fr: 'fr_MA', en: 'en_GB' };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const SITE_URL = 'https://aliomtrading.com';
