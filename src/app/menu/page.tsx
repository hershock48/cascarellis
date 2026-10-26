import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MenuSubnav from "@/components/MenuSubnav";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { menu, menus } from "@/data/menu";
import { photos, type PhotoKey } from "@/data/photos";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Homemade pizza, sandwiches, burgers, soups and salads at Cascarelli's in Homer, Michigan. Gluten free crust available. Call (517) 568-3502 to order.",
  alternates: { canonical: "/menu" },
};

/* A section's photographs sit between its blurb and its items. Only slots
   with a real file render: a placeholder naming a missing shot belongs on the
   homepage where the layout depends on it, not between menu items where it
   would read as a dish that is out. One shot runs wide; two or three share a
   row at sm and lg so the portrait phone photos crop to plates, not sills. */
function SectionPhotos({ keys }: { keys?: PhotoKey[] }) {
  const shots = (keys ?? []).filter((k) => photos[k].src);
  if (shots.length === 0) return null;
  const cols =
    shots.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : shots.length === 2 ? "sm:grid-cols-2" : "";
  const sizes =
    shots.length >= 3
      ? "(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
      : shots.length === 2
        ? "(min-width: 640px) 36rem, 100vw"
        : "(min-width: 1024px) 56rem, 100vw";
  return (
    <Reveal>
      <div className={`mt-8 grid gap-4 ${cols}`}>
        {shots.map((k) => (
          <Photo
            key={k}
            name={k}
            ratio={shots.length === 1 ? "wide" : "feature"}
            sizes={sizes}
            className={shots.length === 1 ? "lg:max-w-4xl" : ""}
          />
        ))}
      </div>
    </Reveal>
  );
}

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
          <p className="text-[0.95rem] sm:ml-auto">
            <a href={site.phoneHref} className="tap font-semibold text-red underline">
              Call for prices
            </a>
          </p>
        </div>
      </section>

      <MenuSubnav sections={menu} />


      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {menu.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`anchor-offset ${idx > 0 ? "mt-16" : ""}`}
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

            <SectionPhotos keys={section.photos} />

            {/* The heading stays static so anchor jumps land on settled text;
                only the items rise. */}
            <Reveal>
            <ul className="mt-8 grid gap-x-14 gap-y-7 md:grid-cols-2">
              {section.items.map((item) => (
                <li key={item.name} className="grid content-start gap-1.5">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      {item.name}
                    </h3>
                    {item.popular && (
                      <span className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-red">
                        Popular
                      </span>
                    )}
                    {item.price && (
                      <>
                        <span
                          aria-hidden
                          className="min-w-8 flex-1 translate-y-[-0.2rem] border-b border-dotted border-ink/25"
                        />
                        <span className="font-display text-lg font-bold text-red">
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
                          className="rounded-sm border border-ink/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-ink/65"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            </Reveal>
          </section>
        ))}

        <div className="mt-16 rounded-panel border border-ink/12 bg-cream-dim p-8 text-center sm:p-10">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Ready to order?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink/65">
            Dine in or carry out. Groups of {site.reservations.min} to{" "}
            {site.reservations.max} can reserve the banquet room or the patio.
          </p>
          <a href={site.phoneHref} className="btn-primary mt-6">
            Call {site.phone}
          </a>
        </div>
      </div>
    </>
  );
}
