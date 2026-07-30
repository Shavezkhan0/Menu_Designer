"use client";

import { motion } from "framer-motion";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";
import { MENU_CATEGORIES } from "@/data/menuData";

interface Props {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function MenuCategoryNav({ activeCategory, onCategoryChange }: Props) {
  const { selectedCategories, theme, background } = useMenuDesigner();

  const categories = selectedCategories.length > 0
    ? MENU_CATEGORIES.filter((c) => selectedCategories.includes(c.id))
    : MENU_CATEGORIES;

  return (
    <div
      className="sticky top-0 z-20 overflow-x-auto"
      style={{
        backgroundColor: (
          (background.full.type !== "color" || background.full.value !== "transparent") ||
          (background.middle.type !== "color" || background.middle.value !== "transparent")
        ) ? "transparent" : theme.backgroundColor,
        backdropFilter: "blur(8px)",
        scrollbarWidth: "none",
      }}
    >
      <div className="flex gap-2 px-6 py-3">
        {categories.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className="relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap"
              style={{
                backgroundColor: active ? theme.primaryColor : "transparent",
                color: active ? "#fff" : "rgba(161,161,170,1)",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = "rgba(39,39,42,1)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {active && (
                <motion.span
                  layoutId="category-nav-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: theme.primaryColor }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
