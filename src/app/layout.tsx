import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import OrderBar from "@/components/OrderBar";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/siteUrl";

/**
 * Fonts are downloaded at build time and served from this origin; there is
 * no runtime request to Google.
 *
 * Barlow Condensed for display. The badge is lettered in a tall condensed
 * gothic with softened corners, and this is the face that sits under it
 * without arguing: tavern signage, not a wedding invitation. That was the
 * third try. Bodoni Moda's hairlines went first; Fraunces, the soft wonky
 * serif that replaced it, went the same way it went on Anchor, vetoed on
 * sight. Inter carries the text, which is the house pattern across these
 * builds (Oswald and Inter at Copper, Archivo and Inter at Anchor): one
 * strong display face, one face that disappears into the reading.
 *
 * Condensed type cannot take the tight tracking the serif headings were set
 * with; globals.css resets letter-spacing on the display utility so the 48
 * headings did not each need touching.
 */
const display = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** The URL absolute metadata resolves against. The reasoning, and the
    checkout route's use of the same answer, live in src/lib/siteUrl.ts. */
const baseUrl = siteUrl();

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
  /* The link card is the pizza, not the badge: a share of a restaurant site
     should look like food. 1200x630 JPEG, JPEG on purpose because some
     previewers still will not render WebP; cut by tools/og-card.mjs with the
     pie centred so the 630px square iOS shows keeps the whole pie. Declared
     once, here; pages set only title and description (see above). */
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [
      {
        url: "/og/pizza.jpg",
        width: 1200,
        height: 630,
        alt: `A whole pizza on a tray outside ${site.shortName} on Main Street in Homer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/pizza.jpg"],
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
  image: [`${baseUrl}/og/pizza.jpg`, `${baseUrl}/photos/pizza.jpg`, `${baseUrl}/logo-color.png`],
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
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
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
