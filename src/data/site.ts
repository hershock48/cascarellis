export const site = {
  name: "Cascarelli's of Homer",
  shortName: "Cascarelli's",
  /** Their own words, from the current site. */
  tagline: "A one-of-a-kind pizza restaurant.",
  blurb:
    "Serving Homer since 1935. Homemade pizzas, sandwiches, burgers, soups and salads made with fresh, locally sourced ingredients, plus our world famous specialty nuts.",
  established: 1935,
  url: "https://cascarellis.com",
  phone: "(517) 568-3502",
  phoneHref: "tel:+15175683502",
  address: {
    street: "103 E Main Street",
    city: "Homer",
    state: "MI",
    zip: "49245",
  },
  social: {
    facebook: "https://www.facebook.com/cascarellisofhomer/",
    instagram: "https://www.instagram.com/cascarellisofhomer/",
    untappd: "https://untappd.com/v/cascarelli-s/265542",
  },
  reviews: { rating: 4.6, count: 341 },
  /** Reservations, from their current site. The note carries the same 8-45
      range as min/max so no surface contradicts another. */
  reservations: {
    min: 8,
    max: 45,
    note: "We accept reservations for groups of eight to forty-five. Banquet room and patio available.",
  },
  /** Live music, from their current site. */
  music: {
    what: "Live piano",
    when: "Every Wednesday and Saturday",
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${fullAddress}`,
)}`;

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  fullAddress,
)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export type Hours = { day: number; label: string; short: string; open: number; close: number };

export const hours: Hours[] = [
  { day: 1, label: "Monday", short: "Mon", open: 11, close: 21 },
  { day: 2, label: "Tuesday", short: "Tue", open: 11, close: 21 },
  { day: 3, label: "Wednesday", short: "Wed", open: 11, close: 21 },
  { day: 4, label: "Thursday", short: "Thu", open: 11, close: 21 },
  { day: 5, label: "Friday", short: "Fri", open: 11, close: 22 },
  { day: 6, label: "Saturday", short: "Sat", open: 11, close: 22 },
  { day: 0, label: "Sunday", short: "Sun", open: 12, close: 21 },
];

export function formatHour(h: number) {
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}${suffix}`;
}

export const hoursSummary = [
  { label: "Monday to Thursday", value: "11am to 9pm" },
  { label: "Friday and Saturday", value: "11am to 10pm" },
  { label: "Sunday", value: "12pm to 9pm" },
];
