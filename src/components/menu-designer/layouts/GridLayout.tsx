"use client";

import { motion } from "framer-motion";
import MenuItemCard from "@/components/menu-designer/MenuPreview/MenuItemCard";
import type { MenuItem } from "@/data/menuData";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

interface Props {
  items: MenuItem[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

export default function GridLayout({ items }: Props) {
  const { setSelectedItemId } = useMenuDesigner();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-6 py-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item, i) => (
        <MenuItemCard
          key={item.id}
          item={item}
          index={i}
          onSelect={() => setSelectedItemId(item.id)}
        />
      ))}
    </motion.div>
  );
}
