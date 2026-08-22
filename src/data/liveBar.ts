import "server-only";

import {
  tapList,
  wineList,
  cocktails,
  zeroProof,
  type Tap,
  type Wine,
  type WineSection,
  type DrinkSection,
} from "@/data/bar";

/**
 * The whole bar program, fed by Scooplist (the studio's board app, second
 * deployment configured for a tavern). Grew out of liveTaps.ts the day the
 * owner asked to manage wine and cocktails in the same place as taps:
 * whatever lives in the Scooplist library MUST be what the site renders, or
 * the first edit in the admin silently diverges from the page.
 *
 * With SCOOPLIST_FEED_URL set, every section of /drinks renders from
 * GET {feed}/api/v1/case/homer. Without it, or on ANY failure — network,
 * non-200, empty board, or a row that does not map cleanly — the affected
 * section falls back to the transcribed snapshot in bar.ts and renders
 * exactly as it did before the feed existed. Fallback is PER SECTION: a
 * malformed wine row must not take the tap list down with it.
 *
 * CATEGORY CONTRACT with the deployment's SCOOPLIST_CATEGORIES (the
 * populate script in tools/ and the client file carry the same list):
 *
 *   taps:On Tap
 *   spumante:Wine - Spumante
 *   bianco:Wine - Bianco e Rosato
 *   rosso:Wine - Rosso
 *   mules:Moscow Mules
 *   martinis:Martinis
 *   whiskey:Whiskey and Bourbon
 *   fun:For Fun
 *   mocktails:Mocktails
 *   na:Non-Alcoholic
 *
 * Mapping conventions, mirrored by tools/populate-scooplist.mjs:
 *  - Wine producer travels as "Producer ~ Region" (the printed list's own
 *    format); organic/vegan ride as tags; glass/bottle prices as sizes
 *    labeled Glass and Bottle; tasting notes as the description.
 *  - Cocktails and zero-proof carry one size labeled "Each"; an item note
 *    (e.g. "Made with vodka or gin") is the description.
 *  - Taps: producer is the brewery, abv is abv, the "local" tag marks the
 *    hometown pour, low = last call. onDeck is rendered under the taps.
 */

const LOCATION = "homer";

type FeedFlavor = {
  name: string;
  description: string;
  producer: string;
  abv: string;
  tags: string[];
  sizes: { label: string; price: string }[];
  low: boolean;
};

type FeedBoard = { key: string; flavors: FeedFlavor[] };

type Feed = { updatedAt: number | null; boards: FeedBoard[]; onDeck?: FeedFlavor[] };

export type BarData = {
  taps: Tap[];
  onDeck: Tap[];
  wineList: WineSection[];
  cocktails: DrinkSection[];
  zeroProof: DrinkSection[];
  /** Which halves are live; anything not live is the bar.ts snapshot. */
  live: { taps: boolean; wine: boolean; cocktails: boolean; zeroProof: boolean };
  updatedAt: number | null;
};

const STATIC_BAR: BarData = {
  taps: tapList,
  onDeck: [],
  wineList,
  cocktails,
  zeroProof,
  live: { taps: false, wine: false, cocktails: false, zeroProof: false },
  updatedAt: null,
};

function feedUrl(): string | null {
  const base = process.env.SCOOPLIST_FEED_URL;
  return base ? base.replace(/\/$/, "") : null;
}

function board(feed: Feed, key: string): FeedFlavor[] {
  return feed.boards.find((b) => b.key === key)?.flavors ?? [];
}

function toTap(f: FeedFlavor): Tap {
  const abv = f.abv.trim();
  return {
    name: f.name,
    brewery: f.producer,
    abv: abv ? (abv.endsWith("%") ? abv : `${abv}%`) : undefined,
    local: f.tags.some((t) => t.toLowerCase() === "local"),
    low: f.low || undefined,
  };
}

function price(f: FeedFlavor, label: string): number | null {
  const s = f.sizes.find((x) => x.label.toLowerCase() === label);
  if (!s) return null;
  const n = Number(s.price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Null when the row cannot make an honest Wine — the section then falls back. */
function toWine(f: FeedFlavor): Wine | null {
  const bottle = price(f, "bottle");
  if (bottle === null) return null;
  const [producer, ...region] = f.producer.split("~");
  const tags = f.tags.map((t) => t.toLowerCase());
  return {
    name: f.name,
    producer: producer.trim() || f.producer,
    region: region.join("~").trim(),
    glass: price(f, "glass") ?? undefined,
    bottle,
    notes: f.description,
    organic: tags.includes("organic") || undefined,
    vegan: tags.includes("vegan") || undefined,
  };
}

function toDrink(f: FeedFlavor): { name: string; price: string; note?: string } | null {
  const each = f.sizes[0]?.price?.trim();
  if (!each) return null;
  return { name: f.name, price: each, note: f.description || undefined };
}

/** All rows must map or the section is not trusted (misconfig beats partial truth). */
function mapAll<T>(rows: FeedFlavor[], map: (f: FeedFlavor) => T | null): T[] | null {
  if (rows.length === 0) return null;
  const out: T[] = [];
  for (const row of rows) {
    const mapped = map(row);
    if (mapped === null) return null;
    out.push(mapped);
  }
  return out;
}

function liveWineList(feed: Feed): WineSection[] | null {
  const sections: WineSection[] = [];
  for (const s of wineList) {
    // Static bar.ts owns the section ids/titles (site voice); the feed owns
    // the rows. A missing or unmappable board fails the whole wine half.
    const rows = mapAll(board(feed, s.id), toWine);
    if (rows === null) return null;
    sections.push({ id: s.id, title: s.title, wines: rows });
  }
  return sections;
}

function liveSections(feed: Feed, statics: DrinkSection[]): DrinkSection[] | null {
  const sections: DrinkSection[] = [];
  for (const s of statics) {
    const rows = mapAll(board(feed, s.id), toDrink);
    if (rows === null) return null;
    sections.push({ ...s, items: rows });
  }
  return sections;
}

/** The bar — each half live when its boards map cleanly, snapshot otherwise. */
export async function barData(): Promise<BarData> {
  const base = feedUrl();
  if (!base) return STATIC_BAR;

  let feed: Feed;
  try {
    const res = await fetch(`${base}/api/v1/case/${LOCATION}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return STATIC_BAR;
    feed = (await res.json()) as Feed;
  } catch {
    return STATIC_BAR;
  }

  const taps = board(feed, "taps").map(toTap);
  const wine = liveWineList(feed);
  const cocktailSections = liveSections(feed, cocktails);
  const zeroProofSections = liveSections(feed, zeroProof);

  return {
    taps: taps.length > 0 ? taps : tapList,
    onDeck: taps.length > 0 ? (feed.onDeck ?? []).map(toTap) : [],
    wineList: wine ?? wineList,
    cocktails: cocktailSections ?? cocktails,
    zeroProof: zeroProofSections ?? zeroProof,
    live: {
      taps: taps.length > 0,
      wine: wine !== null,
      cocktails: cocktailSections !== null,
      zeroProof: zeroProofSections !== null,
    },
    updatedAt: feed.updatedAt,
  };
}
