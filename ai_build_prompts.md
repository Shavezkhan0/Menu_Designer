# AI Prompts — Restaurant Menu Designer
### How to Use
Copy each prompt **in order** and paste into your AI tool (ChatGPT, Gemini, Claude, etc.).
Each prompt builds on the previous one. Always paste the **full prompt** as written.

---

## PROMPT 1 — Project Setup & File Structure

```
I am building an AI-Powered Restaurant Menu Designer inside an existing Next.js 15 monorepo (TypeScript + Tailwind CSS v4 + ShadCN UI). The project lives at apps/frontend/src.

Create a new route at /menu-designer with a completely standalone layout (no existing sidebar or navigation).

TASK: Create the following empty files/folders with the correct boilerplate:

1. apps/frontend/src/app/menu-designer/layout.tsx
   - Standalone layout, no global nav
   - Import Inter and Playfair Display from next/font/google
   - Full screen height, dark background #0a0a0f
   - No padding, no margins

2. apps/frontend/src/app/menu-designer/page.tsx
   - Simple server component
   - Imports and renders <MenuDesignerShell /> from @/components/menu-designer/MenuDesignerShell
   - Title: "Menu Designer"

3. apps/frontend/src/components/menu-designer/MenuDesignerShell.tsx
   - 'use client' directive
   - Two-panel layout: left sidebar (280px fixed) + right preview panel (flex-1)
   - Both panels full viewport height, overflow hidden
   - Left sidebar background: #0a0a0f, right border: 1px solid rgba(255,255,255,0.06)
   - Right panel background: #111118
   - At the top, a full-width top bar (48px height, same dark bg, bottom border rgba(255,255,255,0.06)) containing:
     - Left: "← Menu Designer" text (white, 14px, font-medium)
     - Center: Device preview toggle buttons [Desktop] [Tablet] [Mobile] with icons
     - Right: [Export ↓] ghost button + [⚡ AI] violet gradient button
   - Below top bar: sidebar + preview split
   - Use placeholder text in both panels for now (we will fill them in later prompts)

Tech stack: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion (already installed), Lucide React, Zustand.

Design rules:
- Dark theme throughout (#0a0a0f sidebar, #111118 preview bg)
- Accent color: violet #a78bfa
- All text: zinc-100 for primary, zinc-400 for secondary, zinc-600 for muted
- Font: Inter for UI, Geist Mono (or monospace) for prices
- No rounded-none anywhere — use rounded-xl for cards, rounded-lg for inputs, rounded-full for pills
- Subtle borders: rgba(255,255,255,0.06) to rgba(255,255,255,0.10)

Output all three files with complete working TypeScript code.
```

---

## PROMPT 2 — Static Menu Data

```
I am building a Restaurant Menu Designer in Next.js 15 + TypeScript. The menu is drinks-only (no food).

TASK: Create the file apps/frontend/src/data/menuData.ts

This file should export:

1. A TypeScript interface called MenuItem:
{
  id: string;
  name: string;
  price: number;         // in dollars, e.g. 12.50
  description: string;  // 1-2 sentence professional description
  category: string;     // category slug e.g. "cocktails"
  tags: string[];       // e.g. ["citrus", "gin", "refreshing"]
  isSignature?: boolean;
  isNew?: boolean;
  alcoholContent?: string; // e.g. "12% ABV"
  servingStyle?: string;   // e.g. "Served on the rocks"
  garnish?: string;        // e.g. "Mint sprig, lime wedge"
}

2. A TypeScript interface called MenuCategory:
{
  id: string;
  label: string;
  emoji: string;
  description: string;
}

3. An array called MENU_CATEGORIES with these 8 categories:
- { id: "cocktails", label: "Cocktails", emoji: "🍸", description: "Handcrafted signature cocktails" }
- { id: "mocktails", label: "Mocktails", emoji: "🥤", description: "Premium alcohol-free creations" }
- { id: "coffee", label: "Coffee", emoji: "☕", description: "Artisan coffee & espresso drinks" }
- { id: "tea", label: "Tea", emoji: "🍵", description: "Curated teas from around the world" }
- { id: "wine", label: "Wine", emoji: "🍷", description: "Carefully selected wines" }
- { id: "beer", label: "Beer", emoji: "🍺", description: "Craft & imported beers" }
- { id: "soft-drinks", label: "Soft Drinks", emoji: "🥛", description: "Refreshing non-alcoholic beverages" }
- { id: "juices", label: "Juices", emoji: "🍹", description: "Fresh pressed & blended juices" }

4. An array called MENU_ITEMS with realistic, premium menu items for each category:
- Cocktails: 20 items (e.g. Midnight Negroni, Velvet Rose, Azure Horizon, Smoky Mule, Gold Rush, etc.)
- Mocktails: 15 items (e.g. Virgin Sunrise, Berry Bliss, Cucumber Cooler, etc.)
- Coffee: 10 items (e.g. Single Origin Pour Over, Oat Milk Cortado, etc.)
- Tea: 10 items (e.g. Dragon Pearl Jasmine, Earl Grey Supreme, etc.)
- Wine: 10 items (e.g. Château Margaux Bordeaux 2018, Whispering Angel Rosé, etc.)
- Beer: 10 items (e.g. Belgian Tripel, IPA Reserve, Dark Stout, etc.)
- Soft Drinks: 8 items (e.g. Sparkling Elderflower, Japanese Yuzu Soda, etc.)
- Juices: 8 items (e.g. Cold Press Green Detox, Watermelon Mint, etc.)

Make all descriptions professional and premium (1-2 sentences). Make prices realistic. Mark 3-4 items per category as isSignature: true and 2 items as isNew: true.

Output the complete menuData.ts file.
```

