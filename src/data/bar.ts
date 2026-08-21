/**
 * BAR DATA
 *
 * Transcribed from photos of the printed in-house menus (August 2026): the
 * clipboard drink menu, the Imperial Beverage wine list, and the tap list.
 * The tap list rotates constantly, so treat it as a snapshot, not gospel.
 * Prices are as printed. Update here and every page renders the change.
 */

export type Tap = { name: string; brewery: string; abv?: string; local?: boolean };

/** `local` marks the hometown pour, brewed in Homer. */
export const tapList: Tap[] = [
  { name: "M-43 Orange Cream", brewery: "Old Nation Brewery", abv: "6.8%" },
  { name: "Bell's Flyover Lager", brewery: "Bell's Brewery", abv: "4.5%" },
  { name: "Tulip Time Ale", brewery: "Big Lake Brewery", abv: "4.2%" },
  { name: "Salted Caramel Porter", brewery: "Pigeon Hill Brewing Co.", abv: "6%" },
  { name: "Rubaeus on Nitro", brewery: "Founders Brewing", abv: "5.7%" },
  { name: "Wild Bill's Non-Alc Root Beer", brewery: "Wild Bill's Craft Beverage Co." },
  { name: "Short's Soft Parade Shandy", brewery: "Short's Brewing", abv: "3.2%" },
  { name: "Strawberry Blonde Ale", brewery: "Arbor Brewing Co.", abv: "6.8%" },
  { name: "Pineapple IPA", brewery: "Three Blondes Brewing", abv: "7.5%" },
  { name: "Pabst Blue Ribbon", brewery: "Pabst Brewing" },
  { name: "Razzmanien Devil", brewery: "Two Bandits Brewing", abv: "4.7%" },
  { name: "Bell's Oberon", brewery: "Bell's Brewery", abv: "5.8%" },
  { name: "Wake & Lake Pilsner", brewery: "Three Blondes Brewing", abv: "5.5%" },
  { name: "Bell's Two Hearted", brewery: "Bell's Brewery", abv: "7.0%" },
  { name: "Millions of Peaches", brewery: "Odd Brothers Craft Cider", abv: "6.5%", local: true },
  { name: "English Drizzle", brewery: "Ramshackle Brewing", abv: "7.1%" },
  { name: "Bell's Amber", brewery: "Bell's Brewery", abv: "5.8%" },
  { name: "Dirty Blonde", brewery: "Atwater Brewing" },
  { name: "Vanilla Java Porter", brewery: "Atwater Brewing", abv: "5.0%" },
  { name: "All Day IPA", brewery: "Founders Brewing", abv: "4.7%" },
];

export const tapNotes = {
  flights: "Beer flights available. Choose any four of your favorites.",
  rotation:
    "The lineup turns over constantly, so ask whoever is behind the bar what just got tapped.",
};

export type Wine = {
  name: string;
  producer: string;
  region: string;
  glass?: number;
  bottle: number;
  notes: string;
  organic?: boolean;
  vegan?: boolean;
};

export type WineSection = { id: string; title: string; wines: Wine[] };

