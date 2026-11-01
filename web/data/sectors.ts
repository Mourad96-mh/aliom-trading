import type { Locale } from '@/i18n/config';
import type { CategoryKey, GroupKey } from './catalog';

/**
 * The fields ALIOM TRADING works in, from the client's brief of 2026-11-01: a general
 * trading house, with well-organised categories, "sans prétendre maîtriser tous les
 * produits". So each sector says honestly where it stands: an established range that has
 * its own catalogue pages, or sourcing on request through the product request form.
 */
type L = Record<Locale, string>;
const t = (fr: string, en: string): L => ({ fr, en });

export type Flow = 'export' | 'import';

export interface Sector {
  key: string;
  /** Export: Morocco to the world. Import: the world to Morocco. */
  flows: Flow[];
  name: L;
  text: L;
  /** Established range: links to the catalogue. Absent: sourcing on request. */
  group?: GroupKey;
  category?: CategoryKey;
}

export const SECTORS: Sector[] = [
  {
    key: 'food',
    flows: ['export', 'import'],
    name: t('Agroalimentaire', 'Food products'),
    text: t(
      'Produits de la mer, conserves, huiles, fruits et légumes du Maroc pour l’export ; huiles et conserves importées.',
      'Seafood, canned food, oils, fruit and vegetables from Morocco for export; imported oils and canned food.'
    ),
    group: 'export',
  },
  {
    key: 'packaging',
    flows: ['import'],
    name: t('Emballage', 'Packaging'),
    text: t(
      'Boîtes métalliques pour l’industrie de la conserve, et autres emballages industriels sur demande.',
      'Metal cans for the canning industry, and other industrial packaging on request.'
    ),
    category: 'metal-packaging',
  },
  {
    key: 'raw-materials',
    flows: ['export', 'import'],
    name: t('Matières premières et produits semi-finis', 'Raw materials and semi-finished goods'),
    text: t(
      'Intrants pour l’industrie et la transformation, recherchés auprès de producteurs au Maroc et à l’étranger.',
      'Inputs for manufacturing and processing, sourced from producers in Morocco and abroad.'
    ),
  },
  {
    key: 'consumer-goods',
    flows: ['export', 'import'],
    name: t('Produits de grande consommation', 'Consumer goods'),
    text: t(
      'Épicerie, boissons, produits d’hygiène et d’entretien pour la distribution et les grossistes, au Maroc comme à l’étranger.',
      'Groceries, drinks, hygiene and cleaning products for retailers and wholesalers, in Morocco and abroad.'
    ),
  },
  {
    key: 'building',
    flows: ['export', 'import'],
    name: t('Matériaux de construction', 'Building materials'),
    text: t(
      'Revêtements, quincaillerie, fournitures de chantier : nous identifions les fabricants adaptés à votre projet.',
      'Finishes, hardware, site supplies: we find the manufacturers that fit your project.'
    ),
  },
  {
    key: 'equipment',
    flows: ['export', 'import'],
    name: t('Équipements et pièces industrielles', 'Industrial equipment and parts'),
    text: t(
      'Machines, pièces de rechange et consommables, auprès de fabricants ou de distributeurs agréés.',
      'Machinery, spare parts and consumables, from manufacturers or authorised distributors.'
    ),
  },
];
