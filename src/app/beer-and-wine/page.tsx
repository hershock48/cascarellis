import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { drafts, wine, cocktails } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Beer, Wine and the Bloody Mary",
  description:
    "Twenty taps at Cascarelli's in Homer, Michigan. Nineteen pour Michigan and regional craft, one pours Pabst. Wine rotates, and the Bloody Mary has a following.",
  alternates: { canonical: "/beer-and-wine" },
};

const facts = [
  { value: String(drafts.count), label: "Taps on the wall" },
  { value: String(drafts.michiganCount), label: "Pouring Michigan and regional" },
  { value: "1", label: "Pabst, and it is staying" },
];

export default function BeerAndWinePage() {
  return (
    <>
      <PageHero
        kicker="The bar"
        title="Nineteen are Michigan. One is Pabst."
        intro="This is a tavern that started serving beer in 1935 and got around to pizza thirty years later. The bar is not an afterthought."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <dl className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-3">
          {facts.map((f) => (
            <div
              key={f.label}
              className="grain relative flex flex-col bg-cream p-8 sm:p-10"
            >
              <dt className="relative order-2 mt-3 text-sm leading-relaxed text-ink/60">
                {f.label}
              </dt>
              <dd className="relative order-1 font-display text-6xl font-semibold leading-none tracking-tight text-brick">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight">
              What is pouring
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink/70">
              The lineup turns over constantly, which is why there is no list on
              this page and no chalkboard photo from eight months ago. Ask
              whoever is behind the bar. That is the whole system and it works.
            </p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink/70">
              If you want to see what has been on lately, it gets logged on
              Untappd.
            </p>
            <a
              href={site.social.untappd}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-ink-soft"
            >
              Recent taplist on Untappd
              <span aria-hidden>&rarr;</span>
            </a>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-tight">
                The Bloody Mary
              </h2>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-ink/70">
                {cocktails.note}
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {cocktails.named.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-brick/30 px-5 py-2.5 text-sm font-semibold text-brick"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-4xl font-semibold tracking-tight">
                Wine
              </h2>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-ink/70">
                {wine.note}
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {wine.categories.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
