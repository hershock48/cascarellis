import Link from "next/link";
import OpenNow from "@/components/OpenNow";
import MapCard from "@/components/MapCard";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CheeseDrip from "@/components/CheeseDrip";
import PizzaReveal from "@/components/PizzaReveal";
import { site, fullAddress, hoursSummary, mapsUrl } from "@/data/site";
import { bestSellers, nuts, drinks, merch } from "@/data/menu";

const categories = [
  {
    title: "Pizza",
    body: "Homemade and built to order, with a gluten free crust available.",
    href: "/menu#pizza",
  },
  {
    title: "Sandwiches and Burgers",
    body: "Hand pattied burgers, hot and cold subs, and the meatball sandwich.",
    href: "/menu#sandwiches",
  },
  {
    title: "Soups and Salads",
    body: "Homemade noodles in the chicken noodle, and fresh local greens.",
    href: "/menu#salads",
  },
];

const photoOf: Record<string, "macCarelli" | "porkys" | "flatIron"> = {
  "The MacCarelli": "macCarelli",
  "Porky's Meat Lovers Dream": "porkys",
  "Flat Iron Salad": "flatIron",
};

export default function Home() {
  return (
    <>
      {/* Hero: food above the fold, ordering above the fold */}
      {/* overflow-x-clip, not overflow-hidden: the pizza slice's exit needs
          horizontal containment, but the CheeseDrip hangs BELOW this section
          by design and overflow-hidden was decapitating it. Per-axis clip
          keeps the vertical axis visible. The blur blob gets its own inset-0
          clip layer so it cannot leak above the section either. */}
      <section className="grain grain-dark relative isolate overflow-x-clip bg-ink text-cream">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-red/30 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <div className="hero-in">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold">
              <span>Homer, Michigan</span>
              <span aria-hidden className="text-cream/25">
                &middot;
              </span>
              <span>Est. 1935</span>
            </p>

            <h1 className="mt-6 font-display text-[clamp(2.15rem,5.4vw,4rem)] font-semibold leading-[1.04] tracking-[-0.015em]">
              A <span className="whitespace-nowrap">one-of-a-kind</span>
              <br />
              <span className="italic text-gold">pizza restaurant.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
              Homemade pizzas, sandwiches, burgers, soups and salads, made with
              fresh, locally sourced ingredients. Plus twenty beers on draft and
              our world famous specialty nuts.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary">
                Call to Order {site.phone}
              </a>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-cream/25 px-8 py-4 font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
              >
                See the Menu
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-cream/10 pt-6">
              <OpenNow tone="light" />
              <p className="text-sm text-cream/65">
                <span className="font-semibold text-cream">{site.reviews.rating}</span> stars,{" "}
                {site.reviews.count} reviews
              </p>
            </div>
          </div>

          {/* The badge behind a pizza that clears out of its way. This took
              the heroPizza photo slot; when real photography lands, decide
              which one owns the hero rather than stacking both. */}
          <PizzaReveal />
        </div>

        {/* Signature: cheese oozing off the hero into the strip below. */}
        <CheeseDrip />
      </section>

      {/* Info strip */}
      <section className="border-b border-ink/10 bg-cream-dim">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 pb-6 pt-14 sm:px-8 md:grid-cols-3 md:gap-8">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-red">
              Hours
            </p>
            <p className="mt-1 text-[0.95rem] text-ink/75">
              Mon to Thu 11am to 9pm &middot; Fri and Sat until 10pm &middot; Sun from 12pm
            </p>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-red">
              Find us
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="tap text-[0.95rem] text-ink/75 underline decoration-ink/20 underline-offset-4 hover:text-red"
            >
              {fullAddress}
            </a>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-red">
              Live piano
            </p>
            <p className="mt-1 text-[0.95rem] text-ink/75">
              {site.music.when}
            </p>
          </div>
        </div>
      </section>

      <Marquee />

      {/* What's good here */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-red">
              Most ordered
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              What&rsquo;s good here
            </h2>
          </div>
          <Link href="/menu" className="btn-secondary !px-6 !py-3 text-sm">
            Full menu
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {bestSellers.map((item, i) => (
            <Reveal
              as="li"
              key={item.name}
              delay={i * 90}
              className="lift group overflow-hidden rounded-panel border border-ink/10 bg-cream shadow-sm"
            >
              <Photo
                name={photoOf[item.name]}
                ratio="wide"
                sizes="(min-width: 768px) 33vw, 100vw"
                className="!rounded-none border-0"
              />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">
                    {item.name}
                  </h3>
                  {item.popular && (
                    <span className="shrink-0 rounded-full bg-red/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-red">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section className="grain relative overflow-hidden bg-cream-dim">
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            From the kitchen
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
            Everything is made in house with fresh, locally sourced ingredients.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal
                as="li"
                key={c.title}
                delay={i * 90}
                className="lift rounded-panel border border-ink/10 bg-cream p-8 hover:border-red/30"
              >
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{c.body}</p>
                <Link
                  href={c.href}
                  className="tap mt-4 gap-2 text-sm font-semibold text-red hover:underline"
                >
                  View now
                  <span aria-hidden>&rarr;</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Drinks */}
      <section className="grain grain-dark relative overflow-hidden bg-basil text-cream">
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <Photo name="taps" ratio="feature" tone="dark" sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">
              At the bar
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {drinks.drafts.heading}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/80">
              {drinks.drafts.blurb}
            </p>
            <p className="mt-4 font-display text-xl font-bold tracking-tight text-gold">
              {drinks.toGo}
            </p>
            <Link
              href="/drinks"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-gold"
            >
              Beer, wine and cocktails
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Nuts */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-red">
              Since the 1960s
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {nuts.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">{nuts.blurb}</p>
            <p className="mt-4 font-semibold text-red">
              Now shipped anywhere in the US. Free over $50.
            </p>
            <Link href="/nuts#shop" className="btn-primary mt-7">
              Order nuts online
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {nuts.flavors.map((f, i) => (
              <Reveal
                as="li"
                key={f.name}
                delay={i * 70}
                className="lift rounded-card border border-ink/10 bg-cream-dim px-5 py-4"
              >
                <p className="font-display text-lg font-bold tracking-tight">{f.name}</p>
                <p className="mt-0.5 text-sm text-ink/65">{f.note}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Events: piano + banquet */}
      <section className="grain relative overflow-hidden bg-cream-dim">
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal className="lift overflow-hidden rounded-panel border border-ink/10 bg-cream">
              <Photo
                name="piano"
                ratio="wide"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="!rounded-none border-0"
              />
              <div className="p-8">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-red">
                  {site.music.when}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                  {site.music.what}
                </h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/70">
                  Come for dinner, stay for the music. No cover, no reservation
                  needed, though the room does fill up.
                </p>
              </div>
            </Reveal>

            <Reveal delay={110} className="lift overflow-hidden rounded-panel border border-ink/10 bg-cream">
              <Photo
                name="banquet"
                ratio="wide"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="!rounded-none border-0"
              />
              <div className="p-8">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-red">
                  Groups of {site.reservations.min} to {site.reservations.max}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                  Banquet room and patio
                </h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/70">
                  Birthdays, rehearsal dinners, team parties and wakes. Call and
                  we will walk you through the options.
                </p>
                <a href={site.phoneHref} className="tap mt-4 text-sm font-semibold text-red hover:underline">
                  Call {site.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Photo name="room" ratio="feature" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-red">
              Since 1935
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              A far reaching reputation for terrific food and superb service
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Four generations of the Cascarelli family have run this room.
              Frank came to Homer in 1935, Bob added pizza in 1965, and Ryan has
              been looking after the place since 1994. People come in from all
              over Michigan and northern Indiana.
            </p>
            <Link href="/about" className="btn-secondary mt-8 !px-7 !py-3.5">
              Our story
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Merch */}
      <section className="border-y border-ink/10 bg-cream-dim">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              {merch.heading}
            </h2>
            <p className="mt-1 text-[0.95rem] text-ink/65">{merch.blurb}</p>
          </div>
          <a href={site.phoneHref} className="btn-secondary shrink-0 !px-6 !py-3 text-sm">
            Ask at the counter
          </a>
        </div>
      </section>

      {/* Visit */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-red">
              Visit
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Downtown Homer
            </h2>

            <dl className="mt-9 space-y-6">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">
                  Address
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-2xl font-semibold tracking-tight underline decoration-red/40 underline-offset-4 hover:text-red"
                  >
                    {fullAddress}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">
                  Phone
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={site.phoneHref}
                    className="font-display text-2xl font-semibold tracking-tight hover:text-red"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">
                  Hours
                </dt>
                <dd className="mt-2 space-y-1.5">
                  {hoursSummary.map((row) => (
                    <p
                      key={row.label}
                      className="flex justify-between gap-6 text-[0.95rem] sm:max-w-sm"
                    >
                      <span className="text-ink/65">{row.label}</span>
                      <span className="font-semibold">{row.value}</span>
                    </p>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-7">
              <OpenNow />
            </div>
          </div>

          <MapCard className="min-h-[24rem] lg:min-h-[28rem]" />
        </div>
      </section>
    </>
  );
}
