import Image from "next/image";
import Link from "next/link";
import OpenNow from "@/components/OpenNow";
import MapCard from "@/components/MapCard";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { site, fullAddress, hoursSummary, mapsUrl } from "@/data/site";
import { bestSellers, nuts, drinks } from "@/data/menu";
import { shipping, formatUSD } from "@/data/shop";
import { chapters } from "@/data/story";

/**
 * One ground, the whole page: ink. The second pass alternated dark, cream,
 * green and tan bands section by section, which is a template's rhythm, and
 * boxed everything into cards with a pill on each. This pass holds one ground
 * and lets the type and a hairline do the sectioning, the way Copper does.
 *
 * Age is the asset. A business ninety years on one corner opens with that,
 * not with a cartoon; the drawn pizza, the cheese drip and the ticker are
 * gone. Six photographs exist and they are used large and sparingly: the
 * pizza owns the hero, three plates make one row, and nothing on this page
 * waits on a photograph that has not been taken.
 */

const homeChapters = chapters.filter((c) => c.home);

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-gold">{children}</p>;
}

function Rule() {
  return <hr className="border-cream/10" />;
}

export default function Home() {
  return (
    <div className="bg-ink text-cream">
      {/* Hero. Text first in the source so Call to Order is above the fold
          on a phone, with the pizza beneath it; on a wide screen the two sit
          side by side and the photograph runs the full height. */}
      <section className="grain grain-dark relative isolate overflow-hidden">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-12 pt-12 sm:px-8 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-16 lg:py-0">
          <div className="hero-in flex flex-col justify-center lg:py-20">
            <Eyebrow>Homer, Michigan &middot; Since {site.established}</Eyebrow>
            <h1 className="mt-5 max-w-xl font-display text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[0.95] text-cream">
              A one-of-a-kind pizza restaurant
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75">
              Homemade pizzas, sandwiches, burgers, soups and salads, made with
              fresh, locally sourced ingredients. Twenty beers on draft, most of
              them from Michigan. And the world famous specialty nuts, roasted
              here since the 1960s.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary">
                Call to Order {site.phone}
              </a>
              <Link href="/menu" className="btn-outline">
                See the Menu
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-cream/60">
              <OpenNow tone="light" />
              <span>
                <span className="font-semibold text-cream">{site.reviews.rating}</span> stars across{" "}
                {site.reviews.count} reviews
              </span>
            </div>
          </div>

          <Photo
            name="pizza"
            ratio="tall"
            priority
            sizes="(min-width: 1024px) 40rem, 100vw"
            className="lg:aspect-auto lg:h-full lg:min-h-[36rem] lg:rounded-none"
          />
        </div>
      </section>

      {/* The three facts, in one hairline row. */}
      <section className="border-y border-cream/10">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-6 text-[0.95rem] sm:px-8 md:grid-cols-3">
          <div>
            <Eyebrow>Hours</Eyebrow>
            <p className="mt-1.5 text-cream/75">
              Mon to Thu 11am to 9pm &middot; Fri and Sat until 10pm &middot; Sun from 12pm
            </p>
          </div>
          <div>
            <Eyebrow>Find us</Eyebrow>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1.5 inline-block text-cream/75 underline decoration-cream/25 underline-offset-4 hover:text-gold"
            >
              {fullAddress}
            </a>
          </div>
          <div>
            <Eyebrow>{site.music.what}</Eyebrow>
            <p className="mt-1.5 text-cream/75">{site.music.when}</p>
          </div>
        </div>
      </section>

      {/* The story. The badge is a seal here, not a hero. */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <Image
              src="/logo-color.png"
              alt={`${site.name} badge`}
              width={144}
              height={144}
              className="h-28 w-28 rounded-full ring-1 ring-gold/40 sm:h-36 sm:w-36"
            />
            <Eyebrow>Since 1935</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.98] sm:text-5xl">
              Ninety years on the corner of Main
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75">
              Four generations of the Cascarelli family have run this room.
              Frank came to Homer in 1935, Bob put pizza on the menu in 1965,
              and Ryan has looked after the place since 1994. People drive in
              from across Michigan and northern Indiana, and they have for a
              long time.
            </p>
            <Link href="/about" className="btn-outline mt-8">
              Our story
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <ol className="divide-y divide-cream/10 border-y border-cream/10">
              {homeChapters.map((c) => (
                <li key={c.year} className="grid gap-2 py-6 sm:grid-cols-[6rem_1fr] sm:gap-8">
                  <span className="font-display text-2xl font-semibold text-gold">{c.year}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-cream/65">{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* The kitchen: three plates, no cards. */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Rule />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>From the kitchen</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.98] sm:text-5xl">
              What&rsquo;s good here
            </h2>
          </div>
          <Link href="/menu" className="btn-outline !px-6 !py-3 text-sm">
            Full menu
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {bestSellers.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 90}>
              {item.photo && (
                <Photo name={item.photo} ratio="feature" sizes="(min-width: 768px) 33vw, 100vw" />
              )}
              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight">{item.name}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-cream/65">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The nuts. Nobody else has these. */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Rule />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Since the 1960s</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.98] sm:text-5xl">
              {nuts.heading}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75">{nuts.blurb}</p>
            <p className="mt-4 font-semibold text-gold">
              Shipped anywhere in the US. Free over {formatUSD(shipping.freeThreshold)}.
            </p>
            <Link href="/nuts#shop" className="btn-primary mt-8">
              Order nuts online
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y divide-cream/10 border-y border-cream/10">
              {nuts.flavors.map((f) => (
                <li key={f.name} className="flex items-baseline justify-between gap-6 py-4">
                  <span className="font-display text-xl font-semibold">{f.name}</span>
                  <span className="text-right text-sm text-cream/60">{f.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* The bar, in words. The live list is one tap away. */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Rule />
        <Reveal className="mt-10 max-w-3xl">
          <Eyebrow>At the bar</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.98] sm:text-5xl">
            {drinks.drafts.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/75">{drinks.drafts.blurb}</p>
          <p className="mt-4 font-semibold text-gold">{drinks.toGo}</p>
          <Link href="/drinks" className="btn-outline mt-8">
            On tap right now
            <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
      </section>

      {/* Piano and parties, as two columns of words. */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Rule />
        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <Eyebrow>{site.music.when}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[0.98] sm:text-4xl">
              {site.music.what}
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-cream/70">
              Come for dinner, stay for the music. No cover, no reservation
              needed, though the room does fill up on a Saturday.
            </p>
          </Reveal>
          <Reveal delay={110}>
            <Eyebrow>
              Groups of {site.reservations.min} to {site.reservations.max}
            </Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[0.98] sm:text-4xl">
              Banquet room and patio
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-cream/70">
              Birthdays, rehearsal dinners, team parties and wakes. Send the
              details and we will walk you through the options, or call.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <Link href="/events#inquire" className="tap text-gold hover:underline">
                Ask about a party
              </Link>
              <a href={site.phoneHref} className="tap text-cream/80 hover:text-gold">
                Call {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Visit. */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Rule />
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Visit</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.98] sm:text-5xl">
              Downtown Homer
            </h2>

            <dl className="mt-9 space-y-6">
              <div>
                <dt className="eyebrow text-cream/55">Address</dt>
                <dd className="mt-1.5">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-2xl font-semibold underline decoration-gold/40 underline-offset-4 hover:text-gold"
                  >
                    {fullAddress}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-cream/55">Phone</dt>
                <dd className="mt-1.5">
                  <a href={site.phoneHref} className="font-display text-2xl font-semibold hover:text-gold">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-cream/55">Hours</dt>
                <dd className="mt-2 space-y-1.5">
                  {hoursSummary.map((row) => (
                    <p key={row.label} className="flex justify-between gap-6 text-[0.95rem] sm:max-w-sm">
                      <span className="text-cream/60">{row.label}</span>
                      <span className="font-semibold">{row.value}</span>
                    </p>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-7">
              <OpenNow tone="light" />
            </div>
          </div>

          <MapCard className="min-h-[24rem] lg:min-h-[28rem]" />
        </div>
      </section>
    </div>
  );
}
