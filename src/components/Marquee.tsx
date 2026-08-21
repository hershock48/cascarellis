import { site } from "@/data/site";

/**
 * Slow scrolling band of the things worth knowing. Pure CSS, duplicated once
 * so the loop is seamless, paused on hover and frozen entirely under
 * prefers-reduced-motion.
 *
 * BUDGET: the animated element is the doubled track and mobile GPUs stop
 * compositing a layer past ~4096px, so the doubled track must measure under
 * that or phones show it frozen. The original eleven-item list measured
 * 5920px and blew it. "Draft beer and wine to go" was cut here specifically
 * because the homepage already says it twice. This six-item list measured
 * 3944px doubled in Nunito Sans (the font this track renders in; a font swap
 * moves this number, which is why it was re-measured after one). About 150px
 * of headroom. Adding an item means re-measuring in the browser.
 */
export default function Marquee() {
  const items = [
    `${site.music.what}, ${site.music.when.toLowerCase()}`,
    "20 beers on draft",
    "Specialty nuts shipped nationwide",
    `Groups of ${site.reservations.min} to ${site.reservations.max}`,
    "Gluten free crust available",
    "Serving Homer since 1935",
  ];

  const track = (
    <ul className="marquee-track" aria-hidden>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-gold" aria-hidden>
            &#9670;
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee border-y border-cream/10 bg-ink py-3.5 text-cream">
      <div className="marquee-inner">
        {track}
        {track}
      </div>
      {/* Readable equivalent for assistive tech, since the visual track is duplicated. */}
      <p className="sr-only">{items.join(". ")}.</p>
    </div>
  );
}