---

## PROMPT 3 — Zustand State Management Store

```
I am building a Restaurant Menu Designer in Next.js 15 + TypeScript + Zustand.

TASK: Create the file apps/frontend/src/hooks/useMenuDesigner.ts

This is a Zustand store (using zustand's create function with immer middleware if available, otherwise plain create).

The store should contain this full state shape and all actions:

STATE:
```typescript
interface RestaurantInfo {
  name: string;
  tagline: string;
  logoUrl: string | null;    // base64 or URL
  coverImageUrl: string | null;
  contactNumber: string;
  email: string;
  address: string;
  website: string;
}

interface Theme {
  primaryColor: string;      // hex
  accentColor: string;       // hex
  backgroundColor: string;  // hex
  textColor: string;         // hex
  cardStyle: 'glass' | 'solid' | 'minimal' | 'bordered';
  fontFamily: string;        // CSS font-family value
  borderRadius: 'sharp' | 'rounded' | 'pill';
}

interface Background {
  type: 'color' | 'gradient' | 'image';
  value: string;             // hex, CSS gradient, or image URL/base64
  blur: number;              // 0-20
  brightness: number;        // 0.5-1.5
  opacity: number;           // 0.1-1.0
}

type DevicePreview = 'desktop' | 'tablet' | 'mobile';
type LayoutType = 'single-column' | 'two-column' | 'grid' | 'card' | 'premium' | 'cocktail' | 'fine-dining';

interface MenuDesignerState {
  restaurantInfo: RestaurantInfo;
  selectedCategories: string[];     // array of category ids
  activeLayout: LayoutType;
  theme: Theme;
  background: Background;
  devicePreview: DevicePreview;
  isAIPanelOpen: boolean;
  activeSidebarSection: string;     // which accordion section is open
  selectedItemId: string | null;    // for AI description generation
}
```

ACTIONS (all as functions in the store):
- setRestaurantInfo(partial: Partial<RestaurantInfo>): void
- toggleCategory(categoryId: string): void     // add if not present, remove if present
- setSelectedCategories(ids: string[]): void
- setActiveLayout(layout: LayoutType): void
- setTheme(partial: Partial<Theme>): void
- setBackground(partial: Partial<Background>): void
- setDevicePreview(device: DevicePreview): void
- setIsAIPanelOpen(open: boolean): void
- setActiveSidebarSection(section: string): void
- setSelectedItemId(id: string | null): void
- resetToDefaults(): void

DEFAULT VALUES:
- restaurantInfo: { name: "The Velvet Lounge", tagline: "Crafted with Passion", logoUrl: null, coverImageUrl: null, contactNumber: "+1 (555) 123-4567", email: "hello@velvetlounge.com", address: "42 Bourbon Street, New Orleans, LA", website: "www.velvetlounge.com" }
- selectedCategories: ["cocktails", "mocktails", "wine"]  (pre-selected)
- activeLayout: "cocktail"
- theme: { primaryColor: "#a78bfa", accentColor: "#f59e0b", backgroundColor: "#0d0d14", textColor: "#f4f4f5", cardStyle: "glass", fontFamily: "'Playfair Display', serif", borderRadius: "rounded" }
- background: { type: "gradient", value: "linear-gradient(135deg, #0d0d14 0%, #1a1025 50%, #0d1a14 100%)", blur: 0, brightness: 1, opacity: 1 }
- devicePreview: "desktop"
- isAIPanelOpen: false
- activeSidebarSection: "categories"
- selectedItemId: null

Also export a hook: export const useMenuDesigner = () => useMenuDesignerStore();

Output the complete file. Use Zustand v5 syntax (zustand is already installed).
```

---

## PROMPT 4 — Left Sidebar: Category Selector + Layout Selector

