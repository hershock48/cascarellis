import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site, fullAddress, hoursSummary } from "@/data/site";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Pizza, 20 Taps and Roasted Nuts in Homer, Michigan`,
    template: `%s | ${site.name}`,
  },
  description:
    "Family run since 1935. Home of the MacCarelli, twenty taps pouring mostly Michigan, and nuts roasted here since 1897. 103 E Main St, Homer, MI. (517) 568-3502.",
  keywords: [
    "Cascarelli's",
    "Cascarelli's Homer",
    "Homer Michigan pizza",
    "MacCarelli pizza",
    "Michigan craft beer Homer MI",
    "roasted peanuts Michigan",
    "Calhoun County restaurant",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Cascarelli's of Homer | Home of our famous pizza",
    description:
      "Ninety years on the same corner. Twenty taps, nuts roasted out back since 1897, and one pizza with Thousand Island on it.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cascarelli's of Homer",
    description:
      "Ninety years on Main Street. Twenty taps, roasted nuts, and a pizza with Thousand Island on it.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description:
    "Family run tavern and pizzeria in downtown Homer, Michigan, serving since 1935.",
  url: site.url,
  telephone: site.phone,
  servesCuisine: ["Pizza", "Italian American", "American"],
  priceRange: "$$",
  foundingDate: "1935",
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
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "12:00",
      closes: "21:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
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
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <span className="sr-only">
          {fullAddress}. {hoursSummary.map((h) => `${h.label}: ${h.value}.`).join(" ")}
        </span>
      </body>
    </html>
  );
}
