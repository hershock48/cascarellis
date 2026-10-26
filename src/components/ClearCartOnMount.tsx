"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

/**
 * Empties the cart once the customer lands on the thank you page.
 *
 * Stripe sends them back with a full page load. The cart is the storage
 * itself (src/lib/cart.tsx), so clear() writes an empty cart there and every
 * reader follows; there is no in-memory copy for a later restore to put the
 * paid-for items back, which is the bug this once had.
 */
export default function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