```
I am building a Restaurant Menu Designer. I have the Zustand store at @/hooks/useMenuDesigner and menu data at @/data/menuData (with MENU_CATEGORIES array and MenuCategory interface).

TASK: Create two components:

FILE 1: apps/frontend/src/components/menu-designer/LeftSidebar/CategorySelector.tsx

This is a 'use client' component.

Design requirements:
- Section label at top: "CATEGORIES" in 11px uppercase, letter-spacing 0.1em, zinc-500 color
- Below: a grid of category cards (2 columns)
- Each card shows: large emoji (24px) + category label (13px, font-medium) + item count
- Selected state: violet gradient border (1px solid), violet/10 background, violet text
- Unselected state: zinc-800 border, transparent bg, zinc-400 text
- Hover state: zinc-700 border, zinc-800/50 bg
- Cards use rounded-xl, padding 12px, cursor-pointer
- Smooth transition on select (scale 0.97 on press, spring animation)
- Use Framer Motion for selection animation
- On click: calls toggleCategory() from Zustand store
- Show a checkmark icon (✓) in top-right corner when selected (fade in with Framer Motion)
- Import MENU_CATEGORIES from @/data/menuData
- Import useMenuDesigner from @/hooks/useMenuDesigner

FILE 2: apps/frontend/src/components/menu-designer/LeftSidebar/LayoutSelector.tsx

This is a 'use client' component.

Design requirements:
- Section label: "LAYOUT STYLE" in 11px uppercase, letter-spacing 0.1em, zinc-500
- Show 7 layout options as visual thumbnail cards in a 2-column grid:
  - single-column: show three horizontal bars stacked
  - two-column: show two columns of small bars
  - grid: show a 2x2 grid of squares
  - card: show overlapping card shapes
  - premium: show centered single wide bar with decorative lines
  - cocktail: show zigzag alternating layout preview
  - fine-dining: show centered narrow column with elegant spacing
- Each thumbnail is 60px tall, uses simple SVG or CSS to show the layout shape
- Selected: violet border + violet bg/10
- Unselected: zinc-800 border
- Layout name shown below thumbnail (12px, font-medium)
- On click: calls setActiveLayout() from Zustand store
- Import useMenuDesigner from @/hooks/useMenuDesigner

Use TypeScript, Framer Motion, Tailwind CSS v4, Lucide React. Output both complete files.
```

---

## PROMPT 5 — Left Sidebar: Branding Panel + Background Panel

```
I am building a Restaurant Menu Designer in Next.js 15 + TypeScript + Tailwind CSS v4 + Framer Motion.

Zustand store is at @/hooks/useMenuDesigner. It has setRestaurantInfo(), setTheme(), setBackground() actions.

TASK: Create two components:

FILE 1: apps/frontend/src/components/menu-designer/LeftSidebar/BrandingPanel.tsx

'use client' component. Contains:

1. Restaurant Name input
   - Label: "RESTAURANT NAME" (11px, uppercase, zinc-500)
   - Dark input: bg-zinc-900, border border-zinc-700, rounded-lg, text-zinc-100
   - Focus ring: violet (#a78bfa) outline
   - On change: calls setRestaurantInfo({ name: value })

2. Tagline input (same styling)

3. Logo Upload section
   - Label: "LOGO"
   - Dashed border upload zone (80px tall, rounded-xl, zinc-800 border, zinc-900 bg)
   - Shows "Upload Logo" with upload icon when no logo
   - Shows preview image + "Remove" button when logo is set
   - Hidden file input (accept image/*), reads as base64, calls setRestaurantInfo({ logoUrl })
   - If logo exists: show it in a 48x48 rounded-lg preview

4. Theme Colors section
   - Label: "THEME COLORS"
   - Two color swatches side by side:
     a. "Primary" — uses theme.primaryColor
     b. "Accent" — uses theme.accentColor
   - Each swatch is a 36x36 rounded-lg colored div, clicking opens a hidden <input type="color">
   - On change: calls setTheme({ primaryColor }) or setTheme({ accentColor })

5. Font Picker
   - Label: "MENU FONT"
   - Dropdown select (styled dark) with options:
     - 'Playfair Display, serif' → "Playfair Display"
     - 'Cormorant Garamond, serif' → "Cormorant Garamond"
     - 'Inter, sans-serif' → "Inter"
     - 'Libre Baskerville, serif' → "Libre Baskerville"
     - 'Great Vibes, cursive' → "Great Vibes"
   - On change: calls setTheme({ fontFamily: value })

6. Card Style
   - Label: "CARD STYLE"
   - 4 pill buttons: Glass | Solid | Minimal | Bordered
   - Selected: violet bg, white text; Unselected: zinc-800 bg, zinc-400 text
   - On click: calls setTheme({ cardStyle: value })

FILE 2: apps/frontend/src/components/menu-designer/LeftSidebar/BackgroundPanel.tsx

'use client' component. Contains:

1. Background Type selector
   - 3 tabs: [Color] [Gradient] [Image]
   - Animated underline indicator (Framer Motion layoutId)
   - On switch: calls setBackground({ type })

2. Color mode:
   - Color picker (hidden input type="color") + hex display input
   - 6 preset color swatches: #0d0d14, #1a0a2e, #0a1628, #1a1008, #1a0808, #0a1a0a
   - Clicking preset: calls setBackground({ type: 'color', value: hex })

3. Gradient mode:
   - 6 preset gradient buttons (pill shaped, showing actual gradient as background):
     - "Midnight": linear-gradient(135deg, #0d0d14 0%, #1a1025 100%)
     - "Deep Ocean": linear-gradient(135deg, #0a1628 0%, #0d0d14 100%)
     - "Velvet": linear-gradient(135deg, #1a0a2e 0%, #0d0d14 100%)
     - "Ember": linear-gradient(135deg, #1a1008 0%, #0d0d14 100%)
     - "Forest": linear-gradient(135deg, #0a1a0a 0%, #0d0d14 100%)
     - "Rose": linear-gradient(135deg, #1a0808 0%, #0d0d14 100%)
   - On click: setBackground({ type: 'gradient', value: gradientCSS })

4. Image mode:
   - Upload zone (same style as logo upload in BrandingPanel)
   - Shows base64 preview when uploaded
   - Below: "GENERATE WITH AI" button (violet gradient, sparkles icon)
     - This button opens a small text area below it:
       - Placeholder: 'e.g. "Luxury black marble with gold veins"'
       - [Generate Background] button
       - On click: calls fetch('/api/grok/generate-background', { method: 'POST', body: JSON.stringify({ prompt }) })
       - Shows loading spinner while waiting
       - On success: calls setBackground({ type: 'image', value: imageUrl })

5. Blur slider (0-20, label "BLUR")
6. Brightness slider (0.5-1.5, step 0.1, label "BRIGHTNESS")

All sliders: custom styled (dark track, violet thumb).
All inputs/selects: dark theme matching sidebar.

Output both complete files with full TypeScript and Tailwind CSS v4.
```

