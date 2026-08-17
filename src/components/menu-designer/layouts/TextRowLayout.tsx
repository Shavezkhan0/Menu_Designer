"use client";

import { motion } from "framer-motion";
import CategoryHeader from "@/components/menu-designer/MenuPreview/CategoryHeader";
import { useMenuDesigner, type PageLayoutProps } from "@/hooks/useMenuDesigner";
import { getResponsiveScale } from "@/lib/responsiveScale";

export default function TextRowLayout({ items, showCategoryHeader, categoryId, isExport }: PageLayoutProps) {
  const { theme, setSelectedItemId } = useMenuDesigner();
  const scale = getResponsiveScale(items.length);

  const headingPx = `${Math.round(14 * scale)}px`;
  const descPx = `${Math.round(11 * scale)}px`;
  const gap = Math.round(36 * scale);

  return (
    <motion.div
      initial={isExport ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="mx-auto flex max-w-2xl flex-col px-6 py-8"
    >
      {showCategoryHeader && categoryId && <CategoryHeader categoryId={categoryId} />}
      <div className="flex flex-col" style={{ gap: `${gap}px` }}>
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
