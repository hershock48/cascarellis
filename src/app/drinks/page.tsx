import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { drinks } from "@/data/menu";
import { tapList, tapNotes, wineList, cocktails, zeroProof } from "@/data/bar";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Drinks",
  description:
    "Twenty beers on draft at Cascarelli's in Homer, Michigan, and nineteen are from Michigan. Full wine list, Moscow mules, martinis, mocktails, and draft beer and wine to go.",
  alternates: { canonical: "/drinks" },
};

const jumpLinks = [
  { href: "#taps", label: "On Tap" },
  { href: "#cocktails", label: "Cocktails" },
  { href: "#wine", label: "Wine" },
  { href: "#zero-proof", label: "Zero Proof" },
];

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-baseline gap-5">
      <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      <span
        aria-hidden
        className="h-px flex-1 bg-gradient-to-r from-ink/20 to-transparent"
      />
    </div>
  );
}

function WineBadges({ organic, vegan }: { organic?: boolean; vegan?: boolean }) {
  if (!organic && !vegan) return null;
  return (
    <span className="flex shrink-0 gap-1.5">
      {organic && (
        <span className="rounded-full border border-ink/15 px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-wider text-ink/55">
          Organic
        </span>
      )}
      {vegan && (
        <span className="rounded-full border border-ink/15 px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-wider text-ink/55">
          Vegan
        </span>
      )}
    </span>
  );
}

export default function DrinksPage() {
  return (
    <>
      <PageHero
        kicker="At the bar"
        title={drinks.drafts.heading}
        intro={drinks.drafts.blurb}
        cta={false}
      />

      {/* Jump nav plus the to-go line, worth repeating everywhere */}
      <section className="border-b border-ink/10 bg-cream-dim">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
          <nav aria-label="Drinks sections" className="flex flex-wrap gap-2.5">
            {jumpLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="tap rounded-full border border-ink/20 bg-cream px-4 py-2 text-sm font-semibold transition-colors hover:border-red hover:text-red"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="text-[0.95rem] font-semibold text-red sm:ml-auto">{drinks.toGo}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {/* Tap list */}
        <section id="taps" className="anchor-offset">
          <SectionHeading title="On tap right now" />
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink/65">
            {tapNotes.rotation} Recent pours are logged on{" "}
            <a
              href={site.social.untappd}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-red underline"
            >
              Untappd
            </a>
            .
          </p>

          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {tapList.map((tap) => (
              <li
                key={tap.name}
                className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3.5"
              >
                <div>
                  <span className="font-display text-lg font-bold tracking-tight">
                    {tap.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink/60">
                    {tap.brewery}
                    {tap.local && (
                      <span className="ml-2 rounded-full bg-red/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-red">
                        Made in Homer
                      </span>
                    )}
                  </span>
                </div>
                {tap.abv && (
                  <span className="shrink-0 text-sm font-semibold text-ink/55">{tap.abv}</span>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-panel border border-red/20 bg-red/5 px-6 py-4 text-center font-display text-lg font-bold tracking-tight text-red">
            {tapNotes.flights}
          </p>
        </section>

        {/* Cocktails */}
        <section id="cocktails" className="anchor-offset mt-16">
          <SectionHeading title="Cocktails" />
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {cocktails.map((section) => (
              <div
                key={section.id}
                className="rounded-panel border border-ink/10 bg-cream-dim p-7 sm:p-8"
              >
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {section.title}
                </h3>
                {section.blurb && (
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/65">
                    {section.blurb}
                  </p>
                )}
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-baseline gap-3">
                        <span className="font-semibold">{item.name}</span>
                        <span
                          aria-hidden
                          className="min-w-6 flex-1 translate-y-[-0.2rem] border-b border-dotted border-ink/25"
                        />
                        <span className="font-display font-bold text-red">{item.price}</span>
                      </div>
                      {item.note && (
                        <p className="mt-0.5 text-sm text-ink/55">{item.note}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Wine */}
        <section id="wine" className="anchor-offset mt-16">
          <SectionHeading title="Wine list" />
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink/65">
            Priced by the glass and the bottle. Bottles travel, so take one home
            on your way out.
          </p>

          {wineList.map((section) => (
            <div key={section.id} className="mt-10">
              <h3 className="font-display text-2xl font-semibold italic tracking-tight text-red">
                {section.title}
              </h3>
              <ul className="mt-5 grid gap-x-14 gap-y-6 md:grid-cols-2">
                {section.wines.map((wine) => (
                  <li
                    key={`${wine.name}-${wine.producer}`}
                    className="grid content-start gap-1 border-b border-ink/10 pb-5"
                  >
                    <div className="flex items-baseline gap-3">
                      <h4 className="font-display text-lg font-bold tracking-tight">
                        {wine.name}
                      </h4>
                      <span
                        aria-hidden
                        className="min-w-6 flex-1 translate-y-[-0.2rem] border-b border-dotted border-ink/25"
                      />
                      <span className="shrink-0 text-sm font-semibold text-ink/70">
                        {wine.glass ? `${wine.glass} / ${wine.bottle}` : `Bottle ${wine.bottle}`}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-ink/60">
                      <span>
                        {wine.producer} &middot; {wine.region}
                      </span>
                      <WineBadges organic={wine.organic} vegan={wine.vegan} />
                    </div>
                    <p className="text-[0.93rem] italic leading-relaxed text-ink/55">
                      {wine.notes}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="mt-6 text-sm text-ink/55">
            Glass / bottle pricing. Wines marked organic or vegan are noted on
            the printed list.
          </p>
        </section>

        {/* Zero proof */}
        <section id="zero-proof" className="anchor-offset mt-16">
          <SectionHeading title="Zero proof" />
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink/65">
            Mocktails for the table, craft root beer on tap, and everything the
            kids could want.
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {zeroProof.map((section) => (
              <div
                key={section.id}
                className="rounded-panel border border-ink/10 bg-cream-dim p-7 sm:p-8"
              >
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {section.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-baseline gap-3">
                        <span className="font-semibold">{item.name}</span>
                        <span
                          aria-hidden
                          className="min-w-6 flex-1 translate-y-[-0.2rem] border-b border-dotted border-ink/25"
                        />
                        <span className="font-display font-bold text-red">{item.price}</span>
                      </div>
                      {item.note && (
                        <p className="mt-0.5 text-sm text-ink/55">{item.note}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 rounded-panel border border-ink/12 bg-cream-dim p-8 text-center sm:p-10">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Something to go with it
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink/65">
            The kitchen runs until close, and live piano is on Wednesday and
            Saturday.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/menu" className="btn-primary">
              See the menu
            </Link>
            <Link href="/events" className="btn-secondary">
              Live music and parties
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
