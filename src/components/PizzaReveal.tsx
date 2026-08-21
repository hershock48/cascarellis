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
 * center. No ids, no gradients, no filters: the illustration is built from
 * flat layered shapes, which matches the site's flat look, costs nothing to
 * composite while animating, and per the glaze failure log cannot repeat a
 * gradient id if this ever renders twice.
 *
 * All geometry is computed from polar coordinates about (100,100) in a
 * 200x200 viewBox. The wedge spans -24deg to +26deg so its bisector is
 * horizontal and the pull reads as straight out to the right. Decoration
 * angles stay inside 30..330 so nothing straddles the cut.
 */

const CRUST = "#c98a44";
const CRUST_HI = "#e2ae62";
const CRUST_TOAST = "#a96a2c";
const CRUST_FLECK = "#f0c98a";
const CHEESE = "#eccd7a";
const CHEESE_LIGHT = "#f5df9f";
const CHEESE_TOAST = "#d9ae4e";
const CHEESE_BUBBLE = "#b9853b";
const SAUCE = "#b02025";
const PEP = "#7a1119";
const PEP_IN = "#9e2126";
const PEP_HI = "#b23a34";
const BASIL = "#2c5038";
const STRING_UNDER = "#a97c2e";

/** Polar to viewBox coords. Degrees clockwise from 3 o'clock, y down. */
function pt(deg: number, r: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [+(100 + r * Math.cos(a)).toFixed(1), +(100 + r * Math.sin(a)).toFixed(1)];
}

/** Filled sector from `from` to `to` degrees (clockwise) at radius r. */
function sector(from: number, to: number, r: number): string {
  const [x1, y1] = pt(from, r);
  const [x2, y2] = pt(to, r);
  const large = (to - from) % 360 > 180 ? 1 : 0;
  return `M100,100 L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`;
}

/** A sector whose arc wobbles between the given radii, for organic edges. */
function wobblySector(from: number, to: number, radii: number[]): string {
  const step = (to - from) / (radii.length - 1);
  const [x0, y0] = pt(from, radii[0]);
  let d = `M100,100 L${x0},${y0}`;
  for (let i = 1; i < radii.length; i += 1) {
    const [x, y] = pt(from + step * i, radii[i]);
    d += ` A${radii[i]},${radii[i]} 0 0 1 ${x},${y}`;
  }
  return `${d} Z`;
}

/** An arc path (for stroked crust) from `from` to `to` degrees at radius r. */
function arc(from: number, to: number, r: number): string {
  const [x1, y1] = pt(from, r);
  const [x2, y2] = pt(to, r);
  const large = (to - from) % 360 > 180 ? 1 : 0;
  return `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2}`;
}

/* Wedge boundaries. The pie owns 26..336, the slice owns -24..26. */
const PIE_A = 26;
const PIE_B = 336;
const SL_A = -24;
const SL_B = 26;

/* Toppings, as [angle, radius, size]. Pie angles stay off the cut. */
const PEP_PIE: [number, number, number][] = [
  [75, 52, 10], [120, 48, 10.5], [163, 55, 9.5], [205, 50, 11],
  [250, 47, 9], [295, 55, 10], [150, 22, 8], [230, 20, 7.5],
];
const PEP_SLICE: [number, number, number][] = [[0, 55, 9.5], [14, 28, 7]];

/* Basil leaves as [angle, radius, rotation]. */
const BASIL_PIE: [number, number, number][] = [
  [95, 68, 30], [138, 30, -25], [188, 68, 75], [262, 62, 10], [318, 40, -40],
];
const BASIL_SLICE: [number, number, number][] = [[8, 70, -15]];

/* Cheese mottling as [angle, radius, rx, ry, rotation, tone]. */
const MOTTLE_PIE: [number, number, number, number, number, "l" | "t"][] = [
  [100, 55, 8, 5, 20, "l"], [140, 40, 7, 4.5, -30, "l"], [70, 30, 6, 4, 15, "l"],
  [200, 60, 7, 4, -10, "l"], [252, 35, 5.5, 3.5, 40, "l"], [300, 42, 6, 4, 0, "l"],
  [170, 20, 4, 2.6, 0, "t"], [115, 68, 3.5, 2.4, 20, "t"], [225, 55, 3, 2, -15, "t"],
  [285, 60, 4, 2.5, 30, "t"], [60, 62, 3, 2, 0, "t"],
];
const MOTTLE_SLICE: [number, number, number, number, number, "l" | "t"][] = [
  [-8, 45, 6, 4, 10, "l"], [16, 58, 4, 2.6, -20, "t"],
];

