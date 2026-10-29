import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DEFAULT_LOCALE, LOCALE_HREFLANG, LOCALE_OG, SITE_URL, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { ALL_ROUTES, resolveRoute, translationsOf, type Route } from '@/data/routes';
import { getCategory } from '@/data/catalog';
import { getArticle } from '@/data/blog';

import HomeView from '@/views/HomeView';
import ProductsView from '@/views/ProductsView';
import CategoryView from '@/views/CategoryView';
import ServicesView from '@/views/ServicesView';
import AboutView from '@/views/AboutView';
import BlogView from '@/views/BlogView';
import ArticleView from '@/views/ArticleView';
import ContactView from '@/views/ContactView';
import QuoteView from '@/views/QuoteView';
import ProductRequestView from '@/views/ProductRequestView';
import LegalView from '@/views/LegalView';

/**
 * Every page of the site is rendered from here. A static export cannot run middleware, so
 * localised URLs are baked at build time from the table in data/routes.ts.
 */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  return ALL_ROUTES.filter((r) => r.locale === params.locale).map((r) => ({ path: r.path }));
}

interface Seo {
  title: string;
  description: string;
  image?: string;
  absolute?: boolean;
  noindex?: boolean;
}

function seoFor(route: Route, locale: Locale): Seo {
  const t = getDictionary(locale);

  switch (route.view) {
    case 'home':
      return { title: `${t.site.name} — ${t.site.tagline}`, description: t.site.description, absolute: true, image: '/media/og.jpg' };
    case 'products':
      return { title: t.products.h1, description: t.products.seoDescription, image: '/media/scenes/products.webp' };
    case 'category': {
      const category = getCategory(route.params.category!)!;
      const copy = category.copy[locale];
      return { title: copy.seoTitle, description: copy.description, image: category.image };
    }
    case 'services':
      return { title: t.services.h1, description: t.services.seoDescription, image: '/media/scenes/services.webp' };
    case 'about':
      return { title: t.about.title, description: t.about.seoDescription, image: '/media/scenes/about.webp' };
    case 'blog':
      return { title: t.blog.h1, description: t.blog.lead };
    case 'article': {
      const a = getArticle(route.params.article!)!;
      return { title: a.copy[locale].title, description: a.copy[locale].excerpt, image: a.image };
    }
    case 'contact':
      return { title: t.contact.title, description: t.contact.seoDescription };
    case 'quote':
      // The basket is personal and empty for a crawler: not worth indexing.
      return { title: t.quote.title, description: t.quote.intro, noindex: true };
    case 'request':
      return { title: t.request.title, description: t.request.seoDescription };
    case 'legal':
      return { title: t.legal.title, description: t.legal.lead };
  }
}

export async function generateMetadata(props: PageProps<'/[locale]/[[...path]]'>): Promise<Metadata> {
  const { locale: raw, path } = await props.params;
  if (!isLocale(raw)) return {};
  const route = resolveRoute(raw, path ?? []);
  if (!route) return {};

  const seo = seoFor(route, raw);
  const alternates = translationsOf(route.key);
  const self = `${SITE_URL}${alternates.find((a) => a.locale === raw)!.href}`;
  /* The " — ALIOM TRADING" suffix only where the whole title still fits Google's ~65 characters. */
  const suffix = ` — ${getDictionary(raw).site.name}`;
  const absolute = seo.absolute || seo.title.length + suffix.length > 65;

  return {
    title: absolute ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: {
      canonical: self,
      languages: {
        ...Object.fromEntries(alternates.map(({ locale, href }) => [LOCALE_HREFLANG[locale], `${SITE_URL}${href}`])),
        'x-default': `${SITE_URL}${alternates.find((a) => a.locale === DEFAULT_LOCALE)!.href}`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: self,
      locale: LOCALE_OG[raw],
      ...(seo.image ? { images: [{ url: seo.image }] } : {}),
    },
    ...(seo.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function Page(props: PageProps<'/[locale]/[[...path]]'>) {
  const params = await props.params;
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const route = resolveRoute(locale, params.path ?? []);
  if (!route) notFound();

  switch (route.view) {
    case 'home':
      return <HomeView locale={locale} />;
    case 'products':
      return <ProductsView locale={locale} />;
    case 'category':
      return <CategoryView locale={locale} categoryKey={route.params.category!} />;
    case 'services':
      return <ServicesView locale={locale} />;
    case 'about':
      return <AboutView locale={locale} />;
    case 'blog':
      return <BlogView locale={locale} />;
    case 'article':
      return <ArticleView locale={locale} id={route.params.article!} />;
    case 'contact':
      return <ContactView locale={locale} />;
    case 'quote':
      return <QuoteView locale={locale} />;
    case 'request':
      return <ProductRequestView locale={locale} />;
    case 'legal':
      return <LegalView locale={locale} />;
  }
}

/** Only the routes in the table exist; anything else is a 404 at build time. */
export const dynamicParams = false;
