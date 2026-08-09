import Link from "next/link";
import OpenNow from "@/components/OpenNow";
import MapCard from "@/components/MapCard";
import { site, fullAddress, hoursSummary, mapsUrl } from "@/data/site";
import { menu, drafts } from "@/data/menu";

const pillars = [
  {
    kicker: "Since 1965",
    title: "Pizza",
    body: "Bob Cascarelli put pizza on a tavern menu that was already thirty years old. It has not left since.",
    href: "/menu",
    cta: "See the menu",
  },
  {
    kicker: `${drafts.count} lines`,
    title: "The Taps",
    body: `${drafts.michiganCount} of ${drafts.count} taps pour Michigan and regional craft. The one national brand is Pabst, and that is deliberate.`,
    href: "/beer-and-wine",
    cta: "What is pouring",
  },
  {
    kicker: "Since 1897",
    title: "Roasted Nuts",
    body: "Peanuts, cashews and macadamias roasted on site. The nut business is older than the restaurant by nearly forty years.",
    href: "/peanuts",
    cta: "About the nuts",
  },
];

const timeline = [
  { year: "1897", text: "Robert Cascarelli settles in Albion and starts roasting peanuts." },
  { year: "1935", text: "Frank Cascarelli comes to Homer and buys the business on Main Street." },
  { year: "1965", text: "Bob Cascarelli adds pizza in February. It changes everything." },
  { year: "1994", text: "Ryan Cascarelli takes over as manager, third generation on the floor." },
];

export default function Home() {
  const signatures = menu
    .find((s) => s.id === "pizza")!
    .items.slice(0, 3);

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

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brass">
            <span>Homer, Michigan</span>
            <span aria-hidden className="text-cream/25">
              /
            </span>
            <span>Est. 1935</span>
          </p>

          <h1 className="mt-7 font-display text-[clamp(2.75rem,10vw,7rem)] font-semibold leading-[0.92] tracking-tight">
            Four generations,
            <br />
            <span className="text-brass">one corner</span> of Main.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75 sm:text-xl">
            Hand made pizza, twenty taps pouring mostly Michigan, and peanuts
            roasted out back since 1897. People drive in from three counties for
            all three.
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
              <span className="font-semibold text-cream">
                {site.reviews.rating}
              </span>{" "}
              average across {site.reviews.count} reviews
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

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="grain relative flex flex-col bg-cream p-8 sm:p-10"
            >
              <p className="relative text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brick">
                {p.kicker}
              </p>
              <h2 className="relative mt-3 font-display text-3xl font-semibold tracking-tight">
                {p.title}
              </h2>
              <p className="relative mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/70">
                {p.body}
              </p>
              <Link
                href={p.href}
                className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brick"
              >
                {p.cta}
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Signature pizzas */}
      <section className="grain relative overflow-hidden bg-cream-dim">
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brick">
                From the oven
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                What people come for
              </h2>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-brick hover:text-brick"
            >
              Full menu
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {signatures.map((item, i) => (
              <li key={item.name} className="border-t-2 border-ink pt-5">
                <span className="font-display text-sm font-semibold text-brick">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Taps band */}
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
              Nineteen of them are Michigan.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/75">
              {drafts.note}
            </p>
            <Link
              href="/beer-and-wine"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-brass"
            >
              See the list
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brick">
              The family
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              It started with a pushcart and a bag of peanuts.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Robert Cascarelli was born in Italy in 1856 and came to Michigan
              in the 1890s. His son Frank landed in Homer in 1935 and bought the
              building. Every generation since has worked the same room.
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
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/70">
                  {t.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Visit */}
      <section className="grain relative overflow-hidden bg-cream-dim">
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brick">
                Come in
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Downtown Homer
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
                      <p key={row.label} className="flex justify-between gap-6 text-[0.95rem] sm:max-w-sm">
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
