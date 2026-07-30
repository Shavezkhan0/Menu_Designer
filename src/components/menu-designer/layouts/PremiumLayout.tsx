"use client";

import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menuData";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

interface Props {
  items: MenuItem[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export default function PremiumLayout({ items }: Props) {
  const { theme } = useMenuDesigner();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-[640px] px-6 py-8"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
          className="mb-6"
        >
          {item.image && theme.imageShape !== "none" && (
            <div 
              className="mb-4 overflow-hidden"
              style={{
                borderRadius: theme.imageShape === "circular" ? "50%" : theme.imageShape === "square" || theme.imageShape === "blend" ? "0px" : "8px",
                mixBlendMode: theme.imageShape === "blend" ? "screen" : "normal",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className={`w-full object-cover ${theme.imageShape === 'circular' ? 'aspect-square max-w-[200px] mx-auto' : 'h-48'}`}
              />
            </div>
          )}
          <div className="mb-1 flex items-baseline justify-between gap-4">
            <h3
              className="text-base font-medium leading-tight"
              style={{
                fontFamily: theme.fontFamily,
                color: theme.textColor,
              }}
            >
              {item.name}
            </h3>
            <span
              className="shrink-0 text-sm font-semibold"
              style={{
                fontFamily: "Geist Mono, monospace",
                color: theme.primaryColor,
              }}
            >
              Rs. {item.price.toFixed(2)}
            </span>
          </div>

          <p
            className="text-sm italic leading-relaxed"
            style={{ color: "rgba(161,161,170,0.8)" }}
          >
            {item.description}
          </p>

          {i < items.length - 1 && (
            <div
              className="mt-5"
              style={{
                height: "1px",
                backgroundColor: theme.primaryColor,
                opacity: 0.15,
              }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
