# AI-Powered Restaurant Menu Designer

A Next.js app for designing premium, printable restaurant menus in real time. Pick a category, choose a layout, customize branding and backgrounds, generate content and images with AI (Grok / OpenAI), and export the finished menu as PNG, PDF, or HTML.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| UI Library | [React 19](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Component Library | [shadcn/ui](https://ui.shadcn.com) (base-nova style) |
| UI Primitives | [@base-ui/react](https://base-ui.com) |
| State Management | [Zustand](https://github.com/pmndrs/zustand) |
| Animation | [Framer Motion](https://www.framer.com/motion) |
| Icons | [Lucide React](https://lucide.dev) |
| Class Utilities | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) + [class-variance-authority](https://github.com/cva) |
| AI Integration | [OpenAI SDK](https://github.com/openai/openai-node) (configured for xAI Grok) |
| Export | [html2canvas-pro](https://github.com/MicroJoeN/html2canvas-pro) + [jsPDF](https://github.com/parallax/jsPDF) |
| Fonts | [Geist](https://vercel.com/font), [Inter](https://rsms.me/inter/), [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) via `next/font` |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the home page redirects to the **Menu Designer** at `/menu-designer`.

## Environment Variables

Create a `.env.local` file in the project root:

```bash
XAI_API_KEY=your_grok_api_key_here
# optional OpenAI fallback
OPENAI_API_KEY=your_openai_key_here
```

| Variable | Required | Purpose |
|---|---|---|
| `XAI_API_KEY` | For AI features | Powers text generation, theme generation, and AI background generation via xAI (Grok). |
| `OPENAI_API_KEY` | Optional | Fallback for text/theme generation when `XAI_API_KEY` is not set. |

Without an API key, the text generation endpoint returns simulated fallback content and the background generation falls back to Pollinations.ai (free, no key needed).

## Features

### Sidebar Controls
- **Document** — canvas size presets (A3, A4, A5, A6, US Letter, Custom) with unit support (px / mm / in).
- **Categories** — two-phase drill-down: pick a category (Cocktails or Mocktails), then toggle individual items on/off. Includes a "Show Category Names" toggle.
- **Layout** — switch between 8 layout styles, each with an SVG thumbnail: Single Column, Two Column, Grid, Card, Premium, Cocktail, Fine Dining, and Smart Grid.
- **Branding** — restaurant name, tagline, logo upload, primary/accent color pickers, font selector (5 Google Fonts), card style (glass / solid / minimal / bordered), heading/subheading color pickers, and image shape (circular / rectangle / square / none / blend).
- **Background** — per-layer background control (Top / Middle / Bottom / Full) with 3 modes:
  - **Color** — hex input + 6 preset swatches.
  - **Gradient** — 6 named presets (Midnight, Deep Ocean, Velvet, Ember, Forest, Rose).
  - **Image** — upload or generate with AI, with per-layer blur and brightness sliders.
  - Toggle **Top Shadow** and **Bottom Shadow** gradient overlays.
  - **Menu Border** — style (none / solid / double / dashed / dotted / gold-frame), color, size, offset, and padding (rendered in Smart Grid layout only).
- **Footer Settings** — toggle the footer on/off and edit the phone, email, address, and website shown in the footer.
- **AI Tools** — full assistant panel with free-form prompts and 6 quick-action buttons: Write Description, Suggest Names, Restaurant Bio, Premium Style, Generate Theme, Chef's Picks. Apply, Copy, and Regenerate actions on results.

### Menu Preview
- Live, zoomable canvas (10%–300%, centered, scrollable when zoomed in).
- Splash screen with Framer Motion animation on load.
- Empty state with call-to-action to open Categories.
- Header with logo, name, and tagline over the top background layer.
- Stagger-animated menu item cards with badges (Signature, New), prices (Rs.), alcohol content, serving style, garnish, and tags.
- Category headers with gold divider lines.
- Fully customizable footer with contact info, QR placeholder, copyright, and "Generated with Menu Designer" badge.

### AI Integration
- `POST /api/grok/generate-text` — text generation (descriptions, names, bios, themes, general). Falls back to simulated responses when no API key is set.
- `POST /api/grok/generate-background` — AI image generation (xAI `grok-2-image`), with a Pollinations.ai fallback.
- `POST /api/grok/generate-theme` — structured JSON theme generation (colors, font, card style) with field validation.
- Dynamic Google Font loading based on the selected theme font.

### Export
Export the current menu via the top-bar **Export** menu:
- **PNG** — captured at 2x scale via html2canvas-pro.
- **PDF** — rendered with jsPDF.
- **HTML** — standalone HTML document.

## Project Structure

```
src/
├── app/
│   ├── globals.css                    # Tailwind v4 + shadcn theme CSS variables
│   ├── layout.tsx                     # Root layout (Geist + Geist Mono fonts)
│   ├── page.tsx                       # Redirects to /menu-designer
│   ├── menu-designer/
│   │   ├── layout.tsx                 # Nested layout (Inter + Playfair Display fonts)
│   │   └── page.tsx                   # Renders <MenuDesignerShell />
│   └── api/grok/
│       ├── generate-text/route.ts     # AI text generation
│       ├── generate-background/route.ts  # AI image generation
│       └── generate-theme/route.ts    # AI theme JSON generation
├── components/
│   ├── ui/
│   │   └── button.tsx                 # shadcn Button component
│   └── menu-designer/
│       ├── MenuDesignerShell.tsx      # Main app shell (top bar, sidebar, canvas)
│       ├── LeftSidebar/
│       │   ├── LeftSidebar.tsx        # Accordion sidebar container (7 sections)
│       │   ├── DocumentPanel.tsx      # Canvas size presets
│       │   ├── CategorySelector.tsx   # Two-phase category + item picker
│       │   ├── LayoutSelector.tsx     # 8 layout styles with SVG thumbnails
│       │   ├── BrandingPanel.tsx      # Name, tagline, logo, colors, fonts, card style
│       │   ├── BackgroundPanel.tsx    # Per-layer BG, AI gen, shadows, border
│       │   ├── FooterPanel.tsx        # Footer toggle + contact info fields
│       │   └── AIAssistant.tsx        # AI chat with 6 quick actions
│       ├── MenuPreview/
│       │   ├── MenuPreviewCanvas.tsx  # Zoomable canvas, layout switcher
│       │   ├── MenuHeader.tsx         # Logo, name, tagline
│       │   ├── MenuFooter.tsx         # Contact info, QR placeholder, copyright
│       │   ├── MenuCategoryNav.tsx    # Sticky category pill navigation
│       │   ├── CategoryHeader.tsx     # Section heading with gold divider
│       │   └── MenuItemCard.tsx       # Card with image, badges, price, tags
│       └── layouts/
│           ├── SingleColumnLayout.tsx
│           ├── TwoColumnLayout.tsx
│           ├── GridLayout.tsx
│           ├── CardLayout.tsx
│           ├── PremiumLayout.tsx
│           ├── CocktailLayout.tsx
│           ├── FineDiningLayout.tsx
│           └── SmartGridLayout.tsx
├── data/
│   └── menuData.ts                    # Menu categories + items (Cocktails, Mocktails)
├── hooks/
│   └── useMenuDesigner.ts             # Zustand store (state + actions + helpers)
└── lib/
    ├── export.ts                      # PNG / PDF / HTML export utilities
    └── utils.ts                       # cn() helper (clsx + tailwind-merge)
```

### Static Assets

```
public/
├── Beer/              # Beer images (prepared for future use)
├── Cocktals_Images/   # Cocktail images (13 PNGs)
├── Coffee/            # Coffee images (prepared for future use)
├── Juices/            # Juice images (prepared for future use)
├── Mocktails/         # Mocktail images (6 PNGs)
├── Soft_Drinks/       # Soft drink images (prepared for future use)
├── Tea/               # Tea images (prepared for future use)
└── Wine/              # Wine images (prepared for future use)
```

## Data

Menu items are defined in `src/data/menuData.ts`. Currently implemented:

| Category | Items |
|---|---|
| Cocktails | 13 items |
| Mocktails | 12 items |

Each item includes: name, description, price, image path, and optional fields (badges, alcohol content, serving style, garnish, tags).

## Scripts

```bash
npm run dev      # start the development server
npm run build    # production build
npm run start    # start the production server
npm run lint     # run ESLint
```
