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

## What still needs the owner

Everything on the site was pulled from Cascarelli's own pages, their social
accounts, or customer reviews. Three things need them:

1. **Prices.** Not published anywhere public. Add a `price` field to any item
   in `src/data/menu.ts` and it renders automatically.
2. **The rest of the menu.** Only items with public evidence are listed. Adding
   more is a matter of pushing objects into the arrays in the same file.
3. **Photos.** The design is typographic on purpose and holds up without
   images, but real photos of the room, the oven and the peanut roaster would
   lift it further.

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