---

## PROMPT 6 — AI Assistant Panel (Sidebar)

```
I am building a Restaurant Menu Designer. I need the AI Assistant sidebar panel.

Tech: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.
Zustand store at @/hooks/useMenuDesigner has: setRestaurantInfo(), selectedItemId, restaurantInfo.

TASK: Create apps/frontend/src/components/menu-designer/LeftSidebar/AIAssistant.tsx

'use client' component.

This panel looks like the Raycast command palette — premium, dark, focused.

Design:
- Header: "⚡ AI ASSISTANT" label (11px, uppercase, zinc-500) + a small model badge showing "Grok" or "OpenAI" in a violet pill
- A textarea for custom prompts (dark bg, zinc-800 border, rounded-xl, 80px tall, violet focus ring)
  - Placeholder: "Ask AI to write descriptions, suggest names, generate themes..."
- Quick action buttons grid (2 columns, each a pill button with icon):
  - ✍️ "Write Description" — for selected item
  - 🍹 "Suggest Names" — suggest cocktail names
  - 🏠 "Restaurant Bio" — generate about us text
  - ✨ "Premium Style" — rewrite all in fine dining style
  - 🎨 "Generate Theme" — AI picks colors/fonts
  - 📋 "Chef's Picks" — suggest signature items
- Each quick button: zinc-900 bg, zinc-700 border, zinc-300 text, hover: zinc-800 bg + violet border
- [Generate] button: full width, violet gradient (from-violet-600 to-violet-500), rounded-xl
  - Shows sparkle animation while loading (use Framer Motion animate on the icon)
  - Disabled + spinner while fetching

Result display area (appears below after generation, Framer Motion slide down):
- Dark card: zinc-900 bg, zinc-700 border, rounded-xl, p-4
- Result text in zinc-100, 14px
- Two action buttons below result:
  - [Apply] — copies result to the appropriate field in the store
  - [Copy] — copies to clipboard
  - [Regenerate] — runs same prompt again

API call logic:
- fetch('/api/grok/generate-text', { method: 'POST', body: JSON.stringify({ prompt, type }) })
- Show error state if fetch fails (red border on textarea, error message below)
- Loading state: shimmer animation on the result area

Style the entire panel with subtle violet glow in top-left corner using:
background: radial-gradient(ellipse at top left, rgba(167,139,250,0.06) 0%, transparent 60%)

Output the complete file.
```

---

## PROMPT 7 — Left Sidebar Shell (Accordion Wrapper)