export const wineList: WineSection[] = [
  {
    id: "spumante",
    title: "Spumante",
    wines: [
      {
        name: "Prosecco",
        producer: "Ca' Furlan 'Cuvee Beatrice'",
        region: "Italy",
        glass: 10,
        bottle: 39,
        notes: "White peach, lemon, melon, and pear",
      },
      {
        name: "Sparkling Peach",
        producer: "Bronconess",
        region: "Michigan",
        glass: 9,
        bottle: 35,
        notes: "Vibrant juicy peach and honey",
      },
      {
        name: "Raspberry Sparkling",
        producer: "Bronconess",
        region: "Michigan",
        glass: 9,
        bottle: 35,
        notes: "Rich juicy red raspberry, lively effervescence",
      },
      {
        name: "Sweet Red",
        producer: "Sangue di Giuda",
        region: "Italy",
        glass: 10,
        bottle: 39,
        notes: "Fruit-forward wine with dark cherry, blackberry, and baking spice",
        vegan: true,
      },
    ],
  },
  {
    id: "bianco",
    title: "Bianco e Rosato",
    wines: [
      {
        name: "Pinot Grigio",
        producer: "Rosati",
        region: "Italy",
        glass: 8,
        bottle: 31,
        notes: "Clean, crisp and refreshing, with notes of apple and pear",
        organic: true,
        vegan: true,
      },
      {
        name: "Pinot Gris",
        producer: "The Ned",
        region: "New Zealand",
        glass: 12,
        bottle: 47,
        notes: "Lush and bright with juicy white peach",
        vegan: true,
      },
      {
        name: "Sauvignon Blanc",
        producer: "Fernlands",
        region: "New Zealand",
        glass: 10,
        bottle: 39,
        notes: "Crisp kiwi, white peach and honeydew",
      },
      {
        name: "Unoaked Chardonnay",
        producer: "De Wetshof 'Limestone Hill'",
        region: "South Africa",
        glass: 12,
        bottle: 43,
        notes: "Refreshing, bright and crisp with playful acidity",
      },
      {
        name: "Chardonnay",
        producer: "Wente 'Morning Fog'",
        region: "California",
        glass: 10,
        bottle: 39,
        notes: "Medium body with subtle oak nuances of sweet cream and vanilla",
      },
      {
        name: "Chardonnay",
        producer: "Chalk Hill",
        region: "California",
        bottle: 43,
        notes: "Balanced acidity, minerality, and toasted oak notes",
      },
      {
        name: "Rosé",
        producer: "Sophie Bertin Vin de France",
        region: "France",
        glass: 11,
        bottle: 43,
        notes: "Soft and floral with a juicy strawberry finish",
        organic: true,
        vegan: true,
      },
      {
        name: "Moscato d'Asti",
        producer: "Ricossa",
        region: "Italy",
        glass: 9,
        bottle: 35,
        notes: "Floral and citrus notes with bright tropical fruit",
        organic: true,
      },
      {
        name: "Riesling",
        producer: "Dr. Hermann 'H'",
        region: "Germany",
        glass: 10,
        bottle: 39,
        notes: "Medium dry with balanced viscosity and acidity",
      },
    ],
  },
  {
    id: "rosso",
    title: "Rosso",
    wines: [
      {
        name: "Pinot Noir",
        producer: "Compton",
        region: "Oregon",
        glass: 11,
        bottle: 43,
        notes: "Silky texture with light red berries and cocoa",
        organic: true,
        vegan: true,
      },
      {
        name: "Pinot Noir",
        producer: "Fog Mountain",
        region: "California",
        glass: 9,
        bottle: 35,
        notes: "Bright, mouthwatering cherry and cranberry",
      },
      {
        name: "Chianti DOCG",
        producer: "Guiliano Rosati",
        region: "Italy",
        glass: 9,
        bottle: 35,
        notes: "Bright red fruit, light and easy-drinking",
        organic: true,
      },
      {
        name: "Merlot",
        producer: "Fog Mountain",
        region: "California",
        glass: 9,
        bottle: 35,
        notes: "Fruit-forward wine with dark cherry, blackberry, and baking spice",
      },
      {
        name: "Super Tuscan Red Blend",
        producer: "Monte Antico",
        region: "Italy",
        glass: 10,
        bottle: 39,
        notes: "Full-bodied with dark berries and gentle tannin finish",
        vegan: true,
      },
      {
        name: "Valpolicella Ripasso",
        producer: "Le Preare",
        region: "Italy",
        bottle: 55,
        notes: "Bold, balanced cherry and plum with hints of chocolate",
        organic: true,
      },
      {
        name: "Malbec",
        producer: "Domaine Bousquet",
        region: "Argentina",
        glass: 9,
        bottle: 35,
        notes: "Easy drinking with lively acid, cassis and blackberry",
        organic: true,
        vegan: true,
      },
      {
        name: "Cabernet Franc",
        producer: "Marland",
        region: "Michigan",
        bottle: 45,
        notes: "Prominent cherry and vegetal notes with a hint of pepper",
        organic: true,
      },
      {
        name: "Cabernet Sauvignon",
        producer: "Fog Mountain",
        region: "California",
        glass: 9,
        bottle: 35,
        notes: "Blackberry, ripe plum and delicate vanilla oak",
      },
      {
        name: "Cabernet Sauvignon",
        producer: "Tagaro 'Fuga'",
        region: "Italy",
        glass: 12,
        bottle: 47,
        notes: "Full-bodied, rich caramel, coffee, chocolate and tobacco",
        organic: true,
        vegan: true,
      },
      {
        name: "Zinfandel",
        producer: "7 Deadly Zins",
        region: "California",
        glass: 10,
        bottle: 39,
        notes: "Jammy, intense blackberry and plum",
      },
    ],
  },
];

