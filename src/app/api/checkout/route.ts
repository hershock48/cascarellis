import { NextResponse } from "next/server";
import Stripe from "stripe";
import { findSku, shipping } from "@/data/shop";
import { site } from "@/data/site";

export const runtime = "nodejs";

const MAX_QTY = 20;
const MAX_LINES = 20;

/**
 * Creates a Stripe Checkout Session for a nut order.
 *
 * The browser sends only skus and quantities. Every price is looked up from
 * src/data/shop.ts on the server, so a tampered request cannot change what
 * anything costs. Shipping is recalculated here too, never trusted.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;

  if (!secret) {
    // The dev detail goes to the server log; the customer gets a way forward.
    // No phone number in this copy: CartDrawer appends the linked number
    // after every error, and baking it in here printed it twice.
    console.error("Checkout unavailable: STRIPE_SECRET_KEY is not set.");
    return NextResponse.json(
      {
        error:
          "Online checkout is not available right now. Please call us and we will take your order over the phone.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const rawLines = (body as { lines?: unknown })?.lines;
  if (!Array.isArray(rawLines) || rawLines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }
  if (rawLines.length > MAX_LINES) {
    return NextResponse.json({ error: "Too many items." }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotal = 0;

  for (const raw of rawLines) {
    const sku = (raw as { sku?: unknown })?.sku;
    const qtyRaw = (raw as { qty?: unknown })?.qty;

    if (typeof sku !== "string") {
      return NextResponse.json({ error: "Invalid item." }, { status: 400 });
    }

    const qty = Math.floor(Number(qtyRaw));
    if (!Number.isFinite(qty) || qty < 1 || qty > MAX_QTY) {
      return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
    }

    const hit = findSku(sku);
    if (!hit) {
      return NextResponse.json(
        { error: "That item is no longer available." },
        { status: 400 },
      );
    }

    subtotal += hit.variant.amount * qty;

    lineItems.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: hit.variant.amount,
        product_data: {
          name: `${hit.product.name}, ${hit.variant.label}`,
          description: hit.product.blurb,
          metadata: { sku },
        },
        // Michigan treats some prepared foods as taxable and some grocery
        // food as exempt. Set this per product once their accountant has
        // made the call, then turn on automatic_tax below.
        // tax_behavior: "exclusive",
      },
    });
  }

  const freeShipping = subtotal >= shipping.freeThreshold;

  const stripe = new Stripe(secret);
  const origin =
    request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/nuts/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/nuts`,
      shipping_address_collection: { allowed_countries: ["US"] },
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: freeShipping ? shipping.freeLabel : shipping.label,
            fixed_amount: {
              amount: freeShipping ? 0 : shipping.flatRate,
              currency: "usd",
            },
            delivery_estimate: {
              minimum: { unit: "business_day", value: shipping.estimateDays.min },
              maximum: { unit: "business_day", value: shipping.estimateDays.max },
            },
          },
        },
      ],
      // Turn on once Stripe Tax is enabled and product tax codes are set.
      // automatic_tax: { enabled: true },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Could not start checkout. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // Never leak Stripe internals to the browser.
    console.error("Stripe checkout failed:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again, or call us." },
      { status: 502 },
    );
  }
}
