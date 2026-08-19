"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useMenuDesigner, getCanvasPixelSize } from "@/hooks/useMenuDesigner";
import { MENU_ITEMS } from "@/data/menuData";
import { computeMenuPages } from "@/lib/pagination";
import { isSpotlightMode } from "@/lib/spotlight";
import MenuPageView from "./MenuPageView";

const MenuPreviewCanvas = forwardRef<HTMLDivElement>(function MenuPreviewCanvas(_props, ref) {
  const selectedCategories = useMenuDesigner((s) => s.selectedCategories);
  const selectedItemIds = useMenuDesigner((s) => s.selectedItemIds);
  const activeLayout = useMenuDesigner((s) => s.activeLayout);
  const theme = useMenuDesigner((s) => s.theme);
  const background = useMenuDesigner((s) => s.background);
  const menuBorder = useMenuDesigner((s) => s.menuBorder);
  const canvasSize = useMenuDesigner((s) => s.canvasSize);
  const zoom = useMenuDesigner((s) => s.zoom);
  const showHeader = useMenuDesigner((s) => s.showHeader);
  const showCategoryNames = useMenuDesigner((s) => s.showCategoryNames);
  const restaurantInfo = useMenuDesigner((s) => s.restaurantInfo);
  const footer = useMenuDesigner((s) => s.footer);
  const setActiveSidebarSection = useMenuDesigner((s) => s.setActiveSidebarSection);

  const undoPosition = useMenuDesigner((s) => s.undoPosition);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isUndo = (e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === "z";
      if (!isUndo) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      e.preventDefault();
      undoPosition();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undoPosition]);

  const hasSelectedItems = selectedItemIds.length > 0;

  const filteredItems =
    selectedCategories.length > 0
      ? MENU_ITEMS.filter((item) => selectedCategories.includes(item.category))
      : hasSelectedItems
        ? MENU_ITEMS.filter((item) => selectedItemIds.includes(item.id))
        : MENU_ITEMS;

  const isSpotlight = isSpotlightMode(filteredItems.length);

  const pages = useMemo(() => {
    if (isSpotlight) {
      return [
        {
          pageNumber: 1,
          categoryId: null,
          showCategoryHeader: false,
          items: filteredItems,
          startItemIndex: 0,
        },
      ];
    }
    return computeMenuPages(filteredItems, activeLayout, {
      showCategoryNames,
      itemsPerPageOverride: filteredItems.length || undefined,
    });
  }, [filteredItems, activeLayout, showCategoryNames, isSpotlight]);

  const { width: pxW, height: pxH } = getCanvasPixelSize(canvasSize);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ w: width, h: height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const PADDING = 64;
  const fitZoom = useMemo(() => {
    if (containerSize.w === 0 || containerSize.h === 0) return 0.5;
    const availW = containerSize.w - PADDING;
    const availH = containerSize.h - PADDING;
    return Math.min(availW / pxW, availH / pxH, 1);
  }, [containerSize, pxW, pxH]);

  const displayScale = fitZoom * zoom;

  const canvasContent = pages.length > 0 && (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ width: pxW, height: pxH }}
      >
        <MenuPageView
          pages={pages}
          canvasSize={canvasSize}
          theme={theme}
          background={background}
          menuBorder={menuBorder}
          showHeader={showHeader}
          restaurantInfo={restaurantInfo}
          footer={footer}
          activeLayout={activeLayout}
          isSpotlight={isSpotlight}
          displayScale={displayScale}
        />
      </motion.div>
    </AnimatePresence>
  );

  if (!hasSelectedItems && selectedCategories.length === 0) {
    return (
      <div
        ref={containerRef}
        className="relative flex h-full overflow-hidden"
      >
        <div
          className="absolute"
          style={{
            width: pxW,
            height: pxH,
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${displayScale})`,
            transformOrigin: "center center",
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
            <h2 className="mb-2 text-lg font-semibold" style={{ color: theme.textColor }}>
              Select a Category to Begin
            </h2>
            <p className="mb-6 max-w-xs text-sm" style={{ color: "rgba(80,80,80,1)" }}>
              Choose from Cocktails or Mocktails in the sidebar
            </p>
            <button
              type="button"
              onClick={() => setActiveSidebarSection("Categories")}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}
            >
              <ArrowLeft className="size-4" />
              Open Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className="relative flex flex-1 overflow-hidden"
    >
      <div
        className="absolute"
        style={{
          width: pxW,
          height: pxH,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${displayScale})`,
          transformOrigin: "center center",
          overflow: "hidden",
          boxShadow: "0 20px 60px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)",
        }}
      >
        {canvasContent}
      </div>
    </div>
  );
});

export default MenuPreviewCanvas;
