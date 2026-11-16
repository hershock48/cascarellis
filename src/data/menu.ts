/**
 * MENU DATA
 *
 * Transcribed from Cascarelli's own printed menu, the 2026 edition (the
 * two-page proof Kevin brought back in November 2026). Section names, item
 * names, descriptions and prices are theirs, as printed, ampersands and
 * all: the owners like how that menu reads and the site should say the
 * same words the table does. Three kinds of change were made on the way in
 * and nothing else: obvious typesetting slips were fixed ("kickedup",
 * "jalapenos"), prices gained a dollar sign, and the three-size pizza
 * prices carry their sizes in the section note the way the print does.
 *
 * Two devices come across from the print:
 *  - `featured` is the hairline box the print draws around the dishes the
 *    kitchen wants noticed. The page draws the same box. It is not a
 *    "popular" claim and the page does not label it as one.
 *  - `nuts` is the peanut chef, the print's mark for "contains nuts". The
 *    page shows the chef and says the words. Where the print marks a salad
 *    and not its side-salad twin, the twin is marked here too; same bowl.
 *
 * To change a price, change it here. Nothing else on the site holds one,
 * except the nut shop (src/data/shop.ts), which ships and has its own.
 */

import type { PhotoKey } from "@/data/photos";

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  /** A line under the description: an add-on, a sauce choice, a caveat. */
  note?: string;
  /** Contains nuts. The peanut chef on the printed menu. */
  nuts?: boolean;
  /** Boxed on the printed menu. */
  featured?: boolean;
  /** Slot in src/data/photos.ts, for the homepage cards. */
  photo?: PhotoKey;
};

export type MenuOption = { name: string; price?: string; note?: string; nuts?: boolean };

/** A build-your-own list: toppings, dressings, sides, add-ons. */
export type MenuGroup = {
  title: string;
  /** What each option in the group costs, when they share a price. */
  price?: string;
  options: MenuOption[];
};

export type MenuSection = {
  id: string;
  title: string;
  /** One price for the whole section (the specialty pies). */
  price?: string;
  blurb?: string;
  /** The italic line beside the heading on the print: sides, sizes. */
  note?: string;
  items: MenuItem[];
  groups?: MenuGroup[];
  /** Slots in src/data/photos.ts shown above the section on /menu. Slots
      without a file yet are skipped there, not placeholdered. */
  photos?: PhotoKey[];
};

/** Printed beside Handhelds, Gigi Melts and the burgers. */
const SIDES =
  "Served with fresh pasta salad or chips & a pickle. Sub Side Caesar, Side 103 E. Main Salad, Fries, Onion Rings or a Cup of Soup +$4.";

const SIZES = "Small 10″ · Medium 12″ · Large 16″";

/**
 * The "What's good here" block on the homepage: the dishes Cascarelli's
 * chose to photograph. Names are the menu's names for what is on the
 * plate; descriptions are the menu's own words, with one clause saying
 * what the photograph adds.
 */
export const bestSellers: MenuItem[] = [
  {
    name: "Pizza",
    description:
      "House red sauce & mozzarella on a crust made here, built to order the way it has been since 1965. This one is chicken and mushroom.",
    photo: "pizza",
  },
  {
    name: "Build Your Own Alfredo",
    description:
      "Housemade Alfredo sauce served over a bed of fettuccine noodles, topped with Asiago cheese & fresh basil. Shown with steak.",
    photo: "steakAlfredo",
  },
  {
    name: "Annie’s Bread",
    description:
      "Grandma Annie’s stuffed cheese bread topped with garlic butter & Parmesan cheese. Served with house red sauce.",
    photo: "cheeseBread",
  },
];

