"use client";

import { motion } from "framer-motion";
import CategoryHeader from "@/components/menu-designer/MenuPreview/CategoryHeader";
import { useMenuDesigner, type PageLayoutProps } from "@/hooks/useMenuDesigner";
import { getResponsiveScale } from "@/lib/responsiveScale";
import { screenRectToCanvasBox } from "@/lib/freePosition";

export default function HorizontalRowLayout({ items, showCategoryHeader, categoryId, isExport, displayScale }: PageLayoutProps) {
  const { theme, setSelectedItemId, menuBorder, setFreePosition, selectedItemId } = useMenuDesigner();

  function handlePin(e: React.MouseEvent<HTMLButtonElement>, itemId: string) {
    if (isExport) return;
    const itemRect = e.currentTarget.getBoundingClientRect();
    const canvasEl = document.getElementById("menu-preview-content");
    if (!canvasEl) return;
    const canvasRect = canvasEl.getBoundingClientRect();
    const box = screenRectToCanvasBox(itemRect, canvasRect, displayScale ?? 1);
    setFreePosition(itemId, box);
  }
  const scale = getResponsiveScale(items.length);

  const imgSq = Math.round(90 * scale);
  const rectW = Math.round(110 * scale);
  const rectH = Math.round(80 * scale);
  const headingPx = `${Math.round(16 * scale)}px`;
  const descPx = `${Math.round(12 * scale)}px`;
  const gap = Math.round(40 * scale);

  function getImageStyle(): React.CSSProperties {
    switch (theme.imageShape) {
      case "circular":
        return { borderRadius: "50%", width: `${imgSq}px`, height: `${imgSq}px`, objectFit: "cover" };
      case "rectangle":
        return { borderRadius: "8px", width: `${rectW}px`, height: `${rectH}px`, objectFit: "cover" };
      case "square":
        return { borderRadius: "0px", width: `${imgSq}px`, height: `${imgSq}px`, objectFit: "cover" };
      case "blend":
        return { borderRadius: "0px", width: `${imgSq}px`, height: `${imgSq}px`, objectFit: "cover", mixBlendMode: "screen" };
      case "none":
        return { width: 0, height: 0, display: "none" };
    }
  }

  const imgStyle = getImageStyle();
  const showImage = theme.imageShape !== "none";

  return (
    <motion.div
      initial={isExport ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex h-full w-full flex-col"
      style={{ padding: `${menuBorder.paddingY}px ${menuBorder.paddingX}px` }}
    >
      {showCategoryHeader && categoryId && <CategoryHeader categoryId={categoryId} />}
      <div className="flex flex-1 min-h-0 flex-col" style={{ gap: `${gap}px` }}>
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            initial={isExport ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileHover={{ y: -1 }}
            onClick={() => setSelectedItemId(item.id)}
            onDoubleClick={(e) => handlePin(e, item.id)}
            className={`flex flex-1 min-h-0 items-center gap-5 ${i % 2 === 0 ? "flex-row text-left" : "flex-row-reverse text-right"}`}
            data-canvas-item="true"
            style={{
              outline: selectedItemId === item.id ? `2px solid ${theme.primaryColor}` : "none",
              outlineOffset: "2px",
              borderRadius: "6px",
            }}
          >
            {showImage && item.image ? (
              <img
                src={item.image}
                alt={item.name}
                draggable={false}
                className="shrink-0"
                style={{
                  ...imgStyle,
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                }}
              />
            ) : showImage ? (
              <div
                className="shrink-0 flex items-center justify-center"
                style={{
                  ...imgStyle,
                  backgroundColor: "rgba(0,0,0,0.04)",
                  fontSize: `${Math.round(28 * scale)}px`,
                  lineHeight: 1,
                }}
              >
                🍸
              </div>
            ) : null}
            <div className="flex flex-1 flex-col justify-center pt-1">
              <h3
                className="font-bold leading-tight"
                style={{
                  fontFamily: theme.fontFamily,
                  color: theme.headingColor,
                  fontSize: headingPx,
                }}
              >
                {item.name}
              </h3>
              <p
                className="mt-1.5 line-clamp-3 leading-relaxed"
                style={{ color: theme.subheadingColor, fontSize: descPx }}
              >
                {item.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
