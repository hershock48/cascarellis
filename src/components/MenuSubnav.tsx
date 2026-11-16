"use client";

import { useEffect, useRef, useState } from "react";
import { realignHash } from "@/lib/realignHash";

/**
 * Section jump links: the menu's fourteen sections, and the bar's four.
 *
 * Publishes its own height as --subnav-h so anchor targets can offset by the
 * full sticky stack, and highlights whichever section you are currently
 * looking at so the bar tells you where you are instead of just where you
 * could go.
 */
export default function MenuSubnav({
  sections,
  label = "Menu sections",
}: {
  /** Anything with an id on the page and a name for the chip. */
  sections: { id: string; title: string }[];
  label?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () =>
      document.documentElement.style.setProperty(
        "--subnav-h",
        `${Math.round(el.getBoundingClientRect().height)}px`,
      );
    apply();
    // A direct load of /menu#burgers jumped before this height was known.
    realignHash();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      // Only count a section as current once it is under the sticky stack.
      { rootMargin: "-190px 0px -60% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  /* Keep the active chip in view as you scroll a long menu on a phone.

     This scrolls the STRIP, sideways, and nothing else. It used to call
     scrollIntoView on the chip, which also scrolls the page whenever the
     strip itself is off screen. On a short phone the strip starts below
     the fold, so the menu page slid down by itself on load, and because a
     new scroll cancels the one in flight, a deep link to a section far
     down the page (#nuts, #greens) was cut off at the top. */
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!list || !chip) return;
    const listBox = list.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    const left = list.scrollLeft + chipBox.left - listBox.left - (listBox.width - chipBox.width) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      ref={ref}
      aria-label={label}
      className="sticky-subnav sticky z-30 border-b border-ink/10 bg-cream/92 backdrop-blur-md"
    >
      <ul
        ref={listRef}
        /* The strip scrolls sideways and has no scrollbar, so the edges
           fade: a chip dissolving at the right is the cue that there are
           more. The extra right padding lets the last chip clear the fade
           once you reach the end. */
        className="mx-auto flex max-w-6xl gap-2 overflow-x-auto py-2.5 pl-5 pr-12 sm:pl-8 [mask-image:linear-gradient(to_right,transparent,#000_1.25rem,#000_calc(100%-3rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sections.map((section) => {
          const current = active === section.id;
          return (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                data-chip={section.id}
                aria-current={current ? "true" : undefined}
                className={`tap rounded-sm px-4 text-sm font-semibold transition-colors ${
                  current
                    ? "bg-red text-cream"
                    : "text-ink/70 hover:bg-ink/5 hover:text-red"
                }`}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
