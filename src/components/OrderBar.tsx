"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart, formatUSD } from "@/lib/cart";
import { site } from "@/data/site";

/**
 * Persistent action bar on mobile, where most restaurant traffic lands.
 *
 * It follows what the visitor is actually doing: the moment there is
 * something in the nut order, the bar becomes the way back to that order.
 * Before that it stays out of the way and offers the two things people came
 * for, calling and the menu.
 */
export default function OrderBar() {
  const cart = useCart();
  const pathname = usePathname();

  /**
   * Which action leads depends on where you are, not just what is in the cart.
   * On the nut shop the cart is the job. Everywhere else somebody is looking
   * at food and wants the phone, so the cart steps back to a compact chip
   * rather than taking over the bar.
   */
  const shopping = pathname.startsWith("/nuts");

  if (cart.count > 0 && shopping) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-cream/95 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => cart.setOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red py-3.5 font-semibold text-cream shadow-md shadow-red/25"
          >
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-cream/25 px-1.5 text-[0.7rem] font-bold tabular-nums">
              {cart.count}
            </span>
            View order
            <span className="tabular-nums">{formatUSD(cart.subtotal)}</span>
          </button>
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/20 text-ink"
          >
            <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    );
  }

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

        {cart.count > 0 ? (
          <button
            type="button"
            onClick={() => cart.setOpen(true)}
            aria-label={`View your nut order, ${cart.count} item${cart.count === 1 ? "" : "s"}`}
            className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/20 text-ink"
          >
            <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M4 6h16l-1.4 10.4A2 2 0 0 1 16.6 18H7.4a2 2 0 0 1-2-1.6L4 6Zm4 0a4 4 0 1 1 8 0"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red px-1 text-[0.65rem] font-bold text-cream tabular-nums">
              {cart.count}
            </span>
          </button>
        ) : (
          <Link
            href="/menu"
            className="rounded-full border border-ink/20 px-5 py-3.5 text-sm font-semibold text-ink"
          >
            Menu
          </Link>
        )}
      </div>
    </div>
  );
}
