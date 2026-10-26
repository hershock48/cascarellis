import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { chapters } from "@/data/story";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Four generations of the Cascarelli family in Homer, Michigan. Serving pizza, sandwiches and specialty nuts since 1935.",
  alternates: { canonical: "/about" },
};


export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Est. 1935"
        title="A far reaching reputation for terrific food and superb service"
        intro="Four generations of one family, in one building, in downtown Homer. Guests come in from across Michigan and northern Indiana."
        cta={false}
      />

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <ol className="relative space-y-12 border-l border-cream/15 pl-8 sm:pl-12">
          {/* Each chapter rises as the reader reaches it; scroll spacing does
              the desynchronising, so no per-item delay. */}
          {chapters.map((c) => (
            <Reveal as="li" key={c.year} className="relative">
              <span
                aria-hidden
                className="absolute -left-[2.06rem] top-3 h-3 w-3 rounded-full bg-gold ring-4 ring-ink sm:-left-[3.06rem]"
              />
              <p className="font-display text-lg font-semibold text-gold">
                {c.year}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight">
                {c.title}
              </h2>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-cream/70">{c.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 border-t border-cream/10 pt-10">
          <p className="max-w-2xl font-display text-2xl font-semibold leading-snug sm:text-3xl">
            The nut roasting has run through all four generations. It is the
            oldest thing this family does.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/nuts" className="btn-primary">
              Order the nuts
            </Link>
            <Link href="/menu" className="btn-outline">
              See the menu
            </Link>
          </div>
        </Reveal>
        </div>
      </section>
    </>
  );
}
