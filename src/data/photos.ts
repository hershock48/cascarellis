/**
 * PHOTOS
 *
 * Drop image files into /public/photos/ and fill in the `src` below. Any
 * entry with src set to null renders a styled placeholder instead, so the
 * site looks finished while photos are still being collected.
 *
 * Sizes to aim for (they get optimized automatically, so bigger is fine):
 *   hero      2400 x 1600
 *   feature   1600 x 1200
 *   square    1200 x 1200
 *
 * Always write real alt text. It is what a screen reader announces and what
 * Google reads.
 */

export type Photo = {
  src: string | null;
  alt: string;
  /** Shown in the placeholder so whoever fills these in knows what to shoot. */
  brief: string;
};

export const photos = {
  /** Behind the homepage headline. Wants the building or the room, wide. */
  heroRoom: {
    src: null,
    alt: "The dining room at Cascarelli's, with the bar along one wall",
    brief: "The room from the door, chandeliers visible, ideally with people in it",
  } satisfies Photo,

  /** The money shot. A whole MacCarelli, overhead, lettuce on. */
  macCarelli: {
    src: null,
    alt: "A whole MacCarelli pizza, topped with shredded lettuce and Thousand Island",
    brief: "Overhead, whole pie, on the counter or a table. Natural light, no flash",
  } satisfies Photo,

  /** The bar wall. Twenty handles in a row is inherently photogenic. */
  taps: {
    src: null,
    alt: "The twenty tap handles behind the bar at Cascarelli's",
    brief: "All twenty handles in one frame, shot straight on",
  } satisfies Photo,

  /** Nuts. Bags, the roaster, or a scoop mid-pour. */
  nuts: {
    src: null,
    alt: "Freshly roasted peanuts and cashews at Cascarelli's",
    brief: "The roaster itself if it is presentable, otherwise bags on the counter",
  } satisfies Photo,

  /** Anything old: a framed photo on the wall, the original sign, Frank. */
  archive: {
    src: null,
    alt: "A historic photograph of Cascarelli's hanging in the dining room",
    brief: "Photograph one of the old framed pictures on the wall, straight on",
  } satisfies Photo,

  /** Merch. The handcrafted mugs are the good one. */
  merch: {
    src: null,
    alt: "Handcrafted Cascarelli's beer mugs for sale at the counter",
    brief: "A few mugs grouped together, shallow depth of field",
  } satisfies Photo,
} as const;

export type PhotoKey = keyof typeof photos;
