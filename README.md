# AI-Powered Restaurant Menu Designer

A Next.js app for designing premium, printable restaurant menus in real time. Pick categories, choose a layout, customize branding and backgrounds, generate content and images with AI (Grok / OpenAI), and export the finished menu as PNG, PDF, or HTML.

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router, React 19)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand) — global state (menu designer store)
- [Framer Motion](https://www.framer.com/motion) — animations & transitions
- [Lucide React](https://lucide.dev) — icons
- [html2canvas-pro](https://github.com/MicroJoeN/html2canvas-pro) + [jsPDF](https://github.com/parallax/jsPDF) — canvas/PDF export
- [OpenAI SDK](https://github.com/openai/openai-node) — xAI (Grok) / OpenAI API access

## Getting Started

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
| `XAI_API_KEY` | For AI features | Powers text generation, theme generation, and AI background generation via xAI (Grok). Starts with `xai-`. |
| `OPENAI_API_KEY` | Optional | Fallback for text/theme generation when `XAI_API_KEY` is not set. |

## Features

### Sidebar Controls
- **Document** — canvas size presets (A3–A6, Letter, Custom) with unit support (px / mm / in).
- **Categories** — toggle which of the 8 drink categories (Cocktails, Mocktails, Coffee, Tea, Wine, Beer, Soft Drinks, Juices) appear on the menu.
- **Layout** — switch between 8 layout styles: Single Column, Two Column, Grid, Card, Premium, Cocktail, Fine Dining, and Smart Grid.
- **Branding** — restaurant name, tagline, logo upload, theme colors, font picker, heading/subheading colors, and image shape.
- **Background** — per-layer background control (Top / Middle / Bottom / Full) with Color, Gradient, and Image modes:
  - Upload an image or generate one with AI.
  - Per-layer blur and brightness sliders.
  - Toggle **Top Shadow** and **Bottom Shadow** fade overlays.
- **Footer Settings** — toggle the footer on/off and edit the phone, email, address, and website shown in the footer.
- **AI Tools** — prompt Grok/OpenAI to write descriptions, suggest names, generate bios/themes, and apply results.

### Menu Preview
- Live, zoomable canvas (zoom controls in the top bar; `overflow-auto` keeps the canvas centered when small and fully scrollable when zoomed in).
- Header with logo, name, and tagline over the top background layer.
- Stagger-animated menu item cards with badges (Signature, New), prices, alcohol content, serving style, garnish, and tags.
- Fully customizable footer with contact info, website, QR placeholder, and copyright.

### AI Integration
- `POST /api/grok/generate-text` — text generation (descriptions, names, bios, themes).
- `POST /api/grok/generate-background` — AI image generation (xAI `grok-2-image`), with a Pollinations.ai fallback.
- `POST /api/grok/generate-theme` — structured JSON theme generation (colors, font, card style).
- Dynamic Google Font loading based on the selected theme font.

### Export
Export the current menu via the top-bar **Export** menu:
- **PNG** — captured at 2x scale via html2canvas.
- **PDF** — rendered with jsPDF.
- **HTML** — standalone HTML document.

## Project Structure

```
src/
├── app/
│   ├── menu-designer/          # /menu-designer route (layout + page)
│   └── api/grok/               # AI API routes (text, background, theme)
├── components/
│   └── menu-designer/
│       ├── LeftSidebar/        # Document, Categories, Layout, Branding,
│       │                       # Background, Footer Settings, AI Tools
│       ├── MenuPreview/        # Canvas, Header, Footer, Category Nav, Item Card
│       ├── layouts/            # 8 menu layout components
│       └── MenuDesignerShell.tsx
├── data/menuData.ts            # Menu categories + items
├── hooks/useMenuDesigner.ts    # Zustand store (state + actions + helpers)
└── lib/
    ├── export.ts               # PNG / PDF / HTML export utilities
    └── utils.ts                # Shared helpers
```

## Scripts

```bash
npm run dev      # start the development server
npm run build    # production build
npm run start    # start the production server
npm run lint     # run ESLint
```