/* Crust blisters as [angle, tone]; light flecks as angles. */
const BLISTER_PIE: [number, "d" | "l"][] = [
  [55, "d"], [95, "d"], [140, "d"], [185, "d"], [225, "d"], [268, "d"], [308, "d"],
  [70, "l"], [120, "l"], [205, "l"], [290, "l"],
];
const BLISTER_SLICE: [number, "d" | "l"][] = [[-10, "d"], [12, "d"], [2, "l"]];

/* Bubble specks browned into the cheese, [angle, radius]. */
const BUBBLES_PIE: [number, number][] = [
  [88, 36], [110, 30], [155, 66], [178, 44], [215, 34], [242, 62], [278, 26], [325, 60],
];

function Basil({ at }: { at: [number, number, number] }) {
  const [x, y] = pt(at[0], at[1]);
  return (
    <g transform={`translate(${x},${y}) rotate(${at[2]})`}>
      <ellipse rx="4.2" ry="2" fill={BASIL} />
      <line x1="-3" y1="0" x2="3" y2="0" stroke="#1d3627" strokeWidth="0.5" />
    </g>
  );
}

function Pepperoni({ at }: { at: [number, number, number] }) {
  const [x, y] = pt(at[0], at[1]);
  const r = at[2];
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={PEP} />
      <circle cx={x} cy={y} r={r - 1.8} fill={PEP_IN} />
      <circle cx={x - r / 3} cy={y - r / 3} r={1.5} fill={PEP_HI} />
      <circle cx={x + r / 3.2} cy={y + r / 4} r={1} fill={PEP} />
    </g>
  );
}

function Mottle({ at }: { at: [number, number, number, number, number, "l" | "t"] }) {
  const [x, y] = pt(at[0], at[1]);
  return (
    <ellipse
      cx={x}
      cy={y}
      rx={at[2]}
      ry={at[3]}
      transform={`rotate(${at[4]} ${x} ${y})`}
      fill={at[5] === "l" ? CHEESE_LIGHT : CHEESE_TOAST}
      opacity={at[5] === "l" ? 0.8 : 0.85}
    />
  );
}

function Blister({ at }: { at: [number, "d" | "l"] }) {
  const [x, y] = pt(at[0], 90);
  return at[1] === "d" ? (
    <circle cx={x} cy={y} r={2} fill={CRUST_TOAST} opacity={0.9} />
  ) : (
    <circle cx={x} cy={y} r={1.3} fill={CRUST_FLECK} opacity={0.9} />
  );
}

