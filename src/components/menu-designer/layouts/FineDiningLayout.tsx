"use client";

import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menuData";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

interface Props {
  items: MenuItem[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function FineDiningLayout({ items }: Props) {
  const { theme } = useMenuDesigner();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-[560px] px-6 py-12 text-center"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="mb-10"
        >
          {item.image && theme.imageShape !== "none" && (
            <div 
              className="mx-auto mb-4 overflow-hidden" 
              style={{ 
                width: '120px', 
                height: '120px',
                borderRadius: theme.imageShape === "circular" ? "50%" : theme.imageShape === "square" || theme.imageShape === "blend" ? "0px" : "8px",
                mixBlendMode: theme.imageShape === "blend" ? "screen" : "normal",
                border: theme.imageShape === "circular" ? "1px solid rgba(201,168,76,0.2)" : "none",
                padding: theme.imageShape === "circular" ? "4px" : "0px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
                style={{
                  borderRadius: theme.imageShape === "circular" ? "50%" : theme.imageShape === "square" || theme.imageShape === "blend" ? "0px" : "8px",
                }}
              />
            </div>
          )}
          <h3
            className="mb-2 text-xl font-bold leading-snug"
            style={{
              fontFamily: theme.fontFamily,
              color: theme.textColor,
            }}
          >
            {item.name}
          </h3>

          <span
            className="text-base font-semibold"
            style={{
              fontFamily: "Geist Mono, monospace",
              color: theme.primaryColor,
            }}
          >
            Rs. {item.price.toFixed(2)}
          </span>

          <p
            className="mx-auto mt-2 max-w-md text-sm leading-relaxed"
            style={{ color: "rgba(113,113,122,1)" }}
          >
            {item.description}
          </p>

          {i < items.length - 1 && (
            <p
              className="mt-8 text-xs tracking-[0.3em]"
              style={{ color: theme.primaryColor, opacity: 0.4 }}
            >
              • &nbsp;• &nbsp;•
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