```
I am building a Restaurant Menu Designer. I need the full left sidebar that wraps all individual panels.

Tech: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.
Zustand store at @/hooks/useMenuDesigner has: activeSidebarSection, setActiveSidebarSection.

Imports available:
- CategorySelector from ./CategorySelector
- LayoutSelector from ./LayoutSelector
- BrandingPanel from ./BrandingPanel
- BackgroundPanel from ./BackgroundPanel
- AIAssistant from ./AIAssistant

TASK: Create apps/frontend/src/components/menu-designer/LeftSidebar/LeftSidebar.tsx

'use client' component.

Structure:
- Full height, 280px width, overflow-y-auto (custom scrollbar: thin, zinc-800 track, zinc-600 thumb)
- Background: #0a0a0f
- Right border: 1px solid rgba(255,255,255,0.06)

Contains 5 accordion sections. Each section:
- Header: clickable row (full width, 40px tall, px-4)
  - Left: icon (16px, zinc-400) + section label (13px, font-medium, zinc-300)
  - Right: ChevronDown icon (14px, zinc-500) that rotates 180deg when open (Framer Motion)
  - Hover: bg-zinc-900/50
- Body: animated height (Framer Motion AnimatePresence + motion.div with height: 'auto'/'0')
  - Padding: px-3 pb-3 pt-1

The 5 sections with their icons (use Lucide React):
1. "Categories" — LayoutGrid icon → renders <CategorySelector />
2. "Layout" — Layers icon → renders <LayoutSelector />
3. "Branding" — Palette icon → renders <BrandingPanel />
4. "Background" — Image icon → renders <BackgroundPanel />
5. "AI Tools" — Sparkles icon → renders <AIAssistant />

Accordion behavior:
- Only ONE section open at a time
- Clicking open section: closes it
- Clicking closed section: closes current, opens new
- Default open: "Categories"
- State managed via useMenuDesigner().activeSidebarSection and setActiveSidebarSection()

Between sections: a 1px divider line at rgba(255,255,255,0.05)

At the bottom of the sidebar (sticky/fixed to bottom):
- A small footer: "Menu Designer v1.0" in 11px zinc-600, centered
- Separated by top border rgba(255,255,255,0.05)

Output the complete LeftSidebar.tsx file.
```

---

## PROMPT 8 — Menu Preview: Header + Category Nav + Footer

```
I am building a Restaurant Menu Designer. I need the menu preview components that show what customers will see.

Tech: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.
Zustand store at @/hooks/useMenuDesigner provides: restaurantInfo, theme, background, selectedCategories.
Menu data at @/data/menuData provides: MENU_CATEGORIES.

TASK: Create three files:

FILE 1: apps/frontend/src/components/menu-designer/MenuPreview/MenuHeader.tsx
- 'use client' component
- Props: none (reads from Zustand store)
- Renders the restaurant cover area:
  - Background: uses background.value (color/gradient/image)
  - Min-height: 280px for desktop, adapts for mobile
  - Apply backdrop blur and brightness from store
  - Center-aligned content:
    - Logo (if logoUrl): circular image, 80px, with ring in primaryColor
    - Restaurant Name: large (font size adapts to devicePreview: 48px desktop, 36px tablet, 28px mobile)
      Uses theme.fontFamily for this text
      Color: theme.textColor
    - Tagline: smaller, opacity 0.7, italic
  - Gradient overlay at bottom: linear-gradient(to bottom, transparent, backgroundColor)

FILE 2: apps/frontend/src/components/menu-designer/MenuPreview/MenuCategoryNav.tsx
- 'use client' component
- Props: activeCategory (string), onCategoryChange (fn)
- Shows sticky horizontal tab bar
  - Background: theme.backgroundColor with backdrop-filter blur(8px)
  - Shows only the selectedCategories from store
  - Each tab: emoji + label, pill shaped
  - Active tab: primaryColor background, white text
  - Inactive tab: transparent bg, zinc-400 text
  - Hover: zinc-800 bg
  - Smooth underline or background indicator (Framer Motion layoutId)
  - Horizontally scrollable on mobile (overflow-x-auto, scrollbar hidden)
  - Import MENU_CATEGORIES from @/data/menuData to get emoji for each id

FILE 3: apps/frontend/src/components/menu-designer/MenuPreview/MenuFooter.tsx
- 'use client' component
- Reads restaurantInfo from Zustand store
- Layout: dark section at bottom of menu
- Contains:
  - Restaurant name (large, uses theme.fontFamily)
  - Contact info row: phone + email + address (icons from Lucide: Phone, Mail, MapPin)
  - Website link
  - A decorative divider line in primaryColor
  - Copyright line: "© 2024 {restaurantName}. All rights reserved."
  - A small "Generated with Menu Designer" badge in zinc-700
  - QR code placeholder: a 64x64 zinc-800 square with a QR icon and "Scan for Menu" text below it

Styling rules for all three:
- Uses theme from store dynamically (all colors from theme object, not hardcoded)
- Framer Motion animate on mount (fade in from below, 0.4s)
- Professional, premium restaurant website aesthetic

Output all three complete files.
```

---

