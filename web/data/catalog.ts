import type { Locale } from '@/i18n/config';

/**
 * The catalogue — the nine product families of the client's reference site
 * (univela-morocco.com, chosen by the client on 2026-10-26), grouped in three poles.
 *
 * No individual product pages: the reference publishes no specification per product, so 58
 * product pages would be 58 thin pages. Each family gets one rich page instead, and every
 * product is an anchored card on it (/fr/produits/fruits-de-mer/#poulpe) that can go in the
 * quote basket. Words live here next to the structure, French first.
 */
export type GroupKey = 'sea' | 'land' | 'industry';
export type CategoryKey =
  | 'frozen-fish'
  | 'canned-fish'
  | 'precooked-fish'
  | 'seafood'
  | 'fruits'
  | 'vegetables'
  | 'wood'
  | 'animal-feed'
  | 'polymers';

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
    key: 'sea',
    name: t('Produits de la mer', 'Seafood products'),
    text: t(
      'Poissons pélagiques et blancs congelés, céphalopodes, conserves et produits élaborés.',
      'Frozen pelagic and white fish, cephalopods, canned fish and value-added products.'
    ),
    accent: 'var(--cat-sea)',
    categories: ['frozen-fish', 'seafood', 'canned-fish', 'precooked-fish'],
  },
  {
    key: 'land',
    name: t('Fruits & légumes', 'Fruit & vegetables'),
    text: t(
      'Agrumes, fruits frais et surgelés, légumes de plein champ et de serre.',
      'Citrus, fresh and frozen fruit, field and greenhouse vegetables.'
    ),
    accent: 'var(--cat-land)',
    categories: ['fruits', 'vegetables'],
  },
  {
    key: 'industry',
    name: t('Matières & industrie', 'Materials & industry'),
    text: t(
      'Bois de construction, palettes et OSB, ingrédients pour l’alimentation animale, polymères.',
      'Construction timber, pallets and OSB, animal-feed ingredients, polymers.'
    ),
    accent: 'var(--cat-industry)',
    categories: ['wood', 'animal-feed', 'polymers'],
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
  points: { title: string; text: string }[];
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
  featured?: boolean;
}

const img = (key: CategoryKey) => `/media/categories/${key}.webp`;

