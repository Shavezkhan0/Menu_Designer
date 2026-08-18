import type { LayoutStyle } from "@/hooks/useMenuDesigner";

export const SPOTLIGHT_MAX_ITEMS = 3;

export function isSpotlightMode(itemCount: number): boolean {
  return itemCount >= 1 && itemCount <= SPOTLIGHT_MAX_ITEMS;
}

export type SpotlightArrangement = "single" | "stack-2" | "triangle-3" | "stack-3";

export function getSpotlightArrangement(
  itemCount: number,
  layoutStyle: LayoutStyle,
): SpotlightArrangement | null {
  if (itemCount === 1) return "single";
  if (itemCount === 2) return "stack-2";
  if (itemCount === 3) {
    if (layoutStyle === "vertical-grid" || layoutStyle === "text-only") return "triangle-3";
    if (layoutStyle === "horizontal-row" || layoutStyle === "text-row") return "stack-3";
  }
  return null;
}

export function spotlightShowsImage(layoutStyle: LayoutStyle): boolean {
  return layoutStyle === "vertical-grid" || layoutStyle === "horizontal-row";
}
