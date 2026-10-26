"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuSection } from "@/data/menu";

/**
 * Section jump links for the menu.
 *
 * Publishes its own height as --subnav-h so anchor targets can offset by the
 * full sticky stack, and highlights whichever section you are currently
 * looking at so the bar tells you where you are instead of just where you
 * could go.
 */
export default function MenuSubnav({ sections }: { sections: MenuSection[] }) {
  const ref = useRef<HTMLElement | null>(null);
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

  // Keep the active chip in view as you scroll a long menu on a phone.
  useEffect(() => {
    const el = ref.current?.querySelector(`[data-chip="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <nav
      ref={ref}
      aria-label="Menu sections"
      className="sticky-subnav sticky z-30 border-b border-ink/10 bg-cream/92 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-2.5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
