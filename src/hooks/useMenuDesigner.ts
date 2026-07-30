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
}

export type BackgroundType = "color" | "gradient" | "image";

export interface BackgroundSettings {
  type: BackgroundType;
  value: string;
  blur: number;
  brightness: number;
}

interface MenuDesignerState {
  selectedCategories: string[];
  activeLayout: LayoutStyle;
  activeDevice: "desktop" | "tablet" | "mobile";
  restaurantInfo: RestaurantInfo;
  theme: ThemeSettings;
  background: BackgroundSettings;
  selectedItemId: string | null;
  activeSidebarSection: string | null;
  isAIPanelOpen: boolean;
  activeBrowseCategory: string | null;
  selectedItemIds: string[];
  toggleCategory: (id: string) => void;
  setActiveLayout: (layout: LayoutStyle) => void;
  setActiveDevice: (device: "desktop" | "tablet" | "mobile") => void;
  setDevicePreview: (device: "desktop" | "tablet" | "mobile") => void;
  setRestaurantInfo: (info: Partial<RestaurantInfo>) => void;
  setTheme: (theme: Partial<ThemeSettings>) => void;
  setBackground: (bg: Partial<BackgroundSettings>) => void;
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
  activeDevice: "desktop",
  restaurantInfo: { name: "", tagline: "", logoUrl: null },
  theme: {
    primaryColor: "#a78bfa",
    accentColor: "#f472b6",
    fontFamily: "Playfair Display, serif",
    cardStyle: "glass",
    textColor: "#f4f4f5",
    backgroundColor: "#111118",
  },
  background: {
    type: "color",
    value: "#0d0d14",
    blur: 0,
    brightness: 1,
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
  setActiveDevice: (device) => set({ activeDevice: device }),
  setRestaurantInfo: (info) =>
    set((state) => ({
      restaurantInfo: { ...state.restaurantInfo, ...info },
    })),
  setTheme: (partial) =>
    set((state) => ({
      theme: { ...state.theme, ...partial },
    })),
  setBackground: (partial) =>
    set((state) => ({
      background: { ...state.background, ...partial },
    })),
  setSelectedItemId: (id) => set({ selectedItemId: id }),
  setActiveSidebarSection: (section) => set({ activeSidebarSection: section }),
  setDevicePreview: (device) => set({ activeDevice: device }),
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
