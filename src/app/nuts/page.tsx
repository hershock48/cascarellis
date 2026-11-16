import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { products, shipping, formatUSD } from "@/data/shop";
import { site, phoneNoWrap } from "@/data/site";

export const metadata: Metadata = {
  title: "World Famous Specialty Nuts, Shipped",
  description:
    "Order Cascarelli's roasted red skin peanuts, Brazilian cashews, sriracha and honey cashews, cinnamon and sugar cashews, macadamias and maple glazed pecans. Shipped from Homer, Michigan.",
  alternates: { canonical: "/nuts" },
};

/* House favorites first, then the rest, in one even grid. The shop used
   to run two wide cards over four narrow ones, and at four across the price
   and the button no longer fit on a line. Six products make two rows of
   three with room for both. */
const ordered = [...products.filter((p) => p.featured), ...products.filter((p) => !p.featured)];

export default function NutsPage() {
  return (
    <>
      <PageHero
        kicker="Roasted in Homer since the 1960s"
        title="World famous specialty nuts, now shipped."
        intro="People have been driving here for these for sixty years. You no longer have to."
        cta={false}
      >
        <a href="#shop" className="btn-primary mt-8">
          Shop the nuts
        </a>
      </PageHero>

      {/* Shipping terms up front, where they reduce hesitation */}
      <section className="border-b border-ink/10 bg-cream-dim">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-5 text-[0.92rem] sm:px-8 md:grid-cols-3">
          <p>
            <span className="font-semibold">Flat {formatUSD(shipping.flatRate)} shipping</span>
            <span className="text-ink/65">, anywhere in the US</span>
          </p>
          <p>
            <span className="font-semibold">
              Free over {formatUSD(shipping.freeThreshold)}
            </span>
            <span className="text-ink/65"> automatically</span>
          </p>
          <p>
            <span className="font-semibold">
              Ships in {shipping.estimateDays.min} to {shipping.estimateDays.max} business days
            </span>
            <span className="text-ink/65">, roasted before it goes out</span>
          </p>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="grain anchor-offset-plain relative overflow-hidden bg-cream-dim">
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          {/* The peanut chef stands beside The Nuts on their printed menu,
              and he stands beside the shop here. Decorative, so no alt. */}
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Order nuts
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
                Fresh roasted daily using a method unchanged by the Cascarelli
                family for over 90 years. Pick a size, add it to your order,
                and check out.
              </p>
            </div>
            <Image
              src="/brand/chef.png"
              alt=""
              width={647}
              height={900}
              sizes="9rem"
              className="hidden h-44 w-auto shrink-0 sm:block"
            />
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((product, i) => (
              <Reveal as="li" key={product.id} delay={(i % 3) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </ul>

          <p className="mt-10 text-center text-sm text-ink/65">
            Payments handled by Stripe. We never see your card number. Questions
            about an order?{" "}
            <a href={site.phoneHref} className="font-semibold text-red underline">
              Call {phoneNoWrap}
            </a>
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 border-t border-ink/10 pt-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-red">Roasted here</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              The cashews and the red skins are the ones people come back for
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink/70">
              Everything is roasted here and salted while it is still warm.
              Nothing sits. Orders go out fresh, which is the entire reason
              these are worth shipping.
            </p>
          </Reveal>
          <Reveal delay={110}>
            <p className="mt-0 text-[1.05rem] leading-relaxed text-ink/70 lg:mt-14">
              Holiday tins and larger orders are easiest over the phone. Call
              in November rather than the third week of December.
            </p>
            <a href={site.phoneHref} className="btn-secondary mt-7">
              Call about a large order
            </a>
          </Reveal>
        </div>
      </section>

    </>
  );
}
