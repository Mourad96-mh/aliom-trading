# 01 — Research: client, market, keywords, competitors

Date: 2026-10-26. Sources: the client's brief (`../file.txt`), its "À propos de nous" page
(`../extract-logo-from-here.jpeg`), the trade-register extract
(`../WhatsApp Image 2026-10-25 at 05.53.16.jpeg`), the reference site
https://univela-morocco.com/fr/, and Google Keyword Planner (read-only, via the Google Ads API).

## 1. The client

| | |
|---|---|
| Name | ALIOM TRADING |
| Legal form | SARL à associé unique, capital 500 000 MAD |
| Registered | Casablanca trade register no. 502559, 10/05/2021 |
| ICE | 002810898000009 |
| Activity (register) | Import et export (MD ou intermédiaire effectuant), négociant |
| Address | 2-4, rue Abou Dhabi, Oasis, Casablanca |
| Founder / manager | Habiba Ouliass (register spelling: "OULIAS") |
| Phone | 06 60 16 11 57 |
| E-mail | info@aliomtrading.com |
| Domain | aliomtrading.com — today a parked page from the host ADK Media (nginx) |

Positioning in the client's own words: "Agent représentant de marques internationales". The
company commits to HACCP, IFS and BRC requirements and lists five strengths (engagement,
atouts, disponibilité permanente, qualité des produits, assistance technique), four values
(efficacité, réactivité, productivité, qualité) and one mission ("Sélectionner et promouvoir
les meilleurs produits/marques du monde").

**Product scope:** on 2026-10-26 the user said "use the products of the reference website".
That gives 9 families and 58 products (see `web/data/catalog.ts`).

## 2. The reference site — univela-morocco.com

An Agadir-based exporter. Its site is a single long page per section, with six languages, a
contact form with a captcha, and nine product families, each with a list of products
but **no specification, no photos of its own and no per-product text** (most families
have one generic paragraph). The footer credits three agencies.

What we keep: the nine families and their products, the B2B tone, the "why us" list.
What we do better: one rich, indexable page per family (intro, key facts, products, how we
work, FAQ), a quote basket, structured data, real photos, and a fast static build.
What we **do not copy**: Univela's own claims (15 years, 120 clients, 28 countries, six
offices, payment terms, free visits to Morocco). They are not ALIOM's.

## 3. Keywords (Google Keyword Planner, 12-month average, read-only)

Three pulls: Morocco + French, worldwide + French, worldwide + English. Volumes are
monthly searches. B2B trade terms are small; the long tail matters more than any single term.

### Morocco, French

| Keyword | Volume | Target page |
|---|---|---|
| bois rouge prix maroc | 140 | /fr/produits/bois/ |
| import export maroc | 110 | home |
| boite sardine maroc | 110 | /fr/produits/conserves-de-poisson/ |
| palette europe / palette européenne / dimension palette europe | 90 each | /fr/produits/bois/ + blog euro-pallet |
| farine de poisson | 70 | /fr/produits/alimentation-animale/ |
| huile de poisson | 70 | /fr/produits/alimentation-animale/ |
| bois rouge maroc | 40 | /fr/produits/bois/ |
| société import export casablanca | 30 | home, about |
| poisson congelé maroc | 20 | /fr/produits/poisson-congele/ |
| calamar congelé | 20 | /fr/produits/fruits-de-mer/ |
| agent commercial maroc | 10 | /fr/services/ |
| sardine congelée, poulpe congelé, clémentine maroc | 10 each | family pages |

### Worldwide, French (France, Belgium and West Africa buyers)

