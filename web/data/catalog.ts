import type { Locale } from '@/i18n/config';
import productData from './products.json';

/**
 * The catalogue, in two poles as on the client's brief of 2026-10-29 (modelled on ABS
 * GLOBAL TRADING): Moroccan products exported abroad, and foreign products imported into
 * Morocco. Timber and polymers were dropped on that brief.
 *
 * No individual product pages: no specification is published per product, so each family
 * gets one rich page instead, and every product is an anchored card on it
 * (/fr/produits/fruits-de-mer/#poulpe) that can go in the quote basket. The families and
 * their words live here, French first; the products themselves live in products.json,
 * which the admin at /admin/ edits on the server (see public/api/catalog-store.php).
 */
export type GroupKey = 'export' | 'import';
export type CategoryKey =
  | 'frozen-fish'
  | 'seafood'
  | 'canned-food'
  | 'precooked-fish'
  | 'vegetable-oils'
  | 'fruits'
  | 'vegetables'
  | 'animal-feed'
  | 'metal-packaging'
  | 'imported-oils'
  | 'imported-canned';

type L = Record<Locale, string>;
const t = (fr: string, en: string): L => ({ fr, en });

export interface Group {
  key: GroupKey;
  name: L;
  text: L;
  accent: string;
  categories: CategoryKey[];
}

export const GROUPS: Group[] = [
  {
    key: 'export',
    name: t('Export du Maroc vers l’étranger', 'Exports from Morocco'),
    text: t(
      'Produits de la mer, conserves, huiles, fruits et légumes du Maroc, pour les importateurs et distributeurs du monde entier.',
      'Seafood, canned food, oils, fruit and vegetables from Morocco, for importers and distributors worldwide.'
    ),
    accent: 'var(--cat-sea)',
    categories: [
      'frozen-fish',
      'seafood',
      'canned-food',
      'precooked-fish',
      'vegetable-oils',
      'fruits',
      'vegetables',
      'animal-feed',
    ],
  },
  {
    key: 'import',
    name: t('Import vers le Maroc', 'Imports into Morocco'),
    text: t(
      'Boîtes métalliques, huiles végétales et conserves de fabricants étrangers, pour les industriels et les distributeurs marocains.',
      'Metal cans, vegetable oils and canned food from foreign manufacturers, for Moroccan manufacturers and distributors.'
    ),
    accent: 'var(--cat-import)',
    categories: ['metal-packaging', 'imported-oils', 'imported-canned'],
  },
];

export interface CategoryCopy {
  /** Menu and card label. */
  name: string;
  /** The page's h1 — carries the main keyword. */
  h1: string;
  /** <title>, before the " — ALIOM TRADING" suffix. */
  seoTitle: string;
  description: string;
  lead: string;
  intro: string[];
  facts: { label: string; value: string }[];
  faq: { q: string; a: string }[];
}

export interface Category {
  key: CategoryKey;
  group: GroupKey;
  slugs: L;
  accent: string;
  image: string;
  copy: Record<Locale, CategoryCopy>;
}

export interface Product {
  id: string;
  category: CategoryKey;
  /** A heading inside the family page (citrus / fresh / frozen fruit). */
  sub?: L;
  name: L;
  text: L;
}

const img = (key: CategoryKey) => `/media/categories/${key}.webp`;

