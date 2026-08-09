/**
 * MENU DATA
 *
 * Every item below was confirmed from Cascarelli's own site, their social
 * accounts, or customer reviews. Prices were not published anywhere public,
 * so `price` is left off. Add a price string (e.g. price: "14") to any item
 * and it renders automatically in the right-hand column.
 *
 * To add items, just push new objects into the relevant section.
 */

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  tags?: string[];
};

export type MenuSection = {
  id: string;
  title: string;
  blurb?: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    id: "starters",
    title: "Starters",
    items: [
      {
        name: "Artichoke Dip",
        description: "Baked hot and served with warm pita bread.",
      },
      {
        name: "Baked Bread",
        description: "Pulled from the same oven as the pizza.",
      },
      {
        name: "Soup of the Day",
        description: "Made in house. Ask what is on today.",
      },
    ],
  },
  {
    id: "pizza",
    title: "Pizza",
    blurb:
      "Cascarelli's has been making pizza since February 1965, when Bob Cascarelli added it to a tavern menu that was already thirty years old.",
    items: [
      {
        name: "Porky's Meat Lovers Dream",
        description:
          "The one people drive in for. Loaded end to end, no restraint.",
      },
      {
        name: "Pepperoni",
        description: "Done properly. Cupped edges, a little char.",
      },
      {
        name: "Chicken Alfredo Flatbread",
        description: "Alfredo base, grilled chicken, thin and crisp.",
      },
      {
        name: "Build Your Own",
        description:
          "Start with cheese and take it wherever you want. Ask about the gluten free crust.",
        tags: ["GF crust available"],
      },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    items: [
      {
        name: "Chicken Alfredo",
        description: "Cream sauce, grilled chicken, served with bread.",
      },
      {
        name: "Lasagna",
        description: "Layered and baked to order.",
      },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches and Burgers",
    items: [
      {
        name: "Turkey Club",
        description: "Stacked triple decker with bacon.",
      },
      {
        name: "Subs",
        description: "Hot and cold, built on fresh rolls.",
      },
      {
        name: "Burgers",
        description: "Hand pattied, cooked on the flat top.",
      },
    ],
  },
  {
    id: "greens",
    title: "Salads",
    blurb: "Vegetarian options across the board. Ask and they will work with you.",
    items: [
      {
        name: "House Salad",
        description: "Mixed greens with house dressings.",
        tags: ["Vegetarian"],
      },
    ],
  },
  {
    id: "nuts",
    title: "Roasted Nuts",
    blurb:
      "Roasted on site. The family has been doing this since 1897, which makes it older than the restaurant.",
    items: [
      { name: "Roasted Peanuts", description: "The original, still the best seller." },
      { name: "Cashews", description: "Roasted in small batches." },
      { name: "Macadamia Nuts", description: "Added later, gone quickly." },
    ],
  },
];

export const drafts = {
  count: 20,
  michiganCount: 19,
  note:
    "Twenty lines. Nineteen of them pour Michigan and regional craft. The only national brand on the wall is Pabst Blue Ribbon, and that is on purpose.",
};

export const wine = {
  note:
    "Red, white, rosé and sparkling. The wine list changes several times a year, so ask what just came in.",
  categories: ["Red", "White", "Rosé", "Sparkling"],
};
