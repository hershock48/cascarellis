/**
 * PHOTOS
 *
 * Drop files into /public/photos/ and set `src` below. Entries with src: null
 * render a styled placeholder that names the shot, so the layout never shifts
 * and nothing looks broken while photos are being collected.
 *
 * Food photography above the fold is the single highest impact asset on a
 * restaurant site, so `heroPizza` is the one to chase first.
 */

export type Photo = { src: string | null; alt: string; brief: string };

export const photos = {
  heroPizza: {
    src: null,
    alt: "A fresh Cascarelli's pizza coming out of the oven",
    /** The hero slot is currently the PizzaReveal badge animation, not this
        photo. When the shot lands, decide in page.tsx which one owns the
        hero rather than re-adding this beside the animation. */
    brief: "Hero shot. A whole pizza, overhead or three quarter, natural light",
  } satisfies Photo,

  macCarelli: {
    src: null,
    alt: "The MacCarelli pizza, topped with shredded lettuce",
    brief: "The MacCarelli, whole, overhead",
  } satisfies Photo,

  porkys: {
    src: null,
    alt: "Porky's Meat Lovers Dream pizza",
    brief: "Porky's, whole or a pulled slice",
  } satisfies Photo,

  flatIron: {
    src: null,
    alt: "The Flat Iron Salad with steak, mushrooms and asparagus",
    brief: "Flat Iron Salad, three quarter angle",
  } satisfies Photo,

  room: {
    src: null,
    alt: "The dining room at Cascarelli's",
    brief: "The dining room from the door, chandeliers in frame, people in it",
  } satisfies Photo,

  taps: {
    src: null,
    alt: "The twenty tap handles behind the bar",
    brief: "All twenty handles in one frame, straight on",
  } satisfies Photo,

  nuts: {
    src: null,
    alt: "Cascarelli's specialty roasted nuts",
    brief: "Bags or bowls of the different nut flavors together",
  } satisfies Photo,

  piano: {
    src: null,
    alt: "Live piano at Cascarelli's",
    brief: "The piano, ideally mid performance on a Wednesday or Saturday",
  } satisfies Photo,

  banquet: {
    src: null,
    alt: "The banquet room at Cascarelli's set for a group",
    brief: "The banquet room or the patio, set up for a party",
  } satisfies Photo,
} as const;

export type PhotoKey = keyof typeof photos;
