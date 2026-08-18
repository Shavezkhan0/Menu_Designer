"use client";

import type { MenuItem } from "@/data/menuData";
import type { ThemeSettings, LayoutStyle } from "@/hooks/useMenuDesigner";

export interface FreeItemCardContentProps {
  item: MenuItem;
  theme: ThemeSettings;
  activeLayout: LayoutStyle;
  width: number;
  height: number;
}

export default function FreeItemCardContent({ item, theme, activeLayout, width, height }: FreeItemCardContentProps) {
  const isRowish = activeLayout === "horizontal-row" || activeLayout === "text-row";
  const showImage =
    (activeLayout === "vertical-grid" || activeLayout === "horizontal-row") &&
    theme.imageShape !== "none";

  const headingPx = Math.round(Math.max(10, Math.min(28, height * 0.12)));
  const descPx = Math.round(Math.max(9, Math.min(16, height * 0.07)));

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

  const textBlock = (
    <div className={isRowish ? "flex flex-1 flex-col justify-center" : "flex flex-col items-center text-center"}>
      <h3
        className="font-bold leading-tight"
        style={{ fontFamily: theme.fontFamily, color: theme.headingColor, fontSize: `${headingPx}px` }}
      >
        {item.name}
      </h3>
      <p
        className="mt-1 line-clamp-3 leading-relaxed"
        style={{ color: theme.subheadingColor, fontSize: `${descPx}px` }}
      >
        {item.description}
      </p>
    </div>
  );

  const image = showImage && item.image && imgStyle ? (
    <img
      src={item.image}
      alt={item.name}
      className={isRowish ? "shrink-0" : "mb-2"}
      style={{ ...imgStyle, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
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
