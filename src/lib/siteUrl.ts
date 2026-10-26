import { site } from "@/data/site";

/**
 * The absolute origin this deployment answers on, and the only origins a
 * request may claim to come from.
 *
 * site.url is cascarellis.com, which until cutover still points at their OLD
 * site (wrong TLS cert, 302s to HTML), so absolute URLs built on it were
 * unreachable for every scraper. Until the domain cuts over, prefer the host
 * actually serving this deployment; after cutover, set NEXT_PUBLIC_SITE_URL
 * in Vercel and this collapses to that.
 */
type Env = Record<string, string | undefined>;

export function siteUrl(env: Env = process.env): string {
  return (
    env.NEXT_PUBLIC_SITE_URL ??
    (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : site.url)
  );
}

/**
 * Where Stripe should send the customer back to.
 *
 * The Origin header is an honest hint from a browser and a free field for
 * anyone else: a request forged with Origin: https://lookalike.example got a
 * real Checkout Session on Cascarelli's account whose success page was the
 * lookalike. So the header is honoured only when it names a host this
 * deployment serves: the configured site, this exact Vercel deployment
 * (previews have their own URL and still need a working checkout), or
 * localhost in development. Anything else lands on the configured site.
 */
export function trustedOrigin(originHeader: string | null, env: Env = process.env): string {
  const configured = siteUrl(env);
  if (!originHeader) return configured;

  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return configured;
  }
  const claimed = origin.origin;

  if (claimed === configured) return claimed;
  if (env.VERCEL_URL && claimed === `https://${env.VERCEL_URL}`) return claimed;
  if (env.NODE_ENV !== "production" && origin.hostname === "localhost") return claimed;
  return configured;
}
