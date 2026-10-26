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

## The design, third pass

The second pass read as a cartoon, and the owner said so. What made it one,
and what replaced it:

- **Devices.** A cheese drip with falling drops, a drawn pizza pulling a
  slice off the badge, a scrolling ticker, bouncing cards and a tilting
  logo. All gone. The badge is a seal in the story block, not a stage.
- **Shapes.** Pill buttons and 28px panels everywhere. Corners are 3px now,
  and the only circles are the badge and the open-now dot. Hairlines do the
  work boxes did.
- **Colour.** Oxblood, cream, basil green and cheese yellow together are the
  Italian-flag pizzeria cliché. The page runs ink, cream and oxblood; gold
  is a hairline and an eyebrow, never a ground. One ground per page: the
  home, About and Events pages are ink, and the menu, drinks, nuts and
  contact pages are cream because menus read better there.
- **Type.** Barlow Condensed in caps for display, Inter for reading. The
  badge is lettered in a condensed gothic and the headings now match it.
- **Layout.** The homepage opens with the thing nobody else has, ninety
  years on one corner, and tells it in words from the About page. Six
  photographs are used large and sparingly; nothing on a live page waits on
  a photograph that has not been taken.

The site is still Cascarelli's: every claim and heading is theirs. What
changed is the register.

## Stack

Next.js 16 App Router, TypeScript, Tailwind v4. Every page is statically
prerendered except `/drinks`, which revalidates every minute from the live
bar feed. Two route handlers: Stripe Checkout for the nuts, Resend for the
party form. `sharp` ships with Next and is what `tools/` uses for photos.

## Pages

`/` `/menu` `/drinks` `/nuts` `/events` `/about` `/contact` `/employment`

## Editing content

- `src/data/site.ts` — hours, address, phone, socials, reservations, live music
- `src/data/menu.ts` — menu sections and items, the homepage trio, nuts
- `src/data/bar.ts` — the full bar program: taps, wine, cocktails, zero proof
  (the snapshot; `src/data/liveBar.ts` overlays the Scooplist feed per section)
- `src/data/shop.ts` — the nut shop catalog and shipping. Prices are placeholders.
- `src/data/photos.ts` — photo slots

Change the hours in one place and the header badge, footer, contact table and
JSON-LD all update together.

## Photos

Six kitchen shots are in, all Cascarelli's own, taken out front in August
2026: the pizza, a calzone, a flatbread, the steak alfredo, the cheese bread
and the burger. They run on the homepage ("What's good here") and above
their sections on `/menu`, and the pizza is the link card every share shows.

One command per new shot, then one line:

```bash
node tools/ingest-photo.mjs ~/Downloads/IMG_1234.jpg taps
# writes public/photos/taps.jpg: rotated, EXIF stripped, 1600px, JPEG q82
```

then set `src: "/photos/taps.jpg"` on that slot in `src/data/photos.ts`.
Each slot carries a `position` for the crop, because every plate shot has
the storefront in the top half and the food in the bottom. Empty slots render
a styled placeholder naming the shot, so the layout never shifts. If the
pizza is ever reshot, `node tools/og-card.mjs` re-cuts the link card.

Still to shoot, in the order they matter: the dining room, the tap wall, the
nuts, the piano on a Wednesday, and the banquet room set for a party. The
MacCarelli, Porky's and the Flat Iron Salad would earn their way back onto
the homepage with a photo each.

The pizza owns the hero, beside the headline rather than behind it: on a
phone the text comes first so Call to Order stays above the fold, which is
the problem True North measured with a photo-above-text hero.

Cascarelli's own photos, from their gallery, Facebook and Instagram
(`@cascarellisofhomer`), are theirs to license. Yelp and Untappd photos belong
to the customers who took them.

## Still needs the owner

1. **Prices.** Not published anywhere public. The nut shop prices in
   `src/data/shop.ts` are placeholders too.
2. **Menu accuracy.** MacCarelli, Baby's Chicken Pie and Annie's Bread came
   from customer reviews, not from Cascarelli's. Confirm spellings. The
   photographs show dishes the old site never listed: a calzone (now on the
   menu page, unpriced), a steak alfredo, and a flatbread with lettuce and
   tomato. Confirm what each is called.
3. **The weekday and weekend menus.** Their site runs two and the split is
   scaffolded, but the actual differences need filling in.
4. **Photos** of the room, the taps, the nuts, the piano and the banquet room.
5. **Tax.** Stripe Tax is off until their accountant says which nuts are
   taxable in Michigan. The drawer says tax is calculated at checkout; today
   nothing is.

## Before launch

This is a spec build on a Glazed Web hostname, so it is deliberately
invisible to search engines. The day it becomes their site:

1. Remove the `X-Robots-Tag` header in `next.config.ts` and flip
   `src/app/robots.ts` to allow. Both, same commit.
2. Set `NEXT_PUBLIC_SITE_URL=https://cascarellis.com` in Vercel so the link
   card and structured data resolve on their domain.
3. Swap `STRIPE_SECRET_KEY` to the live key in their own Stripe account, and
   set the real nut prices.
4. Set `RESEND_API_KEY`, `INQUIRY_FROM` and `INQUIRY_TO`, and send one test
   inquiry that a human confirms receiving. Or swap the route to SMTP through
   a mailbox they already own (see `.env.example`).
5. Decide Stripe Tax with their accountant and turn on `automatic_tax`.

## Running it

```bash
npm install
npm run dev
npm run build
```
