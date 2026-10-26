/**
 * THE STORY, in chapters. From their About page and the Homer Index
 * clippings they reproduce; nothing here is invented. The homepage shows the
 * four turning points; the About page shows all six.
 */
export type Chapter = { year: string; title: string; body: string; home?: boolean };

export const chapters: Chapter[] = [
  {
    year: "1897",
    title: "A pushcart in Albion",
    body: "Robert Cascarelli comes over from Italy and settles in Albion, selling fruit from a pushcart with a peanut roaster on the back. The flood of 1908 takes the first roaster. The family gets another one.",
    home: true,
  },
  {
    year: "1935",
    title: "Frank comes to Homer",
    body: "Frank Cascarelli buys a business on Main Street from Maurice Taylor, and later the building itself. Ninety years later the family is still on that corner.",
    home: true,
  },
  {
    year: "1950s",
    title: "A tavern town",
    body: "The bar moves eight to fourteen barrels of draft a week. Frank hires Mildred Bloominstock to tend bar, which was not common at the time.",
  },
  {
    year: "1965",
    title: "Pizza goes on the menu",
    body: "Bob Cascarelli joins full time in 1964, and a remodel makes room for an oven. Pizza arrives in February 1965 and becomes the thing people drive in for.",
    home: true,
  },
  {
    year: "1971",
    title: "Judy takes the kitchen",
    body: "Judy Cascarelli starts working in the kitchen and shapes the food side of the business for decades.",
  },
  {
    year: "1994",
    title: "Ryan takes over",
    body: "Third generation on the floor. Renovations happen and the place gets modernized, but the room still looks like the room.",
    home: true,
  },
];
