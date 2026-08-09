"use client";

import { useCart } from "@/lib/cart";

/** Header cart control. Stays out of the way until there is something in it. */
export default function CartButton({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const cart = useCart();
  if (cart.count === 0) return null;

  return (
    <button
      type="button"
      onClick={() => cart.setOpen(true)}
      className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
        tone === "light"
          ? "border-cream/25 text-cream hover:border-gold hover:text-gold"
          : "border-ink/20 text-ink hover:border-red hover:text-red"
      }`}
    >
      <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M4 6h16l-1.4 10.4A2 2 0 0 1 16.6 18H7.4a2 2 0 0 1-2-1.6L4 6Zm4 0a4 4 0 1 1 8 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Order
      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red px-1.5 text-[0.7rem] font-bold text-cream tabular-nums">
        {cart.count}
      </span>
    </button>
  );
}