## PROMPT 9 — Menu Item Card + All Layout Components

```
I am building a Restaurant Menu Designer. I need the menu item card and layout components.

Tech: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.
Zustand store at @/hooks/useMenuDesigner provides: theme, selectedItemId, setSelectedItemId.
MenuItem interface from @/data/menuData: { id, name, price, description, category, tags, isSignature, isNew, alcoholContent, servingStyle, garnish }

TASK: Create these files:

FILE 1: apps/frontend/src/components/menu-designer/MenuPreview/MenuItemCard.tsx
- 'use client' component
- Props: item: MenuItem, layoutType: string, onSelect: () => void
- Glassmorphism card:
  - background: rgba(255,255,255,0.04)
  - backdrop-filter: blur(12px)
  - border: 1px solid rgba(255,255,255,0.08)
  - border-radius: 12px (or 8px for fine-dining)
  - box-shadow: 0 4px 6px -1px rgba(0,0,0,0.4)
- Selected state (when id === selectedItemId): violet border + violet/10 bg
- Hover: y: -3px (Framer Motion), elevated shadow
- Content:
  - Top row: item name (font-medium, theme.textColor, theme.fontFamily) + price (right-aligned, monospace font, theme.primaryColor)
  - Badges row: isNew → green "New" badge; isSignature → amber "★ Signature" badge
  - Description: 14px, zinc-400, line-clamp-2
  - Bottom row (small): alcoholContent (if present) | servingStyle | tags as small pills
  - "✨ AI" icon button (bottom right, appears on hover) — clicking sets selectedItemId and opens AI panel
- Stagger animation: initial={{ opacity: 0, y: 20 }}, animate={{ opacity: 1, y: 0 }}

FILE 2: apps/frontend/src/components/menu-designer/layouts/SingleColumnLayout.tsx
- Props: items: MenuItem[]
- One item per row, full width cards
- Divider line between items

FILE 3: apps/frontend/src/components/menu-designer/layouts/TwoColumnLayout.tsx
- Props: items: MenuItem[]
- Two equal columns grid
- MenuItemCard in each cell

FILE 4: apps/frontend/src/components/menu-designer/layouts/GridLayout.tsx
- Props: items: MenuItem[]
- 3-column grid on desktop, 2 on tablet, 1 on mobile (using CSS grid)
- Compact card style

FILE 5: apps/frontend/src/components/menu-designer/layouts/CocktailLayout.tsx
- Props: items: MenuItem[]
- Alternating layout: item 1 full width (featured), items 2-3 side by side, item 4 full width, etc.
- Featured items have larger text, decorative separator line in primaryColor
- This is the COCKTAIL BAR style — elegant, dark, with subtle glow effects

FILE 6: apps/frontend/src/components/menu-designer/layouts/PremiumLayout.tsx
- Props: items: MenuItem[]
- Centered, narrow column (max-width 640px, centered)
- Each item: name left + price right on same line, description below in smaller italic text
- Thin horizontal rule between items in primaryColor at 20% opacity
- Like a fine restaurant printed menu, no card borders

FILE 7: apps/frontend/src/components/menu-designer/layouts/FineDiningLayout.tsx
- Props: items: MenuItem[]
- Single centered column, wide spacing between items
- Item name in large font (theme.fontFamily), centered
- Price centered below name in monospace
- Description centered, smaller, zinc-500
- Decorative • • • separator between items

All layout files import MenuItemCard and use motion.div stagger container for animated item entry.

Output all files. Each layout should feel distinct and premium.
```

---

## PROMPT 10 — Menu Preview Canvas (Main Preview Area)

