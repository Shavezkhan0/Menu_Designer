import { create } from "zustand";

export type LayoutStyle =
  | "single-column"
  | "two-column"
  | "grid"
  | "card"
  | "premium"
  | "cocktail"
  | "fine-dining"
  | "smart-grid";

export interface RestaurantInfo {
  name: string;
  tagline: string;
  logoUrl: string | null;
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
  imageShape: "circular" | "rectangle" | "square" | "none" | "blend";
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

export type BackgroundType = "color" | "gradient" | "image";

export interface BackgroundLayer {
  type: BackgroundType;
  value: string;
  blur: number;
  brightness: number;
}

export interface BackgroundSettings {
  top: BackgroundLayer;
  middle: BackgroundLayer;
  bottom: BackgroundLayer;
  full: BackgroundLayer;
  activeLayer: "top" | "middle" | "bottom" | "full";
}

export type CanvasPreset = "a4" | "a3" | "a5" | "a6" | "letter" | "custom";
export type CanvasUnit = "px" | "mm" | "in";

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
  toggleCategory: (id: string) => void;
  setActiveLayout: (layout: LayoutStyle) => void;
  setCanvasSize: (size: CanvasSize) => void;
  setZoom: (zoom: number) => void;
  setRestaurantInfo: (info: Partial<RestaurantInfo>) => void;
  setTheme: (theme: Partial<ThemeSettings>) => void;
  setBackground: (partial: Partial<BackgroundLayer>) => void;
  setActiveBackgroundLayer: (layer: "top" | "middle" | "bottom" | "full") => void;
  setMenuBorder: (border: Partial<MenuBorderSettings>) => void;
  setSelectedItemId: (id: string | null) => void;
  setActiveSidebarSection: (section: string | null) => void;
  setIsAIPanelOpen: (open: boolean) => void;
  setActiveBrowseCategory: (id: string | null) => void;
  toggleItem: (id: string) => void;
  clearCategoryItems: (categoryId: string, allItems: import("@/data/menuData").MenuItem[]) => void;
}

export const useMenuDesigner = create<MenuDesignerState>((set) => ({
  selectedCategories: [],
  activeLayout: "smart-grid",
  canvasSize: getDefaultCanvasSize("a4"),
  zoom: 1,
  restaurantInfo: { name: "", tagline: "", logoUrl: null },
  theme: {
    primaryColor: "#a78bfa",
    accentColor: "#f472b6",
    fontFamily: "Playfair Display, serif",
    cardStyle: "glass",
    textColor: "#f4f4f5",
    backgroundColor: "#111118",
    headingColor: "#ffffff",
    subheadingColor: "rgba(200,190,170,0.8)",
    imageShape: "circular",
  },
  background: {
    top: { type: "color", value: "#0d0d14", blur: 0, brightness: 1 },
    middle: { type: "color", value: "transparent", blur: 0, brightness: 1 },
    bottom: { type: "color", value: "transparent", blur: 0, brightness: 1 },
    full: { type: "color", value: "transparent", blur: 0, brightness: 1 },
    activeLayer: "top",
  },
  menuBorder: {
    style: "none",
    color: "#c9a84c",
    size: 2,
    offsetX: 0,
    offsetY: 0,
    paddingX: 20,
    paddingY: 32,
  },
  selectedItemId: null,
  activeSidebarSection: "Categories",
  isAIPanelOpen: false,
  activeBrowseCategory: null,
  selectedItemIds: [],
  toggleCategory: (id) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(id)
        ? state.selectedCategories.filter((c) => c !== id)
        : [...state.selectedCategories, id],
    })),
  setActiveLayout: (layout) => set({ activeLayout: layout }),
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
      const activeLayer = state.background.activeLayer;
      return {
        background: {
          ...state.background,
          [activeLayer]: {
            ...state.background[activeLayer],
            ...partial,
          },
        },
      };
    }),
  setActiveBackgroundLayer: (layer) =>
    set((state) => ({
      background: { ...state.background, activeLayer: layer },
    })),
  setMenuBorder: (partial) =>
    set((state) => ({
      menuBorder: { ...state.menuBorder, ...partial },
    })),
  setSelectedItemId: (id) => set({ selectedItemId: id }),
  setActiveSidebarSection: (section) => set({ activeSidebarSection: section }),
  setIsAIPanelOpen: (open) => set({ isAIPanelOpen: open }),
  setActiveBrowseCategory: (id) => set({ activeBrowseCategory: id }),
  toggleItem: (id) =>
    set((state) => ({
      selectedItemIds: state.selectedItemIds.includes(id)
        ? state.selectedItemIds.filter((i) => i !== id)
        : [...state.selectedItemIds, id],
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
      };
    }),
}));
