export interface MenuItem {
  image?: string;
  id: string;
  name: string;
  price?: number;
  description: string;
  category: string;
  tags?: string[];
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

const COCKTAIL_IMAGES = [
  "/Cocktals_Images/1.png",
  "/Cocktals_Images/2.png",
  "/Cocktals_Images/4.png",
  "/Cocktals_Images/5.png",
  "/Cocktals_Images/6.png",
  "/Cocktals_Images/7.png",
  "/Cocktals_Images/8.png",
  "/Cocktals_Images/9.png",
  "/Cocktals_Images/10.png",
  "/Cocktals_Images/11.png",
  "/Cocktals_Images/12.png",
  "/Cocktals_Images/13.png",
];

const MOCKTAIL_IMAGES = [
  "/Mocktails/1.png",
  "/Mocktails/2.png",
  "/Mocktails/4.png",
  "/Mocktails/5.png",
  "/Mocktails/6.png",
  "/Mocktails/7.png",
];

export const MENU_ITEMS: MenuItem[] = [
  // ── Cocktails (90) ──
  { id: "c1", image: COCKTAIL_IMAGES[0], name: "SAFFRON OLD FASHIONED", description: "Whiskey stirred with saffron syrup, bitters, and orange peel, garnished with a saffron strand. Smooth, warming finish.", category: "cocktails" },
  { id: "c2", image: COCKTAIL_IMAGES[1], name: "MASALA SOUR", description: "Whiskey shaken with citrus, and Indian spices, garnished with a dusting of cinnamon. Bold, aromatic finish.", category: "cocktails" },
  { id: "c3", image: COCKTAIL_IMAGES[2], name: "LAVENDER GIMLET", description: "Gin shaken with lavender syrup and fresh lime juice, garnished with a lavender sprig. Floral, crisp finish.", category: "cocktails" },
  { id: "c4", image: COCKTAIL_IMAGES[3], name: "BASIL MARGARITA", description: "Tequila shaken with lime, basil syrup, and triple sec, served with a basil leaf. Refreshing, herbaceous finish.", category: "cocktails" },
  { id: "c5", image: COCKTAIL_IMAGES[4], name: "ROSE PALOMA", description: "Tequila, rose syrup, grapefruit juice, lime—floral, citrusy, refreshing with a bright and elegant finish.", category: "cocktails" },
  { id: "c6", image: COCKTAIL_IMAGES[5], name: "BOTANICAL STREET", description: "Gin, Fresh Muddled Basil & Cucumber, Lime Juice Shaken & Served With Basil Leaf For Garnish", category: "cocktails" },
  { id: "c7", image: COCKTAIL_IMAGES[6], name: "BANARASI PAN MOJITO", description: "Rum muddled with betel leaf, lime, and mint, topped with soda. Garnished with a lime wheel. Exotic, crisp finish.", category: "cocktails" },
  { id: "c8", image: COCKTAIL_IMAGES[7], name: "SPICY MANGO BEERITA", description: "Tequila and mango puree shaken with chili, lime, and triple sec, topped with beer. Garnished with chili slice. Fiery, fruity finish.", category: "cocktails" },
  { id: "c9", image: COCKTAIL_IMAGES[8], name: "IMLI MARGARITA", description: "Tequila shaken with tamarind pulp, lime, and triple sec, garnished with a tamarind dusted rim. Tangy, balanced finish.", category: "cocktails" },
  { id: "c10", image: COCKTAIL_IMAGES[9], name: "PASSION FRUIT & KAFFIR LIME G&T", description: "Gin built over ice with tonic, passion fruit cordial, and kaffir lime, garnished with lime zest. Fruity, aromatic finish.", category: "cocktails" },
  { id: "c11", image: COCKTAIL_IMAGES[10], name: "WATERMELON & BASIL MARTINI", description: "Vodka shaken with watermelon cordial, basil syrup, and lime, garnished with a basil leaf. Refreshing, crisp finish.", category: "cocktails" },
  { id: "c12", image: COCKTAIL_IMAGES[11], name: "POPCORN SOUR", description: "Bourbon, Pop Corn Cordial, foam, Lime Juice, Ice & Caramelised Pop Corn For Garnish", category: "cocktails" },
  { id: "c13", image: COCKTAIL_IMAGES[0], name: "PICANTE", description: "Tequila shaken with chili, lime, and agave, garnished with a chili slice. Spicy, zesty finish.", category: "cocktails" },
  { id: "c14", image: COCKTAIL_IMAGES[1], name: "SPICED JAMUN (G&T)", description: "Gin, Spiced Jamun Cordial, Lime Juice Topped With Tonic & Mint Sprigs For Garnish", category: "cocktails" },
  { id: "c15", image: COCKTAIL_IMAGES[2], name: "RAW MANGO & CURRY LEAF", description: "Vodka shaken with raw mango, curry leaf syrup, and lime, garnished with a curry leaf. Tangy, herbal finish.", category: "cocktails" },
  { id: "c16", image: COCKTAIL_IMAGES[3], name: "GRAPEFRUIT PALOMA", description: "Tequila built with grapefruit cordial and soda, garnished with a grapefruit wedge. Light, refreshing finish.", category: "cocktails" },
  { id: "c17", image: COCKTAIL_IMAGES[4], name: "SPICY GUAVA MARGARITA", description: "Tequila shaken with guava puree, lime, and chili, garnished with a chili salt rim. Fruity, fiery finish.", category: "cocktails" },
  { id: "c18", image: COCKTAIL_IMAGES[5], name: "CUCUMBER & BASIL G&T", description: "Gin built over ice with tonic, cucumber cordial, and basil, garnished with cucumber ribbon. Crisp, herbaceous finish.", category: "cocktails" },
  { id: "c19", image: COCKTAIL_IMAGES[6], name: "SAFFRON & ROSEWATER MARTINI", description: "Vodka shaken with saffron infusion and rosewater, garnished with a rose petal. Floral, smooth, elegant finish.", category: "cocktails" },
  { id: "c20", image: COCKTAIL_IMAGES[7], name: "GINGER & TURMERIC PICANTE", description: "Tequila shaken with fresh ginger, turmeric, chili, and lime, garnished with chili slice. Warm, spicy, vibrant finish.", category: "cocktails" },
  { id: "c21", image: COCKTAIL_IMAGES[8], name: "SPICED MULE", description: "Vodka stirred with ginger syrup, lime, and bitters, topped with soda, garnished with a lime wheel. Spicy, zesty finish.", category: "cocktails" },
  { id: "c22", image: COCKTAIL_IMAGES[9], name: "CUCUMBER G&T", description: "Gin, built, fresh cucumber slices, lime juice, premium tonic water, cucumber ribbon garnish, crisp refreshing herbal finish.", category: "cocktails" },
  { id: "c23", image: COCKTAIL_IMAGES[10], name: "CINNAMON OLD FASHIONED", description: "Whiskey stirred with cinnamon syrup and bitters, garnished with an orange twist. Warming, spiced finish.", category: "cocktails" },
  { id: "c24", image: COCKTAIL_IMAGES[11], name: "ESPRESSO MARTINI", description: "Vodka shaken with espresso, coffee liqueur, and sugar syrup, garnished with coffee beans. Bold, smooth finish.", category: "cocktails" },
  { id: "c25", image: COCKTAIL_IMAGES[0], name: "BERRY BRAMBLE", description: "Vodka, Bluberry & Stawberry Puree, Lime Juice Shaken & Served In a glass With blueberry As Garnish", category: "cocktails" },
  { id: "c26", image: COCKTAIL_IMAGES[1], name: "DATE MARGARITA", description: "Tequila shaken with date syrup, lime juice, and triple sec, garnished with a date slice. Rich, balanced finish.", category: "cocktails" },
  { id: "c27", image: COCKTAIL_IMAGES[2], name: "ELDERFLOWER & ROSEMARY SPRITZ", description: "Vodka built with elderflower liqueur and rosemary syrup, garnished with rosemary sprig. Light, floral, aromatic finish.", category: "cocktails" },
  { id: "c28", image: COCKTAIL_IMAGES[3], name: "TIRAMISU MARTINI", description: "Vodka, Kahlua, Tiramisu Shaken & Served With Dusted Cocoa On Vicenzovo", category: "cocktails" },
  { id: "c29", image: COCKTAIL_IMAGES[4], name: "POMEGRANATE PALOMA", description: "Tequila built with pomegranate cordial and soda, garnished with a pomegranate wedge. Light, fruity, refreshing finish.", category: "cocktails" },
  { id: "c30", image: COCKTAIL_IMAGES[5], name: "KOH SAMUI", description: "Rum shaken with coconut, lime, and lemongrass syrup, garnished with a lime wheel. Tropical, crisp, aromatic finish.", category: "cocktails" },
  { id: "c31", image: COCKTAIL_IMAGES[6], name: "SMOKED CHERRY OLD FASHIONED", description: "Bourbon, Smoked Cherry Bitters, Sugar Cube, Ice Cube & Garnished With Orange Twist", category: "cocktails" },
  { id: "c32", image: COCKTAIL_IMAGES[7], name: "BUBBLE GUM MARGARITA", description: "Tequila shaken with bubble gum syrup, lime, and triple sec, garnished with a sugar rim. Sweet, playful finish.", category: "cocktails" },
  { id: "c33", image: COCKTAIL_IMAGES[8], name: "ROSE FRENCH 75", description: "Gin shaken with rose syrup and lemon, topped with sparkling wine, garnished with a rose petal. Floral, elegant finish.", category: "cocktails" },
  { id: "c34", image: COCKTAIL_IMAGES[9], name: "POMEGRANATE COSMO", description: "Vodka, Pomeogrante Cordial, Triple Sec, Lime Juice Shaken & Served With Orange Peel For Garnish", category: "cocktails" },
  { id: "c35", image: COCKTAIL_IMAGES[10], name: "MANGO BEERITA", description: "Tequila shaken with mango puree, lime, and triple sec, topped with beer, garnished with a lime wheel. Fruity, fizzy finish.", category: "cocktails" },
  { id: "c36", image: COCKTAIL_IMAGES[11], name: "DRAGON FRUIT PALOMA", description: "Tequila built with dragon fruit cordial and soda, garnished with a dragon fruit slice. Light, fruity, refreshing finish.", category: "cocktails" },
  { id: "c37", image: COCKTAIL_IMAGES[0], name: "KAY-SOUR", description: "Whiskey shaken with citrus, sugar, and foam, garnished with a citrus twist. Smooth, balanced, tart finish.", category: "cocktails" },
  { id: "c38", image: COCKTAIL_IMAGES[1], name: "SLATON", description: "Rum shaken with tropical fruits and lime, garnished with a citrus wheel. Bright, refreshing, tropical finish.", category: "cocktails" },
  { id: "c39", image: COCKTAIL_IMAGES[2], name: "BRUCHETTA", description: "Vodka shaken with tomato, basil, and lemon, garnished with a basil leaf. Savory, crisp, herbaceous finish.", category: "cocktails" },
  { id: "c40", image: COCKTAIL_IMAGES[3], name: "SAFFRON SOUR", description: "Whiskey shaken with saffron syrup, lemon, and sugar, garnished with saffron strands. Aromatic, smooth, warming finish.", category: "cocktails" },
  { id: "c41", image: COCKTAIL_IMAGES[4], name: "GUR MARGARITA", description: "Tequila shaken with jaggery syrup and lime, garnished with a sugar rim. Rich, sweet, balanced finish.", category: "cocktails" },
  { id: "c42", image: COCKTAIL_IMAGES[5], name: "BASIL MARTINI", description: "Gin shaken with basil syrup and lemon, garnished with a basil leaf. Herbaceous, crisp, clean finish.", category: "cocktails" },
  { id: "c43", image: COCKTAIL_IMAGES[6], name: "HIBISCUS G&T", description: "Gin built over ice with tonic and hibiscus syrup, garnished with hibiscus flower. Floral, refreshing, aromatic finish.", category: "cocktails" },
  { id: "c44", image: COCKTAIL_IMAGES[7], name: "CARAMELISED WHISKEY SOUR", description: "Whiskey shaken with caramel syrup, lemon, and foam, garnished with a lemon twist. Sweet, rich, balanced finish.", category: "cocktails" },
  { id: "c45", image: COCKTAIL_IMAGES[8], name: "SANGRIA", description: "Red wine shaken with citrus, berries, and brandy, garnished with orange and berries. Fruity, vibrant, refreshing finish.", category: "cocktails" },
  { id: "c46", image: COCKTAIL_IMAGES[9], name: "KRABI", description: "Rum shaken with coconut, lime, and pineapple, garnished with pineapple wedge. Tropical, crisp, aromatic finish.", category: "cocktails" },
  { id: "c47", image: COCKTAIL_IMAGES[10], name: "HONEY DREW PICANTE", description: "Tequila shaken with honey, chili, and fresh lime, garnished with a chili slice. Sweet, spicy, refreshing finish.", category: "cocktails" },
  { id: "c48", image: COCKTAIL_IMAGES[11], name: "HIBISCUS PALOMA", description: "Tequila built with hibiscus syrup and soda, garnished with grapefruit wedge. Floral, crisp, refreshing finish.", category: "cocktails" },
  { id: "c49", image: COCKTAIL_IMAGES[0], name: "BANARASI PAAN OLD FASHIONED", description: "Whiskey stirred with betel leaf syrup and bitters, garnished with betel leaf. Warm, aromatic, lingering finish.", category: "cocktails" },
  { id: "c50", image: COCKTAIL_IMAGES[1], name: "HONEY & BLACK PEPPER SOUR", description: "Whiskey shaken with honey syrup, lemon juice, and black pepper, garnished with pepper dust. Smooth, spicy finish.", category: "cocktails" },
  { id: "c51", image: COCKTAIL_IMAGES[2], name: "BUBBLE GUM G&T", description: "Gin built with tonic and bubble gum syrup, garnished with lemon twist. Sweet, playful, refreshing finish.", category: "cocktails" },
  { id: "c52", image: COCKTAIL_IMAGES[3], name: "GUAVA PICANTE", description: "Tequila shaken with guava puree, chili, and lime, garnished with chili slice. Fruity, spicy, vibrant finish.", category: "cocktails" },
  { id: "c53", image: COCKTAIL_IMAGES[4], name: "ELDERFLOWER G&T", description: "Gin, built over ice with elderflower liqueur and premium tonic, lemon peel garnish, floral, crisp finish.", category: "cocktails" },
  { id: "c54", image: COCKTAIL_IMAGES[5], name: "JALAPENO MARGARITA", description: "Tequila, shaken with fresh lime juice, agave, and jalapeño, chilli-salt rim garnish, bold, spicy-citrus finish.", category: "cocktails" },
  { id: "c55", image: COCKTAIL_IMAGES[6], name: "GARDEN G&T", description: "Gin, built over ice with cucumber, basil, and citrus, fresh herb garnish, clean, refreshing botanical finish.", category: "cocktails" },
  { id: "c56", image: COCKTAIL_IMAGES[7], name: "RASPBERRY SPRITZER", description: "Vodka, built over ice with raspberry purée, citrus, and soda, fresh raspberry garnish, light, sparkling finish.", category: "cocktails" },
  { id: "c57", image: COCKTAIL_IMAGES[8], name: "LYCHEE & LEMONGRASS PALOMA", description: "Tequila, built with lychee, lemongrass infusion, citrus, and soda, grapefruit peel garnish, crisp, floral-citrus finish.", category: "cocktails" },
  { id: "c58", image: COCKTAIL_IMAGES[9], name: "WHISKEY SOUR", description: "Bourbon whiskey, shaken with fresh lemon juice and sugar syrup, lemon peel garnish, balanced, smooth, lightly tangy finish.", category: "cocktails" },
  { id: "c59", image: COCKTAIL_IMAGES[10], name: "PASSION FRUIT KAFFIR LIME SHANDY", description: "Light beer, built with passion fruit cordial, kaffir lime, and citrus, lime wheel garnish, crisp, refreshing tropical finish.", category: "cocktails" },
  { id: "c60", image: COCKTAIL_IMAGES[11], name: "CHILLI GUAVA MICHELADA", description: "Beer, built with guava cordial, lime, chilli, and spices, chilli-lime rim garnish, tangy, spicy, savoury finish.", category: "cocktails" },
  { id: "c61", image: COCKTAIL_IMAGES[0], name: "SPICY MANGO MICHELADA", description: "Beer, built with mango cordial, lime, chilli, and spices, chilli-salt rim garnish, bold, spicy-tropical finish.", category: "cocktails" },
  { id: "c62", image: COCKTAIL_IMAGES[1], name: "STRAWBERRY MIMOSA", description: "Sparkling wine, gently built with fresh strawberry purée and citrus, strawberry garnish, light, fruity, refreshing finish.", category: "cocktails" },
  { id: "c63", image: COCKTAIL_IMAGES[2], name: "GRAPEFRUIT MIMOSA", description: "Sparkling wine, gently built with grapefruit cordial, citrus twist garnish, bright, zesty, clean finish.", category: "cocktails" },
  { id: "c64", image: COCKTAIL_IMAGES[3], name: "RAW MANGO BELLINI", description: "Prosecco, gently built with raw mango purée and citrus, mint garnish, tart, refreshing, lightly effervescent finish.", category: "cocktails" },
  { id: "c65", image: COCKTAIL_IMAGES[4], name: "PASSION FRUIT & KAFFIR LIME SPRITZ", description: "Prosecco spritzed with passion fruit syrup and kaffir lime, citrus lift, kaffir lime leaf garnish, vibrant tropical refreshing finish.", category: "cocktails" },
  { id: "c66", image: COCKTAIL_IMAGES[5], name: "SPICED MANGO MARGARITA", description: "Tequila, shaken, ripe mango, lime, chilli spice, tajin rim garnish, bold sweet-heat balance with zesty finish.", category: "cocktails" },
  { id: "c67", image: COCKTAIL_IMAGES[6], name: "ROSE MARTINI", description: "Vodka, shaken, rose infusion, lychee, citrus, dried rose petal garnish, smooth floral aroma with clean crisp finish.", category: "cocktails" },
  { id: "c68", image: COCKTAIL_IMAGES[7], name: "PEACH BELLINI", description: "Prosecco, built, white peach purée, light sugar syrup, peach slice garnish, crisp fruity sparkling finish.", category: "cocktails" },
  { id: "c69", image: COCKTAIL_IMAGES[8], name: "PORNSTAR MARTINI", description: "Vanilla vodka, shaken, passionfruit purée, fresh lime juice, vanilla syrup, half passionfruit garnish, bright tropical smooth finish.", category: "cocktails" },
  { id: "c70", image: COCKTAIL_IMAGES[9], name: "MILANO", description: "Campari, built, sweet vermouth, fresh orange juice, orange slice garnish, bittersweet citrus balanced finish.", category: "cocktails" },
  { id: "c71", image: COCKTAIL_IMAGES[10], name: "BLOOD ORANGE MARGARITA", description: "Blanco tequila, triple sec, campari, blood orange, lime juice served in glass rimmed in kosher salt", category: "cocktails" },
  { id: "c72", image: COCKTAIL_IMAGES[11], name: "CUCU & COCO", description: "Blanco tequila, coconut water, fresh lime juice, cucumber chunks, shaken & served with cucumber slice for garnish", category: "cocktails" },
  { id: "c73", image: COCKTAIL_IMAGES[0], name: "BERRY HIBISCUS SPRITZ", description: "Gin, berry puree, hibiscus syrup, lime, sparkling wine—floral, fruity, refreshing with a delicate fizz.", category: "cocktails" },
  { id: "c74", image: COCKTAIL_IMAGES[1], name: "CRANBERRY CINNAMON FIZZ", description: "Vodka, cranberry juice, cinnamon syrup, fresh lime, and sparkling soda—bright, lightly spiced, and refreshing, served over ice with cinnamon stick garnish", category: "cocktails" },
  { id: "c75", image: COCKTAIL_IMAGES[2], name: "ORANGE KAFFIR", description: "Vodka, orange juice, kaffir lime, soda—bright, citrusy, refreshing with aromatic lime notes and a smooth finish.", category: "cocktails" },
  { id: "c76", image: COCKTAIL_IMAGES[3], name: "RASPBERRY SPRITZ", description: "Gin, built over ice with raspberry purée, citrus, and soda, fresh raspberry garnish, light, sparkling finish.", category: "cocktails" },
  { id: "c77", image: COCKTAIL_IMAGES[4], name: "STRAWBERRY BASIL FIZZ", description: "Gin, strawberry puree, fresh basil, lime, soda—fruity, herbaceous, refreshing with a lively sparkling finish.", category: "cocktails" },
  { id: "c78", image: COCKTAIL_IMAGES[5], name: "LYCHEE ROSE MARTINI", description: "Gin, lychee juice, rose syrup, lime—shaken chilled, floral, fruity, smooth with an elegant finish.", category: "cocktails" },
  { id: "c79", image: COCKTAIL_IMAGES[6], name: "LOS ANGELES", description: "Tequila, orange liqueur, cranberry juice, lime—bright, fruity, refreshing with a smooth citrus finish.", category: "cocktails" },
  { id: "c80", image: COCKTAIL_IMAGES[7], name: "MANGO PASSION FRUIT SPRITZ", description: "Vodka, mango puree, passionfruit, lime, sparkling wine—tropical, fruity, refreshing with a delicate sparkling finish.", category: "cocktails" },
  { id: "c81", image: COCKTAIL_IMAGES[8], name: "PEACH APEROL SPRITZ", description: "Vodka aperol, peach puree, soda—light, fruity, bittersweet with refreshing bubbles and a crisp finish.", category: "cocktails" },
  { id: "c82", image: COCKTAIL_IMAGES[9], name: "MEXICAN SUNSET", description: "Tequila, Amaretto, Peach Schnapps, Grenadine, Lime Slices & Maraschino Cherries", category: "cocktails" },
  { id: "c83", image: COCKTAIL_IMAGES[10], name: "ELDERFLOWER ROSEMARY SPRITZ", description: "Gin built with elderflower liqueur and rosemary syrup, garnished with rosemary sprig. Light, floral, aromatic finish.", category: "cocktails" },
  { id: "c84", image: COCKTAIL_IMAGES[11], name: "PASSION FRUIT SOUR", description: "Bourbon, Fresh Passion Fruit & Basil, Lime Juice, Egg White Or Pineapple Juice, Ice & Flamed Passion Fruit For Garnish", category: "cocktails" },
  { id: "c85", image: COCKTAIL_IMAGES[0], name: "PINA COLADA", description: "White rum, pineapple juice, coconut cream—creamy, tropical, smooth with a rich island-inspired finish.", category: "cocktails" },
  { id: "c86", image: COCKTAIL_IMAGES[1], name: "BLUEBERRY LAVENDER FIZZ", description: "Vodka, Fresh Muddled Blueberries & Lavender Cordial, Citrus Topped With Club Soda", category: "cocktails" },
  { id: "c87", image: COCKTAIL_IMAGES[2], name: "RASPBERRY ROSEMARY", description: "Gin, raspberry purée, rosemary, lime juice, tonic — fruity, aromatic, refreshing with a crisp herbal finish", category: "cocktails" },
  { id: "c88", image: COCKTAIL_IMAGES[3], name: "ELDERFLOWER APEROL SPRITZ", description: "Vodka, Aperol, elderflower cordial, soda, and an orange slice for a floral, sunset-hued spritz.", category: "cocktails" },
  { id: "c89", image: COCKTAIL_IMAGES[4], name: "PASSION KAFFIR", description: "Vodka, passion fruit, kaffir lime, lime juice, soda — tropical, citrusy, aromatic with a crisp and refreshing finish.", category: "cocktails" },
  { id: "c90", image: COCKTAIL_IMAGES[5], name: "COCONUT CLOUD", description: "Vodka, Aperol, Coconut Cordial, Lime Juice, Foam - Shaken & served with coconut rim garnish.", category: "cocktails" },

  // ── Mocktails (51) ──
  { id: "m1", image: MOCKTAIL_IMAGES[0], name: "PINA COLADA", description: "Coconut cream blended with pineapple juice and sugar syrup, garnished with pineapple wedge. Creamy, tropical finish.", category: "mocktails" },
  { id: "m2", image: MOCKTAIL_IMAGES[1], name: "PINEAPPLE PUNCH", description: "Pineapple cordial shaken with citrus syrup and fresh lime, garnished with mint sprig. Bright, juicy finish.", category: "mocktails" },
  { id: "m3", image: MOCKTAIL_IMAGES[2], name: "COCONUT DAIQUIRI", description: "Coconut syrup shaken with lime juice and sugar syrup, garnished with lime wheel. Smooth, refreshing finish.", category: "mocktails" },
  { id: "m4", image: MOCKTAIL_IMAGES[3], name: "KOKUM BREEZE", description: "Kokum syrup shaken with lime and soda, garnished with mint sprig. Tangy, cooling finish.", category: "mocktails" },
  { id: "m5", image: MOCKTAIL_IMAGES[4], name: "KIWI SLUSH", description: "Kiwi puree blended with lime juice and sugar syrup, garnished with kiwi slice. Icy, vibrant finish.", category: "mocktails" },
  { id: "m6", image: MOCKTAIL_IMAGES[5], name: "PASSION FRUIT LOVE", description: "Passion fruit syrup shaken with citrus juice and soda, garnished with passion fruit seeds. Sweet, tropical finish.", category: "mocktails" },
  { id: "m7", image: MOCKTAIL_IMAGES[0], name: "ROSE MARTINI", description: "Rose syrup shaken with citrus juice and sugar syrup, garnished with rose petal. Floral, elegant finish.", category: "mocktails" },
  { id: "m8", image: MOCKTAIL_IMAGES[1], name: "CUCUMBER GIMLET", description: "Cucumber cordial shaken with lime juice and sugar syrup, garnished with cucumber slice. Crisp, clean finish.", category: "mocktails" },
  { id: "m9", image: MOCKTAIL_IMAGES[2], name: "ELDERFLOWER & ROSEMARY SPRITZ", description: "Elderflower syrup built with soda and rosemary infusion, garnished with rosemary sprig. Light, floral, aromatic finish.", category: "mocktails" },
  { id: "m10", image: MOCKTAIL_IMAGES[3], name: "ORANGE & KAFFIR LIME MOJITO", description: "Orange cordial mixed with kaffir lime, mint, and lime, topped with soda. Bright, citrusy finish.", category: "mocktails" },
  { id: "m11", image: MOCKTAIL_IMAGES[4], name: "STRAWBERRY BASIL LEMONADE", description: "Strawberry puree shaken with lemon juice and basil syrup, garnished with basil leaf. Fresh, sweet-tart finish.", category: "mocktails" },
  { id: "m12", image: MOCKTAIL_IMAGES[5], name: "BERRY BRAMBLE", description: "Mixed berry puree shaken with lemon juice and sugar syrup, garnished with berries. Fruity, crisp finish.", category: "mocktails" },
  { id: "m13", image: MOCKTAIL_IMAGES[0], name: "RAW MANGO & CURRY LEAF SPRITZ", description: "Raw mango syrup built with soda and curry leaf infusion, garnished with curry leaf. Tangy, refreshing finish.", category: "mocktails" },
  { id: "m14", image: MOCKTAIL_IMAGES[1], name: "VIRGIN TODDY", description: "Honey syrup stirred with lemon juice, warm water, and spices, garnished with lemon wheel. Comforting, soothing finish.", category: "mocktails" },
  { id: "m15", image: MOCKTAIL_IMAGES[2], name: "KHUSH KHUSH SHERBET", description: "Poppy seed syrup shaken with milk and cardamom, garnished with nutmeg dust. Creamy, aromatic finish.", category: "mocktails" },
  { id: "m16", image: MOCKTAIL_IMAGES[3], name: "POMEGRANATE MOJITO", description: "Pomegranate cordial mixed with mint and lime, topped with soda. Garnished with mint sprig. Fresh, tangy finish.", category: "mocktails" },
  { id: "m17", image: MOCKTAIL_IMAGES[4], name: "BLUEBERRY LAVENDER FIZZ", description: "Blueberry syrup shaken with lavender infusion and lemon, topped with soda. Garnished with lavender sprig. Floral, bright finish.", category: "mocktails" },
  { id: "m18", image: MOCKTAIL_IMAGES[5], name: "PEACH GINGER SPRITZ", description: "Peach syrup built with ginger ale and soda, garnished with peach slice. Juicy, gently spiced finish.", category: "mocktails" },
  { id: "m19", image: MOCKTAIL_IMAGES[0], name: "WATERMELON MINT MOJITO", description: "Watermelon cordial mixed with mint and lime, topped with soda, garnished with mint sprig. Fresh, cooling finish.", category: "mocktails" },
  { id: "m20", image: MOCKTAIL_IMAGES[1], name: "PINEAPPLE BASIL REFRESHER", description: "Pineapple cordial shaken with basil syrup and lime, garnished with basil leaf. Bright, tropical finish.", category: "mocktails" },
  { id: "m21", image: MOCKTAIL_IMAGES[2], name: "CUCUMBER MINT COOLER", description: "Cucumber cordial shaken with mint and lime, topped with soda, garnished with cucumber slice. Crisp, refreshing finish.", category: "mocktails" },
  { id: "m22", image: MOCKTAIL_IMAGES[3], name: "VIRGIN PICANTE", description: "Chili syrup shaken with lime juice and agave, garnished with chili slice. Spicy, zesty finish.", category: "mocktails" },
  { id: "m23", image: MOCKTAIL_IMAGES[4], name: "PASSION FRUIT SPRITZ", description: "Passion fruit syrup built with soda and citrus, garnished with passion fruit seeds. Light, fruity finish.", category: "mocktails" },
  { id: "m24", image: MOCKTAIL_IMAGES[5], name: "WATERMELON & BASIL SPARKLE", description: "Watermelon cordial shaken with basil syrup and lime, topped with soda, garnished with basil leaf. Fresh, vibrant finish.", category: "mocktails" },
  { id: "m25", image: MOCKTAIL_IMAGES[0], name: "IRISH MOJITO", description: "Apple cordial mixed with mint and lime, topped with soda, garnished with mint sprig. Clean, refreshing finish.", category: "mocktails" },
  { id: "m26", image: MOCKTAIL_IMAGES[1], name: "LYCHEE MANGO SPRITZ", description: "Lychee and mango syrups built with soda and citrus, garnished with lychee. Sweet, tropical finish.", category: "mocktails" },
  { id: "m27", image: MOCKTAIL_IMAGES[2], name: "POMEGRANATE COSMO", description: "Pomegranate cordial shaken with lime and orange syrup, garnished with lime twist. Tart, elegant finish.", category: "mocktails" },
  { id: "m28", image: MOCKTAIL_IMAGES[3], name: "STRAWBERRY MOJITO", description: "Strawberry puree muddled with mint and lime, topped with soda, garnished with mint sprig. Juicy, refreshing finish.", category: "mocktails" },
  { id: "m29", image: MOCKTAIL_IMAGES[4], name: "VIRGIN MOJITO", description: "Lime juice muddled with mint and sugar syrup, topped with soda, garnished with mint sprig. Crisp, refreshing finish.", category: "mocktails" },
  { id: "m30", image: MOCKTAIL_IMAGES[5], name: "MANGO MOJITO", description: "Mango puree mixed with mint and lime, topped with soda, garnished with mint sprig. Juicy, tropical finish.", category: "mocktails" },
  { id: "m31", image: MOCKTAIL_IMAGES[0], name: "APPLE & CINNAMON SMASH", description: "Apple cordial mixed with cinnamon syrup and lime, topped with soda, garnished with apple slice. Warm, crisp finish.", category: "mocktails" },
  { id: "m32", image: MOCKTAIL_IMAGES[1], name: "LEMONGRASS MOJITO", description: "Lemongrass syrup mixed with mint and lime, topped with soda, garnished with mint sprig. Fresh, aromatic finish.", category: "mocktails" },
  { id: "m33", image: MOCKTAIL_IMAGES[2], name: "POPCORN SPRITZ", description: "Popcorn syrup built with soda and citrus, garnished with popcorn. Light, buttery, refreshing finish.", category: "mocktails" },
  { id: "m34", image: MOCKTAIL_IMAGES[3], name: "SPICED JAMUN FIZZ", description: "Jamun syrup shaken with citrus and spices, topped with soda, garnished with jamun. Sweet, spiced finish.", category: "mocktails" },
  { id: "m35", image: MOCKTAIL_IMAGES[4], name: "LYCHEE ROSE MOJITO", description: "Lychee cordial mixed with rose syrup, mint, and lime, topped with soda, garnished with mint sprig. Floral, refreshing finish.", category: "mocktails" },
  { id: "m36", image: MOCKTAIL_IMAGES[5], name: "BUBBLE GUM SPRITZ", description: "Bubble gum syrup built with soda and citrus, garnished with lemon twist. Sweet, playful, refreshing finish.", category: "mocktails" },
  { id: "m37", image: MOCKTAIL_IMAGES[0], name: "WATERMELON PICANTE", description: "Fresh watermelon puree, shaken with lime, agave, and chilli, mint garnish, juicy, lightly spicy, refreshing finish.", category: "mocktails" },
  { id: "m38", image: MOCKTAIL_IMAGES[1], name: "HIBISCUS ROSE FIZZ", description: "Hibiscus infusion, built with rose syrup, citrus, and soda, dried rose petal garnish, floral, crisp, lightly sparkling finish.", category: "mocktails" },
  { id: "m39", image: MOCKTAIL_IMAGES[2], name: "MANGO PASSION FRUIT", description: "Mango purée, shaken with passion fruit, citrus, and soda, fresh mint garnish, bright, tropical, refreshingly smooth finish.", category: "mocktails" },
  { id: "m40", image: MOCKTAIL_IMAGES[3], name: "LYCHEE & LEMONGRASS SPRITZ", description: "Lychee purée, built with lemongrass infusion, citrus, and soda, lemongrass stalk garnish, light, floral, refreshing finish.", category: "mocktails" },
  { id: "m41", image: MOCKTAIL_IMAGES[4], name: "JALJEERA", description: "Jaljeera syrup, stirred and chilled, roasted cumin, mint, tamarind, lemon wedge garnish, savoury spiced tang with refreshing finish.", category: "mocktails" },
  { id: "m42", image: MOCKTAIL_IMAGES[5], name: "CLEVER RASPBERRY MOJITO", description: "Raspberry syrup, muddled and stirred, lime, mint, soda, mint sprig garnish, bright berry freshness with crisp cooling finish.", category: "mocktails" },
  { id: "m43", image: MOCKTAIL_IMAGES[0], name: "YUZU & MANGO DAIQUIRI", description: "Yuzu cordial, shaken, ripe mango, lime, citrus notes, citrus peel garnish, vibrant tropical acidity with smooth balanced finish.", category: "mocktails" },
  { id: "m44", image: MOCKTAIL_IMAGES[1], name: "GRILLED PINEAPPLE MOJITO", description: "Grilled pineapple purée, shaken, fresh lime juice, sugar syrup, mint leaves, pineapple wedge garnish, smoky tropical refreshing finish.", category: "mocktails" },
  { id: "m45", image: MOCKTAIL_IMAGES[2], name: "GREEN APPLE COOLER", description: "Green apple cordial, lime juice, and mint — topped with soda for a tangy twist.", category: "mocktails" },
  { id: "m46", image: MOCKTAIL_IMAGES[3], name: "JASMINE PEACH ICED TEA", description: "Jasmine tea, peach puree, lemon juice—served over ice, fragrant, fruity, refreshing with a smooth floral finish.", category: "mocktails" },
  { id: "m47", image: MOCKTAIL_IMAGES[4], name: "BLUEBERRY SAGE REFRESHER", description: "Blueberry puree, fresh sage, lemon, soda —fruity, herbaceous, refreshing with a crisp citrus finish.", category: "mocktails" },
  { id: "m48", image: MOCKTAIL_IMAGES[5], name: "HIBISCUS BERRY SPRITZ", description: "Berry puree, hibiscus syrup, lime, soda—fruity, floral, refreshing with a vibrant sparkling finish.", category: "mocktails" },
  { id: "m49", image: MOCKTAIL_IMAGES[0], name: "LAVENDER FIZZ", description: "Lavender syrup, lemon juice, soda—light, floral, sparkling, refreshing with a delicate citrus finish.", category: "mocktails" },
  { id: "m50", image: MOCKTAIL_IMAGES[1], name: "ROSE & POMEGRANATE SPARKLER", description: "Pomegranate juice, rose syrup, lime, soda—fruity, floral, refreshing with a delicate sparkling finish.", category: "mocktails" },
  { id: "m51", image: MOCKTAIL_IMAGES[2], name: "KIWI CORIANDER TWIST", description: "Kiwi puree, fresh coriander, lime, soda—zesty, herbaceous, refreshing with a bright citrus finish.", category: "mocktails" },
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
