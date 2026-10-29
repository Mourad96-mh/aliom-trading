import type { Locale } from '@/i18n/config';
import type { CategoryKey } from './catalog';

/**
 * The blog. Starter guides written by us, each aimed at a search the keyword study found
 * (docs/01-research.md): frozen cephalopods, and the food safety standards the client says
 * it works to. (A euro-pallet guide went with the timber family on 2026-10-29.) They state
 * general, checkable facts only and are listed in docs/CONTENT-TO-VALIDATE.md.
 *
 * A body is a list of blocks: a string is a paragraph, `{ h: … }` a sub-heading.
 */
export type Block = string | { h: string };

export interface ArticleCopy {
  title: string;
  excerpt: string;
  body: Block[];
}

export interface Article {
  id: string;
  slugs: Record<Locale, string>;
  /** ISO date. */
  date: string;
  image: string;
  related: CategoryKey[];
  copy: Record<Locale, ArticleCopy>;
}

export const ARTICLES: Article[] = [
  {
    id: 'standards',
    slugs: {
      fr: 'haccp-ifs-brc-securite-alimentaire',
      en: 'haccp-ifs-brc-food-safety-standards',
    },
    date: '2026-10-20',
    image: '/media/blog/standards.webp',
    related: ['frozen-fish', 'canned-food', 'seafood'],
    copy: {
      fr: {
        title: 'HACCP, IFS, BRC : ce que garantissent ces référentiels',
        excerpt:
          'Trois sigles reviennent dans tous les cahiers des charges agroalimentaires. Voici ce que chacun couvre, et pourquoi ils comptent quand on achète au Maroc.',
        body: [
          'Lorsqu’un importateur choisit un fournisseur de poisson, de conserves ou de fruits, la première question porte sur la sécurité des aliments. Trois référentiels structurent la réponse : HACCP, IFS et BRCGS. Ils ne se remplacent pas ; ils s’empilent.',
          { h: 'HACCP : la méthode de base' },
          'HACCP (Hazard Analysis Critical Control Point) est une méthode d’analyse des dangers. L’entreprise identifie à chaque étape ce qui peut rendre l’aliment dangereux (température, contamination, corps étrangers), fixe des points critiques et les surveille. C’est le socle exigé par la réglementation dans la plupart des pays, dont le Maroc, où l’ONSSA contrôle les établissements.',
          { h: 'IFS : l’exigence de la distribution européenne' },
          'IFS Food (International Featured Standards) a été créé par la distribution allemande et française pour auditer les fabricants de leurs marques. Il reprend le HACCP et y ajoute la gestion de la qualité, la maîtrise des fournisseurs, la défense alimentaire et la traçabilité. Les audits, souvent non annoncés, donnent un niveau de conformité.',
          { h: 'BRCGS : le standard britannique devenu mondial' },
          'Le BRCGS Food Safety, né à l’initiative des distributeurs britanniques, est aujourd’hui reconnu dans le monde entier. Comme l’IFS, il est reconnu par la GFSI (Global Food Safety Initiative). Il existe aussi un référentiel BRCGS pour les agents et les négociants, qui encadre la sélection et le suivi des fournisseurs.',
          { h: 'Ce que cela change pour vous' },
          'Travailler avec des usines qui respectent ces exigences, c’est réduire le risque de non-conformité à l’arrivée, de rappel produit et de blocage en douane. Chez ALIOM TRADING, la qualité est la source de notre succès : nous sélectionnons des fournisseurs qui respectent les exigences HACCP, IFS et BRC, et nous vous transmettons leurs certificats avec chaque offre.',
        ],
      },
      en: {
        title: 'HACCP, IFS, BRC: what these standards guarantee the buyer',
        excerpt:
          'Three acronyms appear in every food specification. Here is what each one covers, and why they matter when you buy from Morocco.',
        body: [
          'When an importer chooses a supplier of fish, canned food or fruit, the first question is food safety. Three standards shape the answer: HACCP, IFS and BRCGS. They do not replace each other; they build on each other.',
          { h: 'HACCP: the foundation' },
          'HACCP (Hazard Analysis Critical Control Point) is a hazard-analysis method. The company identifies, at every step, what could make the food unsafe (temperature, contamination, foreign bodies), sets critical control points and monitors them. It is the baseline required by law in most countries, including Morocco, where ONSSA inspects food businesses.',
          { h: 'IFS: what European retailers require' },
          'IFS Food (International Featured Standards) was created by German and French retailers to audit the makers of their own-label products. It builds on HACCP and adds quality management, supplier control, food defence and traceability. Audits, often unannounced, result in a compliance level.',
          { h: 'BRCGS: the British standard that went global' },
          'BRCGS Food Safety, started by British retailers, is now recognised worldwide. Like IFS, it is benchmarked by the GFSI (Global Food Safety Initiative). There is also a BRCGS standard for agents and brokers, covering how they select and monitor their suppliers.',
          { h: 'What it means for you' },
          'Working with plants that meet these requirements lowers the risk of non-compliance on arrival, product recalls and customs holds. At ALIOM TRADING, quality is the source of our success: we select suppliers that meet HACCP, IFS and BRC requirements and send you their certificates with every offer.',
        ],
      },
    },
  },
  {
    id: 'cephalopods',
    slugs: {
      fr: 'poulpe-seiche-calamar-congeles-maroc',
      en: 'frozen-octopus-cuttlefish-squid-morocco',
    },
    date: '2026-10-12',
    image: '/media/blog/cephalopods.webp',
    related: ['seafood', 'frozen-fish', 'precooked-fish'],
    copy: {
      fr: {
        title: 'Poulpe, seiche, calamar congelés du Maroc : guide d’achat',
        excerpt:
          'Présentations, congélation, saisons de pêche : les points à vérifier avant de commander du poulpe, de la seiche ou du calamar marocain.',
        body: [
          'Le Maroc est l’un des tout premiers exportateurs mondiaux de poulpe congelé, et ses eaux atlantiques fournissent aussi de la seiche et du calamar recherchés en Europe et en Asie. Pour un acheteur, trois choses font la différence : la présentation, la méthode de congélation et la saison.',
          { h: 'Choisir la présentation' },
          'Le poulpe se vend entier, éviscéré ou nettoyé, classé par poids. La seiche se trouve entière ou nettoyée, parfois en blancs. Le calamar se décline entier, en tubes, en anneaux ou en lanières. Précisez toujours la présentation et le calibre attendus : ce sont eux qui fixent le prix.',
          { h: 'IQF ou blocs ?' },
          'En IQF (Individually Quick Frozen), chaque pièce est surgelée séparément : idéal pour la distribution et la restauration, qui prélèvent à la pièce. En blocs, les pièces sont congelées ensemble dans un moule : plus compact, ce format convient à la transformation. Vérifiez aussi le taux de glaçage, qui protège le produit mais compte dans le poids.',
          { h: 'Tenir compte des saisons' },
          'Pour préserver la ressource, la pêche du poulpe au Maroc est organisée en campagnes séparées par des périodes de repos biologique. La disponibilité et les prix varient donc au cours de l’année : mieux vaut anticiper vos besoins et réserver vos volumes en début de campagne.',
          { h: 'Avec ALIOM TRADING' },
          'Nous vous mettons en relation avec des unités de traitement sélectionnées, transmettons votre cahier des charges et contrôlons poids, glaçage, calibre et emballage avant le chargement. Envoyez-nous vos besoins : nous revenons vers vous avec l’offre du moment.',
        ],
      },
      en: {
        title: 'Frozen octopus, cuttlefish and squid from Morocco: buyer’s guide',
        excerpt:
          'Cuts, freezing methods, fishing seasons: what to check before you order Moroccan octopus, cuttlefish or squid.',
        body: [
          'Morocco is one of the world’s very top exporters of frozen octopus, and its Atlantic waters also yield cuttlefish and squid sought after in Europe and Asia. For a buyer, three things make the difference: the cut, the freezing method and the season.',
          { h: 'Choose the cut' },
          'Octopus is sold whole, gutted or cleaned, graded by weight. Cuttlefish comes whole or cleaned, sometimes as fillets. Squid is offered whole, as tubes, rings or strips. Always state the cut and size you expect: they set the price.',
          { h: 'IQF or blocks?' },
          'With IQF (Individually Quick Frozen), each piece is frozen separately: ideal for retail and food service, which take pieces one by one. In blocks, the pieces are frozen together in a mould: more compact, this format suits processing. Check the glazing rate too; it protects the product but counts in the weight.',
          { h: 'Plan around the seasons' },
          'To protect the resource, octopus fishing in Morocco runs in campaigns separated by biological rest periods. Availability and prices therefore change through the year: plan your needs and book your volumes early in the campaign.',
          { h: 'With ALIOM TRADING' },
          'We connect you with selected processing plants, pass on your specification and check weight, glazing, size and packing before loading. Send us your requirements and we come back with the current offer.',
        ],
      },
    },
  },
];

export const getArticle = (id: string) => ARTICLES.find((a) => a.id === id);
