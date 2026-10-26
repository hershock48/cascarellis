"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

/**
 * Empties the cart once the customer lands on the thank you page.
 *
 * Gated on `hydrated`: Stripe sends the customer back with a full page load,
 * so the provider mounts fresh and restores the saved cart in its own effect,
 * which runs AFTER this child's. An ungated clear() here ran first, the
 * restore put the paid-for items straight back, and the thank-you page showed
 * "1 View order $9.00" under the words "Your order is in."
 */
export default function ClearCartOnMount() {
  const { clear, hydrated } = useCart();
  useEffect(() => {
    if (hydrated) clear();
  }, [hydrated, clear]);
  return null;
}
