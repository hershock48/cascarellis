import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { menu } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Pizza, pasta, sandwiches and roasted nuts at Cascarelli's in Homer, Michigan. Gluten free crust available. Call (517) 568-3502 to order.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        kicker="Kitchen"
        title="Everything is made when you order it."
        intro="Which is the good news and the bad news. Anything here goes out the door as a carry out, and that is the faster way to do it."
      />

      {/* Jump links */}
      <nav
        aria-label="Menu sections"
        className="sticky top-[4.6rem] z-30 border-b border-ink/10 bg-cream/90 backdrop-blur-md"
      >
        <ul className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-5 py-3.5 sm:px-8">
          {menu.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="text-sm font-medium text-ink/70 transition-colors hover:text-brick"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        {menu.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-36 ${idx > 0 ? "mt-20" : ""}`}
          >
            <div className="flex items-baseline gap-5">
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {section.title}
              </h2>
              <span aria-hidden className="rule flex-1" />
            </div>

            {section.blurb && (
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink/65">
                {section.blurb}
              </p>
            )}

            <ul className="mt-9 grid gap-x-16 gap-y-8 md:grid-cols-2">
              {section.items.map((item) => (
                <li key={item.name} className="grid content-start gap-2">
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {item.name}
                    </h3>
                    {item.price && (
                      <>
                        <span
                          aria-hidden
                          className="min-w-8 flex-1 translate-y-[-0.2rem] border-b border-dotted border-ink/25"
                        />
                        <span className="font-display text-lg font-semibold text-brick">
                          {item.price}
                        </span>
                      </>
                    )}
                  </div>
                  {item.description && (
                    <p className="max-w-2xl text-[0.98rem] leading-relaxed text-ink/65">
                      {item.description}
                    </p>
                  )}
                  {item.tags && (
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-brick/30 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-brick"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="mt-20 rounded-2xl border border-ink/12 bg-cream-dim p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Prices are on the board inside
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink/65">
            Call and we will tell you, and take the order while we are at it.
            Friday and Saturday, calling ahead is the difference between eating
            at seven and eating at eight.
          </p>
          <a
            href={site.phoneHref}
            className="mt-6 inline-block rounded-full bg-brick px-8 py-4 font-semibold text-cream transition-colors hover:bg-brick-bright"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </>
  );
}
