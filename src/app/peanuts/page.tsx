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
    body: "The original. Same roast the family has been running since the pushcart days.",
  },
  {
    name: "Cashews",
    body: "Small batches, roasted alongside the peanuts and salted while warm.",
  },
  {
    name: "Macadamia Nuts",
    body: "A later addition. They tend to sell out before the weekend is over.",
  },
];

export default function PeanutsPage() {
  return (
    <>
      <PageHero
        kicker="Since 1897"
        title="The nuts came first."
        intro="Thirty eight years before there was a restaurant in Homer, there was a Cascarelli roasting peanuts. Four generations later the roaster is still running."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight">
              A pushcart, a flood, and a hundred and twenty nine years
            </h2>
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-ink/70">
              <p>
                Robert Cascarelli started with a fruit pushcart in 1897. By 1909
                the family had a fixed stand and a peanut roaster. The great
                flood of 1908 took an earlier location and the original roaster
                cart with it, which the family still talks about.
              </p>
              <p>
                The roasting never stopped. It moved with the family to Homer in
                1935, and it has run in the same building ever since. Bags go
                out the door with people who came in for pizza and left with
                three pounds of cashews.
              </p>
              <p>
                Nuts are sold at the counter and shipped around the region. Call
                the restaurant for larger orders and holiday tins.
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