```
I am building a Restaurant Menu Designer. I need the main preview canvas that assembles everything.

Tech: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.
Zustand store at @/hooks/useMenuDesigner provides: selectedCategories, activeLayout, theme, background, devicePreview.
Data: MENU_ITEMS, MENU_CATEGORIES from @/data/menuData.

Available components:
- MenuHeader from ./MenuHeader
- MenuCategoryNav from ./MenuCategoryNav
- MenuFooter from ./MenuFooter
- SingleColumnLayout from ../layouts/SingleColumnLayout
- TwoColumnLayout from ../layouts/TwoColumnLayout
- GridLayout from ../layouts/GridLayout
- CocktailLayout from ../layouts/CocktailLayout
- PremiumLayout from ../layouts/PremiumLayout
- FineDiningLayout from ../layouts/FineDiningLayout

TASK: Create apps/frontend/src/components/menu-designer/MenuPreview/MenuPreviewCanvas.tsx

'use client' component.

Behavior:
1. Local state: activeCategory (string) — defaults to first in selectedCategories
2. Filtered items = MENU_ITEMS.filter(item => item.category === activeCategory)
3. Renders the full menu preview:
   - Outer wrapper applies device preview sizing:
     - desktop: full width, full height
     - tablet: max-width 768px, centered, with subtle outer shadow
     - mobile: max-width 390px, centered, with phone-frame-like outer shadow
   - Device wrapper transition: Framer Motion layout animation (smooth resize)

4. Inner content (scrollable):
   - Background layer (full absolute, handles color/gradient/image with blur/brightness/opacity from store)
   - Content layer (relative, z-10):
     - <MenuHeader />
     - <MenuCategoryNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
     - Main content area with padding:
       - AnimatePresence + motion.div for smooth layout/category switching
       - Renders correct layout component based on activeLayout
       - Passes filtered items as props
     - <MenuFooter />

5. The outer preview wrapper:
   - Overflow: hidden, rounded-xl for tablet/mobile
   - For desktop: no rounded corners, fills full preview panel
   - Subtle shadow for tablet/mobile: 0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.5)

Also update MenuDesignerShell.tsx to:
- Import and render <LeftSidebar /> in the left panel
- Import and render <MenuPreviewCanvas /> in the right panel
- Add padding to the right panel (p-4 for desktop, 0 for when device preview is desktop)
- The right panel background: #111118, scrollable

Apply Google Fonts dynamically:
- When theme.fontFamily changes, inject a <link> tag for the required Google Font using useEffect and document.head

Output the complete MenuPreviewCanvas.tsx file and the updated MenuDesignerShell.tsx.
```

---

## PROMPT 11 — API Routes (Grok / OpenAI Integration)

```
I am building a Restaurant Menu Designer in Next.js 15. I need the AI API routes.

The app uses the OpenAI SDK. The API key is stored in process.env.OPENAI_API_KEY (or XAI_API_KEY for Grok — xAI uses the same OpenAI SDK format with baseURL: 'https://api.x.ai/v1').

TASK: Create these three API route files:

FILE 1: apps/frontend/src/app/api/grok/generate-text/route.ts

POST handler. Body: { prompt: string, type: 'description' | 'names' | 'bio' | 'theme' | 'general' }

Logic:
- Initialize OpenAI client:
  const client = new OpenAI({ baseURL: 'https://api.x.ai/v1', apiKey: process.env.XAI_API_KEY });
  (fall back to standard OpenAI if XAI_API_KEY not set: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }))
- model: 'grok-3-mini' (or 'gpt-4o-mini' for OpenAI fallback)
- System prompt based on type:
  - 'description': "You are a premium restaurant menu copywriter. Write elegant, evocative descriptions for cocktails and beverages. Use sensory language. Keep responses concise (2-3 sentences max)."
  - 'names': "You are a creative mixologist and menu consultant. Suggest premium, creative cocktail names. Return a numbered list."
  - 'bio': "You are a luxury hospitality copywriter. Write elegant restaurant descriptions and about us content."
  - 'theme': "You are a UI/UX designer specializing in restaurant branding. Return ONLY valid JSON with this shape: { primaryColor: hex, accentColor: hex, backgroundColor: hex, fontFamily: string, cardStyle: string }. No explanation."
  - 'general': "You are a helpful restaurant menu assistant."
- Call completion, return text as JSON: { result: string }
- Error handling: return 500 with { error: message }

FILE 2: apps/frontend/src/app/api/grok/generate-background/route.ts

POST handler. Body: { prompt: string }

Logic:
- Try xAI image generation:
  POST to https://api.x.ai/v1/images/generations with:
    { model: "grok-2-image", prompt: "Premium restaurant background: " + prompt + ". Dark, moody, atmospheric. High quality." }
  Headers: Authorization: Bearer {XAI_API_KEY}
- If image URL returned: return { imageUrl: url }
- If xAI image API not available (error/404): fall back to generating a CSS gradient using the text API:
  Use the text model to generate a matching CSS gradient string based on the prompt
  Return: { gradient: cssGradientString, imageUrl: null }
- Error handling: return 500 with { error: message }

FILE 3: apps/frontend/src/app/api/grok/generate-theme/route.ts

POST handler. Body: { style: string }

Logic:
- Call the text API with the 'theme' system prompt
- Parse JSON from response (handle invalid JSON with try/catch, return error)
- Validate response has required fields
- Return: { primaryColor, accentColor, backgroundColor, fontFamily, cardStyle }

All routes:
- Import { NextRequest, NextResponse } from 'next/server'
- Add proper TypeScript types
- Add console.error for debugging
- Return proper HTTP status codes

Output all three complete files.
```

---

## PROMPT 12 — Final Polish: Animations, Device Toggle & Top Bar

