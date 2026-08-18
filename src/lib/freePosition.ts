import type { FreeItemPosition } from "@/hooks/useMenuDesigner";

/**
 * Converts an element's on-screen bounding rect into canvas-pixel-space
 * coordinates, given the canvas root element's on-screen bounding rect and
 * the current displayScale (screen-px per canvas-px).
 */
export function screenRectToCanvasBox(
  itemRect: DOMRect,
  canvasRect: DOMRect,
  displayScale: number
): FreeItemPosition {
  const scale = displayScale || 1;
  return {
    x: (itemRect.left - canvasRect.left) / scale,
    y: (itemRect.top - canvasRect.top) / scale,
    width: itemRect.width / scale,
    height: itemRect.height / scale,
  };
}

/**
 * Converts a framer-motion drag `info.offset` delta (raw screen px, NOT
 * affected by any ancestor CSS scale) into a canvas-pixel-space delta, for
 * committing a drag/resize gesture's final result into the store.
 */
export function screenDeltaToCanvasDelta(dx: number, dy: number, displayScale: number) {
  const scale = displayScale || 1;
  return { dx: dx / scale, dy: dy / scale };
}
