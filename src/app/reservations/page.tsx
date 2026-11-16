import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site, hoursSummary } from "@/data/site";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Book a holiday party or a large group at Cascarelli's in Homer, Michigan. Banquet room and patio for groups of 8 to 45. Call (517) 568-3502.",
  alternates: { canonical: "/reservations" },
};

/**
 * This page replaced Events in November 2026, on the owners' word: they do
 * not want an events page or a form, they want the phone to ring. So the
 * whole page is one question (is your group eight or more?) and one action
 * (call). The inquiry form and its mail route went with the old page.
 */
const occasions = [
  "Holiday parties",
  "Birthdays and anniversaries",
  "Rehearsal dinners",
  "Graduation parties",
  "Team and company dinners",
  "Club and reunion meetings",
  "Celebrations of life",
];

export default function ReservationsPage() {
  return (
    <>
      <PageHero
        kicker={`Groups of ${site.reservations.min} to ${site.reservations.max}`}
        title="Reservations"
        intro="Holiday parties, large groups, and anything that needs the banquet room or the patio. Call and we will set it up."
        cta={false}
      >
        <a href={site.phoneHref} className="btn-primary mt-8">
          Call {site.phone}
        </a>
      </PageHero>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-12 border-t border-cream/10 pt-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow text-gold">Holiday parties</p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Book the party before the calendar fills
              </h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-cream/70">
                There is one banquet room, so the holidays go to whoever calls
                first. Tell us the date and the head count and we will talk
                through the menu and how the room sets up.
              </p>
              <a href={site.phoneHref} className="btn-primary mt-8">
                Call to book
              </a>
            </Reveal>

            {/* Delay gated to lg, where this is a second column: stacked on
                mobile, a flat delay revealed it out of order. */}
            <Reveal className="lg:[transition-delay:150ms]">
              <p className="eyebrow text-gold">Large groups</p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Banquet room and patio
              </h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-cream/70">
                {site.reservations.note} Smaller tables are walk in.
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
            </Reveal>
          </div>

          <Reveal className="mt-14 border-t border-cream/10 pt-10">
            <p className="eyebrow text-gold">When to call</p>
            <dl className="mt-4 grid gap-x-10 gap-y-3 text-[0.98rem] sm:grid-cols-3">
              {hoursSummary.map((h) => (
                <div key={h.label}>
                  <dt className="text-cream/55">{h.label}</dt>
                  <dd className="mt-0.5 font-semibold">{h.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-display text-3xl font-semibold">
              <a href={site.phoneHref} className="underline decoration-gold/40 underline-offset-4 hover:text-gold">
                {site.phone}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
