import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { drinks } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Drinks",
  description:
    "Twenty beers on draft at Cascarelli's in Homer, Michigan, and nineteen are from Michigan. Curated wine, cocktails, and draft beer and wine to go.",
  alternates: { canonical: "/drinks" },
};

export default function DrinksPage() {
  return (
    <>
      <PageHero
        kicker="At the bar"
        title={drinks.drafts.heading}
        intro={drinks.drafts.blurb}
        cta={false}
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="rounded-panel border border-red/20 bg-red/5 px-6 py-5 text-center">
          <p className="font-display text-xl font-semibold tracking-tight text-red sm:text-2xl">
            {drinks.toGo}
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Photo name="taps" ratio="feature" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              What is pouring
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink/70">
              The lineup turns over constantly, so ask whoever is behind the bar
              and they will walk you down the wall. Recent pours are logged on
              Untappd.
            </p>
            <a
              href={site.social.untappd}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-ink-soft"
            >
              Recent taplist on Untappd
              <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-panel border border-ink/10 bg-cream-dim p-8">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              {drinks.wine.heading}
            </h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink/70">
              {drinks.wine.blurb}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {drinks.wine.categories.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-ink/20 bg-cream px-4 py-2 text-sm font-semibold"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-panel border border-ink/10 bg-cream-dim p-8">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              {drinks.cocktails.heading}
            </h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink/70">
              {drinks.cocktails.blurb}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {drinks.cocktails.named.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-red/25 bg-cream px-4 py-2 text-sm font-semibold text-red"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
