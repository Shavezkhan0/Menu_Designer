import { describe, it, expect } from "vitest";
import { computeMenuPages } from "@/lib/pagination";
import type { MenuItem } from "@/data/menuData";

function makeItems(count: number, category = "cocktails"): MenuItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${category}-${i + 1}`,
    name: `Item ${i + 1}`,
    price: 10 + i,
    description: `Description ${i + 1}`,
    category,
    tags: [],
  }));
}

describe("computeMenuPages", () => {
  it("returns empty array for empty items", () => {
    const pages = computeMenuPages([], "horizontal-row", { showCategoryNames: false });
    expect(pages).toEqual([]);
  });

  it("returns a single page when items fit on one page", () => {
    const items = makeItems(3);
    const pages = computeMenuPages(items, "horizontal-row", { showCategoryNames: false });
    expect(pages).toHaveLength(1);
    expect(pages[0].items).toHaveLength(3);
    expect(pages[0].pageNumber).toBe(1);
    expect(pages[0].showCategoryHeader).toBe(false);
    expect(pages[0].categoryId).toBeNull();
  });

  it("chunks items by ITEMS_PER_PAGE for the layout", () => {
    const items = makeItems(13);
    const pages = computeMenuPages(items, "text-only", { showCategoryNames: false });
    // text-only = 10 per page → [10, 3]
    expect(pages).toHaveLength(2);
    expect(pages[0].items).toHaveLength(10);
    expect(pages[1].items).toHaveLength(3);
  });

  it("respects itemsPerPageOverride", () => {
    const items = makeItems(10);
    const pages = computeMenuPages(items, "horizontal-row", {
      showCategoryNames: false,
      itemsPerPageOverride: 4,
    });
    // 10 items / 4 per page → [4, 4, 2]
    expect(pages).toHaveLength(3);
    expect(pages[0].items).toHaveLength(4);
    expect(pages[1].items).toHaveLength(4);
    expect(pages[2].items).toHaveLength(2);
  });

  it("assigns sequential page numbers", () => {
    const items = makeItems(12);
    const pages = computeMenuPages(items, "vertical-grid", { showCategoryNames: false });
    pages.forEach((page, i) => {
      expect(page.pageNumber).toBe(i + 1);
    });
  });

  it("tracks startItemIndex correctly across pages", () => {
    const items = makeItems(18);
    const pages = computeMenuPages(items, "vertical-grid", { showCategoryNames: false });
    // vertical-grid = 8 per page → [8, 8, 2]
    expect(pages[0].startItemIndex).toBe(0);
    expect(pages[1].startItemIndex).toBe(8);
    expect(pages[2].startItemIndex).toBe(16);
  });

  describe("showCategoryNames", () => {
    it("creates separate page groups per category with headers", () => {
      const cocktails = makeItems(3, "cocktails");
      const mocktails = makeItems(2, "mocktails");
      const items = [...cocktails, ...mocktails];

      const pages = computeMenuPages(items, "horizontal-row", { showCategoryNames: true });
      // 5 items, 5 per page for horizontal-row → 1 page, but split by category:
      // cocktails (3 items) → 1 page with header
      // mocktails (2 items) → 1 page with header
      expect(pages).toHaveLength(2);

      expect(pages[0].showCategoryHeader).toBe(true);
      expect(pages[0].categoryId).toBe("cocktails");
      expect(pages[0].items).toHaveLength(3);

      expect(pages[1].showCategoryHeader).toBe(true);
      expect(pages[1].categoryId).toBe("mocktails");
      expect(pages[1].items).toHaveLength(2);
    });

    it("chunks within each category independently", () => {
      const cocktails = makeItems(12, "cocktails");
      const mocktails = makeItems(5, "mocktails");
      const items = [...cocktails, ...mocktails];

      const pages = computeMenuPages(items, "horizontal-row", { showCategoryNames: true });
      // horizontal-row = 5 per page
      // cocktails: 12 → [5, 5, 2] (3 pages)
      // mocktails: 5 → [5] (1 page)
      expect(pages).toHaveLength(4);

      // First cocktail page has header
      expect(pages[0].showCategoryHeader).toBe(true);
      expect(pages[0].categoryId).toBe("cocktails");
      expect(pages[0].items).toHaveLength(5);

      // Second cocktail page has no header (continuation)
      expect(pages[1].showCategoryHeader).toBe(false);
      expect(pages[1].categoryId).toBeNull();
      expect(pages[1].items).toHaveLength(5);

      // Third cocktail page
      expect(pages[2].showCategoryHeader).toBe(false);
      expect(pages[2].categoryId).toBeNull();
      expect(pages[2].items).toHaveLength(2);

      // Mocktail page gets its own header
      expect(pages[3].showCategoryHeader).toBe(true);
      expect(pages[3].categoryId).toBe("mocktails");
      expect(pages[3].items).toHaveLength(5);
    });
  });

  describe("edge cases", () => {
    it("itemsPerPageOverride: 3 with 7 items → 3 pages (3, 3, 1)", () => {
      const items = makeItems(7);
      const pages = computeMenuPages(items, "horizontal-row", {
        showCategoryNames: false,
        itemsPerPageOverride: 3,
      });

      expect(pages).toHaveLength(3);
      expect(pages[0].items).toHaveLength(3);
      expect(pages[1].items).toHaveLength(3);
      expect(pages[2].items).toHaveLength(1);

      expect(pages[0].startItemIndex).toBe(0);
      expect(pages[1].startItemIndex).toBe(3);
      expect(pages[2].startItemIndex).toBe(6);
    });

    it("showCategoryNames=false with 2 categories mixed → flat pages, no headers", () => {
      const cocktails = makeItems(4, "cocktails");
      const mocktails = makeItems(4, "mocktails");
      const items = [...cocktails, ...mocktails];

      const pages = computeMenuPages(items, "horizontal-row", { showCategoryNames: false });

      // All 8 items on pages (horizontal-row = 5 per page → [5, 3])
      expect(pages).toHaveLength(2);

      // No category headers anywhere
      for (const page of pages) {
        expect(page.showCategoryHeader).toBe(false);
        expect(page.categoryId).toBeNull();
      }

      // Items are interleaved as provided
      expect(pages[0].items).toHaveLength(5);
      expect(pages[1].items).toHaveLength(3);
    });

    it("empty category group produces zero pages, not a blank page", () => {
      const cocktails = makeItems(8, "cocktails");
      const emptyMocktails: MenuItem[] = [];
      const items = [...cocktails, ...emptyMocktails];

      const pages = computeMenuPages(items, "text-only", { showCategoryNames: true });

      // 8 cocktails with text-only (10/page) → 1 page
      expect(pages).toHaveLength(1);
      expect(pages[0].items).toHaveLength(8);
      expect(pages[0].categoryId).toBe("cocktails");
      expect(pages[0].showCategoryHeader).toBe(true);

      // No blank page from the empty mocktails group
      for (const page of pages) {
        expect(page.items.length).toBeGreaterThan(0);
      }
    });
  });
});
