"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

/** Empties the cart once the customer lands on the thank you page. */
export default function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
