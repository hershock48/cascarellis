import type { MetadataRoute } from "next";

/**
 * Disallow everything while this is a spec build. See the note in next.config.ts: this is a
 * copy of a real business's content on a hostname that is not theirs, so indexing it would
 * put a duplicate of cascarellis.com on a Glazed Web domain and compete with the client.
 *
 * No sitemap is advertised for the same reason — pointing crawlers at a full URL list while
 * asking them not to index is a mixed signal. app/sitemap.ts still exists and starts working
 * again the moment this is reverted.
 *
 * Flip to `allow: "/"` and restore the sitemap line on the day it becomes their site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