export const CATEGORIES: Category[] = [
  {
    key: 'frozen-fish',
    group: 'sea',
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
        points: [
          { title: 'Calibre maîtrisé', text: 'Chaque lot est trié et calibré selon votre spécification avant la mise en carton.' },
          { title: 'Chaîne du froid', text: 'Stockage et chargement à −18 °C, contrôle de température jusqu’au port.' },
          { title: 'Documents export', text: 'Certificats sanitaires, d’origine et documents de transport préparés avec vous.' },
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
        points: [
          { title: 'Controlled sizing', text: 'Every lot is graded and sized to your specification before packing.' },
          { title: 'Cold chain', text: 'Storage and loading at −18 °C, temperature monitored all the way to the port.' },
          { title: 'Export documents', text: 'Health certificates, certificates of origin and shipping documents prepared with you.' },
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
    group: 'sea',
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
        points: [
          { title: 'Découpe sur mesure', text: 'Choisissez la présentation et le calibre : nous transmettons votre cahier des charges à l’usine.' },
          { title: 'Contrôle avant chargement', text: 'Poids, glaçage, calibre et emballage vérifiés avant la fermeture du conteneur.' },
          { title: 'Fret aérien possible', text: 'Pour les lots urgents ou de petite taille, une expédition par avion peut être organisée.' },
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
        points: [
          { title: 'Cut to order', text: 'Choose the cut and size; we pass your specification on to the plant.' },
          { title: 'Pre-loading inspection', text: 'Weight, glazing, size and packing are checked before the container is sealed.' },
          { title: 'Air freight available', text: 'For urgent or small lots, shipment by air can be arranged.' },
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
    key: 'canned-fish',
    group: 'sea',
    slugs: t('conserves-de-poisson', 'canned-fish'),
    accent: 'var(--cat-sea)',
    image: img('canned-fish'),
    copy: {
      fr: {
        name: 'Conserves de poisson',
        h1: 'Conserves de sardines et de maquereaux du Maroc',
        seoTitle: 'Conserves de sardines et maquereaux du Maroc, en gros',
        description:
          'Conserves de sardines et de maquereaux du Maroc en gros : à l’huile d’olive, à l’huile végétale, à la sauce tomate ou piquante. Marque blanche, export.',
        lead: 'Sardines et maquereaux à l’huile d’olive, à l’huile végétale ou à la sauce tomate, en boîtes de différents formats.',
        intro: [
          'Le Maroc est le premier exportateur mondial de conserves de sardines. ALIOM TRADING travaille avec des conserveries qui respectent les exigences HACCP, IFS et BRC pour fournir importateurs, distributeurs et centrales d’achat.',
          'Huile d’olive, huile de tournesol, sauce tomate, piment, citron ou recette sur mesure : choisissez la recette, le format de boîte et l’étiquette, nous coordonnons la production et l’expédition.',
        ],
        facts: [
          { label: 'Espèces', value: 'Sardine, maquereau' },
          { label: 'Recettes', value: 'Huile d’olive, huile végétale, tomate, piquante' },
          { label: 'Formats', value: 'Boîtes de différentes tailles, selon conserverie' },
          { label: 'Marque', value: 'Marque du fabricant ou marque blanche' },
        ],
        points: [
          { title: 'Recette au choix', text: 'Huile, sauce et assaisonnement selon les habitudes de votre marché.' },
          { title: 'Étiquetage', text: 'Étiquettes et mentions conformes au pays de destination, préparées avec vous.' },
          { title: 'Longue conservation', text: 'Un produit stable, transporté en conteneur sec, sans chaîne du froid.' },
        ],
        faq: [
          {
            q: 'Proposez-vous des conserves en marque blanche ?',
            a: 'Oui, sous réserve de quantités minimales fixées par la conserverie. Envoyez-nous votre recette, votre format et vos volumes.',
          },
          {
            q: 'Quels formats de boîte ?',
            a: 'Les conserveries marocaines produisent plusieurs formats, du club 1/4 aux grands formats pour la restauration. Nous vous indiquons ceux qui sont disponibles pour votre recette.',
          },
          {
            q: 'Comment les conserves sont-elles transportées ?',
            a: 'En conteneur sec, sur palettes filmées. Les conserves ne demandent pas de froid, ce qui simplifie la logistique.',
          },
        ],
      },
      en: {
        name: 'Canned fish',
        h1: 'Canned sardines and mackerel from Morocco',
        seoTitle: 'Canned sardines and mackerel from Morocco, wholesale',
        description:
          'Wholesale canned sardines and mackerel from Morocco: in olive oil, vegetable oil, tomato or spicy sauce. Private label and export.',
        lead: 'Sardines and mackerel in olive oil, vegetable oil or tomato sauce, in a range of can sizes.',
        intro: [
          'Morocco is the world’s leading exporter of canned sardines. ALIOM TRADING works with canneries that meet HACCP, IFS and BRC requirements to supply importers, distributors and buying groups.',
          'Olive oil, sunflower oil, tomato sauce, chilli, lemon or a custom recipe: choose the recipe, can size and label, and we coordinate production and shipping.',
        ],
        facts: [
          { label: 'Species', value: 'Sardine, mackerel' },
          { label: 'Recipes', value: 'Olive oil, vegetable oil, tomato, spicy' },
          { label: 'Formats', value: 'Several can sizes, by cannery' },
          { label: 'Brand', value: 'Manufacturer’s brand or private label' },
        ],
        points: [
          { title: 'Your recipe', text: 'Oil, sauce and seasoning to suit the tastes of your market.' },
          { title: 'Labelling', text: 'Labels and mandatory information for the destination country, prepared with you.' },
          { title: 'Long shelf life', text: 'A stable product shipped in dry containers, with no cold chain needed.' },
        ],
        faq: [
          {
            q: 'Do you offer private-label canned fish?',
            a: 'Yes, subject to the cannery’s minimum quantities. Send us your recipe, can size and volumes.',
          },
          {
            q: 'Which can sizes are available?',
            a: 'Moroccan canneries produce several sizes, from the classic 1/4 club can to large catering formats. We tell you which ones are available for your recipe.',
          },
          {
            q: 'How is canned fish shipped?',
            a: 'In dry containers, on stretch-wrapped pallets. Canned fish needs no refrigeration, which keeps logistics simple.',
          },
        ],
      },
    },
  },
  {
    key: 'precooked-fish',
    group: 'sea',
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
        points: [
          { title: 'Prêt à cuisiner', text: 'Four, friteuse ou poêle : un produit qui se prépare en quelques minutes.' },
          { title: 'Portions régulières', text: 'Un grammage constant, idéal pour le calcul des coûts en restauration.' },
          { title: 'Formats pro', text: 'Cartons pour la restauration ou sachets pour le libre-service.' },
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
        points: [
          { title: 'Ready to cook', text: 'Oven, fryer or pan: a product ready in a few minutes.' },
          { title: 'Consistent portions', text: 'A steady weight per piece, ideal for food-service costing.' },
          { title: 'Trade formats', text: 'Catering cartons or retail bags.' },
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
    key: 'fruits',
    group: 'land',
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
        points: [
          { title: 'Conditionné à la récolte', text: 'Les fruits sont emballés le jour de la cueillette et expédiés aussitôt.' },
          { title: 'Variétés en succession', text: 'Des premières clémentines à la Maroc Late, la campagne d’agrumes couvre une grande partie de l’année.' },
          { title: 'Expertise par lot', text: 'Chaque lot peut être accompagné d’un rapport d’expertise indépendant.' },
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
        points: [
          { title: 'Packed at harvest', text: 'Fruit is packed on picking day and shipped straight away.' },
          { title: 'Varieties in succession', text: 'From the first clementines to Maroc Late oranges, the citrus campaign covers much of the year.' },
          { title: 'Inspection per lot', text: 'Each lot can come with an independent inspection report.' },
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
    group: 'land',
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
        points: [
          { title: 'Régularité', text: 'Des programmes hebdomadaires pour garder vos rayons approvisionnés.' },
          { title: 'Fraîcheur', text: 'Récolte, conditionnement et départ en froid dans les plus brefs délais.' },
          { title: 'Contrôle indépendant', text: 'Un certificat d’expertise peut accompagner chaque lot.' },
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
        points: [
          { title: 'Regular supply', text: 'Weekly programmes that keep your shelves stocked.' },
          { title: 'Freshness', text: 'Harvest, packing and cold dispatch as quickly as possible.' },
          { title: 'Independent inspection', text: 'An inspection certificate can come with every lot.' },
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
    key: 'wood',
    group: 'industry',
    slugs: t('bois', 'wood'),
    accent: 'var(--cat-industry)',
    image: img('wood'),
    copy: {
      fr: {
        name: 'Bois',
        h1: 'Bois rouge, palettes Europe et panneaux OSB',
        seoTitle: 'Bois rouge, palettes Europe et OSB au Maroc',
        description:
          'Import de bois au Maroc : bois rouge pour la construction, palettes Europe EUR / EPAL et panneaux OSB, à vos dimensions, livrés dans les ports marocains.',
        lead: 'Bois résineux de construction, palettes Europe et panneaux OSB, sélectionnés selon vos dimensions et livrés dans tous les ports du Maroc.',
        intro: [
          'Le bâtiment, l’industrie et la logistique marocains consomment chaque année de grands volumes de bois importé. ALIOM TRADING s’approvisionne auprès de scieries et de fabricants européens et sélectionne les produits selon les dimensions et les exigences de chaque client.',
          'Bois rouge en planches et madriers pour la charpente et le coffrage, palettes Europe 1200 × 800 mm pour la logistique, panneaux OSB pour la construction et l’emballage : nous livrons dans tous les ports marocains.',
        ],
        facts: [
          { label: 'Origine', value: 'Europe, selon arrivages' },
          { label: 'Produits', value: 'Bois rouge, palettes EUR/EPAL, OSB' },
          { label: 'Dimensions', value: 'Selon votre cahier des charges' },
          { label: 'Livraison', value: 'Tous les ports du Maroc' },
        ],
        points: [
          { title: 'Sur mesure', text: 'Section, longueur, épaisseur et qualité choisies selon votre usage.' },
          { title: 'Normes export', text: 'Palettes traitées thermiquement et marquées selon la norme NIMP 15 (ISPM 15).' },
          { title: 'Dédouanement', text: 'Nous vous accompagnons sur les documents d’import et la livraison au port.' },
        ],
        faq: [
          {
            q: 'Qu’appelle-t-on bois rouge au Maroc ?',
            a: 'Au Maroc, « bois rouge » désigne couramment le pin sylvestre importé d’Europe du Nord, au cœur rougeâtre, utilisé en charpente, menuiserie et coffrage, par opposition au « bois blanc » (épicéa, sapin).',
          },
          {
            q: 'Quelles sont les dimensions d’une palette Europe ?',
            a: 'Une palette Europe (EUR / EPAL) mesure 1200 × 800 × 144 mm. Elle pèse environ 25 kg et peut porter jusqu’à 1500 kg de charge uniformément répartie.',
          },
          {
            q: 'Quelle épaisseur d’OSB ?',
            a: 'Les panneaux OSB existent couramment de 9 à 22 mm. L’OSB/3 convient aux usages en milieu humide. Précisez l’épaisseur, le format et la quantité dans votre demande.',
          },
        ],
      },
      en: {
        name: 'Timber',
        h1: 'Redwood timber, euro pallets and OSB boards',
        seoTitle: 'Redwood timber, euro pallets and OSB for Morocco',
        description:
          'Timber imports into Morocco: redwood softwood for construction, EUR / EPAL euro pallets and OSB boards, cut to your dimensions and delivered to Moroccan ports.',
        lead: 'Construction softwood, euro pallets and OSB boards, selected to your dimensions and delivered to every port in Morocco.',
        intro: [
          'Moroccan construction, industry and logistics use large volumes of imported timber every year. ALIOM TRADING sources from European sawmills and manufacturers and selects products to each customer’s dimensions and requirements.',
          'Redwood planks and beams for framing and formwork, 1200 × 800 mm euro pallets for logistics, OSB boards for building and packaging: we deliver to all Moroccan ports.',
        ],
        facts: [
          { label: 'Origin', value: 'Europe, by availability' },
          { label: 'Products', value: 'Redwood, EUR/EPAL pallets, OSB' },
          { label: 'Dimensions', value: 'To your specification' },
          { label: 'Delivery', value: 'All Moroccan ports' },
        ],
        points: [
          { title: 'Made to measure', text: 'Section, length, thickness and grade chosen for your use.' },
          { title: 'Export standards', text: 'Pallets heat-treated and marked to ISPM 15.' },
          { title: 'Customs support', text: 'We help with the import documents and delivery at the port.' },
        ],
        faq: [
          {
            q: 'What is “redwood” timber?',
            a: 'In the timber trade, redwood usually means Scots pine imported from Northern Europe, with a reddish heartwood, used for framing, joinery and formwork, as opposed to whitewood (spruce, fir).',
          },
          {
            q: 'What are the dimensions of a euro pallet?',
            a: 'A euro pallet (EUR / EPAL) measures 1200 × 800 × 144 mm. It weighs about 25 kg and can carry up to 1,500 kg of evenly distributed load.',
          },
          {
            q: 'Which OSB thickness?',
            a: 'OSB boards commonly range from 9 to 22 mm. OSB/3 suits humid conditions. Give the thickness, size and quantity in your request.',
          },
        ],
      },
    },
  },
  {
    key: 'animal-feed',
    group: 'industry',
    slugs: t('alimentation-animale', 'animal-feed'),
    accent: 'var(--cat-industry)',
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
        points: [
          { title: 'Analyse par lot', text: 'Protéines, matières grasses, humidité : un certificat d’analyse accompagne chaque lot.' },
          { title: 'Traçabilité', text: 'Origine et usine de fabrication identifiées pour chaque expédition.' },
          { title: 'Conformité', text: 'Produits conformes aux normes internationales et aux exigences sanitaires.' },
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
        points: [
          { title: 'Analysis per lot', text: 'Protein, fat, moisture: a certificate of analysis comes with every lot.' },
          { title: 'Traceability', text: 'Origin and production plant identified for every shipment.' },
          { title: 'Compliance', text: 'Products meet international standards and health requirements.' },
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
    key: 'polymers',
    group: 'industry',
    slugs: t('polymeres', 'polymers'),
    accent: 'var(--cat-industry)',
    image: img('polymers'),
    copy: {
      fr: {
        name: 'Polymères',
        h1: 'Polymères et caoutchoucs synthétiques',
        seoTitle: 'Import de polymères et caoutchoucs synthétiques au Maroc',
        description:
          'Import de polymères (granulés plastiques) et de caoutchoucs synthétiques au Maroc pour la plasturgie et l’industrie du caoutchouc. Grades sur demande.',
        lead: 'Matières plastiques et caoutchoucs synthétiques pour les transformateurs et les industriels marocains.',
        intro: [
          'La plasturgie et l’industrie du caoutchouc marocaines dépendent largement de matières premières importées. ALIOM TRADING importe des polymères et des caoutchoucs synthétiques pour les usages industriels.',
          'Indiquez-nous le type de matière, le grade, l’indice de fluidité ou la référence fabricant dont vous avez besoin : nous recherchons la source et vous transmettons une offre avec la fiche technique.',
        ],
        facts: [
          { label: 'Produits', value: 'Polymères, caoutchoucs synthétiques' },
          { label: 'Grades', value: 'Selon fiche technique demandée' },
          { label: 'Conditionnement', value: 'Sacs de 25 kg, octabins, balles' },
          { label: 'Livraison', value: 'Ports du Maroc, ou rendu usine' },
        ],
        points: [
          { title: 'Recherche de grade', text: 'À partir de votre référence ou de votre fiche technique, nous trouvons l’équivalent disponible.' },
          { title: 'Fiche technique', text: 'Chaque offre est accompagnée de la fiche technique et de la fiche de données de sécurité.' },
          { title: 'Logistique import', text: 'Transport, documents et livraison organisés jusqu’à votre site.' },
        ],
        faq: [
          {
            q: 'Quels polymères pouvez-vous fournir ?',
            a: 'Les principales familles de thermoplastiques et de caoutchoucs synthétiques, selon les disponibilités. Envoyez-nous la référence recherchée.',
          },
          {
            q: 'Faut-il une quantité minimale ?',
            a: 'Les offres se font généralement par camion ou par conteneur complet. Pour de plus petits volumes, contactez-nous.',
          },
          {
            q: 'Fournissez-vous les fiches de sécurité ?',
            a: 'Oui, la fiche technique et la fiche de données de sécurité (FDS) accompagnent chaque produit.',
          },
        ],
      },
      en: {
        name: 'Polymers',
        h1: 'Polymers and synthetic rubbers',
        seoTitle: 'Polymers and synthetic rubber imports into Morocco',
        description:
          'Imports of polymers (plastic resins) and synthetic rubbers into Morocco for plastics processors and the rubber industry. Grades on request.',
        lead: 'Plastic resins and synthetic rubbers for Moroccan processors and manufacturers.',
        intro: [
          'Morocco’s plastics and rubber industries rely heavily on imported raw materials. ALIOM TRADING imports polymers and synthetic rubbers for industrial uses.',
          'Tell us the material type, grade, melt index or manufacturer reference you need: we find the source and send you an offer with the data sheet.',
        ],
        facts: [
          { label: 'Products', value: 'Polymers, synthetic rubbers' },
          { label: 'Grades', value: 'To the data sheet requested' },
          { label: 'Packing', value: '25 kg bags, octabins, bales' },
          { label: 'Delivery', value: 'Moroccan ports, or delivered to plant' },
        ],
        points: [
          { title: 'Grade search', text: 'From your reference or data sheet, we find the available equivalent.' },
          { title: 'Data sheets', text: 'Every offer comes with the technical data sheet and the safety data sheet.' },
          { title: 'Import logistics', text: 'Transport, documents and delivery organised to your site.' },
        ],
        faq: [
          {
            q: 'Which polymers can you supply?',
            a: 'The main families of thermoplastics and synthetic rubbers, subject to availability. Send us the reference you are looking for.',
          },
          {
            q: 'Is there a minimum quantity?',
            a: 'Offers are usually per full truck or container. For smaller volumes, contact us.',
          },
          {
            q: 'Do you provide safety data sheets?',
            a: 'Yes, the technical data sheet and the safety data sheet (SDS) come with every product.',
          },
        ],
      },
    },
  },
];

const citrus = t('Agrumes', 'Citrus');
const freshFruit = t('Fruits frais', 'Fresh fruit');
const frozenFruit = t('Fruits surgelés', 'Frozen fruit');

export const PRODUCTS: Product[] = [
  // Poisson congelé
  { id: 'sardine', category: 'frozen-fish', featured: true, name: t('Sardine', 'Sardine'), text: t('Sardina pilchardus, le poisson emblématique de l’Atlantique marocain, entier ou en blocs.', 'Sardina pilchardus, the signature fish of the Moroccan Atlantic, whole or block-frozen.') },
  { id: 'maquereau', category: 'frozen-fish', featured: true, name: t('Maquereau', 'Mackerel'), text: t('Maquereau entier congelé, calibré, pour la transformation et la distribution.', 'Whole frozen mackerel, size-graded, for processing and distribution.') },
  { id: 'sardinelle', category: 'frozen-fish', name: t('Allache (sardinelle)', 'Sardinella'), text: t('Sardinelle ronde, très demandée sur les marchés africains et pour l’appât.', 'Round sardinella, in high demand on African markets and for bait.') },
  { id: 'chinchard', category: 'frozen-fish', name: t('Chinchard', 'Horse mackerel'), text: t('Chinchard entier congelé en cartons, prisé en Afrique de l’Ouest.', 'Whole frozen horse mackerel in cartons, popular in West Africa.') },
  { id: 'denti-dorade', category: 'frozen-fish', name: t('Denti / Dorade', 'Dentex / Sea bream'), text: t('Poissons nobles à chair blanche, entiers et glacés.', 'Premium white-fleshed fish, whole and glazed.') },
  { id: 'rouget', category: 'frozen-fish', name: t('Rouget', 'Red mullet'), text: t('Rouget entier congelé, apprécié en restauration.', 'Whole frozen red mullet, valued by restaurants.') },
  { id: 'pelamide', category: 'frozen-fish', name: t('Pélamide', 'Atlantic bonito'), text: t('Thonidé de l’Atlantique à la chair ferme, entier congelé.', 'Firm-fleshed Atlantic tuna relative, whole frozen.') },
  { id: 'sole', category: 'frozen-fish', name: t('Sole', 'Sole'), text: t('Poisson plat à chair fine, entier ou en filets selon disponibilité.', 'Delicate flatfish, whole or filleted subject to availability.') },
  { id: 'sabre', category: 'frozen-fish', name: t('Sabre argenté', 'Silver scabbardfish'), text: t('Poisson-ruban congelé, entier ou en tronçons.', 'Frozen ribbon fish, whole or in sections.') },
  { id: 'poisson-appat', category: 'frozen-fish', name: t('Poisson pour appât', 'Bait fish'), text: t('Petits pélagiques congelés en blocs pour la pêche à la palangre.', 'Small pelagics frozen in blocks for longline fishing.') },

  // Fruits de mer
  { id: 'poulpe', category: 'seafood', featured: true, name: t('Poulpe', 'Octopus'), text: t('Octopus vulgaris de l’Atlantique, entier ou nettoyé, IQF ou en blocs.', 'Atlantic Octopus vulgaris, whole or cleaned, IQF or block-frozen.') },
  { id: 'seiche', category: 'seafood', featured: true, name: t('Seiche', 'Cuttlefish'), text: t('Seiche entière ou nettoyée, congelée à bord ou à terre.', 'Whole or cleaned cuttlefish, frozen at sea or on shore.') },
  { id: 'calamar', category: 'seafood', name: t('Calamar', 'Squid'), text: t('Calamar entier, en tubes ou en anneaux, réfrigéré ou congelé.', 'Squid whole, as tubes or rings, chilled or frozen.') },

  // Conserves
  { id: 'conserve-sardines', category: 'canned-fish', featured: true, name: t('Sardines en conserve', 'Canned sardines'), text: t('À l’huile d’olive, à l’huile végétale, à la tomate ou piquantes.', 'In olive oil, vegetable oil, tomato sauce or spicy.') },
  { id: 'conserve-maquereaux', category: 'canned-fish', name: t('Maquereaux en conserve', 'Canned mackerel'), text: t('Filets ou morceaux de maquereau à l’huile ou en sauce.', 'Mackerel fillets or pieces in oil or sauce.') },

  // Précuit
  { id: 'boulettes', category: 'precooked-fish', name: t('Boulettes de poisson', 'Fishballs'), text: t('Boulettes à base de chair de poisson, précuites et surgelées.', 'Balls made from fish flesh, precooked and frozen.') },
  { id: 'burger-kebab', category: 'precooked-fish', name: t('Kebab de poisson', 'Fish kebab'), text: t('Galettes façon kebab à base de poisson, prêtes à griller.', 'Kebab-style fish patties, ready to grill.') },
  { id: 'burger', category: 'precooked-fish', name: t('Burger de poisson', 'Fish burger'), text: t('Steaks de poisson panés pour la restauration rapide.', 'Breaded fish patties for quick-service restaurants.') },
  { id: 'batonnets', category: 'precooked-fish', featured: true, name: t('Bâtonnets de poisson pané', 'Fish fingers'), text: t('Le classique pané, calibré, pour les cantines et le libre-service.', 'The breaded classic, evenly sized, for canteens and retail.') },
  { id: 'nuggets', category: 'precooked-fish', name: t('Nuggets de poisson', 'Fish nuggets'), text: t('Bouchées panées, précuites, prêtes en quelques minutes.', 'Breaded bites, precooked, ready in minutes.') },
  { id: 'pre-frit', category: 'precooked-fish', name: t('Poisson pré-frit surgelé', 'Frozen pre-fried fish'), text: t('Poisson pré-frit à réchauffer au four ou à la friteuse.', 'Pre-fried fish to reheat in the oven or fryer.') },

  // Fruits — agrumes
  { id: 'clementine-nour', category: 'fruits', sub: citrus, featured: true, name: t('Clémentine Nour', 'Nour clementine'), text: t('Clémentine tardive marocaine, sans pépins, à la peau fine.', 'Late Moroccan clementine, seedless, with a thin peel.') },
  { id: 'clementine', category: 'fruits', sub: citrus, name: t('Clémentine', 'Clementine'), text: t('Les clémentines de début de campagne, douces et faciles à éplucher.', 'Early-season clementines, sweet and easy to peel.') },
  { id: 'mandarine-nova', category: 'fruits', sub: citrus, name: t('Mandarine Nova', 'Nova mandarin'), text: t('Mandarine à la couleur orange vif et au jus abondant.', 'Mandarin with a bright orange colour and plenty of juice.') },
  { id: 'mandarine-ortanique', category: 'fruits', sub: citrus, name: t('Mandarine Ortanique', 'Ortanique mandarin'), text: t('Hybride de mandarine et d’orange, riche en jus.', 'Mandarin–orange hybrid, rich in juice.') },
  { id: 'nadorcott', category: 'fruits', sub: citrus, name: t('Mandarine Nadorcott', 'Nadorcott mandarin'), text: t('Variété née au Maroc, tardive, sucrée et parfumée.', 'A late variety born in Morocco, sweet and fragrant.') },
  { id: 'orange-navel', category: 'fruits', sub: citrus, name: t('Orange Navel', 'Navel orange'), text: t('Orange de table sans pépins, dont la Washington Navel.', 'Seedless table orange, including Washington Navel.') },
  { id: 'orange-salustiana', category: 'fruits', sub: citrus, name: t('Orange Salustiana', 'Salustiana orange'), text: t('Orange juteuse et sucrée, idéale pour la table et le jus.', 'Juicy, sweet orange for the table and for juice.') },
  { id: 'orange-valencia', category: 'fruits', sub: citrus, name: t('Orange Valencia', 'Valencia orange'), text: t('La grande orange à jus de fin de saison.', 'The classic late-season juice orange.') },
  { id: 'orange-maroc-late', category: 'fruits', sub: citrus, name: t('Orange Maroc Late', 'Maroc Late orange'), text: t('Variété tardive emblématique du Maroc, qui prolonge la campagne.', 'Morocco’s signature late variety, extending the season.') },
  { id: 'citron', category: 'fruits', sub: citrus, name: t('Citron', 'Lemon'), text: t('Citrons frais pour la distribution et l’industrie.', 'Fresh lemons for retail and industry.') },
  { id: 'pamplemousse', category: 'fruits', sub: citrus, name: t('Pamplemousse', 'Grapefruit'), text: t('Pamplemousses à chair blanche ou rose selon arrivages.', 'White or pink grapefruit, by availability.') },
  // Fruits frais
  { id: 'fraise', category: 'fruits', sub: freshFruit, name: t('Fraise', 'Strawberry'), text: t('Fraises de primeur, cueillies et conditionnées le jour même.', 'Early-season strawberries, picked and packed the same day.') },
  { id: 'grenade', category: 'fruits', sub: freshFruit, name: t('Grenade', 'Pomegranate'), text: t('Grenades aux grains rouge vif, en automne.', 'Pomegranates with bright red arils, in autumn.') },
  { id: 'melon', category: 'fruits', sub: freshFruit, name: t('Melon', 'Melon'), text: t('Melons sucrés de saison, calibrés en colis.', 'Sweet seasonal melons, size-graded in cartons.') },
  { id: 'pasteque', category: 'fruits', sub: freshFruit, name: t('Pastèque', 'Watermelon'), text: t('Pastèques de printemps et d’été, en vrac ou en caisses.', 'Spring and summer watermelons, loose or in bins.') },
  { id: 'raisin', category: 'fruits', sub: freshFruit, name: t('Raisin', 'Table grapes'), text: t('Raisin de table blanc ou noir selon la saison.', 'White or black table grapes, by season.') },
  { id: 'avocat', category: 'fruits', sub: freshFruit, featured: true, name: t('Avocat', 'Avocado'), text: t('Avocats Hass et variétés vertes du Gharb.', 'Hass and green-skin avocados from the Gharb.') },
  { id: 'peche-nectarine', category: 'fruits', sub: freshFruit, name: t('Pêche / Nectarine', 'Peach / Nectarine'), text: t('Fruits à noyau d’été, à chair jaune ou blanche.', 'Summer stone fruit, yellow or white flesh.') },
  // Fruits surgelés
  { id: 'abricot-surgele', category: 'fruits', sub: frozenFruit, name: t('Abricot surgelé', 'Frozen apricot'), text: t('Oreillons d’abricot surgelés pour la pâtisserie et la confiture.', 'Frozen apricot halves for bakery and jam.') },
  { id: 'melon-surgele', category: 'fruits', sub: frozenFruit, name: t('Melon surgelé', 'Frozen melon'), text: t('Billes ou dés de melon surgelés.', 'Frozen melon balls or dice.') },
  { id: 'clementine-surgelee', category: 'fruits', sub: frozenFruit, name: t('Clémentine surgelée', 'Frozen clementine'), text: t('Segments de clémentine surgelés.', 'Frozen clementine segments.') },
  { id: 'orange-surgelee', category: 'fruits', sub: frozenFruit, name: t('Orange surgelée', 'Frozen orange'), text: t('Segments et pulpe d’orange pour l’industrie.', 'Orange segments and pulp for industry.') },
  { id: 'figue-surgelee', category: 'fruits', sub: frozenFruit, name: t('Figue surgelée', 'Frozen fig'), text: t('Figues entières ou en quartiers, surgelées.', 'Whole or quartered figs, frozen.') },
  { id: 'fraise-surgelee', category: 'fruits', sub: frozenFruit, name: t('Fraise surgelée (IQF)', 'Frozen strawberry (IQF)'), text: t('Fraises surgelées individuellement, entières ou en dés.', 'Individually quick-frozen strawberries, whole or diced.') },

  // Légumes
  { id: 'tomate', category: 'vegetables', featured: true, name: t('Tomate', 'Tomato'), text: t('Tomates rondes, grappe et cerise, de serre.', 'Round, vine and cherry tomatoes, greenhouse-grown.') },
  { id: 'poivron', category: 'vegetables', name: t('Poivron', 'Sweet pepper'), text: t('Poivrons rouges, jaunes et verts, calibrés.', 'Red, yellow and green peppers, size-graded.') },
  { id: 'piment', category: 'vegetables', name: t('Piment fort', 'Hot pepper'), text: t('Piments forts frais pour la distribution et l’industrie.', 'Fresh hot peppers for retail and industry.') },
  { id: 'haricot-vert', category: 'vegetables', featured: true, name: t('Haricot vert', 'Green beans'), text: t('Haricots verts fins et extra-fins, triés à la main.', 'Fine and extra-fine green beans, hand-sorted.') },
  { id: 'courgette', category: 'vegetables', name: t('Courgette', 'Zucchini'), text: t('Courgettes vertes de serre, calibre régulier.', 'Greenhouse green zucchini, even sizing.') },
  { id: 'oignon', category: 'vegetables', name: t('Oignon', 'Onion'), text: t('Oignons jaunes et rouges en filets ou en sacs.', 'Yellow and red onions in nets or sacks.') },

  // Bois
  { id: 'bois-rouge', category: 'wood', featured: true, name: t('Bois rouge', 'Redwood timber'), text: t('Planches et madriers résineux pour la charpente, la menuiserie et le coffrage.', 'Softwood planks and beams for framing, joinery and formwork.') },
  { id: 'palettes', category: 'wood', name: t('Palettes Europe EUR / EPAL', 'EUR / EPAL euro pallets'), text: t('Palettes 1200 × 800 mm, neuves ou reconditionnées, traitées NIMP 15.', '1200 × 800 mm pallets, new or refurbished, ISPM 15 treated.') },
  { id: 'osb', category: 'wood', name: t('Panneaux OSB', 'OSB boards'), text: t('Panneaux de grandes particules orientées, de 9 à 22 mm.', 'Oriented strand boards, from 9 to 22 mm.') },

  // Alimentation animale
  { id: 'farine-poisson', category: 'animal-feed', featured: true, name: t('Farine de poisson', 'Fish meal'), text: t('Source naturelle de protéines complètes, issue de la sardine marocaine.', 'A natural source of complete protein, made from Moroccan sardines.') },
  { id: 'huile-poisson', category: 'animal-feed', name: t('Huile de poisson', 'Fish oil'), text: t('Riche en oméga-3, vitamines et minéraux naturels.', 'Rich in omega-3, natural vitamins and minerals.') },

  // Polymères
  { id: 'polymeres', category: 'polymers', name: t('Polymères', 'Polymers'), text: t('Résines thermoplastiques en granulés pour la plasturgie.', 'Thermoplastic resin pellets for plastics processing.') },
  { id: 'caoutchoucs', category: 'polymers', name: t('Caoutchoucs synthétiques', 'Synthetic rubbers'), text: t('Élastomères synthétiques pour l’industrie du caoutchouc.', 'Synthetic elastomers for the rubber industry.') },
];

export const getCategory = (key: string) => CATEGORIES.find((c) => c.key === key);
export const categoryCopy = (category: Category, locale: Locale) => category.copy[locale];
export const productsIn = (key: CategoryKey) => PRODUCTS.filter((p) => p.category === key);
export const categoriesIn = (group: GroupKey) =>
  GROUPS.find((g) => g.key === group)!.categories.map((key) => getCategory(key)!);
export const groupOf = (key: CategoryKey) => GROUPS.find((g) => g.categories.includes(key))!;

/** The product's card on its family page, e.g. #poulpe. */
export const productAnchor = (product: Product) => product.id;

/** The basket shows the family photo next to a product: there is no photo per product. */
export const productImage = (product: Product) => getCategory(product.category)!.image;