```
I am building a Restaurant Menu Designer in Next.js 15. This is the final polish step.

Tech: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.
Zustand store at @/hooks/useMenuDesigner has: devicePreview, setDevicePreview, isAIPanelOpen, setIsAIPanelOpen.

TASK: Update MenuDesignerShell.tsx (at apps/frontend/src/components/menu-designer/MenuDesignerShell.tsx) with these final improvements:

1. TOP BAR — fully implement all buttons:

   a. Back button (←): styled as zinc-700 text, hover zinc-300, with arrow-left Lucide icon
   
   b. Center: Device Preview Toggle
   - Three buttons: [Monitor icon "Desktop"] [Tablet icon "Tablet"] [Smartphone icon "Mobile"]
   - Pill-shaped button group (border border-zinc-700, rounded-full, overflow-hidden, flex)
   - Active button: bg-zinc-700, text white
   - Inactive: transparent, text zinc-500
   - Use Framer Motion for active indicator slide (layoutId="device-indicator")
   - On click: calls setDevicePreview()

   c. Right side buttons:
   - [Export ↓]: ghost button with zinc-700 border, zinc-300 text, Download Lucide icon
     - Show a small dropdown on click with options: PDF | PNG | HTML (just show the menu, no actual export needed in this prompt)
     - Use AnimatePresence for dropdown slide-down
   - [⚡ AI]: calls setIsAIPanelOpen(true), violet gradient bg (from-violet-600 to-violet-400), white text, rounded-lg

2. Add a page-level loading animation:
   - When the page first loads, show a centered animation for 0.8s:
     - A glowing violet circle that expands and fades
     - "Menu Designer" text fading in below it
   - Then cross-fade to the main layout
   - Use Framer Motion AnimatePresence

3. Add keyboard shortcuts:
   - Press '1' → switch to desktop preview
   - Press '2' → switch to tablet preview  
   - Press '3' → switch to mobile preview
   - Press 'Escape' → close AI panel if open
   - Show shortcut hints in the UI (small zinc-600 text next to toggle buttons)
   - Use useEffect with keydown event listener

4. Micro-animations to add everywhere:
   - When selectedCategories changes: stagger-animate all menu item cards (delay 0.04s between each)
   - When activeLayout changes: crossfade the entire content area (opacity 0→1, scale 0.99→1)
   - When device preview changes: spring-animate the preview canvas width change
   - Sidebar accordion open/close: spring physics (stiffness:300, damping:25)
   - Sidebar section hover: subtle x: 2px translation on the label

5. Add a "No categories selected" empty state in MenuPreviewCanvas:
   - If selectedCategories.length === 0:
   - Show centered empty state in preview:
     - Large emoji: 🍸
     - Title: "Select a Category to Begin"
     - Subtitle: "Choose from Cocktails, Wine, Coffee and more in the sidebar"
     - A violet gradient button: "← Open Categories"
     - Subtle animated gradient background behind it

6. Add global CSS to apps/frontend/src/app/menu-designer/layout.tsx or a global style tag:
   - Custom scrollbar for sidebar: ::-webkit-scrollbar { width: 4px } ::-webkit-scrollbar-track { background: transparent } ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 2px }
   - Smooth scroll behavior
   - Remove default focus outlines, add custom violet focus rings

Output the complete updated MenuDesignerShell.tsx and any other files that need changes.
```

---

## Quick Reference — File Map

| Prompt | Files Created |
|---|---|
| **1** | `menu-designer/layout.tsx`, `page.tsx`, `MenuDesignerShell.tsx` |
| **2** | `data/menuData.ts` |
| **3** | `hooks/useMenuDesigner.ts` |
| **4** | `CategorySelector.tsx`, `LayoutSelector.tsx` |
| **5** | `BrandingPanel.tsx`, `BackgroundPanel.tsx` |
| **6** | `AIAssistant.tsx` |
| **7** | `LeftSidebar.tsx` |
| **8** | `MenuHeader.tsx`, `MenuCategoryNav.tsx`, `MenuFooter.tsx` |
| **9** | `MenuItemCard.tsx` + 6 layout files |
| **10** | `MenuPreviewCanvas.tsx` + update `MenuDesignerShell.tsx` |
| **11** | `api/grok/generate-text/route.ts`, `generate-background/route.ts`, `generate-theme/route.ts` |
| **12** | Final polish — update `MenuDesignerShell.tsx` |

## Environment Variables Needed

Add to `apps/frontend/.env.local`:
```
XAI_API_KEY=your_grok_api_key_here
# OR for OpenAI fallback:
OPENAI_API_KEY=your_openai_key_here
```

## Tips for Using These Prompts

- ✅ Use **ChatGPT**, **Claude**, or **Gemini** — each prompt works standalone
- ✅ If AI output cuts off, type "continue" to get the rest
- ✅ After each prompt, paste the code into your editor before moving to the next
- ✅ If a component import doesn't work, check the file paths match exactly
- ✅ Run `pnpm --filter @dashboard/frontend dev` to test after each prompt
- ⚠️ Install Framer Motion if not already: `pnpm --filter @dashboard/frontend add framer-motion`
