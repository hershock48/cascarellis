export default function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="grain grain-dark relative isolate overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-48 h-[28rem] w-[28rem] rounded-full bg-brick/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-brass">
          {kicker}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[0.95] tracking-tight">
          {title}
        </h1>
        {intro && (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
