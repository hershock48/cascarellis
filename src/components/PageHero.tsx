import { site } from "@/data/site";

export default function PageHero({
  kicker,
  title,
  intro,
  cta = true,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  cta?: boolean;
  /** Page specific action, used instead of the default Call to Order. */
  children?: React.ReactNode;
}) {
  return (
    <section className="grain grain-dark relative isolate overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-48 h-[28rem] w-[28rem] rounded-full bg-red/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold">
          {kicker}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[0.98] tracking-tight">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">{intro}</p>
        )}
        {cta && (
          <a
            href={site.phoneHref}
            className="mt-8 inline-flex rounded-full bg-red px-7 py-3.5 font-semibold text-cream shadow-lg shadow-red/25 transition-colors hover:bg-red-bright"
          >
            Call to Order {site.phone}
          </a>
        )}
        {children}
      </div>
    </section>
  );
}
