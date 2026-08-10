import Link from "next/link";
import { site, fullAddress, hoursSummary, mapsUrl } from "@/data/site";
import GlazedPlate from "@/components/GlazedPlate";

const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/drinks", label: "Drinks" },
  { href: "/nuts", label: "Nuts" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/employment", label: "Employment" },
];

export default function SiteFooter() {
  return (
    <footer className="grain grain-dark relative overflow-hidden bg-ink text-cream">
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight">
              Cascarelli&rsquo;s
            </p>
            <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-gold">
              Homer, Michigan &middot; Est. 1935
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              {site.blurb}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="tap rounded-full border border-cream/20 px-5 text-xs font-semibold uppercase tracking-wider text-cream/80 transition-colors hover:border-gold hover:text-gold"
              >
                Facebook
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="tap rounded-full border border-cream/20 px-5 text-xs font-semibold uppercase tracking-wider text-cream/80 transition-colors hover:border-gold hover:text-gold"
              >
                Instagram
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Find us
            </h2>
            <address className="mt-4 flex flex-col items-start gap-1 not-italic text-sm leading-relaxed text-cream/80">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 flex-col justify-center hover:text-gold"
              >
                <span>{site.address.street}</span>
                <span>
                  {site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </a>
              <a
                href={site.phoneHref}
                className="flex min-h-11 items-center text-base font-semibold text-cream hover:text-gold"
              >
                {site.phone}
              </a>
            </address>
            <p className="mt-4 text-sm text-cream/60">
              {site.music.what}, {site.music.when.toLowerCase()}.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Hours
            </h2>
            <dl className="mt-4 space-y-2 text-sm text-cream/80">
              {hoursSummary.map((row) => (
                <div key={row.label}>
                  <dt className="text-cream/60">{row.label}</dt>
                  <dd className="font-medium text-cream">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="tap text-sm text-cream/70 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-cream/45">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>

      {/* Glazed Web signs off below the client's footer, not inside it. */}
      <GlazedPlate line="Double Dipped by" />
    </footer>
  );
}
