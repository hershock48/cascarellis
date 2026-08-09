import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Roasted Peanuts and Nuts",
  description:
    "Cascarelli's has been roasting peanuts since 1897, four generations before the pizza. Peanuts, cashews and macadamias roasted on site in Homer, Michigan.",
  alternates: { canonical: "/peanuts" },
};

const varieties = [
  {
    name: "Roasted Peanuts",
    body: "The original, and still what most people walk out with.",
  },
  {
    name: "Cashews",
    body: "Small batches, salted while they are still warm. These are the ones people get weird about.",
  },
  {
    name: "Macadamias",
    body: "The expensive ones. Usually gone by Saturday night.",
  },
];

export default function PeanutsPage() {
  return (
    <>
      <PageHero
        kicker="Since 1897"
        title="The nuts came first."
        intro="Thirty eight years before this family owned a building in Homer, there was a Cascarelli roasting peanuts on a cart. The roaster never stopped."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight">
              A pushcart, a flood, and a roaster that never got turned off
            </h2>
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-ink/70">
              <p>
                Robert Cascarelli started with a fruit pushcart in 1897. By 1909
                there was a fixed stand and a peanut roaster on it. In between,
                the flood of 1908 took an earlier location and the original
                roaster cart with it. The family still brings that up.
              </p>
              <p>
                The roasting moved to Homer with Frank in 1935 and has run in
                this building ever since. Most of what goes out the door leaves
                with somebody who came in for a pizza and is now also carrying
                three pounds of cashews.
              </p>
              <p>
                Sold at the counter, no ceremony. Call about holiday tins before
                December rather than during, when everyone else has the same
                idea.
              </p>
            </div>
            <a
              href={site.phoneHref}
              className="mt-9 inline-block rounded-full bg-brick px-8 py-4 font-semibold text-cream transition-colors hover:bg-brick-bright"
            >
              Call about an order
            </a>
          </div>

          <ul className="space-y-px overflow-hidden rounded-2xl bg-ink/10">
            {varieties.map((v) => (
              <li key={v.name} className="grain relative bg-cream-dim p-8">
                <h3 className="relative font-display text-2xl font-semibold tracking-tight">
                  {v.name}
                </h3>
                <p className="relative mt-2.5 text-[0.98rem] leading-relaxed text-ink/65">
                  {v.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