export const CATEGORIES: Category[] = [
  {
    key: 'frozen-fish',
    group: 'export',
    slugs: t('poisson-congele', 'frozen-fish'),
    accent: 'var(--cat-sea)',
    image: img('frozen-fish'),
    copy: {
      fr: {
        name: 'Poisson congelé',
        h1: 'Poisson congelé du Maroc',
        seoTitle: 'Poisson congelé du Maroc : sardine, maquereau, chinchard',
        description:
          'Fournisseur de poisson congelé au Maroc : sardine, maquereau, chinchard, sardinelle, sabre, rouget, sole. Entier, IQF ou en blocs, livré en conteneur frigorifique.',
        lead: 'Pélagiques et poissons blancs de l’Atlantique marocain, congelés à bord ou à terre, conditionnés à votre cahier des charges.',
        intro: [
          'La façade atlantique du Maroc est l’une des zones de pêche pélagique les plus riches au monde. ALIOM TRADING sélectionne pour vous des unités de congélation qui travaillent dans le respect des exigences HACCP, IFS et BRC, et suit chaque lot du chargement à la livraison.',
          'Sardine, maquereau, chinchard ou sardinelle pour la transformation et l’appât, poissons nobles comme le denti, le rouget ou la sole pour la distribution : dites-nous le calibre, le format et le marché visé, nous revenons vers vous avec une offre adaptée.',
        ],
        facts: [
          { label: 'Origine', value: 'Atlantique marocain' },
          { label: 'Formats', value: 'Entier, IQF, blocs, selon espèce' },
          { label: 'Conditionnement', value: 'Cartons ou blocs, marque blanche possible' },
          { label: 'Transport', value: 'Conteneur frigorifique à −18 °C' },
        ],
        faq: [
          {
            q: 'Quels poissons congelés proposez-vous ?',
            a: 'Sardine, maquereau, sardinelle (allache), chinchard, denti et dorade, rouget, pélamide, sole, sabre argenté et poisson pour appât. La disponibilité dépend des saisons de pêche : demandez-nous l’offre du moment.',
          },
          {
            q: 'Quelle quantité minimale pour une commande ?',
            a: 'Nous travaillons principalement au conteneur complet, mais des lots plus petits ou des conteneurs mixtes sont possibles selon les espèces. Indiquez vos volumes dans la demande de devis.',
          },
          {
            q: 'Pouvez-vous emballer sous notre marque ?',
            a: 'Oui. Le conditionnement en marque blanche (cartons et étiquettes à votre nom) est possible sur demande, selon les quantités.',
          },
        ],
      },
      en: {
        name: 'Frozen fish',
        h1: 'Frozen fish from Morocco',
        seoTitle: 'Frozen fish supplier in Morocco: sardines, mackerel',
        description:
          'Frozen fish supplier in Morocco: sardines, mackerel, horse mackerel, sardinella, red mullet, sole. Whole, IQF or block-frozen, shipped in reefer containers.',
        lead: 'Pelagic and white fish from Morocco’s Atlantic coast, frozen at sea or on shore and packed to your specification.',
        intro: [
          'Morocco’s Atlantic coast is one of the richest pelagic fishing grounds in the world. ALIOM TRADING selects freezing plants that work to HACCP, IFS and BRC requirements, and follows each lot from loading to delivery.',
          'Sardines, mackerel, horse mackerel or sardinella for processing and bait, premium species such as dentex, red mullet or sole for distribution: tell us the size, format and target market, and we come back with a matching offer.',
        ],
        facts: [
          { label: 'Origin', value: 'Moroccan Atlantic' },
          { label: 'Formats', value: 'Whole, IQF, blocks, by species' },
          { label: 'Packing', value: 'Cartons or blocks, private label available' },
          { label: 'Shipping', value: 'Reefer container at −18 °C' },
        ],
        faq: [
          {
            q: 'Which frozen fish do you supply?',
            a: 'Sardines, mackerel, sardinella, horse mackerel, dentex and sea bream, red mullet, bonito, sole, silver scabbardfish and bait fish. Availability follows the fishing seasons, so ask us for the current offer.',
          },
          {
            q: 'What is the minimum order?',
            a: 'We mostly work by the full container, but smaller lots and mixed containers are possible for some species. Tell us your volumes in the quote request.',
          },
          {
            q: 'Can you pack under our brand?',
            a: 'Yes. Private-label packing (cartons and labels in your name) is available on request, depending on volumes.',
          },
        ],
      },
    },
  },
  {
    key: 'seafood',
    group: 'export',
    slugs: t('fruits-de-mer', 'seafood'),
    accent: 'var(--cat-sea)',
    image: img('seafood'),
    copy: {
      fr: {
        name: 'Fruits de mer',
        h1: 'Poulpe, seiche et calamar du Maroc',
        seoTitle: 'Fruits de mer congelés : poulpe, seiche, calamar du Maroc',
        description:
          'Céphalopodes congelés du Maroc : poulpe, seiche et calamar entiers ou nettoyés, IQF ou en blocs. Grossiste et export, conditionnement à votre marque.',
        lead: 'Les céphalopodes de l’Atlantique marocain, entiers ou préparés, réfrigérés ou congelés, expédiés par conteneur ou par avion.',
        intro: [
          'Le Maroc compte parmi les premiers exportateurs mondiaux de poulpe congelé, et ses eaux donnent aussi une seiche et un calamar très recherchés. ALIOM TRADING vous met en relation avec des unités de traitement sélectionnées et suit la qualité de chaque lot.',
          'Entier, vidé, nettoyé, en anneaux ou en lanières : nous proposons plusieurs découpes, en IQF ou en blocs, avec un conditionnement neutre ou à votre marque.',
        ],
        facts: [
          { label: 'Origine', value: 'Atlantique marocain' },
          { label: 'Présentations', value: 'Entier, nettoyé, anneaux, lanières' },
          { label: 'Congélation', value: 'IQF ou blocs' },
          { label: 'Transport', value: 'Conteneur frigorifique ou fret aérien pour petits lots' },
        ],
        faq: [
          {
            q: 'Le poulpe est-il disponible toute l’année ?',
            a: 'La pêche du poulpe au Maroc est encadrée par des périodes de repos biologique. Nous vous informons des campagnes et des stocks disponibles au moment de votre demande.',
          },
          {
            q: 'Quelle différence entre IQF et blocs ?',
            a: 'En IQF, chaque pièce est surgelée séparément et se dose facilement ; en blocs, les pièces sont congelées ensemble, ce qui convient à la transformation industrielle.',
          },
          {
            q: 'Livrez-vous au Maroc et à l’export ?',
            a: 'Oui, nous servons aussi bien les clients marocains que les importateurs étrangers, selon les conditions de livraison (Incoterm) convenues.',
          },
        ],
      },
      en: {
        name: 'Seafood',
        h1: 'Octopus, cuttlefish and squid from Morocco',
        seoTitle: 'Frozen seafood from Morocco: octopus, cuttlefish, squid',
        description:
          'Frozen cephalopods from Morocco: whole or cleaned octopus, cuttlefish and squid, IQF or block-frozen. Wholesale and export, private-label packing.',
        lead: 'Cephalopods from Morocco’s Atlantic coast, whole or prepared, chilled or frozen, shipped by container or by air.',
        intro: [
          'Morocco is one of the world’s leading exporters of frozen octopus, and its waters also yield much sought-after cuttlefish and squid. ALIOM TRADING connects you with selected processing plants and follows the quality of every lot.',
          'Whole, gutted, cleaned, rings or strips: several cuts are available, IQF or block-frozen, in neutral packaging or under your own brand.',
        ],
        facts: [
          { label: 'Origin', value: 'Moroccan Atlantic' },
          { label: 'Cuts', value: 'Whole, cleaned, rings, strips' },
          { label: 'Freezing', value: 'IQF or blocks' },
          { label: 'Shipping', value: 'Reefer container, or air freight for small lots' },
        ],
        faq: [
          {
            q: 'Is octopus available all year?',
            a: 'Octopus fishing in Morocco follows biological rest periods. We tell you about the campaigns and the stock available when you ask.',
          },
          {
            q: 'What is the difference between IQF and blocks?',
            a: 'With IQF each piece is frozen separately and is easy to portion; in blocks the pieces are frozen together, which suits industrial processing.',
          },
          {
            q: 'Do you deliver in Morocco and abroad?',
            a: 'Yes, we serve Moroccan customers as well as foreign importers, on the delivery terms (Incoterm) agreed.',
          },
        ],
      },
    },
  },
  {
    key: 'canned-food',
    group: 'export',
    slugs: t('conserves-alimentaires', 'canned-food'),
    accent: 'var(--cat-sea)',
    image: img('canned-food'),
    copy: {
      fr: {
        name: 'Conserves alimentaires',
        h1: 'Conserves de poisson, thon et olives du Maroc',
        seoTitle: 'Conserves du Maroc : sardines, thon, olives, câpres',
        description:
          'Conserves du Maroc en gros : sardines, maquereaux et thon à l’huile ou à la tomate, olives vertes et noires, câpres. Marque blanche, export.',
        lead: 'Sardines, maquereaux et thon en boîte, olives de table et câpres : les conserves marocaines les plus demandées, à la marque du fabricant ou à la vôtre.',
        intro: [
          'Le Maroc est le premier exportateur mondial de conserves de sardines, et compte parmi les grands exportateurs d’olives de table et de câpres. ALIOM TRADING travaille avec des conserveries qui respectent les exigences HACCP, IFS et BRC pour fournir importateurs, distributeurs et centrales d’achat.',
          'Poisson à l’huile d’olive, à l’huile végétale ou à la tomate, olives entières, dénoyautées ou farcies, en boîtes, en bocaux ou en fûts : choisissez la recette, le format et l’étiquette, nous coordonnons la production et l’expédition.',
        ],
        facts: [
          { label: 'Produits', value: 'Sardine, maquereau, thon, olives, câpres' },
          { label: 'Recettes', value: 'Huile d’olive, huile végétale, tomate, saumure' },
          { label: 'Formats', value: 'Boîtes, bocaux ou fûts, selon le produit' },
          { label: 'Marque', value: 'Marque du fabricant ou marque blanche' },
        ],
        faq: [
          {
            q: 'Proposez-vous des conserves en marque blanche ?',
            a: 'Oui, sous réserve de quantités minimales fixées par la conserverie. Envoyez-nous votre recette, votre format et vos volumes.',
          },
          {
            q: 'Quels formats proposez-vous ?',
            a: 'Pour le poisson, du club 1/4 aux grands formats pour la restauration ; pour les olives et les câpres, des bocaux et des boîtes pour la distribution jusqu’aux fûts pour l’industrie. Nous vous indiquons les formats disponibles pour votre recette.',
          },
          {
            q: 'Comment les conserves sont-elles transportées ?',
            a: 'En conteneur sec, sur palettes filmées. Les conserves ne demandent pas de froid, ce qui simplifie la logistique.',
          },
        ],
      },
      en: {
        name: 'Canned food',
        h1: 'Canned fish, tuna and olives from Morocco',
        seoTitle: 'Canned food from Morocco: sardines, tuna, olives, capers',
        description:
          'Wholesale canned food from Morocco: sardines, mackerel and tuna in oil or tomato, green and black olives, capers. Private label and export.',
        lead: 'Canned sardines, mackerel and tuna, table olives and capers: Morocco’s most sought-after preserves, under the manufacturer’s brand or your own.',
        intro: [
          'Morocco is the world’s leading exporter of canned sardines, and one of the major exporters of table olives and capers. ALIOM TRADING works with canneries that meet HACCP, IFS and BRC requirements to supply importers, distributors and buying groups.',
          'Fish in olive oil, vegetable oil or tomato, olives whole, pitted or stuffed, in cans, jars or drums: choose the recipe, format and label, and we coordinate production and shipping.',
        ],
        facts: [
          { label: 'Products', value: 'Sardine, mackerel, tuna, olives, capers' },
          { label: 'Recipes', value: 'Olive oil, vegetable oil, tomato, brine' },
          { label: 'Formats', value: 'Cans, jars or drums, by product' },
          { label: 'Brand', value: 'Manufacturer’s brand or private label' },
        ],
        faq: [
          {
            q: 'Do you offer private-label canned food?',
            a: 'Yes, subject to the cannery’s minimum quantities. Send us your recipe, format and volumes.',
          },
          {
            q: 'Which formats do you offer?',
            a: 'For fish, from the classic 1/4 club can to large catering formats; for olives and capers, retail jars and cans up to drums for industry. We tell you which formats are available for your recipe.',
          },
          {
            q: 'How is canned food shipped?',
            a: 'In dry containers, on stretch-wrapped pallets. Canned food needs no refrigeration, which keeps logistics simple.',
          },
        ],
      },
    },
  },
  {
    key: 'precooked-fish',
    group: 'export',
    slugs: t('poisson-precuit', 'precooked-fish'),
    accent: 'var(--cat-sea)',
    image: img('precooked-fish'),
    copy: {
      fr: {
        name: 'Poisson précuit',
        h1: 'Poisson pané et produits précuits surgelés',
        seoTitle: 'Poisson pané, nuggets et burgers de poisson surgelés',
        description:
          'Produits de la mer précuits surgelés : bâtonnets de poisson pané, nuggets, burgers, boulettes et poisson pré-frit. Pour la restauration et la distribution.',
        lead: 'Bâtonnets, nuggets, burgers et boulettes à base de chair de poisson, prêts à cuisiner, pour la restauration et la grande distribution.',
        intro: [
          'Les produits élaborés à base de poisson pélagique offrent une protéine de qualité à un prix maîtrisé. Ils sont fabriqués à partir de chair de poisson sélectionnée, puis panés ou précuits et surgelés.',
          'Après décongélation et cuisson, ils gardent le goût et la texture du poisson d’origine. ALIOM TRADING vous propose une gamme adaptée à la restauration collective, aux chaînes de restauration rapide et à la distribution.',
        ],
        facts: [
          { label: 'Matière', value: 'Chair de poisson sélectionnée' },
          { label: 'Gamme', value: 'Bâtonnets, nuggets, burgers, boulettes, pré-frit' },
          { label: 'Conservation', value: 'Surgelé à −18 °C' },
          { label: 'Clients', value: 'Restauration, collectivités, distribution' },
        ],
        faq: [
          {
            q: 'Quels poissons sont utilisés ?',
            a: 'Principalement des poissons pélagiques et blancs pêchés au Maroc. La composition exacte figure sur la fiche technique de chaque produit, que nous vous transmettons sur demande.',
          },
          {
            q: 'Les produits sont-ils déjà cuits ?',
            a: 'Ils sont précuits ou pré-frits, puis surgelés : il suffit de les réchauffer ou de terminer la cuisson.',
          },
          {
            q: 'Pouvez-vous fournir une fiche technique ?',
            a: 'Oui, la fiche technique (composition, allergènes, valeurs nutritionnelles, conservation) est fournie avec chaque offre.',
          },
        ],
      },
      en: {
        name: 'Precooked fish',
        h1: 'Breaded and precooked frozen fish products',
        seoTitle: 'Frozen fish fingers, nuggets and fish burgers, wholesale',
        description:
          'Frozen precooked seafood products: breaded fish fingers, nuggets, burgers, fishballs and pre-fried fish. For food service and retail.',
        lead: 'Fish fingers, nuggets, burgers and fishballs made from fish flesh, ready to cook, for food service and retail.',
        intro: [
          'Value-added products made from pelagic fish offer quality protein at a controlled price. They are made from selected fish flesh, then breaded or precooked and frozen.',
          'After thawing and cooking they keep the taste and texture of the original fish. ALIOM TRADING offers a range suited to catering, quick-service chains and retail.',
        ],
        facts: [
          { label: 'Raw material', value: 'Selected fish flesh' },
          { label: 'Range', value: 'Fingers, nuggets, burgers, balls, pre-fried' },
          { label: 'Storage', value: 'Frozen at −18 °C' },
          { label: 'Customers', value: 'Food service, catering, retail' },
        ],
        faq: [
          {
            q: 'Which fish are used?',
            a: 'Mainly pelagic and white fish caught in Morocco. The exact composition is on each product’s data sheet, which we send on request.',
          },
          {
            q: 'Are the products already cooked?',
            a: 'They are precooked or pre-fried, then frozen: you only need to reheat or finish cooking them.',
          },
          {
            q: 'Can you provide a data sheet?',
            a: 'Yes, the product data sheet (composition, allergens, nutrition, storage) comes with every offer.',
          },
        ],
      },
    },
  },
  {
    key: 'vegetable-oils',
    group: 'export',
    slugs: t('huiles-vegetales-du-maroc', 'moroccan-vegetable-oils'),
    accent: 'var(--cat-land)',
    image: img('vegetable-oils'),
    copy: {
      fr: {
        name: 'Huiles végétales',
        h1: 'Huile d’olive, huile d’argan et huiles végétales du Maroc',
        seoTitle: 'Huile d’olive et huile d’argan du Maroc, en gros',
        description:
          'Export d’huiles végétales du Maroc : huile d’olive vierge extra, huile d’argan alimentaire et cosmétique, huile de figue de barbarie. En vrac ou conditionnées.',
        lead: 'Huile d’olive vierge extra, huile d’argan et huile de figue de barbarie, en vrac pour l’industrie ou conditionnées pour la distribution.',
        intro: [
          'Le Maroc compte parmi les grands producteurs d’huile d’olive du bassin méditerranéen, et c’est le seul pays où l’arganier pousse à l’état naturel. ALIOM TRADING sélectionne des huileries et des coopératives qui travaillent selon les normes internationales et suit chaque lot jusqu’au chargement.',
          'Huile d’olive pour la distribution et l’industrie agroalimentaire, huile d’argan torréfiée pour la cuisine ou vierge pour la cosmétique, huile de pépins de figue de barbarie : indiquez la qualité, le conditionnement et les volumes, nous revenons vers vous avec une offre.',
        ],
        facts: [
          { label: 'Origine', value: 'Oliveraies du Maroc, arganeraie du Souss' },
          { label: 'Qualités', value: 'Vierge extra, vierge, alimentaire, cosmétique' },
          { label: 'Conditionnement', value: 'Bouteilles, bidons, fûts, IBC, flexitank' },
          { label: 'Documents', value: 'Certificat d’analyse et certificat d’origine' },
        ],
        faq: [
          {
            q: 'Quelle différence entre huile d’olive vierge extra et vierge ?',
            a: 'L’huile d’olive vierge extra a une acidité libre d’au plus 0,8 % et aucun défaut au goût ; l’huile d’olive vierge tolère jusqu’à 2 % et de légers défauts. Les deux sont obtenues uniquement par des procédés mécaniques.',
          },
          {
            q: 'L’huile d’argan alimentaire et l’huile cosmétique sont-elles les mêmes ?',
            a: 'Non. L’huile alimentaire est pressée à partir d’amandons torréfiés, ce qui lui donne son goût de noisette ; l’huile cosmétique est pressée à partir d’amandons non torréfiés et reste presque sans odeur.',
          },
          {
            q: 'Quelle quantité minimale ?',
            a: 'Cela dépend du produit : l’huile d’olive se vend généralement au fût, à l’IBC ou au flexitank, l’huile d’argan et l’huile de figue de barbarie en plus petites quantités. Indiquez vos volumes dans la demande de devis.',
          },
        ],
      },
      en: {
        name: 'Vegetable oils',
        h1: 'Olive oil, argan oil and vegetable oils from Morocco',
        seoTitle: 'Olive oil and argan oil from Morocco, wholesale',
        description:
          'Vegetable oils exported from Morocco: extra virgin olive oil, culinary and cosmetic argan oil, prickly pear seed oil. In bulk or packed.',
        lead: 'Extra virgin olive oil, argan oil and prickly pear seed oil, in bulk for industry or packed for retail.',
        intro: [
          'Morocco is one of the major olive oil producers of the Mediterranean, and the only country where the argan tree grows in the wild. ALIOM TRADING selects mills and cooperatives that work to international standards and follows each lot up to loading.',
          'Olive oil for retail and the food industry, roasted argan oil for cooking or virgin argan oil for cosmetics, prickly pear seed oil: tell us the grade, packing and volumes, and we come back with an offer.',
        ],
        facts: [
          { label: 'Origin', value: 'Moroccan olive groves, Souss argan forest' },
          { label: 'Grades', value: 'Extra virgin, virgin, culinary, cosmetic' },
          { label: 'Packing', value: 'Bottles, cans, drums, IBCs, flexitanks' },
          { label: 'Documents', value: 'Certificate of analysis and of origin' },
        ],
        faq: [
          {
            q: 'What is the difference between extra virgin and virgin olive oil?',
            a: 'Extra virgin olive oil has a free acidity of at most 0.8% and no taste defects; virgin olive oil allows up to 2% and slight defects. Both are obtained by mechanical means only.',
          },
          {
            q: 'Are culinary and cosmetic argan oil the same?',
            a: 'No. Culinary oil is pressed from roasted kernels, which gives its nutty taste; cosmetic oil is pressed from unroasted kernels and stays almost odourless.',
          },
          {
            q: 'What is the minimum order?',
            a: 'It depends on the product: olive oil usually sells by the drum, IBC or flexitank, argan and prickly pear seed oil in smaller quantities. Give your volumes in the quote request.',
          },
        ],
      },
    },
  },
  {
    key: 'fruits',
    group: 'export',
    slugs: t('fruits', 'fruits'),
    accent: 'var(--cat-land)',
    image: img('fruits'),
    copy: {
      fr: {
        name: 'Fruits',
        h1: 'Agrumes et fruits du Maroc',
        seoTitle: 'Agrumes et fruits du Maroc : clémentine, orange, fraise',
        description:
          'Agrumes et fruits du Maroc pour l’export et le marché local : clémentine, mandarine Nadorcott, orange Navel et Maroc Late, fraise, grenade, avocat, fruits surgelés.',
        lead: 'Clémentines, mandarines et oranges, fruits frais de saison et fruits surgelés, sélectionnés auprès de stations de conditionnement marocaines.',
        intro: [
          'Le Maroc est l’un des premiers exportateurs mondiaux de clémentines, et ses vergers du Souss, du Gharb et de l’Oriental produisent des agrumes réputés pour leur goût et leur coloration. Les fruits frais sont conditionnés le jour de la récolte pour être expédiés sans attendre.',
          'Pour l’industrie, ALIOM TRADING propose aussi des fruits surgelés : abricot, fraise, figue, melon et agrumes, pour la confiturerie, la pâtisserie ou les boissons.',
        ],
        facts: [
          { label: 'Origine', value: 'Maroc' },
          { label: 'Présentation', value: 'Frais en colis, ou surgelé (IQF)' },
          { label: 'Calibres', value: 'Selon la variété et votre marché' },
          { label: 'Transport', value: 'Conteneur ou camion frigorifique' },
        ],
        faq: [
          {
            q: 'Quand commence la campagne d’agrumes ?',
            a: 'Les premières clémentines arrivent en automne ; les oranges tardives comme la Maroc Late prolongent la campagne jusqu’au printemps et au début de l’été. Le calendrier exact varie selon les variétés et l’année.',
          },
          {
            q: 'Proposez-vous des fruits surgelés ?',
            a: 'Oui : abricot, melon, clémentine, orange, figue et fraise surgelés, pour les industriels et la restauration.',
          },
          {
            q: 'Quels calibres et emballages ?',
            a: 'Calibres et colis (cartons, plateaux, filets) se définissent selon la variété et les usages de votre marché. Précisez-les dans votre demande de devis.',
          },
        ],
      },
      en: {
        name: 'Fruit',
        h1: 'Citrus and fruit from Morocco',
        seoTitle: 'Moroccan citrus and fruit: clementines, oranges, strawberries',
        description:
          'Moroccan citrus and fruit for export and local trade: clementines, Nadorcott mandarins, Navel and Maroc Late oranges, strawberries, avocados, frozen fruit.',
        lead: 'Clementines, mandarins and oranges, seasonal fresh fruit and frozen fruit, selected from Moroccan packing stations.',
        intro: [
          'Morocco is one of the world’s leading clementine exporters, and its orchards in the Souss, the Gharb and the Oriental grow citrus known for its flavour and colour. Fresh fruit is packed on harvest day and shipped without delay.',
          'For industry, ALIOM TRADING also supplies frozen fruit: apricots, strawberries, figs, melon and citrus, for jam makers, bakeries and beverage producers.',
        ],
        facts: [
          { label: 'Origin', value: 'Morocco' },
          { label: 'Presentation', value: 'Fresh in cartons, or frozen (IQF)' },
          { label: 'Sizes', value: 'By variety and target market' },
          { label: 'Shipping', value: 'Reefer container or truck' },
        ],
        faq: [
          {
            q: 'When does the citrus season start?',
            a: 'The first clementines arrive in autumn; late oranges such as Maroc Late extend the campaign into spring and early summer. The exact calendar varies by variety and year.',
          },
          {
            q: 'Do you supply frozen fruit?',
            a: 'Yes: frozen apricots, melon, clementines, oranges, figs and strawberries, for manufacturers and food service.',
          },
          {
            q: 'Which sizes and packaging?',
            a: 'Sizes and packs (cartons, trays, nets) are set by variety and by the customs of your market. Specify them in your quote request.',
          },
        ],
      },
    },
  },
  {
    key: 'vegetables',
    group: 'export',
    slugs: t('legumes', 'vegetables'),
    accent: 'var(--cat-land)',
    image: img('vegetables'),
    copy: {
      fr: {
        name: 'Légumes',
        h1: 'Légumes frais du Maroc',
        seoTitle: 'Légumes frais du Maroc en gros : tomate, poivron, haricot vert',
        description:
          'Légumes frais du Maroc en gros : tomate, poivron, piment, haricot vert, courgette, oignon. Approvisionnement régulier pour l’export et la distribution.',
        lead: 'Tomates, poivrons, piments, haricots verts, courgettes et oignons, en approvisionnement régulier pour les grossistes et la distribution.',
        intro: [
          'Grâce à son climat, le Maroc produit des légumes de serre et de plein champ presque toute l’année, à quelques jours de route des marchés européens. Le pays est notamment l’un des premiers exportateurs mondiaux de haricots verts.',
          'ALIOM TRADING organise des livraisons directes et régulières de légumes frais en gros. Chaque lot peut être accompagné d’un certificat d’expertise indépendant.',
        ],
        facts: [
          { label: 'Origine', value: 'Souss-Massa et autres régions du Maroc' },
          { label: 'Culture', value: 'Serre et plein champ' },
          { label: 'Conditionnement', value: 'Colis selon le produit et le marché' },
          { label: 'Transport', value: 'Camion ou conteneur frigorifique' },
        ],
        faq: [
          {
            q: 'Quels légumes proposez-vous ?',
            a: 'Tomate, poivron, piment fort, haricot vert, courgette et oignon. D’autres légumes peuvent être sourcés sur demande.',
          },
          {
            q: 'Pouvez-vous livrer chaque semaine ?',
            a: 'Oui, des programmes réguliers sont possibles pendant la saison de chaque produit. Indiquez la fréquence souhaitée dans votre demande.',
          },
          {
            q: 'Les légumes sont-ils contrôlés ?',
            a: 'Chaque lot peut faire l’objet d’une expertise indépendante avant le départ, avec un certificat remis au client.',
          },
        ],
      },
      en: {
        name: 'Vegetables',
        h1: 'Fresh vegetables from Morocco',
        seoTitle: 'Wholesale fresh vegetables from Morocco: tomatoes, peppers, beans',
        description:
          'Wholesale fresh vegetables from Morocco: tomatoes, peppers, chillies, green beans, zucchini, onions. Regular supply for export and retail.',
        lead: 'Tomatoes, peppers, chillies, green beans, zucchini and onions, in regular supply for wholesalers and retail.',
        intro: [
          'Thanks to its climate, Morocco grows greenhouse and field vegetables almost all year round, a few days’ drive from European markets. It is notably one of the world’s leading exporters of green beans.',
          'ALIOM TRADING organises regular direct deliveries of fresh vegetables in bulk. Each lot can come with an independent inspection certificate.',
        ],
        facts: [
          { label: 'Origin', value: 'Souss-Massa and other Moroccan regions' },
          { label: 'Growing', value: 'Greenhouse and open field' },
          { label: 'Packing', value: 'Packs by product and market' },
          { label: 'Shipping', value: 'Reefer truck or container' },
        ],
        faq: [
          {
            q: 'Which vegetables do you supply?',
            a: 'Tomatoes, sweet peppers, hot peppers, green beans, zucchini and onions. Other vegetables can be sourced on request.',
          },
          {
            q: 'Can you deliver every week?',
            a: 'Yes, regular programmes are possible during each product’s season. Tell us the frequency you need in your request.',
          },
          {
            q: 'Are the vegetables inspected?',
            a: 'Each lot can be inspected independently before departure, with a certificate handed to the customer.',
          },
        ],
      },
    },
  },
  {
    key: 'animal-feed',
    group: 'export',
    slugs: t('alimentation-animale', 'animal-feed'),
    accent: 'var(--cat-sea)',
    image: img('animal-feed'),
    copy: {
      fr: {
        name: 'Alimentation animale',
        h1: 'Farine et huile de poisson du Maroc',
        seoTitle: 'Farine de poisson et huile de poisson du Maroc',
        description:
          'Farine et huile de poisson du Maroc pour l’alimentation animale et l’aquaculture : protéines complètes, oméga-3, normes sanitaires internationales.',
        lead: 'Deux ingrédients clés de l’alimentation animale et de l’aquaculture, produits à partir de la sardine marocaine.',
        intro: [
          'La farine de poisson est l’une des meilleures sources naturelles de protéines animales complètes. Fabriquée à partir de sardine marocaine, elle entre dans la formulation des aliments pour volaille, aquaculture et animaux de compagnie.',
          'L’huile de poisson apporte des acides gras polyinsaturés essentiels (oméga-3) ainsi que des vitamines et minéraux naturels. Les deux produits respectent les normes internationales et les exigences sanitaires des pays importateurs.',
        ],
        facts: [
          { label: 'Matière', value: 'Sardine du Maroc' },
          { label: 'Usages', value: 'Volaille, aquaculture, petfood' },
          { label: 'Conditionnement', value: 'Big bags, sacs ou citernes (huile)' },
          { label: 'Documents', value: 'Certificat d’analyse et sanitaire' },
        ],
        faq: [
          {
            q: 'Quelle teneur en protéines pour la farine de poisson ?',
            a: 'La teneur dépend du lot et de l’usine ; elle est indiquée sur le certificat d’analyse. Dites-nous le taux minimum dont vous avez besoin.',
          },
          {
            q: 'Comment l’huile de poisson est-elle livrée ?',
            a: 'En fûts, en IBC ou en flexitank selon les volumes et la destination.',
          },
          {
            q: 'Ces produits sont-ils destinés à la consommation humaine ?',
            a: 'Non, la farine et l’huile proposées ici sont des ingrédients pour l’alimentation animale et l’aquaculture.',
          },
        ],
      },
      en: {
        name: 'Animal feed',
        h1: 'Fish meal and fish oil from Morocco',
        seoTitle: 'Fish meal and fish oil supplier in Morocco',
        description:
          'Fish meal and fish oil from Morocco for animal feed and aquaculture: complete protein, omega-3, compliant with international health standards.',
        lead: 'Two key ingredients for animal feed and aquaculture, made from Moroccan sardines.',
        intro: [
          'Fish meal is one of the best natural sources of complete animal protein. Made from Moroccan sardines, it goes into feed for poultry, aquaculture and pets.',
          'Fish oil provides essential polyunsaturated fatty acids (omega-3) as well as natural vitamins and minerals. Both products meet international standards and the health requirements of importing countries.',
        ],
        facts: [
          { label: 'Raw material', value: 'Moroccan sardines' },
          { label: 'Uses', value: 'Poultry, aquaculture, petfood' },
          { label: 'Packing', value: 'Big bags, sacks, or tanks (oil)' },
          { label: 'Documents', value: 'Certificate of analysis and health certificate' },
        ],
        faq: [
          {
            q: 'What protein content does the fish meal have?',
            a: 'It depends on the lot and the plant and is stated on the certificate of analysis. Tell us the minimum level you need.',
          },
          {
            q: 'How is fish oil delivered?',
            a: 'In drums, IBCs or flexitanks, depending on volumes and destination.',
          },
          {
            q: 'Are these products for human consumption?',
            a: 'No, the fish meal and oil offered here are ingredients for animal feed and aquaculture.',
          },
        ],
      },
    },
  },
  {
    key: 'metal-packaging',
    group: 'import',
    slugs: t('boites-metalliques', 'metal-cans'),
    accent: 'var(--cat-import)',
    image: img('metal-packaging'),
    copy: {
      fr: {
        name: 'Boîtes métalliques',
        h1: 'Boîtes métalliques et emballages pour conserveries',
        seoTitle: 'Boîtes métalliques et fer-blanc pour conserveries au Maroc',
        description:
          'Import de boîtes métalliques au Maroc : boîtes de conserve en fer-blanc, boîtes 1/4 club, couvercles easy-open, fer-blanc. Pour conserveries et industriels.',
        lead: 'Boîtes de conserve, boîtes embouties, couvercles à ouverture facile et fer-blanc, importés pour les conserveries et les industriels marocains.',
        intro: [
          'Les conserveries marocaines de poisson, de légumes et de fruits consomment chaque année de très grandes quantités d’emballages métalliques. ALIOM TRADING s’approvisionne auprès de fabricants étrangers de boîtes et de fer-blanc pour compléter l’offre locale et sécuriser vos approvisionnements.',
          'Boîtes rondes trois pièces, boîtes embouties 1/4 club ou ovales pour le poisson, couvercles easy-open, feuilles de fer-blanc vernies ou imprimées : envoyez-nous le format, le vernis intérieur, l’impression et les volumes, nous vous transmettons une offre avec la fiche technique.',
        ],
        facts: [
          { label: 'Produits', value: 'Boîtes 3 pièces, boîtes embouties, couvercles, fer-blanc' },
          { label: 'Matières', value: 'Fer-blanc, aluminium' },
          { label: 'Finitions', value: 'Vernis intérieur, impression ou boîte nue' },
          { label: 'Livraison', value: 'Ports du Maroc, ou rendu usine' },
        ],
        faq: [
          {
            q: 'Quels formats de boîtes pouvez-vous fournir ?',
            a: 'Les formats standard de l’industrie de la conserve, dont le 1/4 club pour la sardine, ainsi que des formats spécifiques sur demande. Indiquez-nous les dimensions et la contenance.',
          },
          {
            q: 'Les boîtes peuvent-elles être imprimées à notre marque ?',
            a: 'Oui, l’impression lithographiée est possible, selon les quantités minimales du fabricant. Envoyez-nous vos fichiers et vos volumes.',
          },
          {
            q: 'Fournissez-vous aussi les couvercles ?',
            a: 'Oui, les couvercles easy-open ou classiques sont proposés seuls ou avec les boîtes, dans les diamètres standard.',
          },
        ],
      },
      en: {
        name: 'Metal cans',
        h1: 'Metal cans and packaging for canneries',
        seoTitle: 'Metal cans and tinplate for canneries in Morocco',
        description:
          'Metal cans imported into Morocco: tinplate food cans, 1/4 club drawn cans, easy-open ends and tinplate sheets, for canneries and manufacturers.',
        lead: 'Food cans, drawn cans, easy-open ends and tinplate, imported for Moroccan canneries and manufacturers.',
        intro: [
          'Morocco’s fish, vegetable and fruit canneries use very large quantities of metal packaging every year. ALIOM TRADING sources from foreign can and tinplate makers to complement local supply and secure yours.',
          'Three-piece round cans, 1/4 club or oval drawn cans for fish, easy-open ends, lacquered or printed tinplate sheets: send us the format, inside lacquer, print and volumes, and we send an offer with the data sheet.',
        ],
        facts: [
          { label: 'Products', value: 'Three-piece cans, drawn cans, ends, tinplate' },
          { label: 'Materials', value: 'Tinplate, aluminium' },
          { label: 'Finishes', value: 'Inside lacquer, printed or plain' },
          { label: 'Delivery', value: 'Moroccan ports, or delivered to plant' },
        ],
        faq: [
          {
            q: 'Which can formats can you supply?',
            a: 'The canning industry’s standard formats, including the 1/4 club can for sardines, and specific formats on request. Tell us the dimensions and capacity.',
          },
          {
            q: 'Can the cans be printed with our brand?',
            a: 'Yes, lithographic printing is possible, subject to the maker’s minimum quantities. Send us your artwork and volumes.',
          },
          {
            q: 'Do you also supply the ends?',
            a: 'Yes, easy-open or standard ends are available on their own or with the cans, in standard diameters.',
          },
        ],
      },
    },
  },
  {
    key: 'imported-oils',
    group: 'import',
    slugs: t('huiles-vegetales-importees', 'imported-vegetable-oils'),
    accent: 'var(--cat-import)',
    image: img('imported-oils'),
    copy: {
      fr: {
        name: 'Huiles végétales importées',
        h1: 'Huiles de soja, de tournesol, de palme et de colza',
        seoTitle: 'Import d’huiles végétales au Maroc : soja, tournesol, palme',
        description:
          'Import d’huiles végétales au Maroc : soja, tournesol, palme et oléine, colza. Brutes ou raffinées, en vrac ou conditionnées, pour raffineurs et industriels.',
        lead: 'Huiles brutes pour les raffineries, huiles raffinées pour l’agroalimentaire et la distribution, livrées en vrac ou conditionnées.',
        intro: [
          'Le Maroc importe la grande majorité des huiles végétales qu’il consomme. ALIOM TRADING s’approvisionne auprès de producteurs et de négociants étrangers pour fournir les raffineries, les industriels de l’agroalimentaire et les distributeurs marocains.',
          'Huile de soja brute dégommée, huile de tournesol brute ou raffinée, huile de palme et oléine, huile de colza : précisez la qualité, l’origine souhaitée, le conditionnement et le calendrier, nous revenons vers vous avec une offre.',
        ],
        facts: [
          { label: 'Produits', value: 'Soja, tournesol, palme, colza' },
          { label: 'Qualités', value: 'Brute ou raffinée' },
          { label: 'Conditionnement', value: 'Vrac, flexitank, IBC, bidons, bouteilles' },
          { label: 'Documents', value: 'Certificats d’analyse, d’origine et sanitaire' },
        ],
        faq: [
          {
            q: 'Livrez-vous de l’huile brute pour le raffinage ?',
            a: 'Oui, l’huile de soja et l’huile de tournesol brutes sont proposées en vrac pour les raffineries. Indiquez les spécifications attendues.',
          },
          {
            q: 'Proposez-vous de l’huile conditionnée ?',
            a: 'Oui, l’huile raffinée peut être livrée en bidons ou en bouteilles, à la marque du fabricant ou à votre marque selon les volumes.',
          },
          {
            q: 'Quelle quantité minimale ?',
            a: 'Les offres se font généralement au conteneur ou au flexitank. Pour de plus petits volumes, contactez-nous.',
          },
        ],
      },
      en: {
        name: 'Imported vegetable oils',
        h1: 'Soybean, sunflower, palm and rapeseed oils',
        seoTitle: 'Vegetable oil imports into Morocco: soybean, sunflower, palm',
        description:
          'Vegetable oils imported into Morocco: soybean, sunflower, palm oil and olein, rapeseed. Crude or refined, in bulk or packed, for refiners and manufacturers.',
        lead: 'Crude oils for refineries, refined oils for the food industry and retail, delivered in bulk or packed.',
        intro: [
          'Morocco imports most of the vegetable oil it consumes. ALIOM TRADING sources from foreign producers and traders to supply Moroccan refineries, food manufacturers and distributors.',
          'Crude degummed soybean oil, crude or refined sunflower oil, palm oil and olein, rapeseed oil: tell us the grade, preferred origin, packing and schedule, and we come back with an offer.',
        ],
        facts: [
          { label: 'Products', value: 'Soybean, sunflower, palm, rapeseed' },
          { label: 'Grades', value: 'Crude or refined' },
          { label: 'Packing', value: 'Bulk, flexitank, IBC, cans, bottles' },
          { label: 'Documents', value: 'Certificates of analysis, origin and health' },
        ],
        faq: [
          {
            q: 'Do you supply crude oil for refining?',
            a: 'Yes, crude soybean and sunflower oil are available in bulk for refineries. Tell us the specifications you need.',
          },
          {
            q: 'Do you supply packed oil?',
            a: 'Yes, refined oil can be delivered in cans or bottles, under the maker’s brand or yours depending on volumes.',
          },
          {
            q: 'What is the minimum order?',
            a: 'Offers are usually per container or flexitank. For smaller volumes, contact us.',
          },
        ],
      },
    },
  },
  {
    key: 'imported-canned',
    group: 'import',
    slugs: t('conserves-importees', 'imported-canned-food'),
    accent: 'var(--cat-import)',
    image: img('imported-canned'),
    copy: {
      fr: {
        name: 'Conserves importées',
        h1: 'Conserves alimentaires d’importation',
        seoTitle: 'Import de conserves au Maroc : thon, maïs, tomate',
        description:
          'Import de conserves au Maroc : thon, maïs doux, concentré de tomate, champignons, légumes et fruits au sirop. Pour la distribution et la restauration.',
        lead: 'Thon, légumes, concentré de tomate et fruits au sirop de fabricants étrangers, pour les grossistes, les distributeurs et la restauration au Maroc.',
        intro: [
          'Pour compléter l’offre locale, de nombreuses conserves sont importées au Maroc : thon, maïs doux, champignons, fruits au sirop. ALIOM TRADING sélectionne des fabricants étrangers qui travaillent selon les normes internationales de sécurité alimentaire et importe pour les grossistes, les distributeurs et les professionnels de la restauration.',
          'Indiquez le produit, le format de boîte, la marque souhaitée ou la marque blanche, et les volumes : nous recherchons le fabricant adapté et vous transmettons une offre avec la fiche technique.',
        ],
        facts: [
          { label: 'Produits', value: 'Thon, légumes, tomate, fruits au sirop' },
          { label: 'Formats', value: 'Du format familial au format restauration' },
          { label: 'Marque', value: 'Marque du fabricant ou marque blanche' },
          { label: 'Étiquetage', value: 'Conforme à la réglementation marocaine' },
        ],
        faq: [
          {
            q: 'Pouvez-vous importer une marque précise ?',
            a: 'Oui, si la marque est disponible à l’export. Sinon, nous vous proposons un produit équivalent ou une marque blanche.',
          },
          {
            q: 'Quels formats de boîtes ?',
            a: 'Des petits formats pour la distribution jusqu’aux boîtes de plusieurs kilos pour la restauration. Précisez le format dans votre demande.',
          },
          {
            q: 'Qui s’occupe du contrôle sanitaire à l’import ?',
            a: 'Nous préparons avec vous le dossier pour le contrôle de l’ONSSA et les formalités de dédouanement.',
          },
        ],
      },
      en: {
        name: 'Imported canned food',
        h1: 'Imported canned food',
        seoTitle: 'Canned food imports into Morocco: tuna, corn, tomato',
        description:
          'Canned food imported into Morocco: tuna, sweet corn, tomato paste, mushrooms, vegetables and fruit in syrup. For distribution and food service.',
        lead: 'Tuna, vegetables, tomato paste and fruit in syrup from foreign manufacturers, for wholesalers, distributors and food service in Morocco.',
        intro: [
          'Many canned foods are imported into Morocco to complement local supply: tuna, sweet corn, mushrooms, fruit in syrup. ALIOM TRADING selects foreign manufacturers that work to international food safety standards and imports for wholesalers, distributors and food-service professionals.',
          'Tell us the product, can size, preferred brand or private label, and volumes: we find the right manufacturer and send you an offer with the data sheet.',
        ],
        facts: [
          { label: 'Products', value: 'Tuna, vegetables, tomato, fruit in syrup' },
          { label: 'Formats', value: 'From retail to catering sizes' },
          { label: 'Brand', value: 'Manufacturer’s brand or private label' },
          { label: 'Labelling', value: 'Compliant with Moroccan regulations' },
        ],
        faq: [
          {
            q: 'Can you import a specific brand?',
            a: 'Yes, if the brand is available for export. If not, we offer an equivalent product or a private label.',
          },
          {
            q: 'Which can sizes?',
            a: 'From small retail sizes to multi-kilo catering cans. Give the size in your request.',
          },
          {
            q: 'Who handles the import health inspection?',
            a: 'We prepare the file for the ONSSA inspection and the customs formalities with you.',
          },
        ],
      },
    },
  },
];

/**
 * The products: products.json is the snapshot the build bakes into the pages. Once the site
 * is live, the admin (/admin/) edits the server's copy and the pages read it after load
 * (components/Catalog/liveProducts.ts); scripts/pull-products.mjs brings it back here
 * before a build so the static HTML catches up. A product whose family no longer exists is
 * left out rather than failing the build.
 */
export const PRODUCTS: Product[] = (productData as Product[]).filter((p) => {
  const known = CATEGORIES.some((c) => c.key === p.category);
  if (!known) console.warn(`products.json: "${p.id}" is in unknown family "${p.category}", left out`);
  return known;
});

export const getCategory = (key: string) => CATEGORIES.find((c) => c.key === key);
export const categoryCopy = (category: Category, locale: Locale) => category.copy[locale];
export const productsIn = (key: CategoryKey) => PRODUCTS.filter((p) => p.category === key);
export const categoriesIn = (group: GroupKey) =>
  GROUPS.find((g) => g.key === group)!.categories.map((key) => getCategory(key)!);
export const groupOf = (key: CategoryKey) => GROUPS.find((g) => g.categories.includes(key))!;

/** The product's card on its family page, e.g. #poulpe. */
export const productAnchor = (product: Product) => product.id;
