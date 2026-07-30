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
  show: { transition: { staggerChildren: 0.04 } },
};

export default function TwoColumnLayout({ items }: Props) {
  const { setSelectedItemId } = useMenuDesigner();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid max-w-4xl grid-cols-1 gap-4 px-6 py-8 sm:grid-cols-2"
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
