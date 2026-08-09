import { site } from "@/data/site";
import { nuts } from "@/data/menu";

/**
 * Slow scrolling band of the things worth knowing. Pure CSS, duplicated once
 * so the loop is seamless, paused on hover and frozen entirely under
 * prefers-reduced-motion.
 */
export default function Marquee() {
  const items = [
    `${site.music.what}, ${site.music.when.toLowerCase()}`,
    "20 beers on draft",
    "Draft beer and wine to go",
    ...nuts.flavors.slice(0, 3).map((f) => f.name),
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
