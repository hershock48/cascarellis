import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import OrderBar from "@/components/OrderBar";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart";
import { site } from "@/data/site";

/**
 * Fraunces for display: a warm, slightly wonky vintage serif whose optical
 * size axis thickens it at text sizes and sharpens it at poster sizes. It
 * reads like a 1930s soda-fountain menu, which is the badge's own era, and
 * it replaced Bodoni Moda, whose hairline didone contrast Kevin vetoed on
 * sight. Nunito Sans carries body copy: rounder and warmer than the Figtree
 * it replaced in the same decision.
 */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "variable",
  /* Roman only. The slanted cut is deliberately NOT loaded: Fraunces draws a
     wobbly, hand-lettered slant that Kevin rejected on sight, so no future
     edit can bring the real thing back, and the payload halves.
     (Do not name the Tailwind utility for it in this comment: the class
     scanner reads comments too, and mentioning it emitted the rule.)
     opsz only for the same reason SOFT and WONK are gone: nothing sets them. */
  style: ["normal"],
  axes: ["opsz"],
  display: "swap",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: "variable",
  display: "swap",
});

/**
 * The URL absolute metadata resolves against. site.url is cascarellis.com,
 * which today still points at their OLD site (wrong TLS cert, 302s to HTML),
 * so share images built on it were unreachable for every scraper. Until the
 * domain cuts over, prefer the host actually serving this deployment; after
 * cutover, set NEXT_PUBLIC_SITE_URL=https://cascarellis.com in Vercel.
 */
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : site.url);

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} | Pizza, Drinks and Specialty Nuts in Homer, MI`,
    template: `%s | ${site.name}`,
  },
  description: site.blurb,
  keywords: [
    "Cascarelli's",
    "Cascarelli's of Homer",
    "pizza Homer MI",
    "pizza near me Homer Michigan",
    "Michigan craft beer on tap",
    "specialty nuts Michigan",
    "Calhoun County restaurant",
    "banquet room Homer MI",
  ],
  /* No og:title/og:description here: Next does not deep-merge openGraph, so
     root values were shipping identically on all 8 routes and drowning the
     per-page titles. With them absent, scrapers fall back to each page's own
     <title> and meta description; the image and site identity stay shared. */
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [{ url: "/logo-color.png", width: 640, height: 640, alt: `${site.name} logo` }],
  },
  twitter: {
    card: "summary",
    images: ["/logo-color.png"],
  },
  /* No `icons` entry: src/app/favicon.ico (5KB, cut from the color badge)
     serves the tab icon via the file convention. Pointing metadata at the
     640px logo-color.png made browsers pull 69KB for a 16px icon. */
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.blurb,
  url: site.url,
  logo: `${baseUrl}/logo-color.png`,
  image: `${baseUrl}/logo-color.png`,
  telephone: site.phone,
  servesCuisine: ["Pizza", "Italian American", "American"],
  priceRange: "$$",
  foundingDate: "1935",
  acceptsReservations: "True",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.reviews.rating,
    reviewCount: site.reviews.count,
  },
  sameAs: [site.social.facebook, site.social.instagram, site.social.untappd],
  hasMenu: `${site.url}/menu`,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "11:00",
      closes: "22:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:00", closes: "21:00" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline script below adds .js to <html>
    // before hydration, which is deliberate and otherwise trips React 19.
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Flags that JS is available, before first paint. The reveal animations
          only engage on .js, so without this everything renders visible and
          nothing ever flashes.
        */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <OrderBar />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
