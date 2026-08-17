import type {
  CanvasSize,
  ThemeSettings,
  BackgroundSettings,
  MenuBorderSettings,
  RestaurantInfo,
  FooterSettings,
  LayoutStyle,
} from "@/hooks/useMenuDesigner";

/**
 * Everything the /menu-export render page needs to reproduce exactly what
 * the live preview shows. Deliberately mirrors the selection state (category
 * ids, layout, etc.) rather than pre-computed pages, so the render page runs
 * the same computeMenuPages() call the preview does — one source of truth
 * instead of two implementations that can drift apart.
 */
export interface MenuExportPayload {
  selectedCategories: string[];
  selectedItemIds: string[];
  activeLayout: LayoutStyle;
  showCategoryNames: boolean;
  canvasSize: CanvasSize;
  theme: ThemeSettings;
  background: BackgroundSettings;
  menuBorder: MenuBorderSettings;
  showHeader: boolean;
  restaurantInfo: RestaurantInfo;
  footer: FooterSettings;
}

export function isMenuExportPayload(value: unknown): value is MenuExportPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    Array.isArray(v.selectedCategories) &&
    Array.isArray(v.selectedItemIds) &&
    typeof v.activeLayout === "string" &&
    typeof v.showCategoryNames === "boolean" &&
    typeof v.canvasSize === "object" &&
    typeof v.theme === "object" &&
    typeof v.background === "object" &&
    typeof v.menuBorder === "object" &&
    typeof v.showHeader === "boolean" &&
    typeof v.restaurantInfo === "object" &&
    typeof v.footer === "object"
  );
}
