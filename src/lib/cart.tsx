"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
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
};

const CartContext = createContext<CartValue | null>(null);
const STORAGE_KEY = "cascarellis-cart-v1";
const MAX_QTY = 20;
const EMPTY = "[]";

/* ───────────────────────────── the store ─────────────────────────────────
   localStorage IS the cart. The provider does not keep its own copy and
   restore it after mount; it subscribes to storage through
   useSyncExternalStore, which is what React wants for state that lives
   outside the tree. Two things fall out of that:

   - The hydration dance is React's: the server snapshot is an empty cart,
     the client snapshot is whatever is saved, and React swaps them as part
     of hydration rather than in an effect that races every other effect.
     (The thank-you page's clear() used to lose exactly that race.)
   - Every write goes to storage first and notifies second, so a mutation
     from any component, or from another tab via the storage event, is the
     same mutation.

   Storage that throws (private mode, quota, a blocked origin) falls back to
   a module-level string for the life of the page, so the cart still works,
   it just does not survive a reload there. */

const listeners = new Set<() => void>();
let memory = EMPTY;
let useMemoryOnly = false;

function read(): string {
  if (useMemoryOnly) return memory;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    useMemoryOnly = true;
    return memory;
  }
}

function write(lines: CartLine[]) {
  const raw = JSON.stringify(lines);
  memory = raw;
  if (!useMemoryOnly) {
    try {
      window.localStorage.setItem(STORAGE_KEY, raw);
    } catch {
      useMemoryOnly = true;
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getServerSnapshot() {
  return EMPTY;
}

/** Corrupt or stale storage is not worth breaking the page over: anything
    that is not a well-formed line for a sku still in the catalog is dropped,
    and quantities are clamped to what the checkout route accepts. */
function parse(raw: string): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (l): l is CartLine =>
          !!l &&
          typeof (l as CartLine).sku === "string" &&
          Number.isFinite((l as CartLine).qty),
      )
      .filter((l) => findSku(l.sku))
      .map((l) => ({ sku: l.sku, qty: Math.min(MAX_QTY, Math.max(1, Math.floor(l.qty))) }));
  } catch {
    return [];
  }
}

function mutate(fn: (prev: CartLine[]) => CartLine[]) {
  write(fn(parse(read())));
}

/* ───────────────────────────── the provider ───────────────────────────── */

export function CartProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, read, getServerSnapshot);
  const lines = useMemo(() => parse(raw), [raw]);
  const [open, setOpen] = useState(false);

  const add = useCallback((sku: string, qty = 1) => {
    if (!findSku(sku)) return;
    mutate((prev) => {
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
    mutate((prev) =>
      qty <= 0
        ? prev.filter((l) => l.sku !== sku)
        : prev.map((l) => (l.sku === sku ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  }, []);

  const remove = useCallback((sku: string) => {
    mutate((prev) => prev.filter((l) => l.sku !== sku));
  }, []);

  const clear = useCallback(() => write([]), []);

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

  // Memoised so consumers that depend on the whole value (CartDrawer's key
  // handler) do not re-subscribe on every render of the provider.
  const value = useMemo<CartValue>(
    () => ({
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
    }),
    [lines, count, subtotal, shippingCost, add, setQty, remove, clear, open],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export { formatUSD };
