/**
 * Land a deep link where it was aimed.
 *
 * Anchor targets clear the sticky header (and on /menu the section bar) with
 * a scroll-margin built from --header-h and --subnav-h. Those two variables
 * are measured in the browser, so on a direct load of /menu#burgers the
 * browser jumps to the heading using the CSS fallbacks, and only then do the
 * real heights arrive. On a desktop the fallbacks are about 55px short and
 * the heading ended up tucked under the bar.
 *
 * Call this once, right after publishing a measured height on mount. It
 * waits two frames so every component's measurement from the same commit is
 * in, then re-scrolls to the hash target, instantly: `html` scrolls smoothly
 * by default and this is a correction, not a journey.
 */
export function realignHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
    }),
  );
}
