import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import OpenNow from "@/components/OpenNow";
import MapCard from "@/components/MapCard";
import { site, fullAddress, hours, formatHour, mapsUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Cascarelli's is at 103 E Main St in Homer, Michigan. Open Monday to Thursday 11am to 9pm, Friday and Saturday until 10pm, Sunday from noon. Call (517) 568-3502.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <>
      <PageHero
        kicker="Downtown Homer"
        title="103 E Main Street"
        intro="Street parking out front and more around the corner. Carry out is always available, and the bar seats fill up first."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <div className="rounded-2xl border border-ink/12 bg-cream-dim p-8 sm:p-9">
              <OpenNow />
              <table className="mt-6 w-full text-[0.98rem]">
                <caption className="sr-only">Opening hours</caption>
                <tbody className="divide-y divide-ink/10">
                  {hours.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="py-3 text-left font-medium text-ink/65"
                      >
                        {row.label}
                      </th>
                      <td className="py-3 text-right font-semibold">
                        {formatHour(row.open)} to {formatHour(row.close)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="mt-10 space-y-7">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                  Phone
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={site.phoneHref}
                    className="font-display text-3xl font-semibold tracking-tight hover:text-brick"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                  Address
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-xl font-semibold tracking-tight underline decoration-brick/40 underline-offset-4 hover:text-brick"
                  >
                    {fullAddress}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                  Follow along
                </dt>
                <dd className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brick hover:text-brick"
                  >
                    Facebook
                  </a>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brick hover:text-brick"
                  >
                    Instagram
                  </a>
                  <a
                    href={site.social.untappd}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brick hover:text-brick"
                  >
                    Untappd
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <MapCard className="min-h-[26rem] lg:min-h-[34rem]" />
        </div>
      </section>
    </>
  );
}
