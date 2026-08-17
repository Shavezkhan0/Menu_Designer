export interface MenuItem {
  image?: string;
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  tags: string[];
  isSignature?: boolean;
  isNew?: boolean;
  alcoholContent?: string;
  servingStyle?: string;
  garnish?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "cocktails", label: "Cocktails", emoji: "🍸", description: "Handcrafted signature cocktails" },
  { id: "mocktails", label: "Mocktails", emoji: "🥤", description: "Premium alcohol-free creations" },
];

export const MENU_ITEMS: MenuItem[] = [
  // ── Cocktails (20) ──
  {
    id: "c1",
    image: "/Cocktals_Images/1.png",
    name: "Midnight Negroni",
    price: 18.00,
    description: "A bold reimagining of the classic Negroni, blended with aged gin, bitter Campari, and sweet vermouth finished with a touch of black truffle essence.",
    category: "cocktails",
    tags: ["gin", "bitter", "bold", "classic"],
    isSignature: true,
    alcoholContent: "28% ABV",
    servingStyle: "Served on the rocks",
    garnish: "Orange twist, brandied cherry",
  },
  {
    id: "c2",
    image: "/Cocktals_Images/2.png",
    name: "Velvet Rose",
    price: 16.00,
    description: "Elegant vodka-based cocktail infused with rose petals, fresh lychee, and a hint of pink peppercorn for a delicate warmth.",
    category: "cocktails",
    tags: ["vodka", "floral", "sweet", "elegant"],
    isSignature: true,
    alcoholContent: "18% ABV",
    servingStyle: "Served up in a chilled coupe",
    garnish: "Edible rose petal",
  },
  {
    id: "c3",
    image: "/Cocktals_Images/4.png",
    name: "Azure Horizon",
    price: 19.00,
    description: "A stunning blue cocktail featuring butterfly pea flower gin, elderflower liqueur, fresh lemon, and a float of prosecco.",
    category: "cocktails",
    tags: ["gin", "floral", "citrus", "sparkling"],
    isSignature: true,
    alcoholContent: "15% ABV",
    servingStyle: "Served in a highball glass",
    garnish: "Lemon wheel, edible orchid",
  },
  {
    id: "c4",
    image: "/Cocktals_Images/4.png",
    name: "Smoky Mule",
    price: 17.00,
    description: "Mezcal meets traditional mule with fresh lime, ginger beer, and a dash of chipotle bitters for a smoky-spiced finish.",
    category: "cocktails",
    tags: ["mezcal", "smoky", "spicy", "refreshing"],
    alcoholContent: "20% ABV",
    servingStyle: "Served in a copper mug",
    garnish: "Lime wedge, candied ginger",
  },
  {
    id: "c5",
    image: "/Cocktals_Images/5.png",
    name: "Gold Rush",
    price: 16.00,
    description: "A timeless bourbon sour elevated with honey syrup, fresh lemon juice, and a whisper of saffron.",
    category: "cocktails",
    tags: ["bourbon", "citrus", "sweet", "classic"],
    alcoholContent: "22% ABV",
    servingStyle: "Served on the rocks",
    garnish: "Lemon twist, gold leaf",
  },
  {
    id: "c6",
    image: "/Cocktals_Images/5.png",
    name: "Sakura Spritz",
    price: 15.00,
    description: "Japanese-inspired aperitivo with sake, cherry blossom syrup, fresh grapefruit, and a top of sparkling soda.",
    category: "cocktails",
    tags: ["sake", "floral", "light", "refreshing"],
    isNew: true,
    alcoholContent: "10% ABV",
    servingStyle: "Served in a wine glass",
    garnish: "Cherry blossom, grapefruit slice",
  },
  {
    id: "c7",
    image: "/Cocktals_Images/7.png",
    name: "Black Truffle Martini",
    price: 22.00,
    description: "Ultra-premium vodka infused with black truffle, dry vermouth, and a saline rinse served impeccably cold.",
    category: "cocktails",
    tags: ["vodka", "savory", "umami", "luxury"],
    isSignature: true,
    alcoholContent: "30% ABV",
    servingStyle: "Served up in a chilled martini glass",
    garnish: "Skewered olive, truffle shaving",
  },
  {
    id: "c8",
    image: "/Cocktals_Images/8.png",
    name: "Passion Paloma",
    price: 15.00,
    description: "A tropical twist on the Paloma with reposado tequila, fresh passion fruit, grapefruit soda, and a salted rim.",
    category: "cocktails",
    tags: ["tequila", "tropical", "citrus", "refreshing"],
    alcoholContent: "14% ABV",
    servingStyle: "Served on the rocks",
    garnish: "Passion fruit half, mint sprig",
  },
  {
    id: "c9",
    image: "/Cocktals_Images/9.png",
    name: "Earl Grey Fizz",
    price: 16.00,
    description: "Tea-infused gin cocktail with earl grey syrup, fresh lemon, egg white, and a splash of soda for a silky finish.",
    category: "cocktails",
    tags: ["gin", "tea", "citrus", "creamy"],
    alcoholContent: "16% ABV",
    servingStyle: "Served up",
    garnish: "Lemon peel, star anise",
  },
  {
    id: "c10",
    image: "/Cocktals_Images/10.png",
    name: "Crimson Sour",
    price: 17.00,
    description: "A vibrant sour blending Aperol, mezcal, blood orange juice, lime, and agave with a dramatic red hue.",
    category: "cocktails",
    tags: ["mezcal", "citrus", "bitter", "colorful"],
    alcoholContent: "19% ABV",
    servingStyle: "Served on the rocks",
    garnish: "Dehydrated blood orange wheel",
  },
  {
    id: "c11",
    image: "/Cocktals_Images/11.png",
    name: "Cucumber Collins",
    price: 14.00,
    description: "A crisp, cooling take on the Tom Collins with cucumber-infused gin, fresh lime, simple syrup, and soda.",
    category: "cocktails",
    tags: ["gin", "herbal", "light", "refreshing"],
    alcoholContent: "14% ABV",
    servingStyle: "Served in a highball glass",
    garnish: "Cucumber ribbon, mint sprig",
  },
  {
    id: "c12",
    image: "/Cocktals_Images/12.png",
    name: "Spiced Pineapple Daiquiri",
    price: 15.00,
    description: "White rum meets fresh pineapple, lime, and a cinnamon-clove syrup for a warm tropical finish.",
    category: "cocktails",
    tags: ["rum", "tropical", "spiced", "sweet"],
    alcoholContent: "18% ABV",
    servingStyle: "Served up in a chilled coupe",
    garnish: "Pineapple leaf, cinnamon stick",
  },
  {
    id: "c13",
    image: "/Cocktals_Images/13.png",
    name: "Lavender Bee's Knees",
    price: 16.00,
    description: "A floral riff on the Prohibition-era classic with lavender-infused gin, honey syrup, fresh lemon, and a splash of sparkling water.",
    category: "cocktails",
    tags: ["gin", "floral", "herbal", "sweet"],
    alcoholContent: "18% ABV",
    servingStyle: "Served up",
    garnish: "Lavender sprig, lemon twist",
  },
  

 

  // ── Mocktails (15) ──
  {
    id: "m1",
    image: "/Mocktails/1.png",
    name: "Virgin Sunrise",
    price: 10.00,
    description: "A vibrant blend of fresh orange juice, grenadine, and a splash of soda water served over ice with a dramatic sunrise effect.",
    category: "mocktails",
    tags: ["citrus", "sweet", "fruity", "colorful"],
    servingStyle: "Served on the rocks",
    garnish: "Orange wheel, brandied cherry",
  },
  {
    id: "m2",
    image: "/Mocktails/2.png",
    name: "Berry Bliss",
    price: 12.00,
    description: "A luscious medley of muddled blackberry, blueberry, and raspberry with fresh lemon, agave, and chilled soda.",
    category: "mocktails",
    tags: ["berry", "sweet", "tart", "refreshing"],
    isSignature: true,
    servingStyle: "Served on the rocks",
    garnish: "Skewered mixed berries, mint sprig",
  },
  {
    id: "m3",
    image: "/Mocktails/2.png",
    name: "Cucumber Cooler",
    price: 11.00,
    description: "Cooling cucumber, fresh lime, mint, and a touch of agave shaken vigorously and strained over ice.",
    category: "mocktails",
    tags: ["herbal", "light", "refreshing", "cucumber"],
    servingStyle: "Served on the rocks",
    garnish: "Cucumber ribbon, mint sprig",
  },
  {
    id: "m4",
    image: "/Mocktails/4.png",
    name: "Lychee & Rose Spritz",
    price: 13.00,
    description: "Elegant lychee purée blended with rose water, fresh lime, and premium soda water for a delicately floral spritz.",
    category: "mocktails",
    tags: ["floral", "sweet", "fruity", "sparkling"],
    isSignature: true,
    servingStyle: "Served in a balloon glass",
    garnish: "Edible orchid, lychee fruit",
  },
  {
    id: "m5",
    image: "/Mocktails/5.png",
    name: "Ginger Fizz",
    price: 10.00,
    description: "House-made ginger syrup, fresh lime, and soda water with a fiery kick and a touch of honey sweetness.",
    category: "mocktails",
    tags: ["spicy", "ginger", "citrus", "refreshing"],
    servingStyle: "Served in a highball glass",
    garnish: "Candied ginger, lime wheel",
  },
  {
    id: "m6",
    image: "/Mocktails/6.png",
    name: "Passion Fruit Spritz",
    price: 12.00,
    description: "Tropical passion fruit purée with orange blossom water, fresh lime, and a long soda top.",
    category: "mocktails",
    tags: ["tropical", "citrus", "sweet", "tart"],
    servingStyle: "Served on the rocks",
    garnish: "Passion fruit half, mint sprig",
  },
  {
    id: "m7",
    image: "/Mocktails/7.png",
    name: "Mint Lime Mojito",
    price: 10.00,
    description: "A non-alcoholic mojito with muddled fresh mint, lime, simple syrup, and plenty of crushed ice and soda.",
    category: "mocktails",
    tags: ["mint", "citrus", "refreshing", "classic"],
    servingStyle: "Served over crushed ice",
    garnish: "Mint bouquet, lime wedge",
  },
  {
    id: "m8",
    image: "/Mocktails/1.png",
    name: "Hibiscus Cooler",
    price: 11.00,
    description: "Deep ruby hibiscus tea chilled and shaken with apple cider, fresh lime, and a hint of cinnamon syrup.",
    category: "mocktails",
    tags: ["floral", "tart", "spiced", "colorful"],
    servingStyle: "Served on the rocks",
    garnish: "Dried hibiscus flower, cinnamon stick",
  },
  {
    id: "m9",
    image: "/Mocktails/2.png",
    name: "Turmeric Tonic",
    price: 12.00,
    description: "Golden turmeric and ginger root muddled with pineapple juice, lime, and a splash of sparkling water for an anti-inflammatory delight.",
    category: "mocktails",
    tags: ["spiced", "earthy", "healthy", "golden"],
    isNew: true,
    servingStyle: "Served on the rocks",
    garnish: "Turmeric slice, black pepper",
  },
  {
    id: "m10",
    image: "/Mocktails/4.png",
    name: "Basil Lemonade",
    price: 10.00,
    description: "Fresh basil leaves muddled with lemon juice, agave, and soda water for a herbaceous take on classic lemonade.",
    category: "mocktails",
    tags: ["herbal", "citrus", "refreshing", "savory"],
    servingStyle: "Served on the rocks",
    garnish: "Basil sprig, lemon wheel",
  },
  {
    id: "m11",
    image: "/Mocktails/5.png",
    name: "Coconut Limeade",
    price: 11.00,
    description: "Creamy coconut milk blended with fresh lime juice, a touch of cane sugar, and topped with a splash of soda.",
    category: "mocktails",
    tags: ["coconut", "citrus", "creamy", "tropical"],
    servingStyle: "Served on the rocks",
    garnish: "Toasted coconut flakes, lime wheel",
  },
  {
    id: "m12",
    image: "/Mocktails/6.png",
    name: "Pomegranate Nojito",
    price: 12.00,
    description: "Pomegranate juice muddled with mint, lime, and a splash of soda water for a jewel-toned refresher.",
    category: "mocktails",
    tags: ["fruity", "tart", "mint", "colorful"],
    servingStyle: "Served on the rocks",
    garnish: "Pomegranate arils, mint sprig",
  },

];

export interface MenuItemGroup {
  category: MenuCategory;
  items: MenuItem[];
}

export function groupItemsByCategory(items: MenuItem[]): MenuItemGroup[] {
  const grouped = new Map<string, MenuItemGroup>();
  for (const item of items) {
    let group = grouped.get(item.category);
    if (!group) {
      const category =
        MENU_CATEGORIES.find((c) => c.id === item.category) ?? {
          id: item.category,
          label: item.category,
          emoji: "🍽️",
          description: "",
        };
      group = { category, items: [] };
      grouped.set(item.category, group);
    }
    group.items.push(item);
  }

  const ordered: MenuItemGroup[] = [];
  for (const category of MENU_CATEGORIES) {
    const group = grouped.get(category.id);
    if (group) ordered.push(group);
  }
  for (const group of grouped.values()) {
    if (!ordered.includes(group)) ordered.push(group);
  }
  return ordered;
}
