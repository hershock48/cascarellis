/**
 * PHOTOS
 *
 * One command per shot: `node tools/ingest-photo.mjs <file> <slug>` rotates
 * it, drops the EXIF (phone photos carry a GPS fix), resizes to 1600px and
 * writes public/photos/<slug>.jpg. Then set `src` below. Entries with
 * src: null render a styled placeholder that names the shot, so the layout
 * never shifts and nothing looks broken while the rest are being collected.
 *
 * `position` is the CSS object-position for the crop. Every plate shot so far
 * is a portrait phone photo taken on the sidewalk, storefront in the top half
 * and the food in the bottom, so the default centre crop would frame the
 * brick sill and lop the plate. Each one says where its subject sits instead.
 *
 * The kitchen shots are Cascarelli's own (August 2026, shot out front of
 * 103 E Main). Dish names on the cards are descriptive; where the menu lists
 * the dish by name, that name is used and should be confirmed with Ryan,
 * same as the rest of the menu.
 */

export type Photo = {
  src: string | null;
  alt: string;
  brief: string;
  /** CSS object-position for the crop. Defaults to centre. */
  position?: string;
};

export const photos = {
  /* ── The kitchen, photographed ─────────────────────────────────────── */

  pizza: {
    src: "/photos/pizza.jpg",
    alt: "A whole chicken and mushroom pizza on a tray, held outside Cascarelli's front door",
    brief: "A whole pizza, overhead or three quarter, natural light",
    position: "50% 86%",
  } satisfies Photo,

  calzone: {
    src: "/photos/calzone.jpg",
    alt: "A golden baked calzone dusted with Parmesan, with a cup of marinara",
    brief: "A calzone, cut open, with the marinara",
    position: "50% 78%",
  } satisfies Photo,

  flatbread: {
    src: "/photos/flatbread.jpg",
    alt: "A flatbread topped with lettuce, diced tomato, Parmesan and a ranch drizzle",
    brief: "A flatbread, three quarter angle",
    position: "50% 80%",
  } satisfies Photo,

  steakAlfredo: {
    src: "/photos/steak-alfredo.jpg",
    alt: "Seared steak over fettuccine alfredo with shaved Parmesan, basil and garlic toast",
    brief: "The steak alfredo, three quarter angle",
    position: "50% 82%",
  } satisfies Photo,

  cheeseBread: {
    src: "/photos/cheese-bread.jpg",
    alt: "Pull-apart cheese bread in garlic butter with a cup of marinara",
    brief: "Annie's Bread, pulled apart so the cheese shows",
    position: "50% 84%",
  } satisfies Photo,

  burger: {
    src: "/photos/burger.jpg",
    alt: "A bacon cheeseburger on a brioche bun with seasoned fries",
    brief: "The burger and fries, three quarter angle",
    position: "50% 84%",
  } satisfies Photo,

  /* ── The room and the bar, still to shoot ──────────────────────────── */

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
