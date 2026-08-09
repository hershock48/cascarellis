/**
 * NUT SHOP CATALOG
 *
 * This file is the single source of truth for what is for sale and what it
 * costs. The checkout API reads prices from HERE on the server and never
 * trusts anything the browser sends, so a customer cannot edit a price in
 * devtools and check out for a dollar. The client only ever sends a sku and
 * a quantity.
 *
 * PRICES BELOW ARE PLACEHOLDERS. Ryan needs to set real ones before launch.
 * Amounts are in cents.
 */

export type Variant = {
  /** Stable id. Never reuse one for a different product. */
  sku: string;
  label: string;
  /** Cents. 1650 = $16.50 */
  amount: number;
};

export type Product = {
  id: string;
  name: string;
  blurb: string;
  /** Longer copy for the product card. */
  description: string;
  /** Pushed to the top of the shop and given a badge. */
  featured?: boolean;
  /** Key in src/data/photos.ts, when a photo exists. */
  photo?: string;
  variants: Variant[];
};

export const products: Product[] = [
  {
    id: "red-skin-peanuts",
    name: "Red Skin Peanuts",
    blurb: "The original.",
    description:
      "The nut the family has been roasting the longest. Skins on, salted, and the bag most people walk out with.",
    featured: true,
    variants: [
      { sku: "peanut-1lb", label: "1 lb", amount: 900 },
      { sku: "peanut-2lb", label: "2 lb", amount: 1600 },
    ],
  },
  {
    id: "brazilian-cashews",
    name: "Brazilian Cashews",
    blurb: "Roasted in small batches.",
    description:
      "Large whole cashews, roasted here and salted while they are still warm. These are the ones people get particular about.",
    featured: true,
    variants: [
      { sku: "cashew-1lb", label: "1 lb", amount: 1800 },
      { sku: "cashew-2lb", label: "2 lb", amount: 3300 },
    ],
  },
  {
    id: "sriracha-honey-cashews",
    name: "Sriracha and Honey Cashews",
    blurb: "Sweet first, heat after.",
    description:
      "A glazed cashew with enough heat to notice on the back end. The one that surprises people.",
    variants: [
      { sku: "sriracha-1lb", label: "1 lb", amount: 1950 },
      { sku: "sriracha-2lb", label: "2 lb", amount: 3600 },
    ],
  },
  {
    id: "cinnamon-sugar-cashews",
    name: "Cinnamon and Sugar Cashews",
    blurb: "A holiday favorite.",
    description:
      "Warm spice and a candied shell. These move fastest between Thanksgiving and New Year, so order early.",
    variants: [
      { sku: "cinnamon-1lb", label: "1 lb", amount: 1950 },
      { sku: "cinnamon-2lb", label: "2 lb", amount: 3600 },
    ],
  },
  {
    id: "macadamia-nuts",
    name: "Macadamia Nuts",
    blurb: "Rich and buttery.",
    description: "The expensive ones, and worth it. Usually gone by the weekend.",
    variants: [
      { sku: "macadamia-8oz", label: "8 oz", amount: 1700 },
      { sku: "macadamia-1lb", label: "1 lb", amount: 3100 },
    ],
  },
  {
    id: "maple-glazed-pecans",
    name: "Maple Glazed Pecans",
    blurb: "Michigan maple.",
    description:
      "Pecans glazed in real maple. Good on a salad, better straight out of the bag.",
    variants: [
      { sku: "pecan-1lb", label: "1 lb", amount: 2100 },
      { sku: "pecan-2lb", label: "2 lb", amount: 3900 },
    ],
  },
];

/** Flat rate, free above the threshold. Cents. */
export const shipping = {
  flatRate: 895,
  freeThreshold: 5000,
  label: "USPS Priority Mail",
  freeLabel: "Free shipping",
  estimateDays: { min: 2, max: 5 },
};

/** Every variant, flattened, for server side lookup. */
const bySku = new Map<string, { product: Product; variant: Variant }>();
for (const product of products) {
  for (const variant of product.variants) {
    bySku.set(variant.sku, { product, variant });
  }
}

export function findSku(sku: string) {
  return bySku.get(sku);
}

export function formatUSD(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
