"use client";

import { motion } from "framer-motion";
import CategoryHeader from "@/components/menu-designer/MenuPreview/CategoryHeader";
import { useMenuDesigner, type PageLayoutProps } from "@/hooks/useMenuDesigner";
import { getResponsiveScale, getGridColumns } from "@/lib/responsiveScale";
import { screenRectToCanvasBox } from "@/lib/freePosition";

export default function TextOnlyLayout({ items, showCategoryHeader, categoryId, isExport, displayScale }: PageLayoutProps) {
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

  const columns = getGridColumns(items.length);

  const headingPx = `${Math.round(14 * scale)}px`;
  const descPx = `${Math.round(11 * scale)}px`;
  const gap = Math.round(40 * scale);
  const colGap = Math.round(32 * scale);

  return (
    <motion.div
      initial={isExport ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex h-full w-full flex-col"
      style={{ padding: `${menuBorder.paddingY}px ${menuBorder.paddingX}px` }}
    >
      {showCategoryHeader && categoryId && <CategoryHeader categoryId={categoryId} />}
      <div
        className="grid flex-1 min-h-0"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridAutoRows: "1fr",
          alignItems: "center",
          justifyItems: "center",
          gap: `${gap}px ${colGap}px`,
        }}
      >
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            initial={isExport ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileHover={{ y: -2 }}
            onClick={() => setSelectedItemId(item.id)}
            onDoubleClick={(e) => handlePin(e, item.id)}
            className="flex flex-col items-center text-center"
            data-canvas-item="true"
            style={{
              outline: selectedItemId === item.id ? `2px solid ${theme.primaryColor}` : "none",
              outlineOffset: "2px",
              borderRadius: "6px",
            }}
          >
            <h3
              className="font-bold leading-tight"
              style={{
                fontFamily: theme.fontFamily,
                color: theme.headingColor,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: headingPx,
              }}
            >
              {item.name}
            </h3>
            <p
              className="mt-2 line-clamp-4 leading-relaxed"
              style={{ color: theme.subheadingColor, fontSize: descPx }}
            >
              {item.description}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
