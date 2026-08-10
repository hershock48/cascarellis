import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOINDEX, DELIBERATELY, UNTIL THIS IS THEIR SITE.
  //
  // This is a spec build: a full copy of a real business's content, their menu, their
  // history, their photographs, served from a hostname that is not theirs. Letting search
  // engines index it does two kinds of damage. It puts a duplicate of cascarellis.com on a
  // Glazed Web domain, which competes with the client we are trying to win; and a prospect
  // who finds their own content ranking under someone else's name has a fair complaint.
  //
  // src/app/robots.ts allowed everything, which is the right posture for a launched site and
  // the wrong one for a pitch. That file now disallows, and this header is the belt to its
  // braces: robots.txt is a request that well-behaved crawlers honour, X-Robots-Tag is an
  // instruction on every response, and the two disagree less often than one of them gets
  // forgotten.
  //
  // Remove BOTH on the day it becomes their site, and not before. It is on the before-launch
  // checklist in the README.
  async headers() {
    return [
      { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
