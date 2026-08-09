import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { drafts, wine } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Beer & Wine",
  description:
    "Twenty taps at Cascarelli's in Homer, Michigan. Nineteen pour Michigan and regional craft. Wine list changes several times a year.",
  alternates: { canonical: "/beer-and-wine" },
};

const facts = [
  { value: String(drafts.count), label: "Taps on the wall" },
  { value: String(drafts.michiganCount), label: "Pouring Michigan and regional" },
  { value: "1", label: "National brand, and it is Pabst" },
];

export default function BeerAndWinePage() {
  return (
    <>
      <PageHero
        kicker="The bar"
        title="Twenty taps, nineteen of them Michigan."
        intro={drafts.note}
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
              The lineup rotates constantly, so there is no point printing it.
              Ask whoever is behind the bar and they will walk you down the wall.
              If you want to see what has been on lately, the taplist gets
              logged on Untappd.
            </p>
            <a
              href={site.social.untappd}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-ink-soft"
            >
              Check the taplist on Untappd
              <span aria-hidden>&rarr;</span>
            </a>
          </div>

          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight">
              Wine
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink/70">
              {wine.note}
            </p>
            <ul className="mt-7 flex flex-wrap gap-3">
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
      </section>
    </>
  );
}
