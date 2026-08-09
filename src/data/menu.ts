/**
 * MENU DATA
 *
 * Item names and descriptions were reconstructed from Cascarelli's own pages,
 * their Facebook, and what customers describe in reviews. Ryan needs to
 * confirm spellings and fill in prices before this goes live.
 *
 * Add a price string (e.g. price: "18") to any item and it renders in the
 * right hand column automatically.
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

/** The one that gets its own section on the homepage. */
export const hero = {
  name: "The MacCarelli",
  line: "It is a Big Mac. On a pizza. We are not sorry.",
  description:
    "Thousand Island instead of red sauce. Seasoned ground beef, onion, dill pickle relish, mozzarella and cheddar. It comes out of the oven, then the shredded lettuce and the drizzle go on.",
  proof: "People drive in from twenty five miles out for this. Some of them order two.",
};

export const menu: MenuSection[] = [
  {
    id: "pizza",
    title: "Pizza",
    blurb:
      "Bob Cascarelli put pizza on a tavern menu in February 1965. The tavern was already thirty years old. Nothing has been the same since.",
    items: [
      {
        name: "The MacCarelli",
        description:
          "Thousand Island for sauce, seasoned ground beef, onion, dill pickle relish, mozzarella and cheddar. Shredded lettuce and a drizzle go on after it comes out.",
        tags: ["The one you heard about"],
      },
      {
        name: "Porky's Meat Lovers Dream",
        description:
          "Every pig product we could justify putting on one crust, and then one more.",
      },
      {
        name: "Baby's Chicken Pie",
        description:
          "Named after somebody's grandmother. Chicken, and it is better than it sounds.",
      },
      {
        name: "Pepperoni",
        description:
          "For the people who drove forty minutes and want exactly what they came for.",
      },
      {
        name: "Veggie",
        description: "It exists, it is good, and nobody is going to give you a hard time.",
        tags: ["Vegetarian"],
      },
      {
        name: "Build Your Own",
        description:
          "Start with cheese and go from there. Ask about the gluten free crust. Ask for light cheese if you are one of those people.",
        tags: ["GF crust available"],
      },
    ],
  },
  {
    id: "starters",
    title: "To Start",
    blurb: "Order these first. You are going to be here a while.",
    items: [
      {
        name: "Annie's Bread",
        description:
          "Hard crust, cheese inside, gone in four minutes. Do not plan on sharing.",
      },
      {
        name: "Artichoke Dip",
        description: "Baked hot, served with warm pita. A table order, not a personal one.",
      },
      {
        name: "Chicken Noodle Soup",
        description: "Noodles made here. This is not a garnish, it is a real bowl of soup.",
      },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    blurb:
      "Yes, really. Somebody in your group is going to want one and these are not an afterthought.",
    items: [
      {
        name: "Flat Iron Salad",
        description:
          "Flat iron steak, mushrooms, grilled asparagus, blue cheese vinaigrette. Orders as a meal.",
      },
      {
        name: "Autumn Harvest Salad",
        description:
          "Romaine and mixed greens, grilled chicken, Asiago, feta, dried cherries and apples. Balsamic or blueberry pomegranate.",
      },
      {
        name: "House Salad",
        description: "The straightforward one. Add chicken and call it dinner.",
        tags: ["Vegetarian"],
      },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches and Pasta",
    items: [
      {
        name: "Meatball Sandwich",
        description: "The reason some people never look at the pizza menu.",
      },
      {
        name: "Turkey Club",
        description: "Triple decker, bacon, cut into quarters like it should be.",
      },
      {
        name: "Spaghetti and Meatballs",
        description: "No reinvention. It has been on the menu longer than most of us.",
      },
      {
        name: "Chicken Alfredo",
        description: "Cream sauce, grilled chicken, bread on the side to finish the plate.",
      },
      {
        name: "Lasagna",
        description: "Layered and baked to order, which is part of why it takes a minute.",
      },
      {
        name: "Burgers and Subs",
        description: "Hand pattied on the flat top, subs built hot or cold.",
      },
    ],
  },
  {
    id: "nuts",
    title: "Ryan's Nuts",
    blurb:
      "Roasted here. The family has been doing this since 1897, which makes the nuts older than the restaurant by thirty eight years.",
    items: [
      { name: "Roasted Peanuts", description: "The original. Bags go out the door all day." },
      { name: "Cashews", description: "Small batches, salted while they are still warm." },
      {
        name: "Macadamias",
        description: "The expensive ones. They are usually gone by Saturday night.",
      },
    ],
  },
];

export const drafts = {
  count: 20,
  michiganCount: 19,
  note:
    "Nineteen of the twenty pour Michigan and regional craft. The twentieth is Pabst, and that stays.",
};

export const wine = {
  note:
    "Red, white, rosé and sparkling. The list changes a few times a year, so ask what came in.",
  categories: ["Red", "White", "Rosé", "Sparkling"],
};

export const cocktails = {
  note:
    "The Bloody Mary has a following. Seasonal drinks rotate, and they lean sweet on purpose. Caramel Apple and the Salted Caramel White Russian both show up when it gets cold.",
  named: ["Bloody Mary", "Caramel Apple", "Salted Caramel White Russian"],
};

export const merch = {
  note:
    "Handcrafted beer mugs, coffee mugs, insulated tumblers, hats and shirts. Sold at the counter.",
  items: [
    { name: "Handcrafted beer mug", price: "$45" },
    { name: "Coffee mug", price: "$38" },
    { name: "Insulated tumbler", price: "Ask" },
    { name: "Hats and shirts", price: "Ask" },
  ],
};
