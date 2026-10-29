import { LOCALES, type Locale } from '@/i18n/config';
import { CATEGORIES, getCategory, type CategoryKey, type Product } from './catalog';
import { ARTICLES } from './blog';
import words from './route-words.json';

/**
 * Every page of the site lives under `app/[locale]/[[...path]]`, resolved against the
 * table below. A static export cannot run middleware, so localised URLs are baked at
 * build time: /fr/produits/fruits-de-mer/, /en/products/seafood/.
 *
 * `key` names the same page across languages: the language switcher and hreflang use it.
 */
export type View =
  | 'home'
  | 'products'
  | 'category'
  | 'services'
  | 'about'
  | 'blog'
  | 'article'
  | 'contact'
  | 'quote'
  | 'request'
  | 'legal';

export type WordKey = keyof typeof words;
export const WORDS = words as Record<WordKey, Record<Locale, string>>;

export interface RouteParams {
  category?: CategoryKey;
  article?: string;
}

export interface Route {
  view: View;
  locale: Locale;
  /** Path segments after the locale, e.g. ['produits', 'fruits-de-mer']. */
  path: string[];
  params: RouteParams;
  key: string;
}

const w = (k: WordKey, l: Locale) => WORDS[k][l];

function routesFor(locale: Locale): Route[] {
  const out: Route[] = [];
  const add = (view: View, key: string, path: string[], params: RouteParams = {}) =>
    out.push({ view, locale, path, params, key });

  add('home', 'home', []);
  add('products', 'products', [w('products', locale)]);
  for (const category of CATEGORIES) {
    add('category', `category:${category.key}`, [w('products', locale), category.slugs[locale]], {
      category: category.key,
    });
  }
  add('services', 'services', [w('services', locale)]);
  add('about', 'about', [w('about', locale)]);
  add('blog', 'blog', [w('blog', locale)]);
  for (const article of ARTICLES) {
    add('article', `article:${article.id}`, [w('blog', locale), article.slugs[locale]], { article: article.id });
  }
  add('contact', 'contact', [w('contact', locale)]);
  add('quote', 'quote', [w('quote', locale)]);
  add('request', 'request', [w('request', locale)]);
  add('legal', 'legal', [w('legal', locale)]);

  return out;
}

export const ALL_ROUTES: Route[] = LOCALES.flatMap(routesFor);

const BY_PATH = new Map(ALL_ROUTES.map((r) => [`${r.locale}/${r.path.join('/')}`, r]));
const BY_KEY = new Map(ALL_ROUTES.map((r) => [`${r.locale}|${r.key}`, r]));

export function resolveRoute(locale: Locale, path: string[] = []): Route | undefined {
  return BY_PATH.get(`${locale}/${path.join('/')}`);
}

export const routeHref = (route: Route): string =>
  route.path.length ? `/${route.locale}/${route.path.join('/')}/` : `/${route.locale}/`;

export function href(locale: Locale, key: string): string {
  const route = BY_KEY.get(`${locale}|${key}`);
  return route ? routeHref(route) : `/${locale}/`;
}

/** The same page in every language — feeds the switcher and hreflang. */
export const translationsOf = (key: string) => LOCALES.map((locale) => ({ locale, href: href(locale, key) }));

export const categoryHref = (locale: Locale, key: CategoryKey) => href(locale, `category:${key}`);
export const articleHref = (locale: Locale, id: string) => href(locale, `article:${id}`);
/** A product is a card on its family page. */
export const productHref = (locale: Locale, product: Product) =>
  `${categoryHref(locale, getCategory(product.category)!.key)}#${product.id}`;
