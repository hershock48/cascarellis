"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { findSku, formatUSD, shipping } from "@/data/shop";

export type CartLine = { sku: string; qty: number };

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shippingCost: number;
  total: number;
  add: (sku: string, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  /** True once the saved cart has been read back from storage. Anything that
      wants to replace the cart on mount must wait for this: child effects run
      before the provider's restore effect, so an unguarded clear() on mount is
      overwritten by the restore a moment later. */
  hydrated: boolean;
};

const CartContext = createContext<CartValue | null>(null);
const STORAGE_KEY = "cascarellis-cart-v1";
const MAX_QTY = 20;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore after mount so server and client render the same thing first.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(
            parsed
              .filter(
                (l): l is CartLine =>
                  !!l &&
                  typeof (l as CartLine).sku === "string" &&
                  Number.isFinite((l as CartLine).qty),
              )
              // Drop anything no longer in the catalog.
              .filter((l) => findSku(l.sku))
              .map((l) => ({ sku: l.sku, qty: Math.min(MAX_QTY, Math.max(1, l.qty)) })),
          );
        }
      }
    } catch {
      // Corrupt or unavailable storage is not worth breaking the page over.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* private mode, quota, etc. */
    }
  }, [lines, hydrated]);

  const add = useCallback((sku: string, qty = 1) => {
    if (!findSku(sku)) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.sku === sku);
      if (existing) {
        return prev.map((l) =>
          l.sku === sku ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
        );
      }
      return [...prev, { sku, qty: Math.min(MAX_QTY, qty) }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((sku: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.sku !== sku)
        : prev.map((l) => (l.sku === sku ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  }, []);

  const remove = useCallback((sku: string) => {
    setLines((prev) => prev.filter((l) => l.sku !== sku));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const hit = findSku(line.sku);
      if (!hit) continue;
      count += line.qty;
      subtotal += hit.variant.amount * line.qty;
    }
    return { count, subtotal };
  }, [lines]);

  // Mirrors the server calculation exactly. The server still recomputes it.
  const shippingCost =
    subtotal === 0 || subtotal >= shipping.freeThreshold ? 0 : shipping.flatRate;

  const value: CartValue = {
    lines,
    count,
    subtotal,
    shippingCost,
    total: subtotal + shippingCost,
    add,
    setQty,
    remove,
    clear,
    open,
    setOpen,
    hydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export { formatUSD };
