import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PartyForm from "@/components/PartyForm";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Live Piano and Private Events",
  description:
    "Live piano every Wednesday and Saturday at Cascarelli's in Homer, Michigan. Banquet room and patio available for groups of 8 to 45.",
  alternates: { canonical: "/events" },
};

const occasions = [
  "Birthdays and anniversaries",
  "Rehearsal dinners",
  "Graduation parties",
  "Team and company dinners",
  "Club and reunion meetings",
  "Celebrations of life",
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        kicker={site.music.when}
        title="Live piano, and room for the whole group"
        intro="Music twice a week, a banquet room, and a patio when the weather cooperates."
        cta={false}
      >
        <a href="#inquire" className="btn-primary mt-8">
          Ask about a party
        </a>
      </PageHero>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 border-t border-cream/10 pt-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-gold">{site.music.when}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              {site.music.what}
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-cream/70">
              Come for dinner and stay for the music. There is no cover and no
              reservation needed, but the room does fill up on a Saturday, so
              earlier is easier.
            </p>
          </Reveal>

          {/* Delay gated to lg, where this is a second column: stacked on
              mobile, a flat delay revealed it out of order. */}
          <Reveal className="lg:[transition-delay:150ms]">
            <p className="eyebrow text-gold">
              Groups of {site.reservations.min} to {site.reservations.max}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Banquet room and patio
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-cream/70">
              {site.reservations.note} Give us a call and we will talk through
              dates, menus and how many we can seat.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {occasions.map((o) => (
                <li key={o} className="flex gap-2.5 text-[0.95rem] text-cream/70">
                  <span aria-hidden className="text-gold">
                    &bull;
                  </span>
                  {o}
                </li>
              ))}
            </ul>
            <a href={site.phoneHref} className="btn-primary mt-8">
              Call {site.phone}
            </a>
          </Reveal>
        </div>

        <div id="inquire" className="anchor-offset-plain mt-16 sm:mt-20">
          <PartyForm />
        </div>
        </div>
      </section>
    </>
  );
}
