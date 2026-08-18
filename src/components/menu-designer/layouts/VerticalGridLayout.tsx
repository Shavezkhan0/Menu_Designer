"use client";

import { motion } from "framer-motion";
import CategoryHeader from "@/components/menu-designer/MenuPreview/CategoryHeader";
import { useMenuDesigner, type PageLayoutProps } from "@/hooks/useMenuDesigner";
import { getResponsiveScale, getGridColumns } from "@/lib/responsiveScale";

export default function VerticalGridLayout({ items, showCategoryHeader, categoryId, isExport }: PageLayoutProps) {
  const { theme, setSelectedItemId, menuBorder } = useMenuDesigner();
  const scale = getResponsiveScale(items.length);

  const columns = getGridColumns(items.length);

  const imgW = Math.round(120 * scale);
  const imgH = Math.round(120 * scale);
  const rectW = Math.round(140 * scale);
  const rectH = Math.round(100 * scale);
  const headingPx = `${Math.round(14 * scale)}px`;
  const descPx = `${Math.round(11 * scale)}px`;
  const gap = Math.round(40 * scale);
  const colGap = Math.round(32 * scale);

  function getImageStyle() {
    switch (theme.imageShape) {
      case "circular":
        return { borderRadius: "50%", width: `${imgW}px`, height: `${imgH}px`, objectFit: "cover" as const };
      case "rectangle":
        return { borderRadius: "8px", width: `${rectW}px`, height: `${rectH}px`, objectFit: "cover" as const };
      case "square":
        return { borderRadius: "0px", width: `${imgW}px`, height: `${imgH}px`, objectFit: "cover" as const };
      case "blend":
        return { borderRadius: "0px", width: `${imgW}px`, height: `${imgH}px`, objectFit: "cover" as const, mixBlendMode: "screen" as const };
      case "none":
        return null;
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
            className="flex flex-col items-center text-center"
          >
            {showImage && item.image && imgStyle ? (
              <img
                src={item.image}
                alt={item.name}
                className="mb-3"
                style={{
                  ...imgStyle,
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                }}
              />
            ) : showImage ? (
              <div
                className="mb-3 flex items-center justify-center"
                style={{
                  ...imgStyle!,
                  backgroundColor: "rgba(0,0,0,0.04)",
                  fontSize: `${Math.round(36 * scale)}px`,
                  lineHeight: 1,
                }}
              >
                🍸
              </div>
            ) : null}
            <h3
              className="font-bold leading-tight"
              style={{
                fontFamily: theme.fontFamily,
                color: theme.headingColor,
                letterSpacing: "0.04em",
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
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
