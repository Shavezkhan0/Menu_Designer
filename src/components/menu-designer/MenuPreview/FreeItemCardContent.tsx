"use client";

import type { MenuItem } from "@/data/menuData";
import { useMenuDesigner, type ThemeSettings, type LayoutStyle } from "@/hooks/useMenuDesigner";
import { screenRectToCanvasBox } from "@/lib/freePosition";

export interface FreeItemCardContentProps {
  item: MenuItem;
  theme: ThemeSettings;
  activeLayout: LayoutStyle;
  width: number;
  height: number;
  displayScale: number;
  isExport?: boolean;
}

export default function FreeItemCardContent({ item, theme, activeLayout, width, height, displayScale, isExport }: FreeItemCardContentProps) {
  const freePositions = useMenuDesigner((s) => s.freePositions);
  const selectedItemId = useMenuDesigner((s) => s.selectedItemId);
  const setSelectedItemId = useMenuDesigner((s) => s.setSelectedItemId);
  const setFreePosition = useMenuDesigner((s) => s.setFreePosition);

  const imageKey = `${item.id}::image`;
  const headingKey = `${item.id}::heading`;
  const descriptionKey = `${item.id}::description`;
  const imagePinned = !!freePositions[imageKey];
  const headingPinned = !!freePositions[headingKey];
  const descriptionPinned = !!freePositions[descriptionKey];

  function handlePinSub(e: React.MouseEvent, key: string) {
    if (isExport) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const canvasEl = document.getElementById("menu-preview-content");
    if (!canvasEl) return;
    setFreePosition(key, screenRectToCanvasBox(rect, canvasEl.getBoundingClientRect(), displayScale));
  }

  const isRowish = activeLayout === "horizontal-row" || activeLayout === "text-row";
  const showImage =
    (activeLayout === "vertical-grid" || activeLayout === "horizontal-row") &&
    theme.imageShape !== "none";

  const headingPx = Math.round(Math.max(10, Math.min(48, height * 0.16)));
  const descPx = Math.round(Math.max(9, Math.min(24, height * 0.09)));

  function getImageStyle(): React.CSSProperties | null {
    const sq = Math.min(width, height) * 0.5;
    const rectW = width * 0.9;
    const rectH = height * 0.45;
    switch (theme.imageShape) {
      case "circular":
        return { borderRadius: "50%", width: `${sq}px`, height: `${sq}px`, objectFit: "cover" };
      case "rectangle":
        return { borderRadius: "8px", width: `${rectW}px`, height: `${rectH}px`, objectFit: "cover" };
      case "square":
        return { borderRadius: "0px", width: `${sq}px`, height: `${sq}px`, objectFit: "cover" };
      case "blend":
        return { borderRadius: "0px", width: `${sq}px`, height: `${sq}px`, objectFit: "cover", mixBlendMode: "screen" };
      default:
        return null;
    }
  }

  const imgStyle = getImageStyle();

  const textBlock = (!headingPinned || !descriptionPinned) ? (
    <div className={isRowish ? "flex flex-1 flex-col justify-center" : "flex flex-col items-center text-center"}>
      {!headingPinned && (
        <h3
          data-canvas-item="true"
          onClick={(e) => {
            if (isExport) return;
            e.stopPropagation();
            setSelectedItemId(headingKey);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handlePinSub(e, headingKey);
          }}
          className="font-bold leading-tight"
          style={{
            fontFamily: theme.fontFamily,
            color: theme.headingColor,
            fontSize: `${headingPx}px`,
            outline: selectedItemId === headingKey ? `2px solid ${theme.primaryColor}` : "none",
            outlineOffset: "2px",
            cursor: isExport ? "default" : "pointer",
          }}
        >
          {item.name}
        </h3>
      )}
      {!descriptionPinned && (
        <p
          data-canvas-item="true"
          onClick={(e) => {
            if (isExport) return;
            e.stopPropagation();
            setSelectedItemId(descriptionKey);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handlePinSub(e, descriptionKey);
          }}
          className="mt-1 line-clamp-3 leading-relaxed"
          style={{
            color: theme.subheadingColor,
            fontSize: `${descPx}px`,
            outline: selectedItemId === descriptionKey ? `2px solid ${theme.primaryColor}` : "none",
            outlineOffset: "2px",
            cursor: isExport ? "default" : "pointer",
          }}
        >
          {item.description}
        </p>
      )}
    </div>
  ) : null;

  const image = !imagePinned && showImage && item.image && imgStyle ? (
    <img
      src={item.image}
      alt={item.name}
      draggable={false}
      data-canvas-item="true"
      onClick={(e) => {
        if (isExport) return;
        e.stopPropagation();
        setSelectedItemId(imageKey);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        handlePinSub(e, imageKey);
      }}
      className={isRowish ? "shrink-0" : "mb-2"}
      style={{
        ...imgStyle,
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
        outline: selectedItemId === imageKey ? `2px solid ${theme.primaryColor}` : "none",
        outlineOffset: "2px",
        cursor: isExport ? "default" : "pointer",
      }}
    />
  ) : null;

  return (
    <div
      className={
        isRowish
          ? "flex h-full w-full items-center gap-4 overflow-hidden px-3 py-2"
          : "flex h-full w-full flex-col items-center justify-center overflow-hidden px-3 py-2 text-center"
      }
    >
      {image}
      {textBlock}
    </div>
  );
}
