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
  show: { transition: { staggerChildren: 0.04 } },
};

export default function TwoColumnLayout({ items }: Props) {
  const { setSelectedItemId, showCategoryNames } = useMenuDesigner();
  const groups = groupItemsByCategory(items);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-4xl space-y-10 px-6 py-8"
    >
      {showCategoryNames ? (
        groups.map((group) => (
          <section key={group.category.id}>
            <CategoryHeader categoryId={group.category.id} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {group.items.map((item, i) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  index={i}
                  onSelect={() => setSelectedItemId(item.id)}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
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
      )}
    </motion.div>
  );
}
