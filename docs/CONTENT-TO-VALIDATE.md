# Content to validate with the client

Everything below is on the site now. Each item is either an assumption or a placeholder.

## Identity and contact

- [ ] **Founder's name spelling**: "Habiba Ouliass" (her own presentation) vs "OULIAS Habiba" (trade register). The site uses Ouliass.
- [ ] **WhatsApp**: assumed to be the same number as the phone (06 60 16 11 57).
- [ ] **Address**: "2-4, rue Abou Dhabi, Oasis, Casablanca" (the register says "N 2 ET 4 RUE ABOU DHABI OASIS"). Postal code unknown, so it is left out.
- [ ] **Opening hours**: not published, because we don't have them.
- [ ] **Logo**: redrawn from a low-resolution capture. We need the original vector file.
- [ ] **Hosting / mailbox**: the domain is at ADK Media. We need FTP/cPanel access and the SMTP settings of info@aliomtrading.com for the forms.

## Products (export / import structure, client's brief of 2026-10-29)

Two poles modelled on ABS GLOBAL TRADING: export from Morocco (8 families) and import into
Morocco (3 families). Timber and polymers were removed. The client now adds or edits
products at /admin/; families still live in `web/data/catalog.ts`.

- [ ] **New export products**: canned tuna, green and black olives, capers; olive oil (extra virgin, virgin), culinary and cosmetic argan oil, prickly pear seed oil.
- [ ] **New import families**: metal cans (3-piece, 1/4 club drawn, easy-open ends, tinplate, aluminium), imported oils (soybean, sunflower, palm, rapeseed), imported canned food (tuna, sweet corn, tomato paste, mushrooms, vegetables, fruit in syrup). Our own selection: confirm or adjust.
- [ ] Claims in the new family copy: "Morocco among the major exporters of table olives and capers", "the only country where the argan tree grows in the wild", "Morocco imports most of the vegetable oil it consumes", Arabic + French labelling and ONSSA inspection on imports.
- [ ] **Frozen sardines**: Morocco announced a halt to frozen-sardine exports from 1 Feb 2026. Is the product for the local market, imports, or should it be removed?
- [ ] The **"Formats", "Conditionnement" and "Transport"** lines on each family page are standard trade practice, not ALIOM commitments. Confirm or correct them.
- [ ] **Avocado** "Hass et variétés vertes du Gharb"; **Nour clementine** described as a late, seedless variety.
- [ ] **Brands represented**: the site never names a brand. If ALIOM can list the brands it represents (with their permission), add a "Nos marques" section. It is the strongest proof for an agent.

## Claims

- [ ] "Nous respectons les exigences HACCP, IFS et BRC" is the client's own sentence. The site never says "certified". Are there certificates (of ALIOM or of its suppliers) we can show?
- [ ] "Expertise indépendante par lot" (fruit and vegetables) comes from the reference site. Does ALIOM offer it?
- [ ] Home facts band: 2021 / 11 families (counted from the code) / 2 poles / HACCP · IFS · BRC. These are all from the documents. Add real figures if the client has them (countries served, tonnes per year).

## Positioning (brief of 2026-11-01: généraliste, négoce international)

- [ ] Tagline "Votre partenaire commercial entre le Maroc et les marchés internationaux" and the "service complet" sentence are the client's own words. The rest of the trading-house copy (home, services, about) is ours.
- [ ] "Nos domaines d'intervention" (`web/data/sectors.ts`): Agroalimentaire and Emballage are linked to the catalogue. The four "Sourcing sur demande" sectors (matières premières et semi-finis, grande consommation, matériaux de construction, équipements industriels) are our proposal. The client should confirm, add or remove sectors.
- [ ] Home facts band now reads "3 métiers : import, export, sourcing" instead of "2 pôles".
- [ ] 2026-11-06: logistics is no longer offered ("nous n'offrons pas ces services, mais nous faisons le suivi"). Every logistics claim now reads as order follow-up. New wording to confirm: the "Suivi des commandes" service card ("Nous ne sommes pas transitaire…") and the ONSSA FAQ on imported canned food (inspection and customs are the importer's and their forwarder's job; we chase the manufacturer for the documents). Check that the live admin catalogue doesn't still carry the old canned-food texts.
- [ ] 2026-11-06: "Distribution et représentation de marques" sector card ("Notre métier d'origine"), plus "poursuit cette activité de distribution" in About. This matches the Kerix listing. Ask the client whether the registered objet social (RC) covers import-export / négoce; if it doesn't, the statuts should be amended.

## Blog

- [ ] Two starter guides (HACCP-IFS-BRC, cephalopods), written by us from general public facts. The client should read them. (The euro-pallet guide was removed with timber; an article on canned food or olive oil would fit the new range.)

## Photos

- [ ] All photos are free stand-ins (see `web/public/media/CREDITS.json`). We need the client's own: warehouse, products, team, office.
