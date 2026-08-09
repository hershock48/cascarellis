import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { nuts } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "World Famous Specialty Nuts",
  description:
    "Red skin peanuts, Brazilian cashews, macadamias, sriracha and honey cashews, cinnamon and sugar cashews, and maple glazed pecans, roasted at Cascarelli's in Homer, Michigan.",
  alternates: { canonical: "/nuts" },
};

export default function NutsPage() {
  return (
    <>
      <PageHero
        kicker="Since the 1960s"
        title={nuts.heading}
        intro="People come in for a pizza and leave with three pounds of cashews. It happens every day."
        cta={false}
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Photo name="nuts" ratio="feature" sizes="(min-width: 1024px) 45vw, 100vw" />
            <p className="mt-8 text-[1.05rem] leading-relaxed text-ink/70">
              {nuts.blurb}
            </p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink/70">
              Ask about larger orders and holiday tins. Calling ahead in
              November beats calling in the middle of December.
            </p>
            <a href={site.phoneHref} className="btn-primary mt-7">
              Call {site.phone}
            </a>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {nuts.flavors.map((f) => (
              <li
                key={f.name}
                className="rounded-panel border border-ink/10 bg-cream-dim p-6 transition-colors hover:border-red/30"
              >
                <h2 className="font-display text-xl font-bold leading-snug tracking-tight">
                  {f.name}
                </h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/65">{f.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
