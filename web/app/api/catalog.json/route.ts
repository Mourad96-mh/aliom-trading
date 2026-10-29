import { LOCALES } from '@/i18n/config';
import { CATEGORIES, GROUPS, PRODUCTS } from '@/data/catalog';
import { categoryHref } from '@/data/routes';

/**
 * /api/catalog.json, written at build time: the families as the code defines them, and the
 * products the pages were built with. The admin (public/admin/) reads it for its family
 * list and as the starting catalogue; public/api/admin.php refuses a product whose family
 * is not in it. Families stay in code because each carries its own page and copy.
 */
export const dynamic = 'force-static';

export function GET() {
  return Response.json({
    groups: GROUPS.map((g) => ({ key: g.key, name: g.name, categories: g.categories })),
    categories: CATEGORIES.map((c) => ({
      key: c.key,
      group: c.group,
      name: { fr: c.copy.fr.name, en: c.copy.en.name },
      href: Object.fromEntries(LOCALES.map((l) => [l, categoryHref(l, c.key)])),
    })),
    products: PRODUCTS,
  });
}
