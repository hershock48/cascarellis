"use client";

import { useEffect, useRef, useState } from "react";
import { useCart, formatUSD } from "@/lib/cart";
import { findSku, shipping } from "@/data/shop";
import { site } from "@/data/site";

export default function CartDrawer() {
  const cart = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  // Escape closes, and Tab is kept inside the panel while it is open.
  useEffect(() => {
    if (!cart.open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cart.setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cart]);

  // Remember where focus was, move it into the panel, put it back on close.
  useEffect(() => {
    if (cart.open) {
      returnTo.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
    } else {
      returnTo.current?.focus?.();
    }
  }, [cart.open]);

  useEffect(() => {
    document.body.style.overflow = cart.open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cart.open]);

  async function checkout() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: cart.lines }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong.");
        setBusy(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Could not reach checkout. Please try again, or give us a call.");
      setBusy(false);
    }
  }

  if (!cart.open) return null;

  const remaining = shipping.freeThreshold - cart.subtotal;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => cart.setOpen(false)}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-2xl font-bold tracking-tight">Your order</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => cart.setOpen(false)}
            aria-label="Close"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink"
          >
            <span aria-hidden>&times;</span>
          </button>
        </header>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-8 text-center">
            <p className="text-ink/60">Nothing in here yet.</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
              {cart.lines.map((line) => {
                const hit = findSku(line.sku);
                if (!hit) return null;
                return (
                  <li key={line.sku} className="flex gap-4 py-5">
                    <div className="flex-1">
                      <p className="font-display text-lg font-bold leading-tight tracking-tight">
                        {hit.product.name}
                      </p>
                      <p className="mt-0.5 text-sm text-ink/60">{hit.variant.label}</p>

                      <div className="mt-3 inline-flex items-center rounded-full border border-ink/20">
                        <button
                          type="button"
                          onClick={() => cart.setQty(line.sku, line.qty - 1)}
                          aria-label={`Remove one ${hit.product.name}`}
                          className="grid h-9 w-9 place-items-center rounded-l-full text-ink/70 hover:text-red"
                        >
                          &minus;
                        </button>
                        <span
                          aria-live="polite"
                          className="w-8 text-center text-sm font-semibold tabular-nums"
                        >
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => cart.setQty(line.sku, line.qty + 1)}
                          aria-label={`Add one ${hit.product.name}`}
                          className="grid h-9 w-9 place-items-center rounded-r-full text-ink/70 hover:text-red"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold tabular-nums">
                        {formatUSD(hit.variant.amount * line.qty)}
                      </p>
                      <button
                        type="button"
                        onClick={() => cart.remove(line.sku)}
                        className="mt-2 text-xs text-ink/50 underline underline-offset-4 hover:text-red"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="border-t border-ink/10 px-6 py-5">
              {remaining > 0 && (
                <p className="mb-4 rounded-card bg-red/8 px-4 py-3 text-center text-sm text-red">
                  {formatUSD(remaining)} more for free shipping
                </p>
              )}

              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink/65">Subtotal</dt>
                  <dd className="font-semibold tabular-nums">{formatUSD(cart.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/65">Shipping</dt>
                  <dd className="font-semibold tabular-nums">
                    {cart.shippingCost === 0 ? "Free" : formatUSD(cart.shippingCost)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-ink/10 pt-2 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-display text-xl font-bold tabular-nums">
                    {formatUSD(cart.total)}
                  </dd>
                </div>
              </dl>

              <p className="mt-2 text-xs text-ink/50">
                Tax, if it applies, is calculated at checkout.
              </p>

              {error && (
                <p role="alert" className="mt-4 rounded-card bg-red/10 px-4 py-3 text-sm text-red">
                  {error}{" "}
                  <a href={site.phoneHref} className="font-semibold underline">
                    {site.phone}
                  </a>
                </p>
              )}

              <button
                type="button"
                onClick={checkout}
                disabled={busy}
                className="btn-primary mt-4 w-full disabled:opacity-60"
              >
                {busy ? "Taking you to checkout..." : "Check out"}
              </button>

              <p className="mt-3 text-center text-xs text-ink/50">
                Secure payment by Stripe
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
