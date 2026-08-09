import type { Metadata } from "next";
import { Bodoni_Moda, Figtree } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import OrderBar from "@/components/OrderBar";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart";
import { site } from "@/data/site";

/**
 * Bodoni was cut in Parma in the 1790s, so the display face is literally
 * Italian. It is only used at large sizes, where the hairlines survive.
 * Figtree carries every small size and all body copy.
 */
const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

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
