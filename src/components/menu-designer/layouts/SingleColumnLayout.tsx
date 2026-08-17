"use client";

import { motion } from "framer-motion";
import MenuItemCard from "@/components/menu-designer/MenuPreview/MenuItemCard";
import CategoryHeader from "@/components/menu-designer/MenuPreview/CategoryHeader";
import { useMenuDesigner, type PageLayoutProps } from "@/hooks/useMenuDesigner";

export default function SingleColumnLayout({ items, showCategoryHeader, categoryId }: PageLayoutProps) {
  const { setSelectedItemId } = useMenuDesigner();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-2xl space-y-4 px-6 py-8"
    >
      {showCategoryHeader && categoryId && <CategoryHeader categoryId={categoryId} />}
      {items.map((item, i) => (
        <div key={item.id}>
          <MenuItemCard
            item={item}
            index={i}
            onSelect={() => setSelectedItemId(item.id)}
          />
          {i < items.length - 1 && (
            <div
              className="mt-4"
              style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.06)" }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
