"use client";

import { motion } from "framer-motion";
import MenuItemCard from "@/components/menu-designer/MenuPreview/MenuItemCard";
import CategoryHeader from "@/components/menu-designer/MenuPreview/CategoryHeader";
import { useMenuDesigner, type PageLayoutProps } from "@/hooks/useMenuDesigner";

export default function TwoColumnLayout({ items, showCategoryHeader, categoryId }: PageLayoutProps) {
  const { setSelectedItemId } = useMenuDesigner();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-4xl space-y-4 px-6 py-8"
    >
      {showCategoryHeader && categoryId && <CategoryHeader categoryId={categoryId} />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <MenuItemCard
            key={item.id}
            item={item}
            index={i}
            onSelect={() => setSelectedItemId(item.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}
