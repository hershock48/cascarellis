import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import MenuSubnav from "@/components/MenuSubnav";
import NutMark from "@/components/NutMark";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { menu, menuNotes, type MenuGroup, type MenuItem } from "@/data/menu";
import { photos, type PhotoKey } from "@/data/photos";
import { site, phoneNoWrap } from "@/data/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full menu and prices at Cascarelli's in Homer, Michigan: specialty and build your own pizza, flatbreads, half pound burgers, salads, pasta and the nuts. Gluten free crust available. Call (517) 568-3502 to order.",
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

/* One dish. The name carries the nut mark, a dotted leader runs to the
   price, and the description and any add-on line sit under it. A featured
   dish gets the hairline box the printed menu draws around it; the negative
   margin keeps its text on the same left edge as its unboxed neighbors. */
function Dish({ item }: { item: MenuItem }) {
  return (
    <li
      className={`grid content-start gap-1.5 ${
        item.featured ? "-m-3 self-start rounded-sm border border-ink/30 p-3" : ""
      }`}
    >
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-xl font-bold tracking-tight">{item.name}</h3>
        {item.nuts && <NutMark className="self-center" />}
        {item.price && (
          <>
            <span
              aria-hidden
              className="min-w-6 flex-1 translate-y-[-0.2rem] border-b border-dotted border-ink/25"
            />
            <span className="shrink-0 font-display text-lg font-bold text-red">{item.price}</span>
          </>
        )}
      </div>
      {item.description && (
        <p className="max-w-2xl text-[0.97rem] leading-relaxed text-ink/65">{item.description}</p>
      )}
      {item.note && <p className="text-sm font-semibold text-ink/75">{item.note}</p>}
    </li>
  );
}

/* A build-your-own list: the group's shared price under its name, then the
   options. Options that carry their own price (side salads, Alfredo add-ons)
   run one to a line with the price at the right; the rest flow in two
   columns the way the print sets its toppings. */
function Group({ group }: { group: MenuGroup }) {
  const priced = group.options.some((o) => o.price);
  return (
    <div>
      <h3 className="font-display text-xl font-bold tracking-tight text-red">{group.title}</h3>
      {group.price && <p className="mt-1 text-sm font-semibold text-ink/75">{group.price}</p>}
      <ul
        className={`mt-3 text-[0.95rem] text-ink/75 ${
          priced ? "grid gap-1.5" : "columns-2 gap-x-6 [&>li]:mb-1.5 [&>li]:break-inside-avoid"
        }`}
      >
        {group.options.map((o) => (
          <li key={o.name}>
            <span className="flex items-center gap-2">
              <span>{o.name}</span>
              {o.nuts && <NutMark />}
              {o.price && <span className="ml-auto font-semibold text-ink">{o.price}</span>}
            </span>
            {o.note && <span className="block text-sm text-ink/60">{o.note}</span>}
          </li>
        ))}
      </ul>
    </div>
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

      {/* The two notes the printed menu keeps at its foot, up where they are
          read before ordering: what the chef means, and the Parmesan. */}
      <section className="border-b border-ink/10 bg-cream-dim">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-[0.95rem] sm:px-8 lg:flex-row lg:items-center lg:gap-10">
          <p className="flex shrink-0 items-center gap-2.5 font-semibold">
            <NutMark />
            {menuNotes.nuts}
          </p>
          <p className="text-ink/65">{menuNotes.parmesan}</p>
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

            {section.price && (
              <p className="mt-3 font-display text-xl font-bold text-red">{section.price}</p>
            )}

            {section.blurb && (
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink/65">
                {section.blurb}
              </p>
            )}

            {section.note && (
              <p className="mt-3 max-w-2xl text-[0.95rem] italic leading-relaxed text-ink/65">
                {section.note}
              </p>
            )}

            <SectionPhotos keys={section.photos} />

            {/* The heading stays static so anchor jumps land on settled text;
                only the items rise. */}
            <Reveal>
              <ul className="mt-9 grid gap-x-14 gap-y-8 md:grid-cols-2">
                {section.items.map((item) => (
                  <Dish key={item.name} item={item} />
                ))}
              </ul>

              {section.groups && (
                <div className="mt-10 grid gap-x-14 gap-y-9 border-t border-ink/10 pt-9 sm:grid-cols-2 lg:grid-cols-4">
                  {section.groups.map((group) => (
                    <Group key={group.title} group={group} />
                  ))}
                </div>
              )}

              {section.id === "nuts" && (
                <p className="mt-8 text-[0.98rem] text-ink/70">
                  These are counter prices.{" "}
                  <Link href="/nuts#shop" className="tap font-semibold text-red underline">
                    Have them shipped
                  </Link>
                </p>
              )}
            </Reveal>
          </section>
        ))}

        <p className="mt-16 max-w-3xl text-sm leading-relaxed text-ink/60">{menuNotes.advisory}</p>

        <div className="mt-10 rounded-panel border border-ink/12 bg-cream-dim p-8 text-center sm:p-10">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Ready to order?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink/65">
            Dine in or carry out. Groups of {site.reservations.min} to{" "}
            {site.reservations.max} can reserve the banquet room or the patio.
          </p>
          <a href={site.phoneHref} className="btn-primary mt-6">
            Call {phoneNoWrap}
          </a>
        </div>
      </div>
    </>
  );
}
