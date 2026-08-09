import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Four generations of the Cascarelli family in Homer, Michigan. Serving pizza, sandwiches and specialty nuts since 1935.",
  alternates: { canonical: "/about" },
};

const chapters = [
  {
    year: "1897",
    title: "A pushcart in Albion",
    body: "Robert Cascarelli comes over from Italy and settles in Albion, selling fruit from a pushcart with a peanut roaster on the back. The flood of 1908 takes the first roaster. The family gets another one.",
  },
  {
    year: "1935",
    title: "Frank comes to Homer",
    body: "Frank Cascarelli buys a business on Main Street from Maurice Taylor, and later the building itself. Ninety years later the family is still on that corner.",
  },
  {
    year: "1950s",
    title: "A tavern town",
    body: "The bar moves eight to fourteen barrels of draft a week. Frank hires Mildred Bloominstock to tend bar, which was not common at the time.",
  },
  {
    year: "1965",
    title: "Pizza goes on the menu",
    body: "Bob Cascarelli joins full time in 1964, and a remodel makes room for an oven. Pizza arrives in February 1965 and becomes the thing people drive in for.",
  },
  {
    year: "1971",
    title: "Judy takes the kitchen",
    body: "Judy Cascarelli starts working in the kitchen and shapes the food side of the business for decades.",
  },
  {
    year: "1994",
    title: "Ryan takes over",
    body: "Third generation on the floor. Renovations happen and the place gets modernized, but the room still looks like the room.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Est. 1935"
        title="A far reaching reputation for terrific food and superb service"
        intro="Four generations of one family, in one building, in downtown Homer. Guests come in from across Michigan and northern Indiana."
        cta={false}
      />

      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <Photo name="room" ratio="wide" sizes="(min-width: 1024px) 64rem, 100vw" />

        <ol className="relative mt-14 space-y-12 border-l border-ink/15 pl-8 sm:pl-12">
          {chapters.map((c) => (
            <li key={c.year} className="relative">
              <span
                aria-hidden
                className="absolute -left-[2.06rem] top-3 h-3 w-3 rounded-full bg-red ring-4 ring-cream sm:-left-[3.06rem]"
              />
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-red">
                {c.year}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight">
                {c.title}
              </h2>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-ink/70">{c.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 rounded-panel border border-ink/12 bg-cream-dim p-8 sm:p-10">
          <p className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            The nut roasting has run through all four generations. It is the
            oldest thing this family does.
          </p>
        </div>
      </section>
    </>
  );
}