export default function PizzaReveal({ className = "" }: { className?: string }) {
  /* Cheese edges wobble against a slightly larger sauce sector, so a thin
     irregular line of sauce peeks out where the cheese does not reach. */
  const pieCheese = wobblySector(PIE_A, PIE_B, [83.2, 81.6, 83.4, 81.8, 83, 81.5, 83.3, 81.7, 83.1, 82, 83.2]);
  const sliceCheese = wobblySector(SL_A, SL_B, [82.8, 81.6, 83.2, 82.2]);

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
      <svg aria-hidden viewBox="0 0 200 200" width={200} height={200} className="pz-pie absolute inset-0 h-full w-full">
        {/* soft ground shadow, offset down-right */}
        <path d={sector(PIE_A, PIE_B, 96)} transform="translate(2 4.5)" fill="#000" opacity="0.16" />
        {/* sauce bed, then the wobbly cheese over it */}
        <path d={sector(PIE_A, PIE_B, 85)} fill={SAUCE} />
        <path d={pieCheese} fill={CHEESE} />
        {MOTTLE_PIE.map((m, i) => <Mottle key={i} at={m} />)}
        {BUBBLES_PIE.map(([a, r], i) => {
          const [x, y] = pt(a, r);
          return <circle key={i} cx={x} cy={y} r={1.5} fill={CHEESE_BUBBLE} opacity={0.8} />;
        })}
        {/* crust: toasted outer line, body, inner highlight, blisters */}
        <path d={arc(PIE_A, PIE_B, 90)} fill="none" stroke={CRUST} strokeWidth="13" strokeLinecap="round" />
        <path d={arc(PIE_A + 4, PIE_B - 4, 94.5)} fill="none" stroke={CRUST_TOAST} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <path d={arc(PIE_A + 8, PIE_B - 8, 87)} fill="none" stroke={CRUST_HI} strokeWidth="3.4" strokeLinecap="round" opacity="0.85" />
        {BLISTER_PIE.map((b, i) => <Blister key={i} at={b} />)}
        {PEP_PIE.map((p, i) => <Pepperoni key={i} at={p} />)}
        {BASIL_PIE.map((b, i) => <Basil key={i} at={b} />)}
      </svg>

      {/* Cheese strings, anchored at the pie center (x=100 is the SVG's 50%,
          so scaleX about center stretches them out toward the slice). Each
          string is drawn twice, a crust-toned understroke beneath the cheese,
          so they read over both the red badge ground and its cream lettering. */}
      <svg aria-hidden viewBox="0 0 200 200" width={200} height={200} className="pz-strings absolute inset-0 h-full w-full">
        <path d="M100,86 Q140,82 176,88" fill="none" stroke={STRING_UNDER} strokeWidth="5" strokeLinecap="round" />
        <path d="M100,86 Q140,82 176,88" fill="none" stroke={CHEESE} strokeWidth="3.4" strokeLinecap="round" />
        <path d="M100,101 Q142,100 178,102" fill="none" stroke={STRING_UNDER} strokeWidth="6" strokeLinecap="round" />
        <path d="M100,101 Q142,100 178,102" fill="none" stroke={CHEESE} strokeWidth="4.2" strokeLinecap="round" />
        <path d="M100,116 Q138,120 174,114" fill="none" stroke={STRING_UNDER} strokeWidth="4.2" strokeLinecap="round" />
        <path d="M100,116 Q138,120 174,114" fill="none" stroke={CHEESE} strokeWidth="2.6" strokeLinecap="round" />
      </svg>

      {/* The slice that pulls away. */}
      <svg aria-hidden viewBox="0 0 200 200" width={200} height={200} className="pz-slice absolute inset-0 h-full w-full">
        <path d={sector(SL_A, SL_B, 93)} transform="translate(2.5 4.5)" fill="#000" opacity="0.15" />
        <path d={sector(SL_A, SL_B, 85)} fill={SAUCE} />
        <path d={sliceCheese} fill={CHEESE} />
        {MOTTLE_SLICE.map((m, i) => <Mottle key={i} at={m} />)}
        {/* molten cheese lips along both cut edges */}
        <path d={`M100,100 L${pt(SL_A, 84).join(",")}`} stroke={CHEESE_LIGHT} strokeWidth="2.4" strokeLinecap="round" />
        <path d={`M100,100 L${pt(SL_B, 84).join(",")}`} stroke={CHEESE_LIGHT} strokeWidth="2.4" strokeLinecap="round" />
        <path d={arc(SL_A, SL_B, 90)} fill="none" stroke={CRUST} strokeWidth="13" strokeLinecap="round" />
        <path d={arc(SL_A + 3, SL_B - 3, 94.5)} fill="none" stroke={CRUST_TOAST} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <path d={arc(SL_A + 6, SL_B - 6, 87)} fill="none" stroke={CRUST_HI} strokeWidth="3.4" strokeLinecap="round" opacity="0.85" />
        {BLISTER_SLICE.map((b, i) => <Blister key={i} at={b} />)}
        {PEP_SLICE.map((p, i) => <Pepperoni key={i} at={p} />)}
        {BASIL_SLICE.map((b, i) => <Basil key={i} at={b} />)}
      </svg>
    </div>
  );
}
