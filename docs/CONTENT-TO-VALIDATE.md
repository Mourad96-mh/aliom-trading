# Content to validate with the client

Everything below is on the site now. Each item is either an assumption or a placeholder.

## Identity and contact

- [ ] **Founder's name spelling**: "Habiba Ouliass" (her own presentation) vs "OULIAS Habiba" (trade register). The site uses Ouliass.
- [ ] **WhatsApp**: assumed to be the same number as the phone (06 60 16 11 57).
- [ ] **Address**: "2-4, rue Abou Dhabi, Oasis, Casablanca" (the register says "N 2 ET 4 RUE ABOU DHABI OASIS"). Postal code unknown, so it is left out.
- [ ] **Opening hours**: not published, because we don't have them.
- [ ] **Logo**: redrawn from a low-resolution capture. We need the original vector file.
- [ ] **Hosting / mailbox**: the domain is at ADK Media. We need FTP/cPanel access and the SMTP settings of info@aliomtrading.com for the forms.

## Products (taken from univela-morocco.com, at the user's request)

- [ ] Does ALIOM really trade **all nine families**? Remove any that don't apply (one line each in `web/data/catalog.ts`).
- [ ] **Frozen sardines**: Morocco announced a halt to frozen-sardine exports from 1 Feb 2026. Is the product for the local market, imports, or should it be removed?
- [ ] The **"Formats", "Conditionnement" and "Transport"** lines on each family page are standard trade practice, not ALIOM commitments. Confirm or correct them.
- [ ] **Wood**: origin "Europe, selon arrivages"; the "bois rouge = pin sylvestre" explanation; 9–22 mm OSB; new or refurbished pallets.
- [ ] **Polymers**: which materials exactly (PE, PP, PVC, SBR…)?
- [ ] **Avocado** "Hass et variétés vertes du Gharb"; **Nour clementine** described as a late, seedless variety.
- [ ] **Brands represented**: the site never names a brand. If ALIOM can list the brands it represents (with their permission), add a "Nos marques" section. It is the strongest proof for an agent.

## Claims

- [ ] "Nous respectons les exigences HACCP, IFS et BRC" is the client's own sentence. The site never says "certified". Are there certificates (of ALIOM or of its suppliers) we can show?
- [ ] "Expertise indépendante par lot" (fruit and vegetables) comes from the reference site. Does ALIOM offer it?
- [ ] Home facts band: 2021 / 9 families / 58 products / HACCP · IFS · BRC. These are all from the documents. Add real figures if the client has them (countries served, tonnes per year).

## Blog

- [ ] Three starter guides (HACCP-IFS-BRC, cephalopods, euro pallet), written by us from general public facts. The client should read them.

## Photos

- [ ] All photos are free stand-ins (see `web/public/media/CREDITS.json`). We need the client's own: warehouse, products, team, office.
