import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { menu, menus } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Homemade pizza, sandwiches, burgers, soups and salads at Cascarelli's in Homer, Michigan. Gluten free crust available. Call (517) 568-3502 to order.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        kicker="Kitchen"
        title="The menu"
        intro="Everything is homemade with fresh, locally sourced ingredients. Available for dine in and carry out."
      />

      {/* Weekday and weekend, as they run it */}
      <section className="border-b border-ink/10 bg-cream-dim">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
          {Object.values(menus).map((m) => (
            <p key={m.id} className="text-[0.95rem]">
              <span className="font-semibold">{m.label}:</span>{" "}
              <span className="text-ink/65">{m.note}</span>
            </p>
          ))}
        </div>
      </section>

      <nav
        aria-label="Menu sections"
        className="sticky top-[4.6rem] z-30 border-b border-ink/10 bg-cream/90 backdrop-blur-md md:top-[6.9rem]"
      >
        <ul className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-5 py-3.5 sm:px-8">
          {menu.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="text-sm font-medium text-ink/70 transition-colors hover:text-red"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {menu.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-40 ${idx > 0 ? "mt-16" : ""}`}
          >
            <div className="flex items-baseline gap-5">
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {section.title}
              </h2>
              <span
                aria-hidden
                className="h-px flex-1 bg-gradient-to-r from-ink/20 to-transparent"
              />
            </div>

            {section.blurb && (
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink/65">
                {section.blurb}
              </p>
            )}

            <ul className="mt-8 grid gap-x-14 gap-y-7 md:grid-cols-2">
              {section.items.map((item) => (
                <li key={item.name} className="grid content-start gap-1.5">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {item.name}
                    </h3>
                    {item.popular && (
                      <span className="shrink-0 rounded-full bg-red/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-red">
                        Popular
                      </span>
                    )}
                    {item.price && (
                      <>
                        <span
                          aria-hidden
                          className="min-w-8 flex-1 translate-y-[-0.2rem] border-b border-dotted border-ink/25"
                        />
                        <span className="font-display text-lg font-semibold text-red">
                          {item.price}
                        </span>
                      </>
                    )}
                  </div>
                  {item.description && (
                    <p className="max-w-2xl text-[0.97rem] leading-relaxed text-ink/65">
                      {item.description}
                    </p>
                  )}
                  {item.tags && (
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-ink/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-ink/60"
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

        <div className="mt-16 rounded-panel border border-ink/12 bg-cream-dim p-8 text-center sm:p-10">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Ready to order?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink/65">
            Dine in or carry out. Groups of {site.reservations.min} or more can
            reserve the banquet room or the patio.
          </p>
          <a href={site.phoneHref} className="btn-primary mt-6">
            Call {site.phone}
          </a>
        </div>
      </div>
    </>
  );
}