export const menu: MenuSection[] = [
  {
    id: "specialty-pizza",
    title: "Specialty Pizza",
    price: "Medium 12″ $24 · Large 16″ $31",
    photos: ["pizza"],
    items: [
      {
        name: "Frankie’s Pie",
        description:
          "Our family’s famous meatballs, onions, roasted red peppers, pepperoni, fresh mozzarella & Asiago cheese topped with fresh basil",
        featured: true,
      },
      {
        name: "Portabella Chicken Pie",
        description:
          "Grilled portabellas, chicken breast, onion, fresh spinach, goat cheese, topped with fresh basil",
        note: "Choose your sauce",
      },
      {
        name: "Fifi’s Favorite",
        description:
          "Smoked turkey, crisp bacon, onion, fine ground sausage, cheddar, hot pepper & Asiago cheeses, on top of our kicked-up version of red sauce",
      },
      {
        name: "Baby’s Chicken Pie",
        description:
          "Grilled chicken breast, crisp bacon, fresh red pepper, aged cheddar cheese, oven roasted tomatoes & a sweet honey BBQ sauce",
      },
      {
        name: "The Teja",
        description:
          "Grilled chicken breast, crisp bacon, roasted red peppers, fresh jalapeño peppers, fresh basil & a ranch salsa",
      },
      {
        name: "The Wild Fire",
        description:
          "Mango Habanero sauce, sliced hot cherry peppers, grilled chicken, crisp bacon, red onion, crushed red pepper, mozzarella. Drizzled with spicy ranch",
      },
      {
        name: "The Honey Pie",
        description:
          "Signature pizza sauce, Hot Honey, crisp bacon, tomatoes, fresh roasted garlic, Asiago cheese & fresh mozzarella. Finished with a pesto swirl & a hot honey drizzle",
        featured: true,
        nuts: true,
      },
      {
        name: "Bill & Rogers Favorite",
        description:
          "Start with our house-made alfredo sauce, grilled chicken, crisp bacon, asparagus, roasted red peppers & broccoli topped with mozzarella & Asiago cheese",
      },
      {
        name: "The Grandson",
        description: "Olive oil, crisp bacon, jalapeños, pineapple, goat cheese & onions",
      },
      {
        name: "Mikie’s Favorite",
        description:
          "Chicken breast, fresh red pepper, asparagus tips, fresh broccoli florets, onion, fresh basil, oven roasted tomato & feta cheese",
        note: "Choose your sauce",
      },
      {
        name: "The Homer",
        description:
          "Savory turkey breast, fresh jalapeños, onion, green olives, feta cheese & fresh bleu cheese crumbles",
      },
    ],
  },
  {
    id: "classic-pizza",
    title: "Classic Pizza",
    note: SIZES,
    items: [
      {
        name: "Supreme",
        description:
          "Pepperoni, mushrooms, sausage, ham, green olives, black olives, green pepper, onions & double cheese",
        price: "$16 · $19 · $26",
      },
      {
        name: "House Pizza",
        description: "A classic for over 60 years. Pepperoni, mushroom & sausage",
        price: "$15 · $17 · $22",
      },
      {
        name: "Porky’s Pizza",
        description: "Pepperoni, ham, pork sausage & hickory smoked crisp bacon",
        price: "$16 · $19 · $26",
      },
      {
        name: "Vegetarian",
        description:
          "Mushrooms, green olives, black olives, green pepper, onion & Roma tomato",
        price: "$15 · $17 · $22",
      },
      {
        name: "The Vincenza",
        description: "House red sauce, Roma tomatoes, fresh mozzarella, topped with fresh basil",
        price: "$15 · $17 · $22",
      },
    ],
  },
  {
    id: "build-your-own",
    title: "Build Your Own Pie",
    note: SIZES,
    photos: ["calzone"],
    items: [
      {
        name: "Crust",
        description: "House red sauce & mozzarella cheese included in base price",
        price: "$12 · $15 · $18",
        note: "12″ gluten free $17",
      },
      {
        name: "Personal Pizza 6″",
        description: "Price includes three regular toppings",
        price: "$10",
      },
      {
        name: "Build Your Own Calzone",
        description:
          "Mozzarella cheese & choice of 3 pizza toppings, baked to perfection",
        price: "$18",
        note: "More than 3 toppings use the 10″ price",
      },
    ],
    groups: [
      {
        title: "Sauce",
        price: "10″ $1 · 12″ $2.50 · 16″ $3.50",
        options: [
          { name: "Olive Oil" },
          { name: "BBQ" },
          { name: "Salsa" },
          { name: "Original Ranch" },
          { name: "Pesto", nuts: true },
        ],
      },
      {
        title: "Veggies",
        price: "10″ $1.50 · 12″ $2 · 16″ $3",
        options: [
          { name: "Fresh Spinach" },
          { name: "Mushrooms" },
          { name: "Green Pepper" },
          { name: "Red Pepper" },
          { name: "Pineapple" },
          { name: "Dill Pickles" },
          { name: "Red Onions" },
          { name: "Broccoli" },
          { name: "Roma Tomatoes" },
          { name: "Fresh Roasted Garlic" },
          { name: "Artichoke Hearts" },
          { name: "Caramelized Onion" },
          { name: "Green Olives" },
          { name: "Fresh Jalapeño" },
          { name: "Black Olives" },
        ],
      },
      {
        title: "Premium Cheese",
        price: "10″ $1 · 12″ $2 · 16″ $3",
        options: [
          { name: "Asiago" },
          { name: "Feta" },
          { name: "Goat Cheese" },
          { name: "Sharp Cheddar" },
          { name: "PepperJack Cheese" },
          { name: "Fresh Mozzarella" },
        ],
      },
      {
        title: "Protein",
        price: "10″ $2 · 12″ $3 · 16″ $4",
        options: [
          { name: "Pepperoni" },
          { name: "Sausage" },
          { name: "Ham" },
          { name: "Anchovy" },
          { name: "Bacon" },
          { name: "Turkey" },
          { name: "Housemade Meatballs" },
          { name: "Grilled Chicken" },
          { name: "Pulled Pork" },
        ],
      },
    ],
  },
  {
    id: "flatbreads",
    title: "Flatbreads",
    photos: ["flatbread"],
    items: [
      {
        name: "Chicken Caprese",
        description:
          "Housemade pesto with grilled chicken, tomato, red onion with mozzarella & Asiago cheese. Topped with fresh basil & balsamic drizzle",
        price: "$17",
        featured: true,
        nuts: true,
      },
      {
        name: "Southwest Chicken",
        description:
          "Grilled chicken, chipotle ranch, grilled southwest veggies, jalapeños, mozzarella cheese & topped with a chipotle ranch drizzle",
        price: "$17",
      },
      {
        name: "Chicken Bacon Ranch",
        description:
          "House-made ranch, grilled chicken, crisp bacon, jalapeños, mozzarella & cheddar cheese. Topped with diced Roma tomatoes & a ranch drizzle",
        price: "$17",
      },
      {
        name: "Dill-icious Pig",
        description:
          "BBQ sauce, pulled pork, red onion, fresh jalapeños, crisp dill pickles with mozzarella & cheddar cheese",
        price: "$17",
      },
      {
        name: "BLT",
        description:
          "Bacon, mayonnaise, mozzarella cheese, topped with chopped romaine & diced tomatoes",
        price: "$17",
      },
      {
        name: "Build Your Own Flatbread",
        description: "See the build your own pizza section for toppings",
        price: "$14",
        note: "All toppings are the 10″ price",
      },
    ],
  },
  {
    id: "shareables",
    title: "Shareables",
    photos: ["cheeseBread"],
    items: [
      {
        name: "Annie’s Bread",
        description:
          "Grandma Annie’s stuffed cheese bread topped with garlic butter & Parmesan cheese. Served with house red sauce",
        price: "$11",
      },
      {
        name: "Wings",
        description:
          "A full pound of seasoned & lightly battered wings & drummies tossed in your favorite sauce. Choose from house-made buffalo, BBQ, Mango Habanero, Garlic Parmesan",
        price: "$14",
        featured: true,
      },
      {
        name: "Baked Bread",
        description:
          "Baked European style bread, side of housemade basil pesto, diced tomatoes, grilled Hungarian peppers & our pub style cheese. Drizzled with olive oil & balsamic glaze",
        price: "$15",
        nuts: true,
      },
      {
        name: "Bruschetta",
        description:
          "Served with basil pesto spread, smoked turkey, grilled Hungarian peppers & mozzarella topped with Parmesan, balsamic drizzle & fresh basil",
        price: "$15",
        featured: true,
        nuts: true,
      },
      {
        name: "Spinach Artichoke Dip",
        description: "Housemade & served with toasted pita bread & tortilla chips",
        price: "$15",
      },
      {
        name: "Caprese Salad",
        description:
          "Fresh mozzarella & Roma tomatoes topped with Asiago & Parmesan cheese, drizzled with extra virgin olive oil & balsamic glaze",
        price: "$14",
      },
      {
        name: "Family Size Soft Baked Pretzel",
        description:
          "Served with housemade mustard, our signature jalapeño pepper dip & a cheddar cheese sauce",
        price: "$15",
      },
      {
        name: "Loaded Chili Cheese Fries",
        description:
          "Signature fries, housemade chili, sharp cheddar cheese, sour cream, bacon, red onion & jalapeños",
        price: "$15",
      },
      { name: "French Fry Platter", price: "$8" },
      { name: "Basket of Onion Rings", price: "$8" },
    ],
  },
  {
    id: "soup-chili",
    title: "Soup & Chili",
    blurb: "Made fresh daily in house.",
    items: [
      { name: "Bowl", price: "$7" },
      { name: "Cup", price: "$5" },
      { name: "With focaccia bread", price: "+$3" },
    ],
  },
  {
    id: "greens",
    title: "Main Street Greens",
    blurb:
      "All of our salads are served on a bed of crisp romaine & fresh mixed greens, except the Green Machine.",
    note: "To maintain portion quality & presentation, we respectfully decline requests to split salads.",
    items: [
      {
        name: "Flat Iron Steak Salad",
        description:
          "Fresh cut flat iron steak with a pairing of button mushrooms with asparagus, Asiago & Parmesan cheeses, served with our house made bleu cheese vinaigrette",
        price: "$24",
        featured: true,
      },
      {
        name: "Cascarelli Cobb Salad",
        description:
          "Crisp bacon, onion, fresh tomatoes, avocado, roasted cashews, egg & grilled smoked turkey topped with Asiago & Parmesan cheese",
        price: "$21",
        nuts: true,
      },
      {
        name: "Traverse Cherry Salad Jubilee",
        description:
          "Grilled chicken, dried Michigan cherries, fresh strawberries, roasted cashews, feta, Asiago & Parmesan cheeses, served with blueberry pomegranate vinaigrette",
        price: "$21",
        nuts: true,
      },
      {
        name: "Gobbler Salad",
        description:
          "Grilled smoked turkey, onion, green olives, fresh tomatoes, Asiago & Parmesan cheeses & topped with fresh roasted redskin peanuts",
        price: "$19",
        nuts: true,
      },
      {
        name: "Cascarelli’s Southwest Salad",
        description:
          "Roasted southwest veggies, crumbled tortilla chips, Asiago & cheddar cheeses, topped with grilled chicken & avocado, served with Chipotle Ranch dressing",
        price: "$21",
      },
      {
        name: "103 E. Main Salad",
        description:
          "A Cascarelli’s tradition. Fresh tomato, onion, egg, fresh mushrooms, green pepper, green & black olives, topped with Asiago & Parmesan cheeses & roasted redskin peanuts",
        price: "$15",
        note: "With chicken +$4",
        featured: true,
        nuts: true,
      },
      {
        name: "Caesar Salad",
        description:
          "Traditional Caesar salad served with house-made croutons, Asiago & Parmesan cheese",
        price: "$14",
        note: "Chicken +$4 · Salmon +$10 · Steak +$11",
      },
      {
        name: "Green Machine",
        description:
          "Fresh spinach, grilled chicken, crisp bacon, grilled & marinated tomatoes, caramelized onions & house shredded mozzarella",
        price: "$20",
        featured: true,
      },
      {
        name: "Doc’s Sriracha Salmon Salad",
        description: "Grilled salmon, steamed broccoli, grilled onion, red pepper & citrus",
        price: "$24",
      },
    ],
    groups: [
      {
        title: "Side Salads",
        options: [
          { name: "Side Caesar", price: "$8", note: "With chicken +$3" },
          { name: "Side 103 E. Main", price: "$10", note: "With chicken +$3", nuts: true },
          { name: "Side Cherry", price: "$13", nuts: true },
          { name: "Side Gobbler", price: "$13", nuts: true },
          { name: "Side Cascarelli’s Southwest", price: "$13" },
          { name: "Side Cobb", price: "$13", nuts: true },
        ],
      },
      {
        title: "Dressings",
        options: [
          { name: "Caesar" },
          { name: "Ranch" },
          { name: "Chipotle Ranch" },
          { name: "Bleu Cheese" },
          { name: "Italian" },
          { name: "1000 Island" },
          { name: "Honey Mustard" },
          { name: "Extra Virgin Olive Oil" },
          { name: "Vermont Honey French" },
          { name: "Balsamic Vinaigrette" },
          { name: "Raspberry Vinaigrette" },
          { name: "Bleu Cheese Vinaigrette" },
          { name: "Blueberry Pomegranate Vinaigrette" },
        ],
      },
    ],
  },
  {
    id: "handhelds",
    title: "Handhelds",
    note: SIDES,
    items: [
      {
        name: "Chicken Club",
        description:
          "Grilled or crispy chicken, melted sharp cheddar & chipotle jack cheese, crisp bacon, lettuce, fresh tomatoes & mayo on a toasted brioche bun",
        price: "$18",
      },
      {
        name: "Frank’s Italian",
        description:
          "A Classic! Grilled salami, pepperoni, mortadella, capicola, mild pepper rings, mozzarella topped with lettuce & golden Italian dressing on a grilled baguette",
        price: "$18",
        featured: true,
      },
      {
        name: "Casco’s Cheesesteak",
        description:
          "Shaved & seasoned grilled ribeye, cheddar cheese sauce, grilled onions & mild banana peppers with A1 steak sauce on a toasted baguette",
        price: "$19",
      },
      {
        name: "The Big B",
        description:
          "Grilled chicken, sliced ham, melted Swiss cheese topped with our housemade bleu cheese dressing. Served on a toasted baguette",
        price: "$19",
      },
      {
        name: "Southwest Chicken Wrap",
        description:
          "Grilled or crispy chicken, sharp cheddar cheese, southwest vegetable blend, avocado, romaine & housemade chipotle ranch dressing in a grilled tortilla",
        price: "$18",
      },
      {
        name: "Flat Iron Sandwich",
        description:
          "Fresh cut flat iron steak, grilled red peppers, grilled portabella mushrooms, bleu cheese crumbles, aged Washington cheddar cheese topped with a balsamic reduction on a grilled baguette",
        price: "$22",
      },
      {
        name: "Turkey Reuben",
        description:
          "Grilled smoked turkey, house-made coleslaw, Swiss cheese & Thousand Island dressing on French bread",
        price: "$18",
      },
      {
        name: "Makin’ Bacon BLT",
        description:
          "Crisp bacon on toasted French bread with avocado, mayo, lettuce & heirloom tomatoes",
        price: "$18",
      },
      {
        name: "Chicken Parmesan Sandwich",
        description:
          "Crispy chicken, our famous red sauce, melted mozzarella cheese, Parmesan & topped with fresh basil. Served on a grilled baguette",
        price: "$18",
        featured: true,
      },
      {
        name: "Turkey Quattro",
        description:
          "Grilled smoked turkey, fresh mozzarella, Asiago, Parmesan & aged Washington cheddar topped with fresh basil & tomato. Served on grilled French bread",
        price: "$17",
      },
      {
        name: "Turkey Club",
        description:
          "Grilled smoked turkey on a toasted baguette with crisp bacon, romaine lettuce, tomato, Swiss & mayo",
        price: "$18",
      },
    ],
  },
  {
    id: "gigi-melts",
    title: "Gigi Melts",
    note: SIDES,
    items: [
      { name: "Classic Grilled Cheese", price: "$13" },
      {
        name: "Supreme Grilled Cheese",
        description:
          "Mozzarella, cheddar, Asiago, crisp bacon, caramelized onions, ham, sauteed mushrooms, green olives, Roma tomatoes",
        price: "$16",
      },
      {
        name: "Jalapeño Popper Grilled Cheese",
        description:
          "Melted sharp cheddar, mozzarella, housemade jalapeño popper spread, crisp bacon & fresh jalapeños",
        price: "$16",
        featured: true,
      },
      {
        name: "The Mama Mia",
        description:
          "Melted mozzarella, Parmesan cheese, pizza sauce & your choice of 3 pizza toppings",
        price: "$16",
      },
      {
        name: "Don’t Go Bacon My Heart",
        description:
          "Melted mozzarella & sharp cheddar cheese, crisp bacon, fresh sliced avocado & tomato",
        price: "$16",
      },
    ],
  },
  {
    id: "burgers",
    title: "Half Pound Burgers",
    blurb: "Sourced locally from Bowser Family Farms, Homer, MI.",
    note: SIDES,
    photos: ["burger"],
    items: [
      {
        name: "Big T Burger",
        description: "Onion, Roma tomato, fresh jalapeño, crisp bacon, Swiss & bleu cheese",
        price: "$19",
        featured: true,
      },
      {
        name: "Bobby’s Pizza Burger",
        description: "Grilled mushrooms, pepperoni, marinara sauce & mozzarella cheese",
        price: "$18",
      },
      {
        name: "The Jackrabbit Slim",
        description:
          "Two fresh ¼ pound patties, grilled ham, sauteed red onion, melted chipotle jack cheese & topped with housemade horsey sauce",
        price: "$19",
        featured: true,
      },
      {
        name: "Classic Olive Burger",
        description: "Green olives, dill mayo, feta cheese, Roma tomatoes & Swiss cheese",
        price: "$17",
      },
      {
        name: "THB",
        description:
          "Bacon, onion ring, melted cheddar cheese, pulled pork, pickles & housemade BBQ sauce",
        price: "$19",
      },
      {
        name: "Patty Melt",
        description: "Caramelized onion & Swiss cheese. Served on French bread",
        price: "$17",
      },
      { name: "Build Your Own Burger", price: "$15" },
    ],
    groups: [
      {
        title: "Toppers",
        price: "$2 each",
        options: [
          { name: "Fried Egg" },
          { name: "Bacon" },
          { name: "Jalapeños" },
          { name: "Grilled Hungarian Peppers" },
          { name: "Housemade Peanut Butter", nuts: true },
          { name: "Grilled Onion Ring" },
          { name: "Grilled Mushrooms" },
        ],
      },
      {
        title: "Cheese",
        price: "$1 each",
        options: [
          { name: "Mozzarella" },
          { name: "Swiss" },
          { name: "Pepper Jack" },
          { name: "Cheddar" },
          { name: "Bleu Cheese Crumbles" },
        ],
      },
    ],
  },
  {
    id: "family-tree",
    title: "Family Tree",
    note: "All Family Tree entrees are served with toasty garlic bread & side caesar salad.",
    photos: ["steakAlfredo"],
    items: [
      {
        name: "Ma DiBiasi’s Lasagna",
        description:
          "3 layers of deliciousness, whipped ricotta, Parmesan, mozzarella, Asiago & our traditional family sauce. Accompanied with a side caesar",
        price: "$21",
      },
      {
        name: "Spaghetti & Meatballs",
        description:
          "Our family’s famous red sauce served over spaghetti noodles topped with melted mozzarella, Parmesan, fresh basil & topped with housemade baked meatballs",
        price: "$23",
      },
      {
        name: "Chicken Caprese Pasta",
        description:
          "Cavatappi pasta noodles, housemade pesto, grilled chicken, Asiago, Parmesan & fresh basil. Finished with diced tomatoes & drizzled with balsamic glaze",
        price: "$24",
        nuts: true,
      },
      {
        name: "Build Your Own Alfredo",
        description:
          "Housemade Alfredo sauce served over a bed of fettuccine noodles. Topped with Asiago cheese & fresh basil",
        price: "$16",
      },
      {
        name: "Baked Balls",
        description:
          "Housemade meatballs, melted mozzarella, Asiago & Parmesan cheese, baked in our family recipe red sauce, topped with fresh basil with toasty bread for dipping",
        price: "$17",
        featured: true,
      },
    ],
    groups: [
      {
        title: "Alfredo Proteins",
        options: [
          { name: "Chicken", price: "+$6" },
          { name: "Salmon", price: "+$12" },
          { name: "Steak", price: "+$13" },
        ],
      },
      {
        title: "Alfredo Veggies",
        options: [
          { name: "Grilled Asparagus Spears", price: "+$4" },
          { name: "Grilled Button Mushrooms", price: "+$3" },
          { name: "Steamed Broccoli", price: "+$3" },
          { name: "Blistered Cherry Tomatoes", price: "+$3" },
          { name: "Roasted Red Peppers", price: "+$3" },
        ],
      },
    ],
  },
  {
    id: "minis-seniors",
    title: "Minis & Seniors",
    note: "Under 12 & over 65.",
    items: [
      { name: "Fettuccine Alfredo", price: "$11", note: "With grilled chicken +$3" },
      { name: "6″ Pizza", price: "$10" },
      { name: "Chicken Tenders", price: "$11", note: "With fries +$3" },
      { name: "Spaghetti", price: "$10", note: "With 1 meatball +$3" },
      { name: "Mac & Cheese", description: "With garlic toast", price: "$10" },
      { name: "Grilled Cheese", price: "$9", note: "With fries +$3" },
    ],
  },
  {
    /* No chef on these rows: he marks dishes where nuts are a surprise. */
    id: "nuts",
    title: "The Nuts",
    blurb:
      "Fresh roasted daily using a method unchanged by the Cascarelli family for over 90 years.",
    note: "¼ lb · ½ lb · 1 lb",
    items: [
      { name: "Peanuts", price: "$4 · $7 · $9" },
      { name: "Macadamias", price: "$6 · $10 · $20" },
      { name: "Maple Glazed Pecans", price: "$6 · $10 · $18" },
      { name: "Cashews", price: "$5 · $9 · $16" },
      { name: "Sriracha Honey Roasted Cashews", price: "$6 · $10 · $17" },
      {
        name: "Cinnamon Sugar Cashews",
        price: "$6 · $10 · $17",
        note: "Does contain egg whites",
      },
      {
        name: "Nut Flight",
        description: "Select your favorite 3 to build your perfect nut flight",
        price: "$12",
      },
    ],
  },
];

