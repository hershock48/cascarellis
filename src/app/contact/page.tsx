import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import MapCard from "@/components/MapCard";
import OpenNow from "@/components/OpenNow";
import Reveal from "@/components/Reveal";
import { site, fullAddress, hours, formatHour, mapsUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact and Hours",
  description:
    "Cascarelli's is at 103 E Main Street, Homer, MI 49245. Open Monday to Thursday 11am to 9pm, Friday and Saturday until 10pm, Sunday from noon. Call (517) 568-3502.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Downtown Homer"
        title="103 E Main Street"
        intro="Street parking out front and more around the corner. Dine in, carry out, and draft beer or wine to go."
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="rounded-panel border border-ink/12 bg-cream-dim p-7 sm:p-8">
              <OpenNow />
              <table className="mt-5 w-full text-[0.97rem]">
                <caption className="sr-only">Opening hours</caption>
                <tbody className="divide-y divide-ink/10">
                  {hours.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="py-2.5 text-left font-medium text-ink/65">
                        {row.label}
                      </th>
                      <td className="py-2.5 text-right font-semibold">
                        {formatHour(row.open)} to {formatHour(row.close)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="mt-9 space-y-7">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">
                  Phone
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={site.phoneHref}
                    className="font-display text-3xl font-semibold tracking-tight hover:text-red"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">
                  Address
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="tap font-display text-xl font-bold tracking-tight underline decoration-red/40 underline-offset-4 hover:text-red"
                  >
                    {fullAddress}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">
                  Reservations
                </dt>
                <dd className="mt-1.5 text-[0.98rem] leading-relaxed text-ink/70">
                  {site.reservations.note}{" "}
                  <Link
                    href="/events#inquire"
                    className="font-semibold text-red underline underline-offset-4"
                  >
                    Send us the details
                  </Link>{" "}
                  and we will get back to you.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">
                  Follow along
                </dt>
                <dd className="mt-3 flex flex-wrap gap-3">
                  {[
                    ["Facebook", site.social.facebook],
                    ["Instagram", site.social.instagram],
                    ["Untappd", site.social.untappd],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-red hover:text-red"
                    >
                      {label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* h-full down the chain: the Reveal div replaced MapCard as the
              grid child, and without it the card stopped stretching to the
              row height it had before the motion pass. */}
          <Reveal className="h-full lg:[transition-delay:150ms]">
            <MapCard className="h-full min-h-[26rem] lg:min-h-[34rem]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
