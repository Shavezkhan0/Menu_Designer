import { create } from "zustand";

import type { MenuItem } from "@/data/menuData";

export function sanitizeBackgroundImage(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^url\(\s*["']?(.*?)["']?\s*\)$/i);
  return match ? match[1].trim() : trimmed;
}

export function getBackgroundImageCss(value: string): string {
  const url = sanitizeBackgroundImage(value);
  if (
    url.startsWith("data:") ||
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/") ||
    url.startsWith("#")
  ) {
    return `url("${url}")`;
  }
  return url;
}

export type LayoutStyle =
  | "vertical-grid"
  | "horizontal-row"
  | "text-only"
  | "text-row";

export interface RestaurantInfo {
  name: string;
  tagline: string;
  logoUrl: string | null;
}

export interface FooterSettings {
  showBrandSignature: boolean;
  brandText: string;
  brandColor?: string;
}

export interface ThemeSettings {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  cardStyle: "glass" | "solid" | "minimal" | "bordered";
  textColor: string;
  backgroundColor: string;
  headingColor: string;
  subheadingColor: string;
  imageShape: "rectangle" | "square" | "circular" | "none" | "blend";
}

export interface MenuBorderSettings {
  style: "none" | "solid" | "double" | "dashed" | "dotted" | "gold-frame";
  color: string;
  size: number;
  offsetX: number;
  offsetY: number;
  paddingX: number;
  paddingY: number;
}

export interface FreeItemPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type BackgroundType = "color" | "gradient" | "image";

export interface BackgroundSettings {
  type: BackgroundType;
  value: string;
  blur: number;
  brightness: number;
}

export type CanvasPreset = "a4" | "a3" | "a5" | "a6" | "letter" | "custom";
export type CanvasUnit = "px" | "mm" | "in";

export interface PageLayoutProps {
  items: MenuItem[];
  showCategoryHeader: boolean;
  categoryId: string | null;
  startIndex: number;
  isExport?: boolean;
  displayScale?: number;
}

export interface CanvasSize {
  preset: CanvasPreset;
  width: number;
  height: number;
  unit: CanvasUnit;
}

const STANDARD_SIZES: Record<"a4" | "a3" | "a5" | "a6" | "letter", { width: number; height: number; unit: "mm" }> = {
  a3: { width: 297, height: 420, unit: "mm" },
  a4: { width: 210, height: 297, unit: "mm" },
  a5: { width: 148, height: 210, unit: "mm" },
  a6: { width: 105, height: 148, unit: "mm" },
  letter: { width: 215.9, height: 279.4, unit: "mm" },
};

export function getCanvasPixelSize(size: CanvasSize): { width: number; height: number } {
  const pxPerMm = 96 / 25.4;
  if (size.unit === "px") return { width: size.width, height: size.height };
  if (size.unit === "mm") return { width: Math.round(size.width * pxPerMm), height: Math.round(size.height * pxPerMm) };
  return { width: Math.round(size.width * 96), height: Math.round(size.height * 96) };
}

export function getDefaultCanvasSize(preset: CanvasPreset): CanvasSize {
  if (preset === "custom") return { preset, width: 800, height: 600, unit: "px" };
  const s = STANDARD_SIZES[preset];
  return { preset, ...s };
}

interface MenuDesignerState {
  selectedCategories: string[];
  activeLayout: LayoutStyle;
  canvasSize: CanvasSize;
  zoom: number;
  restaurantInfo: RestaurantInfo;
  theme: ThemeSettings;
  background: BackgroundSettings;
  menuBorder: MenuBorderSettings;
  selectedItemId: string | null;
  activeSidebarSection: string | null;
  isAIPanelOpen: boolean;
  activeBrowseCategory: string | null;
  selectedItemIds: string[];
  showCategoryNames: boolean;
  showHeader: boolean;
  footer: FooterSettings;
  freePositions: Record<string, FreeItemPosition>;
  toggleCategory: (id: string) => void;
  setActiveLayout: (layout: LayoutStyle) => void;
  setCanvasSize: (size: CanvasSize) => void;
  setZoom: (zoom: number) => void;
  setRestaurantInfo: (info: Partial<RestaurantInfo>) => void;
  setTheme: (theme: Partial<ThemeSettings>) => void;
  setBackground: (partial: Partial<BackgroundSettings>) => void;
  setMenuBorder: (border: Partial<MenuBorderSettings>) => void;
  setSelectedItemId: (id: string | null) => void;
  setFreePosition: (id: string, position: FreeItemPosition) => void;
  clearFreePositions: () => void;
  setActiveSidebarSection: (section: string | null) => void;
  setIsAIPanelOpen: (open: boolean) => void;
  setActiveBrowseCategory: (id: string | null) => void;
  toggleItem: (id: string) => void;
  setShowCategoryNames: (show: boolean) => void;
  setShowHeader: (show: boolean) => void;
  setFooter: (partial: Partial<FooterSettings>) => void;
  clearCategoryItems: (categoryId: string, allItems: import("@/data/menuData").MenuItem[]) => void;
}

export const useMenuDesigner = create<MenuDesignerState>((set) => ({
  selectedCategories: [],
  activeLayout: "vertical-grid",
  canvasSize: getDefaultCanvasSize("a3"),
  zoom: 1,
  restaurantInfo: { name: "", tagline: "", logoUrl: null },
  theme: {
    primaryColor: "#a78bfa",
    accentColor: "#f472b6",
    fontFamily: "Playfair Display, serif",
    cardStyle: "glass",
    textColor: "#1a1a1a",
    backgroundColor: "#ffffff",
    headingColor: "#1a1a1a",
    subheadingColor: "rgba(60,60,60,0.8)",
    imageShape: "rectangle",
  },
  background: { type: "color", value: "transparent", blur: 0, brightness: 1 },
  menuBorder: {
    style: "none",
    color: "#c9a84c",
    size: 2,
    offsetX: 0,
    offsetY: 0,
    paddingX: 120,
    paddingY: 32,
  },
  selectedItemId: null,
  activeSidebarSection: "Categories",
  isAIPanelOpen: false,
  activeBrowseCategory: null,
  selectedItemIds: [],
  showCategoryNames: true,
  showHeader: false,
  footer: { showBrandSignature: true, brandText: "DeliCocktailHouse" },
  freePositions: {},
  toggleCategory: (id) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(id)
        ? state.selectedCategories.filter((c) => c !== id)
        : [...state.selectedCategories, id],
      freePositions: {},
    })),
  setActiveLayout: (layout) => set({ activeLayout: layout, freePositions: {} }),
  setCanvasSize: (size) => set({ canvasSize: size }),
  setZoom: (zoom) => set({ zoom }),
  setRestaurantInfo: (info) =>
    set((state) => ({
      restaurantInfo: { ...state.restaurantInfo, ...info },
    })),
  setTheme: (partial) =>
    set((state) => ({
      theme: { ...state.theme, ...partial },
    })),
  setBackground: (partial) =>
    set((state) => {
      const next = { ...state.background, ...partial };
      if (next.type === "image" && next.value) {
        next.value = sanitizeBackgroundImage(next.value);
      }
      return { background: next };
    }),
  setMenuBorder: (partial) =>
    set((state) => ({
      menuBorder: { ...state.menuBorder, ...partial },
    })),
  setFreePosition: (id, position) =>
    set((state) => ({
      freePositions: { ...state.freePositions, [id]: position },
    })),
  clearFreePositions: () => set({ freePositions: {} }),
  setSelectedItemId: (id) => set({ selectedItemId: id }),
  setActiveSidebarSection: (section) => set({ activeSidebarSection: section }),
  setIsAIPanelOpen: (open) => set({ isAIPanelOpen: open }),
  setActiveBrowseCategory: (id) => set({ activeBrowseCategory: id }),
  toggleItem: (id) =>
    set((state) => ({
      selectedItemIds: state.selectedItemIds.includes(id)
        ? state.selectedItemIds.filter((i) => i !== id)
        : [...state.selectedItemIds, id],
      freePositions: {},
    })),
  setShowCategoryNames: (show) => set({ showCategoryNames: show }),
  setShowHeader: (show) => set({ showHeader: show }),
  setFooter: (partial) =>
    set((state) => ({
      footer: { ...state.footer, ...partial },
    })),
  clearCategoryItems: (categoryId, allItems) =>
    set((state) => {
      const idsToRemove = allItems
        .filter((item) => item.category === categoryId)
        .map((item) => item.id);
      return {
        selectedItemIds: state.selectedItemIds.filter(
          (id) => !idsToRemove.includes(id)
        ),
        freePositions: {},
      };
    }),
}));
