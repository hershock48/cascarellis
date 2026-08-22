import "server-only";

import { tapList, type Tap } from "@/data/bar";

/**
 * The live tap list, fed by Scooplist (the studio's board app, running a
 * second deployment configured as a tap room via SCOOPLIST_CATEGORIES).
 * truenorth/src/data/liveCase.ts is the reference integration this follows.
 *
 * With SCOOPLIST_FEED_URL set, the drinks page renders from
 * GET {feed}/api/v1/case/homer — the owner blows a keg on their phone and
 * the site follows within a couple of minutes, no deploy. Without the env
 * var, or on ANY feed failure, the page falls back to the transcribed
 * snapshot in bar.ts and renders exactly as it did before the feed existed.
 * The feed is an enhancement, never a dependency: a tap list that sometimes
 * 500s is worse than one that is occasionally a week stale.
 *
 * Fetches carry a 3s abort and 60s ISR revalidate, so a dead feed costs one
 * slow render per minute, not a hung page.
 *
 * LOCATION SLUG: "homer" — must match SCOOPLIST_LOCATIONS on the Scooplist
 * deployment (homer:Cascarelli's). One location; the Albion shop is closed.
 * CATEGORY: the feed's boards are filtered to the "taps" category key, which
 * must match SCOOPLIST_CATEGORIES (taps:On Tap) on that deployment.
 */

const LOCATION = "homer";
const CATEGORY = "taps";

type FeedFlavor = {
  name: string;
  producer: string;
  abv: string;
  tags: string[];
  low: boolean;
};

type FeedBoard = { key: string; flavors: FeedFlavor[] };

type Feed = { updatedAt: number | null; boards: FeedBoard[]; onDeck?: FeedFlavor[] };

/** What the drinks page renders: taps plus the honest provenance flags. */
export type TapsData = {
  taps: Tap[];
  /** Queued to go on next — worth a small "on deck" line when present. */
  onDeck: Tap[];
  /** Feed answered: the list is the owner's live board, not the snapshot. */
  live: boolean;
  updatedAt: number | null;
};

function feedUrl(): string | null {
  const base = process.env.SCOOPLIST_FEED_URL;
  return base ? base.replace(/\/$/, "") : null;
}

function toTap(f: FeedFlavor): Tap {
  // The feed stores ABV as entered ("6.8" or "6.8%"); the site renders "%".
  const abv = f.abv.trim();
  return {
    name: f.name,
    brewery: f.producer,
    abv: abv ? (abv.endsWith("%") ? abv : `${abv}%`) : undefined,
    local: f.tags.some((t) => t.toLowerCase() === "local"),
    low: f.low || undefined,
  };
}

/** The tap list — live when the feed answers, the bar.ts snapshot otherwise. */
export async function tapsData(): Promise<TapsData> {
  const base = feedUrl();
  if (!base) return { taps: tapList, onDeck: [], live: false, updatedAt: null };

  try {
    const res = await fetch(`${base}/api/v1/case/${LOCATION}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return { taps: tapList, onDeck: [], live: false, updatedAt: null };
    const feed = (await res.json()) as Feed;

    const board = feed.boards.find((b) => b.key === CATEGORY);
    const taps = (board?.flavors ?? []).map(toTap);
    // An empty live board is far more likely a misconfigured deployment
    // (wrong category key, unseeded library) than a bar with zero taps —
    // fall back rather than render a tavern with nothing on.
    if (taps.length === 0) return { taps: tapList, onDeck: [], live: false, updatedAt: null };

    const onDeck = (feed.onDeck ?? []).map(toTap);
    return { taps, onDeck, live: true, updatedAt: feed.updatedAt };
  } catch {
    return { taps: tapList, onDeck: [], live: false, updatedAt: null };
  }
}
