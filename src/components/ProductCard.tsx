"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatUSD, type Product } from "@/data/shop";

export default function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const [sku, setSku] = useState(product.variants[0].sku);
  const selected = product.variants.find((v) => v.sku === sku) ?? product.variants[0];

  return (
    <div className="lift flex h-full flex-col rounded-panel border border-ink/10 bg-cream p-6">
      {product.featured && (
        <span className="mb-3 self-start text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-red">
          House favorite
        </span>
      )}

      <h3 className="font-display text-2xl font-bold leading-tight tracking-tight">
        {product.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-red">{product.blurb}</p>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink/70">
        {product.description}
      </p>

      {product.variants.length > 1 && (
        <fieldset className="mt-5">
          <legend className="sr-only">Size for {product.name}</legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const active = v.sku === sku;
              return (
                <button
                  key={v.sku}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSku(v.sku)}
                  className={`rounded-sm border px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "border-red bg-red text-cream"
                      : "border-ink/20 text-ink/70 hover:border-red hover:text-red"
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="font-display text-2xl font-bold tabular-nums">
          {formatUSD(selected.amount)}
        </p>
        <button
          type="button"
          onClick={() => cart.add(selected.sku)}
          className="btn-ink btn-sm shrink-0"
        >
          Add to order
        </button>
      </div>
    </div>
  );
}
