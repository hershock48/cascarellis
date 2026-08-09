import Link from "next/link";
import OpenNow from "@/components/OpenNow";
import MapCard from "@/components/MapCard";
import { site, fullAddress, hoursSummary, mapsUrl } from "@/data/site";
import { hero, drafts, merch } from "@/data/menu";

const timeline = [
  { year: "1897", text: "Robert gets off the boat and starts roasting peanuts on a pushcart." },
  { year: "1935", text: "Frank comes to Homer and buys the building. Nobody has left since." },
  { year: "1965", text: "Bob adds pizza in February. Whole thing changes." },
  { year: "1994", text: "Ryan takes over. Ask him about the name, he will tell you." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="grain grain-dark relative isolate overflow-hidden bg-ink text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-brick/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-56 -left-32 h-[34rem] w-[34rem] rounded-full bg-brass/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brass">
            <span>Homer, Michigan</span>
            <span aria-hidden className="text-cream/25">
              /
            </span>
            <span>Population 1,700</span>
            <span aria-hidden className="text-cream/25">
              /
            </span>
            <span>Since 1935</span>
          </p>

          <h1 className="mt-7 max-w-5xl font-display text-[clamp(2.5rem,8.5vw,6.25rem)] font-semibold leading-[0.94] tracking-tight">
            Home of our famous pizza.
            <br />
            <span className="text-brass">And a lot of other stuff.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/75 sm:text-xl">
            Ninety years on the same corner. Twenty taps. Nuts roasted out back
            since before the building was ours. And one pizza with Thousand
            Island on it that people drive in from Jackson for.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={site.phoneHref}
              className="rounded-full bg-brick px-8 py-4 text-center font-semibold text-cream shadow-lg shadow-brick/20 transition-colors hover:bg-brick-bright"
            >
              Call to order {site.phone}
            </a>
            <Link
              href="/menu"
              className="rounded-full border border-cream/25 px-8 py-4 text-center font-semibold text-cream transition-colors hover:border-brass hover:text-brass"
            >
              See the menu
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-cream/10 pt-8">
            <OpenNow tone="light" />
            <p className="text-sm text-cream/60">
              <span className="font-semibold text-cream">{site.reviews.rating}</span>{" "}
              across {site.reviews.count} reviews
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-cream/60 underline decoration-cream/25 underline-offset-4 transition-colors hover:text-brass"
            >
              {fullAddress}
            </a>
          </div>
        </div>
      </section>

      {/* The MacCarelli */}
      <section className="grain relative overflow-hidden bg-brick text-cream">
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cream/60">
                The one you heard about
              </p>
              <h2 className="mt-4 font-display text-[clamp(3rem,9vw,5.5rem)] font-semibold leading-[0.9] tracking-tight">
                {hero.name}
              </h2>
              <p className="mt-6 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                {hero.line}
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
                {hero.description}
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/70">
                {hero.proof}
              </p>
              <a
                href={site.phoneHref}
                className="mt-9 inline-block rounded-full bg-cream px-8 py-4 font-semibold text-brick transition-colors hover:bg-brass hover:text-ink"
              >
                Order one
              </a>
            </div>

            {/* Ticket */}
            <div className="relative mx-auto w-full max-w-sm rotate-[-2deg]">
              <div className="rounded-lg bg-cream p-8 text-ink shadow-2xl shadow-ink/30">
                <p className="text-center text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-brick">
                  Cascarelli&rsquo;s &middot; Homer
                </p>
                <p className="mt-5 text-center font-display text-3xl font-semibold leading-tight tracking-tight">
                  The MacCarelli
                </p>
                <div aria-hidden className="my-6 border-t border-dashed border-ink/25" />
                <ul className="space-y-2.5 text-[0.95rem] text-ink/75">
                  {[
                    "Thousand Island, not red sauce",
                    "Seasoned ground beef",
                    "Onion",
                    "Dill pickle relish",
                    "Mozzarella and cheddar",
                    "Shredded lettuce, after the oven",
                    "A drizzle on top",
                  ].map((row) => (
                    <li key={row} className="flex gap-3">
                      <span aria-hidden className="text-brick">
                        &bull;
                      </span>
                      {row}
                    </li>
                  ))}
                </ul>
                <div aria-hidden className="my-6 border-t border-dashed border-ink/25" />
                <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/45">
                  No, we will not explain ourselves
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The wait */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brick">
              Before you come in
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              On a Friday, it is going to be a while.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink/75">
            <p>
              Everything gets made when you order it, in a kitchen that was
              built for a smaller town than the one that shows up on weekends.
              Forty five minutes is normal. An hour happens.
            </p>
            <p>
              We are not going to pretend otherwise, and we are not going to
              speed it up by making it worse. Order the Annie&rsquo;s Bread
              first, get a beer, and let somebody else do the driving home.
            </p>
            <p className="font-display text-2xl font-semibold tracking-tight text-ink">
              Or call ahead and take it with you. That part is fast.
            </p>
          </div>
        </div>
      </section>

      {/* Taps */}
      <section className="grain grain-dark relative overflow-hidden bg-olive text-cream">
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-20">
          <p className="font-display text-[clamp(6rem,18vw,12rem)] font-semibold leading-[0.8] tracking-tighter text-brass">
            {drafts.count}
          </p>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brass">
              On tap
            </p>
            <h2 className="mt-3 max-w-lg font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Nineteen are Michigan. One is Pabst.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/75">
              The Pabst is not an oversight. Everything else on the wall rotates,
              so there is no point printing a list. Ask whoever is pouring and
              they will walk you down it.
            </p>
            <Link
              href="/beer-and-wine"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-brass"
            >
              Beer, wine and the Bloody Mary
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Nuts */}
      <section className="grain relative overflow-hidden bg-cream-dim">
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brick">
                Since 1897
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                The nuts are older than the restaurant.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-ink/75">
              <p>
                Robert Cascarelli was roasting peanuts on a pushcart in 1897,
                thirty eight years before anybody in this family owned a
                building in Homer. A flood took the first roaster in 1908. We
                got another one.
              </p>
              <p>
                Peanuts, cashews and macadamias, roasted here, sold at the
                counter in bags that people carry out alongside a pizza box.
                Call about holiday tins before December, not during.
              </p>
              <Link
                href="/peanuts"
                className="inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-brick"
              >
                More about that
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The room */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brick">
              The room
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Old saloon, strange chandeliers, four generations of clutter.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              People walk in and say it feels like stepping back. That is not a
              design decision, it is just what happens when one family keeps a
              building for ninety years and never has a reason to gut it. Ask
              Ryan about the name. He will tell you the whole thing.
            </p>
            <Link
              href="/history"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brick"
            >
              Read the whole story
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          <ol className="relative space-y-8 border-l border-ink/15 pl-8">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.06rem] top-2 h-2.5 w-2.5 rounded-full bg-brick ring-4 ring-cream"
                />
                <p className="font-display text-2xl font-semibold tracking-tight text-brick">
                  {t.year}
                </p>
                <p className="mt-1 text-[0.98rem] leading-relaxed text-ink/70">
                  {t.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Merch strip */}
      <section className="border-y border-ink/10 bg-cream-dim">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              There are mugs
            </h2>
            <p className="mt-1.5 text-[0.98rem] text-ink/65">{merch.note}</p>
          </div>
          <a
            href={site.phoneHref}
            className="shrink-0 rounded-full border border-ink/20 px-6 py-3 text-center text-sm font-semibold transition-colors hover:border-brick hover:text-brick"
          >
            Ask at the counter
          </a>
        </div>
      </section>

      {/* Visit */}
      <section className="grain relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brick">
                Come in
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                One block of Main Street
              </h2>

              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                    Address
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-display text-2xl font-semibold tracking-tight underline decoration-brick/40 underline-offset-4 hover:text-brick"
                    >
                      {fullAddress}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                    Phone
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={site.phoneHref}
                      className="font-display text-2xl font-semibold tracking-tight hover:text-brick"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                    Hours
                  </dt>
                  <dd className="mt-2 space-y-1.5">
                    {hoursSummary.map((row) => (
                      <p
                        key={row.label}
                        className="flex justify-between gap-6 text-[0.98rem] sm:max-w-sm"
                      >
                        <span className="text-ink/65">{row.label}</span>
                        <span className="font-semibold">{row.value}</span>
                      </p>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-8">
                <OpenNow />
              </div>
            </div>

            <MapCard className="min-h-[24rem] lg:min-h-[30rem]" />
          </div>
        </div>
      </section>
    </>
  );
}
