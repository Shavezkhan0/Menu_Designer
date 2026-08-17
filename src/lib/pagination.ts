import type { MenuItem } from "@/data/menuData";
import { groupItemsByCategory, MENU_CATEGORIES } from "@/data/menuData";
import type { LayoutStyle } from "@/hooks/useMenuDesigner";

export type MenuPage = {
  pageNumber: number;
  categoryId: string | null;
  showCategoryHeader: boolean;
  items: MenuItem[];
  startItemIndex: number;
};

export const ITEMS_PER_PAGE: Record<LayoutStyle, number> = {
  "vertical-grid": 8,
  "horizontal-row": 5,
  "text-only": 10,
  "text-row": 6,
};

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function computeMenuPages(
  items: MenuItem[],
  layout: LayoutStyle,
  options: { showCategoryNames: boolean; itemsPerPageOverride?: number }
): MenuPage[] {
  if (items.length === 0) return [];

  const perPage = options.itemsPerPageOverride ?? ITEMS_PER_PAGE[layout];
  const pages: MenuPage[] = [];
  let pageNumber = 1;
  let runningIndex = 0;

  if (options.showCategoryNames) {
    const groups = groupItemsByCategory(items).filter((g) => g.items.length > 0);

    for (const group of groups) {
      const chunks = chunk(group.items, perPage);

      for (let i = 0; i < chunks.length; i++) {
        const startIdx = runningIndex;
        runningIndex += chunks[i].length;
        pages.push({
          pageNumber,
          categoryId: i === 0 ? group.category.id : null,
          showCategoryHeader: i === 0,
          items: chunks[i],
          startItemIndex: startIdx,
        });
        pageNumber++;
      }
    }
  } else {
    const chunks = chunk(items, perPage);

    for (let i = 0; i < chunks.length; i++) {
      const startIdx = runningIndex;
      runningIndex += chunks[i].length;
      pages.push({
        pageNumber,
        categoryId: null,
        showCategoryHeader: false,
        items: chunks[i],
        startItemIndex: startIdx,
      });
      pageNumber++;
    }
  }

  return pages;
}