/** Printed at the foot of the menu. */
export const menuNotes = {
  nuts: "Signifies contains nuts",
  parmesan:
    "We garnish most plates with fresh grated Parmesan cheese. Available without upon request.",
  advisory:
    "Ask your server about menu items that are cooked to order or served raw. Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness.",
};

/** The homepage's words about the nuts. The list beside them is read from
    the shop (src/data/shop.ts), so a name or a price is never typed twice.
    In-house prices by the quarter, half and pound are in the menu above. */
export const nuts = {
  heading: "World famous specialty nuts",
  blurb:
    "Fresh roasted daily using a method unchanged by the Cascarelli family for over 90 years. Sold at the counter since the 1960s, and they travel well.",
};

/** The full bar menus live in bar.ts; this is the homepage summary.
    The wall, as Ryan describes it (November 2026): every handle pours
    Michigan, with one exception that is not negotiable, PBR. One of the
    twenty is a craft soda and one is a cider. No brewery count is printed
    because the handles rotate; the rule does not. */
export const drinks = {
  drafts: {
    heading: "Every handle pours Michigan. Except the PBR.",
    blurb:
      "Twenty taps. Michigan beer on all of them but one, with a craft soda and a cider among the handles. The list rotates constantly, so ask what is pouring. Draft beer and wine are available to go.",
  },
  toGo: "Pick up draft beer or wine to go on your way out.",
};
