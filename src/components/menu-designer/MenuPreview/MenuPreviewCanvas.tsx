"use client";

import { useState, useEffect, useRef, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useMenuDesigner, getCanvasPixelSize, type LayoutStyle } from "@/hooks/useMenuDesigner";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/data/menuData";
import MenuHeader from "./MenuHeader";
import MenuCategoryNav from "./MenuCategoryNav";
import MenuFooter from "./MenuFooter";
import SingleColumnLayout from "@/components/menu-designer/layouts/SingleColumnLayout";
import TwoColumnLayout from "@/components/menu-designer/layouts/TwoColumnLayout";
import GridLayout from "@/components/menu-designer/layouts/GridLayout";
import CocktailLayout from "@/components/menu-designer/layouts/CocktailLayout";
import PremiumLayout from "@/components/menu-designer/layouts/PremiumLayout";
import FineDiningLayout from "@/components/menu-designer/layouts/FineDiningLayout";
import SmartGridLayout from "@/components/menu-designer/layouts/SmartGridLayout";
import CardLayout from "@/components/menu-designer/layouts/CardLayout";

const LAYOUT_MAP: Record<LayoutStyle, typeof SingleColumnLayout> = {
  "single-column": SingleColumnLayout,
  "two-column": TwoColumnLayout,
  grid: GridLayout,
  card: CardLayout,
  premium: PremiumLayout,
  cocktail: CocktailLayout,
  "fine-dining": FineDiningLayout,
  "smart-grid": SmartGridLayout,
};

const MenuPreviewCanvas = forwardRef<HTMLDivElement>(function MenuPreviewCanvas(_props, ref) {
  const {
    selectedCategories,
    selectedItemIds,
    activeLayout,
    theme,
    background,
    canvasSize,
    zoom,
    setActiveSidebarSection,
  } = useMenuDesigner();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const firstCategory = useRef(true);

  const hasSelectedItems = selectedItemIds.length > 0;

  const visibleCategories =
    selectedCategories.length > 0
      ? MENU_CATEGORIES.filter((c) => selectedCategories.includes(c.id))
      : MENU_CATEGORIES;

  useEffect(() => {
    if (firstCategory.current && visibleCategories.length > 0) {
      setActiveCategory(visibleCategories[0].id);
      firstCategory.current = false;
    }
  }, [visibleCategories]);

  useEffect(() => {
    const ids = visibleCategories.map((c) => c.id);
    if (!ids.includes(activeCategory) && ids.length > 0) {
      setActiveCategory(ids[0]);
    }
  }, [selectedCategories, activeCategory, visibleCategories]);

  const filteredItems = hasSelectedItems
    ? MENU_ITEMS.filter((item) => selectedItemIds.includes(item.id))
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const { width: pxW, height: pxH } = getCanvasPixelSize(canvasSize);
  const scaledW = Math.round(pxW * zoom);
  const scaledH = Math.round(pxH * zoom);

  const fullBgStyle: React.CSSProperties =
    background.full.type === "image" && background.full.value
      ? { backgroundImage: `url(${background.full.value})`, backgroundSize: "cover", backgroundPosition: "center" }
      : background.full.type === "gradient"
        ? { backgroundImage: background.full.value }
        : { backgroundColor: background.full.value };

  const middleBgStyle: React.CSSProperties =
    background.middle.type === "image" && background.middle.value
      ? { backgroundImage: `url(${background.middle.value})`, backgroundSize: "cover", backgroundPosition: "center" }
      : background.middle.type === "gradient"
        ? { backgroundImage: background.middle.value }
        : { backgroundColor: background.middle.value };

  const LayoutComponent = LAYOUT_MAP[activeLayout];

  if (!hasSelectedItems && selectedCategories.length === 0) {
    return (
      <div className="flex min-h-full items-start justify-center p-8">
        <div
          style={{ width: scaledW, height: scaledH, position: "relative" }}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex items-center justify-center"
            style={{
              width: pxW,
              height: pxH,
              position: "absolute",
              top: 0,
              left: 0,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              backgroundColor: theme.backgroundColor,
            }}
          >
            <div className="relative flex flex-col items-center px-6 text-center">
              <motion.div
                className="pointer-events-none absolute -inset-20 rounded-full"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 60%)",
                    "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 60%)",
                    "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 60%)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="mb-4 text-5xl"
              >
                🍸
              </motion.span>

              <h2
                className="mb-2 text-lg font-semibold"
                style={{ color: theme.textColor }}
              >
                Select a Category to Begin
              </h2>

              <p
                className="mb-6 max-w-xs text-sm"
                style={{ color: "rgba(161,161,170,1)" }}
              >
                Choose from Cocktails, Wine, Coffee and more in the sidebar
              </p>

              <button
                type="button"
                onClick={() => setActiveSidebarSection("Categories")}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                }}
              >
                <ArrowLeft className="size-4" />
                Open Categories
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full items-start justify-center p-8">
      <div
        style={{ width: scaledW, height: scaledH, position: "relative" }}
      >
        <div
          style={{
            width: pxW,
            height: pxH,
            position: "absolute",
            top: 0,
            left: 0,
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            overflow: "hidden",
            boxShadow: "0 20px 60px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="relative h-full overflow-y-auto"
          >
            <div ref={ref} id="menu-preview-content" className="relative min-h-full" style={{ backgroundColor: theme.backgroundColor }}>
              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  filter: `blur(${background.full.blur}px) brightness(${background.full.brightness})`,
                  ...fullBgStyle,
                  backgroundAttachment: "fixed",
                }}
              />

              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  filter: `blur(${background.middle.blur}px) brightness(${background.middle.brightness})`,
                  ...middleBgStyle,
                }}
              />

              <div className="relative z-10">
                <MenuHeader />
              {!hasSelectedItems && (
                <MenuCategoryNav
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={hasSelectedItems ? `selected-${activeLayout}` : `${activeLayout}-${activeCategory}`}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <LayoutComponent items={filteredItems} />
                  </motion.div>
                </AnimatePresence>

                <MenuFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MenuPreviewCanvas;
