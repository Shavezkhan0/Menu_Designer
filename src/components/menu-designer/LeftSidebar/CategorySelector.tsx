"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, ArrowLeft } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menuData";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

function getItemCount(categoryId: string): number {
  return MENU_ITEMS.filter((item) => item.category === categoryId).length;
}

function getItemsForCategory(categoryId: string) {
  return MENU_ITEMS.filter((item) => item.category === categoryId);
}

function getCategoryEmoji(categoryId: string): string {
  return MENU_CATEGORIES.find((c) => c.id === categoryId)?.emoji ?? "🍸";
}

const slideFade = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function CategorySelector() {
  const {
    activeBrowseCategory,
    setActiveBrowseCategory,
    selectedItemIds,
    toggleItem,
  } = useMenuDesigner();

  return (
    <div className="px-4 py-5">
      <AnimatePresence mode="wait">
        {activeBrowseCategory === null ? (
          /* ── Phase 1: Category Picker ── */
          <motion.div
            key="phase-categories"
            {...slideFade}
            transition={{ duration: 0.2 }}
          >
            <p
              className="mb-3 text-[11px] font-medium tracking-[0.1em]"
              style={{ color: "rgba(113,113,122,1)" }}
            >
              CATEGORIES
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MENU_CATEGORIES.map((category) => {
                const count = getItemCount(category.id);
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveBrowseCategory(category.id)}
                    layout
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                      mass: 0.5,
                    }}
                    className="flex flex-col items-start gap-1.5 rounded-xl p-3 text-left"
                    style={{
                      border: "1px solid rgba(39,39,42,1)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(63,63,70,1)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(39,39,42,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(39,39,42,1)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <span className="text-2xl leading-none">
                      {category.emoji}
                    </span>
                    <span
                      className="text-[13px] font-medium leading-tight"
                      style={{ color: "rgba(161,161,170,1)" }}
                    >
                      {category.label}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: "rgba(82,82,91,1)" }}
                    >
                      {count} {count === 1 ? "item" : "items"}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ── Phase 2: Item Picker ── */
          <motion.div
            key="phase-items"
            {...slideFade}
            transition={{ duration: 0.2 }}
          >
            {/* Back button */}
            <button
              type="button"
              onClick={() => setActiveBrowseCategory(null)}
              className="mb-3 flex items-center gap-1 text-xs font-medium transition-colors"
              style={{ color: "rgba(161,161,170,1)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(212,212,216,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(161,161,170,1)")
              }
            >
              <ArrowLeft className="size-3.5" />
              Back to categories
            </button>

            {/* Category heading */}
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg leading-none">
                {getCategoryEmoji(activeBrowseCategory)}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(244,244,245,1)" }}
              >
                {MENU_CATEGORIES.find(
                  (c) => c.id === activeBrowseCategory
                )?.label ?? activeBrowseCategory}
              </span>
            </div>

            {/* Item list */}
            <div className="flex flex-col gap-1">
              {getItemsForCategory(activeBrowseCategory).map((item) => {
                const isSelected = selectedItemIds.includes(item.id);
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors"
                    style={{
                      backgroundColor: isSelected
                        ? "rgba(167,139,250,0.06)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.03)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {/* Image or Emoji circle */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-full text-base"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(167,139,250,0.12), rgba(167,139,250,0.04))",
                        }}
                      >
                        {getCategoryEmoji(activeBrowseCategory)}
                      </div>
                    )}

                    {/* Name + price + description */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span
                          className="truncate text-[13px] font-medium"
                          style={{ color: "rgba(228,228,231,1)" }}
                        >
                          {item.name}
                        </span>
                        <span
                          className="shrink-0 text-[11px] font-semibold"
                          style={{ color: "#a78bfa" }}
                        >
                          Rs. {item.price.toFixed(2)}
                        </span>
                      </div>
                      <p
                        className="mt-0.5 truncate text-[11px] leading-tight"
                        style={{ color: "rgba(113,113,122,1)" }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Toggle button */}
                    <div
                      className="flex size-6 shrink-0 items-center justify-center rounded-full transition-colors"
                      style={{
                        backgroundColor: isSelected
                          ? "#a78bfa"
                          : "transparent",
                        border: isSelected
                          ? "none"
                          : "1.5px dashed rgba(82,82,91,1)",
                      }}
                    >
                      {isSelected ? (
                        <Check className="size-3" strokeWidth={3} color="#fff" />
                      ) : (
                        <Plus className="size-3" color="rgba(82,82,91,1)" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
