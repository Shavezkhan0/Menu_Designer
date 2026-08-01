"use client";

import { motion } from "framer-motion";
import MenuItemCard from "@/components/menu-designer/MenuPreview/MenuItemCard";
import CategoryHeader from "@/components/menu-designer/MenuPreview/CategoryHeader";
import type { MenuItem } from "@/data/menuData";
import { groupItemsByCategory } from "@/data/menuData";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

interface Props {
  items: MenuItem[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export default function SingleColumnLayout({ items }: Props) {
  const { setSelectedItemId, showCategoryNames } = useMenuDesigner();
  const groups = groupItemsByCategory(items);

  const renderItems = (itemsToRender: MenuItem[]) => (
    <div className="space-y-4">
      {itemsToRender.map((item, i) => (
        <div key={item.id}>
          <MenuItemCard
            item={item}
            index={i}
            onSelect={() => setSelectedItemId(item.id)}
          />
          {i < itemsToRender.length - 1 && (
            <div
              className="mt-4"
              style={{
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-2xl space-y-8 px-6 py-8"
    >
      {showCategoryNames ? (
        groups.map((group) => (
          <section key={group.category.id}>
            <CategoryHeader categoryId={group.category.id} />
            {renderItems(group.items)}
          </section>
        ))
      ) : (
        renderItems(items)
      )}
    </motion.div>
  );
}
