import { site } from "@/data/site";

/**
 * The hero brand moment, same doctrine as True North's compass: THE BRAND IS
 * THE MOTION. A whole drawn pizza sits over the colorized badge, one slice
 * pulls away with a cheese stretch, the strings snap, the rest of the pie
 * clears, and the badge it was hiding lands with a small pop.
 *
 * Choreography lives in globals.css on one 3.4s timeline (pz-* keyframes).
 * MOTION RULES (glaze.md §4): the un-animated state is the finished state.
 * The pie, slice and strings default to opacity 0 and are only ever made
 * visible BY their animations, which are gated on .js. No JS or reduced
 * motion therefore shows exactly the finished badge, nothing else.
 *
 * The pie is three stacked SVGs (pie-minus-wedge, cheese strings, wedge)
 * rather than groups in one, so each can be animated as an HTML element with
 * plain CSS transforms about the container center, which is also the pie
 * center. No ids, no gradients, flat fills only, so the component is safe to
 * render twice (glaze failure log: shared SVG ids paint dark squares).
 * Wedge geometry: tip at (100,100), spanning -24 deg to +26 deg, so the
 * bisector is horizontal and the pull reads as straight out to the right.
 */

const CRUST = "#c98a44";
const CHEESE = "#eccd7a";
const SAUCE = "#c1272d";
const PEPPERONI = "#8f1a20";
const BASIL = "#21402f";

export default function PizzaReveal({ className = "" }: { className?: string }) {
  return (
    <div className={`pz-stage relative mx-auto aspect-square w-full max-w-[26rem] ${className}`}>
      {/* The finished state: the badge, ringed in gold. */}
      <span className="pz-logo absolute inset-0 block rounded-full border-[3px] border-gold/80 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]">
        {/* Plain <img> per the True North precedent: one already-optimized
            PNG composing a mark; next/image adds nothing here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-color.png"
          alt={`${site.name}, Homer, Michigan, since 1935`}
          width={640}
          height={640}
          className="h-full w-full"
        />
      </span>

      {/* The pie, minus the wedge. */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        width={200}
        height={200}
        className="pz-pie absolute inset-0 h-full w-full"
      >
        {/* cheese bed, everything except the 50deg wedge */}
        <path
          d="M100,100 L175.5,136.8 A84,84 0 1 1 176.7,65.8 Z"
          fill={CHEESE}
        />
        {/* sauce peeking at the cut edges */}
        <path d="M100,100 L175.5,136.8 A84,84 0 1 1 176.7,65.8 Z" fill="none" stroke={SAUCE} strokeWidth="2.5" />
        {/* crust, an arc over the same span */}
        <path
          d="M180.9,139.5 A90,90 0 1 1 182.2,63.4"
          fill="none"
          stroke={CRUST}
          strokeWidth="13"
          strokeLinecap="round"
        />
        {/* pepperoni */}
        <circle cx="75" cy="143.3" r="10" fill={PEPPERONI} />
        <circle cx="45.8" cy="90.4" r="11" fill={PEPPERONI} />
        <circle cx="90.2" cy="63.3" r="9" fill={PEPPERONI} />
        <circle cx="100" cy="160" r="10" fill={PEPPERONI} />
        <circle cx="41.7" cy="121.2" r="9.5" fill={PEPPERONI} />
        <circle cx="81.2" cy="93.2" r="8" fill={PEPPERONI} />
        {/* basil */}
        <circle cx="120" cy="150" r="3" fill={BASIL} />
        <circle cx="62" cy="65" r="3.4" fill={BASIL} />
        <circle cx="58" cy="145" r="2.6" fill={BASIL} />
        <circle cx="118" cy="70" r="2.8" fill={BASIL} />
      </svg>

      {/* Cheese strings, anchored at the pie center (x=100 is the SVG's 50%,
          so scaleX about center stretches them out toward the slice). */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        width={200}
        height={200}
        className="pz-strings absolute inset-0 h-full w-full"
      >
        {/* Each string is drawn twice: a darker crust-toned understroke, then
            the cheese over it, so the strings stay legible whether they cross
            the red badge ground or its cream lettering. */}
        <path d="M100,86 Q140,82 176,88" fill="none" stroke="#a97c2e" strokeWidth="5" strokeLinecap="round" />
        <path d="M100,86 Q140,82 176,88" fill="none" stroke={CHEESE} strokeWidth="3.4" strokeLinecap="round" />
        <path d="M100,101 Q142,100 178,102" fill="none" stroke="#a97c2e" strokeWidth="6" strokeLinecap="round" />
        <path d="M100,101 Q142,100 178,102" fill="none" stroke={CHEESE} strokeWidth="4.2" strokeLinecap="round" />
        <path d="M100,116 Q138,120 174,114" fill="none" stroke="#a97c2e" strokeWidth="4.2" strokeLinecap="round" />
        <path d="M100,116 Q138,120 174,114" fill="none" stroke={CHEESE} strokeWidth="2.6" strokeLinecap="round" />
      </svg>

      {/* The slice that pulls away. */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        width={200}
        height={200}
        className="pz-slice absolute inset-0 h-full w-full"
      >
        <path d="M100,100 L176.7,65.8 A84,84 0 0 1 175.5,136.8 Z" fill={CHEESE} />
        <path d="M100,100 L176.7,65.8 A84,84 0 0 1 175.5,136.8 Z" fill="none" stroke={SAUCE} strokeWidth="2.5" />
        <path
          d="M182.2,63.4 A90,90 0 0 1 180.9,139.5"
          fill="none"
          stroke={CRUST}
          strokeWidth="13"
          strokeLinecap="round"
        />
        <circle cx="155" cy="100" r="9" fill={PEPPERONI} />
        <circle cx="129.3" cy="106.2" r="7" fill={PEPPERONI} />
        <circle cx="146" cy="80" r="2.8" fill={BASIL} />
      </svg>
    </div>
  );
}