export type Drink = { name: string; price: string; note?: string };

export type DrinkSection = { id: string; title: string; blurb?: string; items: Drink[] };

export const cocktails: DrinkSection[] = [
  {
    id: "mules",
    title: "Moscow Mules",
    blurb: "Served in the copper mug, in every flavor we could think of.",
    items: [
      { name: "Classic Moscow Mule", price: "$12" },
      { name: "Strawberry Moscow Mule", price: "$12" },
      { name: "Blueberry Moscow Mule", price: "$12" },
      { name: "Mango Moscow Mule", price: "$12" },
      { name: "Peach Moscow Mule", price: "$12" },
      { name: "Limoncello Moscow Mule", price: "$12" },
      { name: "Cranberry Moscow Mule", price: "$12" },
      { name: "Gin Moscow Mule", price: "$12" },
      { name: "Mexican Moscow Mule", price: "$12" },
    ],
  },
  {
    id: "martinis",
    title: "Martinis",
    items: [
      { name: "Lemon Drop Martini", price: "$11" },
      { name: "Raspberry Lemon Drop Martini", price: "$11.50" },
      { name: "Dirty Martini", price: "$11", note: "Made with vodka or gin" },
      { name: "Espresso Martini", price: "$12" },
      { name: "Chocolate Martini", price: "$12" },
    ],
  },
  {
    id: "whiskey",
    title: "Whiskey and Bourbon",
    items: [
      { name: "Galliano Old Fashioned", price: "$12" },
      { name: "George Sr. Perfect Manhattan", price: "$12" },
      { name: "Apple Bomb", price: "$9.50" },
    ],
  },
  {
    id: "fun",
    title: "For Fun",
    items: [
      { name: "Cascarelli's Italian Margarita", price: "$10" },
      { name: "Cascarelli's Classic Margarita", price: "$10", note: "Make it spicy" },
      { name: "Cascarelli's Pink Drink", price: "$12" },
      { name: "Pixi Stick", price: "$9.75" },
      { name: "Pina Colada", price: "$10" },
      { name: "Strawberry Daiquiri", price: "$10" },
      { name: "Miami Vice", price: "$11" },
      { name: "Italian Sunset", price: "$12" },
      { name: "Tequila Sunrise", price: "$9" },
      { name: "Top Shelf Long Island", price: "$15" },
      { name: "Dirty Shirley", price: "$10" },
      { name: "Cosmopolitan", price: "$11" },
      { name: "White Russian", price: "$9" },
      { name: "Blue Hawaiian", price: "$10" },
    ],
  },
];

export const zeroProof: DrinkSection[] = [
  {
    id: "mocktails",
    title: "Mocktails",
    items: [
      { name: "Virgin Moscow Mule", price: "$8", note: "Choose your flavor" },
      { name: "Sunrise Mocktail", price: "$8", note: "Pineapple juice, grenadine, lemon lime soda" },
      {
        name: "Raspberry / Strawberry Fizz",
        price: "$8",
        note: "Lime juice, soda water, raspberry or strawberry syrup",
      },
    ],
  },
  {
    id: "na",
    title: "Non-Alcoholic Beverages",
    items: [
      { name: "Pepsi Products", price: "$3.25" },
      { name: "Craft Brewed Root Beer", price: "$4.50" },
      { name: "Strawberry / Raspberry Lemonade", price: "$3.75" },
      { name: "San Pellegrino Mineral Water", price: "$6.25" },
      { name: "Raspberry Iced Tea", price: "$3.50" },
      { name: "Fresh Brewed Iced Tea / Tazo Hot Tea", price: "$3.75" },
      { name: "Fresh Ground Coffee", price: "$4" },
      { name: "Labatt's N/A", price: "$5" },
      { name: "Blue Moon N/A", price: "$5" },
      { name: "Apple Juice", price: "$3.25" },
      { name: "Milk or Chocolate Milk", price: "$3.95" },
    ],
  },
];
