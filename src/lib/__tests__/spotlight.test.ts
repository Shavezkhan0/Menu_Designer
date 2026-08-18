import { describe, it, expect } from "vitest";
import {
  isSpotlightMode,
  getSpotlightArrangement,
} from "@/lib/spotlight";

describe("isSpotlightMode", () => {
  it("returns false for 0 items", () => {
    expect(isSpotlightMode(0)).toBe(false);
  });

  it("returns true for 1 item", () => {
    expect(isSpotlightMode(1)).toBe(true);
  });

  it("returns true for 3 items", () => {
    expect(isSpotlightMode(3)).toBe(true);
  });

  it("returns false for 4 items", () => {
    expect(isSpotlightMode(4)).toBe(false);
  });
});

describe("getSpotlightArrangement", () => {
  it("returns 'single' for 1 item", () => {
    expect(getSpotlightArrangement(1, "vertical-grid")).toBe("single");
  });

  it("returns 'stack-2' for 2 items", () => {
    expect(getSpotlightArrangement(2, "text-row")).toBe("stack-2");
  });

  it("returns 'triangle-3' for 3 items with vertical-grid", () => {
    expect(getSpotlightArrangement(3, "vertical-grid")).toBe("triangle-3");
  });

  it("returns 'triangle-3' for 3 items with text-only", () => {
    expect(getSpotlightArrangement(3, "text-only")).toBe("triangle-3");
  });

  it("returns 'stack-3' for 3 items with horizontal-row", () => {
    expect(getSpotlightArrangement(3, "horizontal-row")).toBe("stack-3");
  });

  it("returns 'stack-3' for 3 items with text-row", () => {
    expect(getSpotlightArrangement(3, "text-row")).toBe("stack-3");
  });

  it("returns null for 4 items", () => {
    expect(getSpotlightArrangement(4, "vertical-grid")).toBeNull();
  });
});
