export const site = {
  name: "Cascarelli's of Homer",
  shortName: "Cascarelli's",
  tagline: "Pizza, taps and roasted nuts in downtown Homer since 1935.",
  established: 1935,
  url: "https://cascarellis.com",
  phone: "(517) 568-3502",
  phoneHref: "tel:+15175683502",
  address: {
    street: "103 E Main St",
    city: "Homer",
    state: "MI",
    zip: "49245",
  },
  social: {
    facebook: "https://www.facebook.com/cascarellisofhomer/",
    instagram: "https://www.instagram.com/cascarellisofhomer_/",
    untappd: "https://untappd.com/v/cascarelli-s/265542",
  },
  reviews: {
    rating: 4.6,
    count: 341,
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${fullAddress}`,
)}`;

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`,
)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

/** day: 0 = Sunday. Times are 24h local. */
export type Hours = {
  day: number;
  label: string;
  open: number;
  close: number;
};

export const hours: Hours[] = [
  { day: 1, label: "Monday", open: 11, close: 21 },
  { day: 2, label: "Tuesday", open: 11, close: 21 },
  { day: 3, label: "Wednesday", open: 11, close: 21 },
  { day: 4, label: "Thursday", open: 11, close: 21 },
  { day: 5, label: "Friday", open: 11, close: 22 },
  { day: 6, label: "Saturday", open: 11, close: 22 },
  { day: 0, label: "Sunday", open: 12, close: 21 },
];

export function formatHour(h: number) {
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}${suffix}`;
}

/** Grouped for compact display, e.g. "Mon to Thu  11am to 9pm". */
export const hoursSummary = [
  { label: "Monday to Thursday", value: "11am to 9pm" },
  { label: "Friday and Saturday", value: "11am to 10pm" },
  { label: "Sunday", value: "12pm to 9pm" },
];
