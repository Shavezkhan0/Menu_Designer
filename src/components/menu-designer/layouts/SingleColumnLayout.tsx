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
  show: { transition: { staggerChildren: 0.05 } },
};

export default function SingleColumnLayout({ items }: Props) {
  const { setSelectedItemId } = useMenuDesigner();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-2xl space-y-4 px-6 py-8"
    >
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
              style={{
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
