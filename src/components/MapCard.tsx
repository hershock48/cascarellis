"use client";

import { useState } from "react";
import { site, mapsUrl, mapsEmbedUrl } from "@/data/site";

/**
 * Click to load the Google embed. Keeps third party cookies and ~700kb of
 * map tiles off the initial page load, and the card still looks finished
 * if the embed never loads.
 */
export default function MapCard({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div
        className={`overflow-hidden rounded-sm border border-cream/15 ${className}`}
      >
        <iframe
          title={`Map to ${site.name}`}
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full min-h-[24rem] w-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className={`grain grain-dark relative isolate overflow-hidden rounded-sm border border-cream/15 bg-ink-soft text-cream ${className}`}
    >
      {/* Abstract street grid, drawn rather than loaded. */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full text-cream/10"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 300"
      >
        <g stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M-20 90 H420 M-20 210 H420 M70 -20 V320 M190 -20 V320 M310 -20 V320" />
          <path d="M-20 40 H420 M-20 260 H420" strokeWidth="0.75" />
          <path d="M130 -20 V320 M250 -20 V320 M370 -20 V320" strokeWidth="0.75" />
        </g>
        <path
          d="M-20 150 H420"
          stroke="currentColor"
          strokeWidth="9"
          fill="none"
          className="text-gold/25"
        />
      </svg>

      <div className="relative grid h-full min-h-[24rem] place-items-center p-8 text-center">
        <div>
          <p className="eyebrow text-gold">Corner of Main</p>
          <p className="mt-4 font-display text-4xl font-semibold">
            {site.address.street}
          </p>
          <p className="mt-1.5 text-cream/70">
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="btn-primary btn-sm"
            >
              Show the map
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline btn-sm"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
