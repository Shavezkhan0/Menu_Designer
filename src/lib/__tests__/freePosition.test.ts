import { describe, it, expect } from "vitest";
import { screenRectToCanvasBox, screenDeltaToCanvasDelta } from "@/lib/freePosition";

function makeDOMRect(left: number, top: number, width: number, height: number): DOMRect {
  return { left, top, width, height, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => ({}) } as DOMRect;
}

describe("screenRectToCanvasBox", () => {
  it("scales and offsets correctly at displayScale=2", () => {
    const itemRect = makeDOMRect(110, 210, 100, 50);
    const canvasRect = makeDOMRect(10, 10, 0, 0);
    expect(screenRectToCanvasBox(itemRect, canvasRect, 2)).toEqual({
      x: 50,
      y: 100,
      width: 50,
      height: 25,
    });
  });

  it("passes through at displayScale=1 (minus canvas offset)", () => {
    const itemRect = makeDOMRect(110, 210, 100, 50);
    const canvasRect = makeDOMRect(10, 10, 0, 0);
    expect(screenRectToCanvasBox(itemRect, canvasRect, 1)).toEqual({
      x: 100,
      y: 200,
      width: 100,
      height: 50,
    });
  });
});

describe("screenDeltaToCanvasDelta", () => {
  it("halves delta at displayScale=2", () => {
    expect(screenDeltaToCanvasDelta(100, 50, 2)).toEqual({ dx: 50, dy: 25 });
  });

  it("passes through at displayScale=1", () => {
    expect(screenDeltaToCanvasDelta(100, 50, 1)).toEqual({ dx: 100, dy: 50 });
  });

  it("falls back to scale=1 when displayScale=0", () => {
    expect(screenDeltaToCanvasDelta(100, 50, 0)).toEqual({ dx: 100, dy: 50 });
  });
});
