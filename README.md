# Cascarelli's of Homer

A rebuild of cascarellis.com for Cascarelli's of Homer, 103 E Main Street,
Homer, Michigan. Built by [Glazed Web](https://glazedweb.com).

## Approach

Keep their brand, fix the execution. Every heading, claim and category comes
from Cascarelli's own site. Nothing about the business was reinvented.

Their words, used as written or lightly tightened:

- "A one-of-a-kind pizza restaurant"
- "A far reaching reputation for terrific food and superb service"
- "20 beers on draft, and 19 of them are from Michigan"
- "World famous specialty nuts"
- "Pick up draft beer or wine to go"
- Live piano every Wednesday and Saturday
- Reservations for groups of 8 to 45, banquet room and patio

## What the current site is losing them

- **No working HTTPS.** The certificate fails hostname verification, so
  browsers flag the site as Not Secure and link previews do not render when
  someone shares it. It is severe enough that automated clients cannot fetch
  robots.txt.
- **A Memorial Day notice from 2023** still live on the contact page.
- **No ordering call to action.** Phone number is in the header, but nothing
  drives to it.
- **Menu not on their own domain**, so Sirved, MenuPix, Zmenu and Restaurantji
  rank for their food instead of them.
- **Live piano, the banquet room and the patio are buried.** These are booking
  drivers and they are barely mentioned.

## Conversion patterns applied

Based on current restaurant web practice, where 70%+ of traffic is mobile:

- Call to Order above the fold on every page, plus a persistent sticky bar on
  mobile that never scrolls away
- Food photography above the fold, the single highest impact asset
- A "What's good here" block answering the first question every new visitor has
- HTML menu, not a PDF, so it can be indexed and read on a phone
- Hours, address and a tappable phone number on every page
- Live open/closed status computed in America/Detroit
- Restaurant JSON-LD with hours, rating, reservations and menu URL

## Stack

Next.js 16 App Router, TypeScript, Tailwind v4. Every route statically
prerendered. No external JS dependencies.

## Pages

`/` `/menu` `/drinks` `/nuts` `/events` `/about` `/contact` `/employment`

## Editing content

- `src/data/site.ts` — hours, address, phone, socials, reservations, live music
- `src/data/menu.ts` — menu sections and items, best sellers, nuts, drinks
- `src/data/photos.ts` — photo slots

Change the hours in one place and the header badge, footer, contact table and
JSON-LD all update together.

## Photos

Nine slots are placed and sized. Empty ones render a styled placeholder naming
the shot, so the layout never shifts. Drop a file in `public/photos/`, set
`src` in `src/data/photos.ts`, done. `heroPizza` is the one to chase first.

Cascarelli's own photos, from their gallery, Facebook and Instagram
(`@cascarellisofhomer`), are theirs to license. Yelp and Untappd photos belong
to the customers who took them.

## Still needs the owner

1. **Prices.** Not published anywhere public.
2. **Menu accuracy.** MacCarelli, Baby's Chicken Pie and Annie's Bread came
   from customer reviews, not from Cascarelli's. Confirm spellings.
3. **The weekday and weekend menus.** Their site runs two and the split is
   scaffolded, but the actual differences need filling in.
4. **Photos.**

## Running it

```bash
npm install
npm run dev
npm run build
```
