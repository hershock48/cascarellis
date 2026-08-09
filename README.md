# Cascarelli's of Homer

A new website for Cascarelli's of Homer, 103 E Main St, Homer, Michigan.
Built by [glazedweb](https://github.com/hershock48).

## Why this exists

The current site at cascarellis.com has some concrete problems:

- **No working HTTPS.** Requesting `https://cascarellis.com` redirects back to
  plain `http`, and the certificate presented fails hostname verification.
  Browsers show "Not Secure" and Google has demoted non-HTTPS sites for years.
- **A holiday notice from 2023** is still live on the contact page ("closed on
  Sunday, May 28th and Monday, May 29th for Memorial Day").
- **No menu with prices** on their own domain, so Sirved, MenuPix, Zmenu,
  Restaurantji and Wheree fill the gap with guesses.
- **No online ordering** of any kind.
- **No links to their Facebook or Instagram**, both of which are active.

This rebuild fixes all of those and puts the family's actual story, which is
excellent, somewhere people will read it.

## Stack

- Next.js 16 (App Router, all routes statically prerendered)
- TypeScript
- Tailwind CSS v4
- `next/font` for Fraunces and Inter, self hosted at build time
- No external JS dependencies

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, the three things they are known for, signature pizzas, taps, history, visit |
| `/menu` | Full menu with jump navigation |
| `/beer-and-wine` | The twenty taps and the wine list |
| `/peanuts` | The nut roasting business, running since 1897 |
| `/history` | Four generations, 1856 to today |
| `/visit` | Hours, address, phone, map |

## Built in

- `Restaurant` JSON-LD with address, hours, phone, rating and social profiles
- Per page titles, descriptions, canonicals, Open Graph and Twitter cards
- Generated `sitemap.xml` and `robots.txt`
- Live open/closed indicator computed in `America/Detroit`, correct for
  visitors in any timezone
- Click to load map, so no Google cookies or map tiles on first paint
- Skip link, focus rings, labelled landmarks, `prefers-reduced-motion` support
- Click to call on every page, which is how most of their orders arrive

## Where the voice came from

The copy is not invented. It is built from things Cascarelli's and their
customers actually say:

- **"Home of our famous pizza.. and so much more!"** is their own Facebook
  tagline, lightly tightened for the headline.
- **The MacCarelli** is described by reviewers as a Big Mac pizza: Thousand
  Island instead of red sauce, seasoned ground beef, onion, dill pickle relish,
  mozzarella and cheddar, with shredded lettuce and a drizzle added after the
  oven. Multiple people mention driving 25 or more miles for it.
- **The wait** comes up constantly, 45 to 60 minutes on a Friday. Owning it
  reads better than hiding it, and it sets expectations before somebody shows
  up hungry at 7pm.
- **"Old time saloon vibe," "stepped back in time," and the chandeliers** are
  all lifted from how customers describe the room.
- **Ryan** is the third generation owner and reviewers repeatedly mention him
  telling them the history of the name.
- Named items pulled from reviews: Porky's Meat Lovers Dream, Baby's Chicken
  Pie, Annie's Bread, the Flat Iron Salad, the Autumn Harvest Salad, Ryan's
  Nuts, and a Bloody Mary with a following.

## What still needs the owner

1. **Spellings.** MacCarelli, Baby's Chicken Pie and Annie's Bread came from
   customer reviews, not from Cascarelli's. Confirm before launch.
2. **Prices.** Not published anywhere public. Add a `price` field to any item
   in `src/data/menu.ts` and it renders automatically.
3. **The rest of the menu.** Only items with public evidence are listed.
4. **Photos.** The design is typographic on purpose and holds without images,
   but the room, the oven and the peanut roaster deserve to be seen.
5. **Merch.** They already sell mugs, tumblers, hats and shirts at the counter.
   That is a small store waiting to happen.

## Editing content

Nearly everything lives in two files:

- `src/data/site.ts` — hours, address, phone, social links, review count
- `src/data/menu.ts` — every menu section and item, the tap note, the wine note

Change the hours in `site.ts` and the header badge, the footer, the visit page
table and the JSON-LD all update together.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
