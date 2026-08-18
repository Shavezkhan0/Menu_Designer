"use client";

import { motion } from "framer-motion";
import CategoryHeader from "@/components/menu-designer/MenuPreview/CategoryHeader";
import { useMenuDesigner, type PageLayoutProps } from "@/hooks/useMenuDesigner";
import { getResponsiveScale } from "@/lib/responsiveScale";

export default function TextRowLayout({ items, showCategoryHeader, categoryId, isExport }: PageLayoutProps) {
  const { theme, setSelectedItemId, menuBorder } = useMenuDesigner();
  const scale = getResponsiveScale(items.length);

  const headingPx = `${Math.round(14 * scale)}px`;
  const descPx = `${Math.round(11 * scale)}px`;
  const gap = Math.round(36 * scale);

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
            whileHover={{ y: -2 }}
            onClick={() => setSelectedItemId(item.id)}
            className="flex flex-1 min-h-0 flex-col items-center justify-center text-center"
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
