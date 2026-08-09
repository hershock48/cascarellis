"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import OpenNow from "./OpenNow";
import { site } from "@/data/site";

const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/beer-and-wine", label: "Beer & Wine" },
  { href: "/peanuts", label: "Peanuts" },
  { href: "/history", label: "History" },
  { href: "/visit", label: "Visit" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-sm font-medium transition-colors hover:text-brick ${
                  active ? "text-brick" : "text-ink/80"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-brick" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <OpenNow />
          </div>
          <a
            href={site.phoneHref}
            className="hidden rounded-full bg-brick px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-brick-bright sm:inline-block"
          >
            Call to order
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
        <div
          id="mobile-nav"
          className="border-t border-ink/10 bg-cream lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
            <ul className="divide-y divide-ink/10">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-4 font-display text-2xl font-medium text-ink"
                  >
                    {item.label}
                    <span aria-hidden className="text-brick">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3 pb-2">
              <OpenNow />
              <a
                href={site.phoneHref}
                className="rounded-full bg-brick px-5 py-3.5 text-center font-semibold text-cream"
              >
                Call {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
