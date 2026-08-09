import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import OrderBar from "@/components/OrderBar";
import { site } from "@/data/site";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | A one of a kind pizza restaurant`,
    description: site.blurb,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.blurb,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.blurb,
  url: site.url,
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
        <OrderBar />
      </body>
    </html>
  );
}
