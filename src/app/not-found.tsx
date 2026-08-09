import Link from "next/link";
import { site } from "@/data/site";

/**
 * The default Next.js 404 is a bare "This page could not be found."
 * A lost visitor on a restaurant site wants the menu, the phone number or
 * directions, so give them all three.
 */
export default function NotFound() {
  const links = [
    { href: "/menu", label: "See the menu", note: "Pizza, sandwiches, salads" },
    { href: "/nuts", label: "Order nuts", label2: true, note: "Shipped anywhere in the US" },
    { href: "/events", label: "Book a party", note: `Groups of ${site.reservations.min} to ${site.reservations.max}` },
    { href: "/contact", label: "Hours and directions", note: site.address.street },
  ];

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-red">
        Page not found
      </p>
      <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-tight tracking-tight">
        That page is not on the menu.
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/70">
        The link may be out of date. Here is where most people are headed.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="lift flex h-full flex-col rounded-panel border border-ink/12 bg-cream-dim p-6 hover:border-red/30"
            >
              <span className="font-display text-xl font-bold tracking-tight">{l.label}</span>
              <span className="mt-1 text-sm text-ink/60">{l.note}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a href={site.phoneHref} className="btn-primary">
          Call {site.phone}
        </a>
        <Link href="/" className="btn-secondary">
          Back home
        </Link>
      </div>
    </section>
  );
}
