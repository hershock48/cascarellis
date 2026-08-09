/**
 * The signature motion. Cascarelli's answer to the Glazed Web glaze drip.
 *
 * Molten cheese hanging off the bottom edge of a section, oozing slowly, with
 * two drops that let go on a long loop.
 *
 * Built as a repeating SVG mask over a solid colour rather than a row of
 * divs, so the cheese reads as one continuous edge with no seams, keeps its
 * proportions at any screen width, and stays recolourable with one variable.
 */
export default function CheeseDrip({
  className = "",
  /** Any CSS colour. Defaults to melted mozzarella. */
  color = "#eccd7a",
  /** Set to the colour of the section above to read as that section melting. */
  drops = true,
}: {
  className?: string;
  color?: string;
  drops?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`cheese-drip pointer-events-none absolute inset-x-0 bottom-0 z-10 select-none ${className}`}
      style={{ ["--cheese" as string]: color }}
    >
      <div className="cheese-edge" />
      {drops && (
        <>
          <span className="cheese-fall cheese-fall-a" />
          <span className="cheese-fall cheese-fall-b" />
        </>
      )}
    </div>
  );
}
