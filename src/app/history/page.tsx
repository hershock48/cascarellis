import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "History",
  description:
    "Four generations of the Cascarelli family in Homer, Michigan. From an 1897 peanut cart to a Main Street tavern in 1935 to pizza in 1965.",
  alternates: { canonical: "/history" },
};

const chapters = [
  {
    year: "1856",
    title: "Robert is born in Italy",
    body: "Robert Cascarelli is born in Italy and later crosses to the United States, settling in Albion in 1897. He marries Vincenza Biafore. The family business begins as a fruit pushcart with a peanut roaster on the back.",
  },
  {
    year: "1935",
    title: "Frank comes to Homer",
    body: "Frank Cascarelli buys a business on Main Street in Homer from Maurice Taylor, and later purchases the building itself. The family has not moved off that corner since.",
  },
  {
    year: "1930s to 1950s",
    title: "A dollar sixty a day",
    body: "That is what a Depression era day brought in. By the fifties the bar was going through eight to fourteen barrels of draft a week. Frank hired Mildred Bloominstock to tend bar, which people had opinions about at the time, and which tells you most of what you need to know about Frank.",
  },
  {
    year: "1964 and 1965",
    title: "Somebody puts in an oven",
    body: "Bob Cascarelli comes on full time in 1964 and the remodel that year makes room for a pizza oven. February 1965, pizza goes on the menu of a thirty year old tavern. That is the decision the next sixty years hang on.",
  },
  {
    year: "1971",
    title: "Judy takes the kitchen",
    body: "Judy Cascarelli starts working in the kitchen and helps shape the food side of the business through the seventies and eighties.",
  },
  {
    year: "1994",
    title: "Ryan takes it on",
    body: "Third generation on the floor. Renovations happen, things get modernized, and the room somehow still looks like the room. He is usually around, and he is happy to explain where the name came from.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        kicker="Est. 1935"
        title="Same family. Same building. Nobody has left."
        intro="Most of what is hanging on these walls has been there longer than most of the people reading this. Ryan will tell you the whole thing if you ask, but here is the short version."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <ol className="relative space-y-14 border-l border-ink/15 pl-8 sm:pl-12">
          {chapters.map((c) => (
            <li key={c.year} className="relative">
              <span
                aria-hidden
                className="absolute -left-[2.06rem] top-3 h-3 w-3 rounded-full bg-brick ring-4 ring-cream sm:-left-[3.06rem]"
              />
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brick">
                {c.year}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight">
                {c.title}
              </h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-ink/70">
                {c.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 border-t border-ink/15 pt-10">
          <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink/85 sm:text-3xl">
            The peanut roasting has run since 1897, through four generations and
            one flood. It is the oldest thing this family does, and it will
            probably outlast the pizza.
          </p>
        </div>
      </section>
    </>
  );
}
