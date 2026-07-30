"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";
import type { MenuItem } from "@/data/menuData";

interface Props {
  item: MenuItem;
  index: number;
  onSelect: () => void;
}

export default function MenuItemCard({ item, index, onSelect }: Props) {
  const { theme, selectedItemId, setSelectedItemId, setActiveSidebarSection } =
    useMenuDesigner();
  const isSelected = selectedItemId === item.id;

  const handleAI = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItemId(item.id);
    setActiveSidebarSection("AI Tools");
  };

  const bgColor = isSelected
    ? "rgba(167,139,250,0.08)"
    : theme.cardStyle === "glass"
      ? "rgba(255,255,255,0.04)"
      : theme.cardStyle === "solid"
        ? "rgba(24,24,27,1)"
        : "transparent";

  const borderColor = isSelected
    ? theme.primaryColor
    : theme.cardStyle === "glass"
      ? "rgba(255,255,255,0.08)"
      : theme.cardStyle === "solid"
        ? "rgba(255,255,255,0.06)"
        : theme.cardStyle === "bordered"
          ? "rgba(255,255,255,0.12)"
          : "transparent";

  const borderStyle = theme.cardStyle === "minimal" ? "none" : `1px solid ${borderColor}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      onClick={onSelect}
      className="group relative cursor-pointer"
      style={{
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.4)",
        background: bgColor,
        border: borderStyle,
        backdropFilter: theme.cardStyle === "glass" ? "blur(12px)" : "none",
      }}
    >
      {/* Image */}
      {item.image && theme.imageShape !== "none" && (
        <div 
          className="mb-3 overflow-hidden"
          style={{
            borderRadius: theme.imageShape === "circular" ? "50%" : theme.imageShape === "square" || theme.imageShape === "blend" ? "0px" : "8px",
            mixBlendMode: theme.imageShape === "blend" ? "screen" : "normal",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${theme.imageShape === 'circular' ? 'aspect-square' : 'h-40'}`}
          />
        </div>
      )}

      {/* Top row: Name + Price */}
      <div className="mb-1.5 flex items-start justify-between gap-3">
        <h3
          className="text-[15px] font-medium leading-tight"
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

      {/* Badges */}
      <div className="mb-2 flex gap-1.5">
        {item.isNew && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              backgroundColor: "rgba(34,197,94,0.15)",
              color: "#22c55e",
            }}
          >
            New
          </span>
        )}
        {item.isSignature && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              backgroundColor: "rgba(245,158,11,0.15)",
              color: "#f59e0b",
            }}
          >
            ★ Signature
          </span>
        )}
      </div>

      {/* Description */}
      <p
        className="mb-2 line-clamp-2 text-sm leading-relaxed"
        style={{ color: "rgba(161,161,170,1)" }}
      >
        {item.description}
      </p>

      {/* Bottom metadata */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]" style={{ color: "rgba(113,113,122,1)" }}>
        {item.alcoholContent && (
          <span className="font-mono">{item.alcoholContent}</span>
        )}
        {item.servingStyle && (
          <span>{item.servingStyle}</span>
        )}
        {item.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full px-1.5 py-0.5 text-[10px]"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* AI button on hover */}
      <motion.button
        type="button"
        onClick={handleAI}
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        className="absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          backgroundColor: "rgba(167,139,250,0.15)",
          color: "#a78bfa",
        }}
      >
        <Sparkles className="size-3.5" />
      </motion.button>
    </motion.div>
  );
}
