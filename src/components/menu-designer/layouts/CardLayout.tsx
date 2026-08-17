"use client";

import { motion } from "framer-motion";
import CategoryHeader from "@/components/menu-designer/MenuPreview/CategoryHeader";
import type { MenuItem } from "@/data/menuData";
import { useMenuDesigner, type PageLayoutProps } from "@/hooks/useMenuDesigner";

export default function CardLayout({ items, showCategoryHeader, categoryId }: PageLayoutProps) {
  const { theme, setSelectedItemId } = useMenuDesigner();

  const renderItem = (item: MenuItem, i: number) => {
    const bgColor =
      theme.cardStyle === "glass"
        ? "rgba(0,0,0,0.03)"
        : theme.cardStyle === "solid"
          ? "rgba(245,245,245,1)"
          : "transparent";

    const borderColor =
      theme.cardStyle === "glass"
        ? "rgba(0,0,0,0.08)"
        : theme.cardStyle === "solid"
          ? "rgba(0,0,0,0.06)"
          : theme.cardStyle === "bordered"
            ? "rgba(0,0,0,0.12)"
            : "transparent";

    const borderStyle = theme.cardStyle === "minimal" ? "none" : `1px solid ${borderColor}`;

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: i * 0.04 }}
        whileHover={{ y: -4 }}
        onClick={() => setSelectedItemId(item.id)}
        className="group cursor-pointer overflow-hidden"
        style={{
          borderRadius: "16px",
          background: bgColor,
          border: borderStyle,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {item.image && (
          <div className="overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3
              className="text-lg font-semibold leading-tight"
              style={{ fontFamily: theme.fontFamily, color: theme.textColor }}
            >
              {item.name}
            </h3>
            <span
              className="shrink-0 text-base font-bold"
              style={{ fontFamily: "Geist Mono, monospace", color: theme.primaryColor }}
            >
              Rs. {item.price.toFixed(2)}
            </span>
          </div>
          {item.description && (
            <p
              className="mb-3 line-clamp-2 text-sm leading-relaxed"
              style={{ color: theme.subheadingColor }}
            >
              {item.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]" style={{ color: "rgba(80,80,80,1)" }}>
            {item.isNew && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e" }}
              >
                New
              </span>
            )}
            {item.isSignature && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
              >
                ★ Signature
              </span>
            )}
            {item.alcoholContent && <span className="font-mono">{item.alcoholContent}</span>}
            {item.servingStyle && <span>{item.servingStyle}</span>}
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full px-1.5 py-0.5 text-[10px]"
                style={{ backgroundColor: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-2xl space-y-6 px-6 py-8"
    >
      {showCategoryHeader && categoryId && <CategoryHeader categoryId={categoryId} />}
      {items.map((item, i) => renderItem(item, i))}
    </motion.div>
  );
}
