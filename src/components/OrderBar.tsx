"use client";

import { site } from "@/data/site";

/**
 * Persistent ordering access on mobile, which is where 70%+ of restaurant
 * traffic lands. Body has bottom padding reserved for it in globals.css.
 */
export default function OrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-cream/95 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red py-3.5 font-semibold text-cream shadow-md shadow-red/25"
        >
          <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          Call to Order
        </a>
        <a
          href="/menu"
          className="rounded-full border border-ink/20 px-5 py-3.5 text-sm font-semibold text-ink"
        >
          Menu
        </a>
      </div>
    </div>
  );
}
