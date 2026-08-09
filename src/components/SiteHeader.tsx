"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import OpenNow from "./OpenNow";
import CartButton from "./CartButton";
import { site } from "@/data/site";

/** Mirrors the nav on their current site, consolidated where it was redundant. */
const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/drinks", label: "Drinks" },
  { href: "/nuts", label: "Nuts" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Shadow appears once the header is no longer at the top of the page.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      data-stuck={stuck ? "" : undefined}
      className="site-header sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur-md"
    >
      {/* Utility strip: hours and phone on every page, per current best practice. */}
      <div className="hidden bg-ink text-cream md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-2 text-[0.8rem]">
          <OpenNow tone="light" />
          <div className="flex items-center gap-6">
            <span className="text-cream/70">{site.address.street}, Homer</span>
            <a href={site.phoneHref} className="font-semibold hover:text-gold">
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <Link href="/" className="group block leading-none">
          <span className="block font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.7rem]">
            Cascarelli&rsquo;s
          </span>
          <span className="mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-red">
            Homer, Michigan &middot; Est. 1935
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link relative text-[0.95rem] font-medium transition-colors hover:text-red ${
                  active ? "text-red" : "text-ink/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <CartButton />
          <a
            href={site.phoneHref}
            className="hidden rounded-full bg-red px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-red/25 transition-colors hover:bg-red-bright md:inline-block"
          >
            Call to Order
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-[2px] w-5 rounded bg-current transition-transform duration-200 ${
                  open ? "top-[6px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-[2px] w-5 rounded bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-5 rounded bg-current transition-transform duration-200 ${
                  open ? "top-[6px] -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-ink/10 bg-cream lg:hidden">
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            <ul className="divide-y divide-ink/10">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-4 font-display text-2xl font-medium text-ink"
                  >
                    {item.label}
                    <span aria-hidden className="text-red">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="py-5">
              <OpenNow />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