| Keyword | Volume | Target page |
|---|---|---|
| palette europe / palette européenne | 12 100 | blog euro-pallet, /fr/produits/bois/ |
| dimension palette europe | 9 900 | blog euro-pallet |
| prix palette europe | 3 600 | /fr/produits/bois/ |
| huile de poisson | 3 600 | /fr/produits/alimentation-animale/ |
| calamar congelé | 320 | /fr/produits/fruits-de-mer/ |
| maquereau congelé | 110 | /fr/produits/poisson-congele/ |
| clémentine maroc, agrumes du maroc | 90 each | /fr/produits/fruits/ |
| seiche congelée | 90 | /fr/produits/fruits-de-mer/ |
| grossiste poisson congelé | 50 | /fr/produits/poisson-congele/ |
| import export casablanca | 50 | home |
| conserve sardine maroc | 40 | /fr/produits/conserves-de-poisson/ |
| poisson congelé maroc, farine de poisson maroc | 30 each | family pages |

### Worldwide, English (importers)

| Keyword | Volume | Target page |
|---|---|---|
| cuttlefish frozen | 590 | /en/products/seafood/ |
| canned sardines morocco | 480 | /en/products/canned-fish/ |
| clementine morocco | 170 | /en/products/fruits/ |
| fish oil supplier | 140 | /en/products/animal-feed/ |
| fish meal supplier | 110 | /en/products/animal-feed/ |
| squid supplier | 30 | /en/products/seafood/ |
| frozen mackerel supplier | 10 | /en/products/frozen-fish/ |

Generic consumer terms with big volumes ("osb board", "huile de foie de morue", "poisson
pané") have retail intent and are not targeted.

### Keyword → page map (one primary keyword per page, no cannibalisation)

| Page | FR primary | EN primary |
|---|---|---|
| Home | import export Casablanca / agent de marques | import export Morocco |
| Products hub | produits import export Maroc | Moroccan products supplier |
| Poisson congelé | poisson congelé Maroc | frozen fish supplier Morocco |
| Fruits de mer | poulpe / seiche / calamar congelé | frozen cuttlefish, octopus, squid |
| Conserves | conserves de sardines Maroc | canned sardines Morocco |
| Poisson précuit | poisson pané surgelé | frozen fish fingers wholesale |
| Fruits | agrumes / clémentine Maroc | clementine Morocco, Moroccan citrus |
| Légumes | légumes frais Maroc en gros | fresh vegetables Morocco wholesale |
| Bois | bois rouge, palette Europe, OSB Maroc | redwood timber, euro pallets |
| Alimentation animale | farine / huile de poisson | fish meal / fish oil supplier |
| Polymères | import polymères Maroc | polymers import Morocco |
| Services | agent commercial Maroc, représentation de marques | commercial agent Morocco |
| Blog: euro pallet | dimension palette europe | euro pallet dimensions |
| Blog: cephalopods | calamar / poulpe congelé Maroc | frozen octopus Morocco |
| Blog: standards | HACCP IFS BRC | HACCP IFS BRC |

## 4. Competitors

Searches for Moroccan seafood, produce and timber traders return almost only **directory
listings** (Kerix, Telecontact, EspaceAgro, Tridge), not company websites:

| Competitor | Where it shows | Note |
|---|---|---|
| Univela Morocco (Agadir) | own site, 6 languages | thin family pages, no specs, no structured data |
| Bel Fish (Agadir) | Kerix | octopus, squid, cuttlefish processing and export |
| Mahir Export, Asmak Morsad (Agadir) | Telecontact | frozen fish wholesale / import-export |
| Hassan Fish Maroc, Proframar (Casablanca) | Telecontact | fresh and frozen fish import-export |
| Mogafood, BK Fish | Tridge | frozen pelagics and cephalopods, HACCP |
| Socob, Larbi Bois (Casablanca) | Telecontact | timber importers and distributors |

**Gap:** few Moroccan traders have a real, structured, bilingual website. Rich family pages,
a FAQ per family, quote basket, schema.org and fast pages are enough to stand out on these
low-competition B2B searches.

## 5. Risks noted during research

- **Frozen sardine exports:** a January 2026 news report said Morocco would halt frozen
  sardine exports from 1 February 2026. The site lists sardines without promising export;
  check the current rule with the client.
- **"Bois rouge"** in Morocco usually means Scots pine from Northern Europe; the wood page
  explains it that way. Confirm with the client.
