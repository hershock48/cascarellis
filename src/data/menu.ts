/**
 * MENU DATA
 *
 * Sourced from Cascarelli's current site (cascarellis.com), their Facebook,
 * and customer reviews. Their site runs a Weekday menu and a Weekend menu,
 * which is reflected in the `menus` structure below.
 *
 * Prices are not published anywhere public. Add a `price` to any item and it
 * renders in the right hand column automatically.
 */

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  tags?: string[];
  /** Shows a "Popular" marker. Trend research: answers "what's good here?" fast. */
  popular?: boolean;
};

export type MenuSection = { id: string; title: string; blurb?: string; items: MenuItem[] };

/** The best sellers block on the homepage. */
export const bestSellers: MenuItem[] = [
  {
    name: "The MacCarelli",
    description:
      "Our take on a classic burger, on a pizza. Thousand Island, seasoned beef, onion, dill pickle relish, mozzarella and cheddar, finished with shredded lettuce.",
    popular: true,
  },
  {
    name: "Porky's Meat Lovers Dream",
    description:
      "Pepperoni, sausage, bacon and ham. The one to order when nobody at the table wants to compromise.",
    popular: true,
  },
  {
    name: "Flat Iron Salad",
    description:
      "Flat iron steak, mushrooms, grilled asparagus and blue cheese vinaigrette over fresh greens.",
    popular: true,
  },
];

export const menus = {
  weekday: {
    id: "weekday",
    label: "Weekday Menu",
    note: "Served Monday through Thursday.",
  },
  weekend: {
    id: "weekend",
    label: "Weekend Menu",
    note: "Friday and Saturday, with a few additions from the kitchen.",
  },
} as const;

export const menu: MenuSection[] = [
  {
    id: "pizza",
    title: "Pizza",
    blurb:
      "Homemade and built to order, the way we have made them since 1965. Gluten free crust available.",
    items: [
      {
        name: "The MacCarelli",
        description:
          "Thousand Island, seasoned beef, onion, dill pickle relish, mozzarella and cheddar, finished with shredded lettuce.",
        popular: true,
      },
      {
        name: "Porky's Meat Lovers Dream",
        description: "Pepperoni, sausage, bacon and ham.",
        popular: true,
      },
      {
        name: "Baby's Chicken Pie",
        description: "Grilled chicken, cheese and our house sauce.",
      },
      {
        name: "Chicken Alfredo Flatbread",
        description: "Alfredo base, grilled chicken, thin and crisp.",
      },
      { name: "Pepperoni", description: "The classic, done right." },
      {
        name: "Veggie",
        description: "Fresh vegetables over our house sauce and mozzarella.",
        tags: ["Vegetarian"],
      },
      {
        name: "Build Your Own",
        description: "Start with cheese and add whatever you like.",
        tags: ["Gluten free crust available"],
      },
    ],
  },
  {
    id: "starters",
    title: "Starters and Soups",
    items: [
      { name: "Annie's Bread", description: "Baked fresh, with cheese inside." },
      { name: "Artichoke Dip", description: "Baked hot and served with warm pita." },
      {
        name: "Chicken Noodle Soup",
        description: "Homemade noodles, made in our kitchen.",
        popular: true,
      },
      { name: "Soup of the Day", description: "Ask your server what is on today." },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    blurb: "Fresh, locally sourced greens. Add grilled chicken to any salad.",
    items: [
      {
        name: "Flat Iron Salad",
        description:
          "Flat iron steak, mushrooms, grilled asparagus and blue cheese vinaigrette.",
        popular: true,
      },
      {
        name: "Autumn Harvest Salad",
        description:
          "Romaine and mixed greens, grilled chicken, Asiago, feta, dried cherries and apples, with balsamic or blueberry pomegranate.",
      },
      {
        name: "House Salad",
        description: "Mixed greens with your choice of house dressing.",
        tags: ["Vegetarian"],
      },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches and Burgers",
    items: [
      { name: "Meatball Sandwich", description: "House meatballs, sauce and melted cheese." },
      { name: "Turkey Club", description: "Triple decker with bacon, lettuce and tomato." },
      { name: "Burgers", description: "Hand pattied and cooked on the flat top." },
      { name: "Subs", description: "Hot or cold, built on fresh rolls." },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    items: [
      { name: "Spaghetti and Meatballs", description: "House sauce and meatballs, with bread." },
      { name: "Chicken Alfredo", description: "Cream sauce and grilled chicken." },
      { name: "Lasagna", description: "Layered and baked to order." },
    ],
  },
  {
    id: "sweets",
    title: "Sweet Treats",
    blurb: "Homemade truffles and a proper float to finish.",
    items: [
      {
        name: "Root Beer Float",
        description:
          "Two scoops of rich vanilla ice cream in a chilled mug of delicious Michigan made craft root beer.",
        price: "$7",
        popular: true,
      },
      {
        name: "Truffle Plate",
        description:
          "Your choice of any four homemade truffles, topped with Ghirardelli chocolate and Ghirardelli white chocolate syrups.",
        price: "$8.50",
      },
      {
        name: "Individual Truffle",
        description:
          "Eight rich and decadent homemade varieties: Oreo, Chocolate Marshmallow, Mint Chocolate, Lemon, Toffee Crunch, Birthday Cake, Java Chip and Peanut Butter.",
        price: "$2.25",
      },
    ],
  },
];

/** Straight from their Food page. */
export const nuts = {
  heading: "World famous specialty nuts",
  blurb:
    "We have been in the nut business since the 1960s, and the roasting goes back further than that. Sold at the counter, and they travel well.",
  flavors: [
    { name: "Red Skin Peanuts", note: "The original." },
    { name: "Brazilian Cashews", note: "Roasted in small batches." },
    { name: "Macadamia Nuts", note: "Rich and buttery." },
    { name: "Sriracha and Honey Cashews", note: "Sweet first, heat after." },
    { name: "Cinnamon and Sugar Cashews", note: "A holiday favorite." },
    { name: "Maple Glazed Pecans", note: "Michigan maple." },
  ],
};

/** The full bar menus live in bar.ts; this is the homepage summary.
    "Most of them" rather than a number: the tap list rotates, and the
    audited snapshot in bar.ts had 17-18 Michigan pours of 20, so any exact
    count printed here goes false the week a tap changes. */
export const drinks = {
  drafts: {
    heading: "20 beers on draft, and most of them are from Michigan",
    blurb:
      "The list rotates constantly, so ask what is pouring. Draft beer and wine are available to go.",
  },
  toGo: "Pick up draft beer or wine to go on your way out.",
};

export const merch = {
  heading: "Take something home",
  blurb: "Handcrafted beer mugs, coffee mugs, insulated tumblers, hats and shirts, at the counter.",
};
