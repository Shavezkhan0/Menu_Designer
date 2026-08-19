"use client";

import { useEffect } from "react";
import type { MenuPage } from "@/lib/pagination";
import {
  getCanvasPixelSize,
  getBackgroundImageCss,
  useMenuDesigner,
  type CanvasSize,
  type ThemeSettings,
  type BackgroundSettings,
  type MenuBorderSettings,
  type RestaurantInfo,
  type LayoutStyle,
  type FooterSettings,
} from "@/hooks/useMenuDesigner";
import VerticalGridLayout from "@/components/menu-designer/layouts/VerticalGridLayout";
import HorizontalRowLayout from "@/components/menu-designer/layouts/HorizontalRowLayout";
import TextOnlyLayout from "@/components/menu-designer/layouts/TextOnlyLayout";
import TextRowLayout from "@/components/menu-designer/layouts/TextRowLayout";
import SpotlightLayout from "@/components/menu-designer/layouts/SpotlightLayout";
import FreePositionOverlay from "./FreePositionOverlay";
import DraggableFreeBox from "./DraggableFreeBox";
import { screenRectToCanvasBox } from "@/lib/freePosition";

const LAYOUT_MAP: Record<LayoutStyle, typeof VerticalGridLayout> = {
  "vertical-grid": VerticalGridLayout,
  "horizontal-row": HorizontalRowLayout,
  "text-only": TextOnlyLayout,
  "text-row": TextRowLayout,
};

const SIGNATURE_LIGHT = "#F4D9C9";
const SIGNATURE_DARK = "#6B3226";

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function isLightBg(hex: string): boolean {
  const c = parseHex(hex);
  if (!c) return true;
  return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255 > 0.5;
}

export interface MenuPageViewProps {
  pages: MenuPage[];
  canvasSize: CanvasSize;
  theme: ThemeSettings;
  background: BackgroundSettings;
  menuBorder: MenuBorderSettings;
  showHeader: boolean;
  restaurantInfo: RestaurantInfo;
  footer: FooterSettings;
  activeLayout: LayoutStyle;
  isExport?: boolean;
  isSpotlight?: boolean;
  displayScale?: number;
}

export default function MenuPageView({
  pages,
  canvasSize,
  theme,
  background,
  menuBorder,
  showHeader,
  restaurantInfo,
  footer,
  activeLayout,
  isExport,
  isSpotlight,
  displayScale = 1,
}: MenuPageViewProps) {
  const { width: pxW, height: pxH } = getCanvasPixelSize(canvasSize);
  const LayoutComponent = LAYOUT_MAP[activeLayout];

  const bgStyle: React.CSSProperties =
    background.type === "image" && background.value
      ? { backgroundImage: getBackgroundImageCss(background.value), backgroundSize: "cover", backgroundPosition: "center" }
      : background.type === "gradient"
        ? { backgroundImage: background.value }
        : { backgroundColor: background.value };

  const freePositions = useMenuDesigner((s) => s.freePositions);
  const setSelectedItemId = useMenuDesigner((s) => s.setSelectedItemId);
  const selectedItemId = useMenuDesigner((s) => s.selectedItemId);
  const headerLogoPosition = useMenuDesigner((s) => s.headerLogoPosition);
  const headerHeadingPosition = useMenuDesigner((s) => s.headerHeadingPosition);
  const footerPosition = useMenuDesigner((s) => s.footerPosition);
  const setHeaderLogoPosition = useMenuDesigner((s) => s.setHeaderLogoPosition);
  const setHeaderHeadingPosition = useMenuDesigner((s) => s.setHeaderHeadingPosition);
  const setFooterPosition = useMenuDesigner((s) => s.setFooterPosition);
  const pinnedIds = new Set(Object.keys(freePositions));

  const filteredPages = pinnedIds.size === 0
    ? pages
    : pages.map((page) => ({
        ...page,
        items: page.items.filter((item) => !pinnedIds.has(item.id)),
      }));

  const pinnedItems = pinnedIds.size === 0
    ? []
    : pages.flatMap((page) => page.items).filter((item) => pinnedIds.has(item.id));

  const spotlightItems = filteredPages[0]?.items ?? [];

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement;
      const canvasEl = document.getElementById("menu-preview-content");
      if (!canvasEl || !canvasEl.contains(target)) return;
      if (!target.closest("[data-canvas-item]")) {
        setSelectedItemId(null);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [setSelectedItemId]);

  function handlePinLogo(e: React.MouseEvent) {
    if (isExport) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const canvasEl = document.getElementById("menu-preview-content");
    if (!canvasEl) return;
    setHeaderLogoPosition(screenRectToCanvasBox(rect, canvasEl.getBoundingClientRect(), displayScale));
  }
  function handlePinHeading(e: React.MouseEvent) {
    if (isExport) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const canvasEl = document.getElementById("menu-preview-content");
    if (!canvasEl) return;
    setHeaderHeadingPosition(screenRectToCanvasBox(rect, canvasEl.getBoundingClientRect(), displayScale));
  }
  function handlePinFooter(e: React.MouseEvent) {
    if (isExport) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const canvasEl = document.getElementById("menu-preview-content");
    if (!canvasEl) return;
    setFooterPosition(screenRectToCanvasBox(rect, canvasEl.getBoundingClientRect(), displayScale));
  }

  return (
    <div
      id="menu-preview-content"
      className="relative flex flex-col"
      style={{
        width: pxW,
        height: pxH,
        backgroundColor: theme.backgroundColor,
        overflow: "hidden",
      }}
    >
      {/* Background layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          filter: `blur(${background.blur}px) brightness(${background.brightness})`,
          ...bgStyle,
        }}
      />

      {/* Header */}
      {showHeader && (
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-12 text-center"
        >
          <div className="relative z-10 flex flex-col items-center">
            {restaurantInfo.logoUrl && !headerLogoPosition && (
              <img
                src={restaurantInfo.logoUrl}
                alt="Logo"
                draggable={false}
                data-canvas-item="true"
                onClick={() => setSelectedItemId("__header_logo__")}
                onDoubleClick={handlePinLogo}
                className="mb-4 object-cover"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  boxShadow: `0 0 0 3px ${theme.primaryColor}`,
                  outline: selectedItemId === "__header_logo__" ? `2px solid ${theme.primaryColor}` : "none",
                  outlineOffset: "2px",
                  cursor: "pointer",
                }}
              />
            )}
            {(restaurantInfo.name || restaurantInfo.tagline) && !headerHeadingPosition && (
              <div
                data-canvas-item="true"
                onClick={() => setSelectedItemId("__header_heading__")}
                onDoubleClick={handlePinHeading}
                style={{
                  outline: selectedItemId === "__header_heading__" ? `2px solid ${theme.primaryColor}` : "none",
                  outlineOffset: "4px",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                {restaurantInfo.name && (
                  <h1
                    className="font-bold leading-tight"
                    style={{ fontFamily: theme.fontFamily, fontSize: "48px", color: theme.textColor }}
                  >
                    {restaurantInfo.name}
                  </h1>
                )}
                {restaurantInfo.tagline && (
                  <p className="mt-2 text-lg italic leading-relaxed" style={{ color: theme.textColor, opacity: 0.7 }}>
                    {restaurantInfo.tagline}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Layout content — all pages stacked */}
      <div className="relative z-10 flex flex-1 flex-col">
        {isSpotlight && spotlightItems.length > 0 ? (
          <SpotlightLayout items={spotlightItems} layoutStyle={activeLayout} isExport={isExport} displayScale={displayScale} />
        ) : (
          filteredPages.map((page, i) => (
            <LayoutComponent
              key={`${page.categoryId ?? "flat"}-${i}`}
              items={page.items}
              showCategoryHeader={page.showCategoryHeader}
              categoryId={page.categoryId}
              startIndex={page.startItemIndex}
              isExport={isExport}
              displayScale={displayScale}
            />
          ))
        )}
      </div>

      {/* Free-position overlay */}
      {pinnedItems.length > 0 && (
        <FreePositionOverlay
          items={pinnedItems}
          positions={freePositions}
          theme={theme}
          activeLayout={activeLayout}
          displayScale={displayScale}
          isExport={isExport}
        />
      )}

      {headerLogoPosition && restaurantInfo.logoUrl && (
        <DraggableFreeBox
          id="__header_logo__"
          position={headerLogoPosition}
          theme={theme}
          displayScale={displayScale}
          isExport={isExport}
          onCommit={setHeaderLogoPosition}
          onReset={() => setHeaderLogoPosition(null)}
        >
          <img
            src={restaurantInfo.logoUrl}
            alt="Logo"
            draggable={false}
            className="h-full w-full object-cover"
            style={{ borderRadius: "50%", boxShadow: `0 0 0 3px ${theme.primaryColor}` }}
          />
        </DraggableFreeBox>
      )}

      {headerHeadingPosition && (restaurantInfo.name || restaurantInfo.tagline) && (
        <DraggableFreeBox
          id="__header_heading__"
          position={headerHeadingPosition}
          theme={theme}
          displayScale={displayScale}
          isExport={isExport}
          onCommit={setHeaderHeadingPosition}
          onReset={() => setHeaderHeadingPosition(null)}
        >
          <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
            {restaurantInfo.name && (
              <h1
                className="font-bold leading-tight"
                style={{
                  fontFamily: theme.fontFamily,
                  color: theme.textColor,
                  fontSize: `${Math.round(Math.max(16, Math.min(64, headerHeadingPosition.height * 0.4)))}px`,
                }}
              >
                {restaurantInfo.name}
              </h1>
            )}
            {restaurantInfo.tagline && (
              <p
                className="mt-2 italic leading-relaxed"
                style={{
                  color: theme.textColor,
                  opacity: 0.7,
                  fontSize: `${Math.round(Math.max(10, Math.min(22, headerHeadingPosition.height * 0.15)))}px`,
                }}
              >
                {restaurantInfo.tagline}
              </p>
            )}
          </div>
        </DraggableFreeBox>
      )}

      {footerPosition && footer.showBrandSignature && footer.brandText && (
        <DraggableFreeBox
          id="__footer_brand__"
          position={footerPosition}
          theme={theme}
          displayScale={displayScale}
          isExport={isExport}
          onCommit={setFooterPosition}
          onReset={() => setFooterPosition(null)}
        >
          <div className="flex h-full w-full items-center justify-center overflow-hidden text-center">
            <p
              style={{
                fontFamily: "var(--font-brand-signature), 'Alex Brush', cursive",
                fontSize: `${Math.round(Math.max(14, Math.min(48, footerPosition.height * 0.5)))}px`,
                fontWeight: 400,
                letterSpacing: "normal",
                lineHeight: 1.2,
                color: footer.brandColor || (isLightBg(theme.backgroundColor) ? SIGNATURE_DARK : SIGNATURE_LIGHT),
              }}
            >
              {footer.brandText}
            </p>
          </div>
        </DraggableFreeBox>
      )}

      {/* Footer — brand signature wordmark */}
      {footer.showBrandSignature && footer.brandText && !footerPosition && (
        <div
          className="relative z-10 px-6 pt-8 pb-24 text-center overflow-hidden"
        >
          <p
            data-canvas-item="true"
            onClick={() => setSelectedItemId("__footer_brand__")}
            onDoubleClick={handlePinFooter}
            style={{
              fontFamily: "var(--font-brand-signature), 'Alex Brush', cursive",
              fontSize: "32px",
              fontWeight: 400,
              letterSpacing: "normal",
              lineHeight: 1.2,
              color: footer.brandColor || (isLightBg(theme.backgroundColor) ? SIGNATURE_DARK : SIGNATURE_LIGHT),
              outline: selectedItemId === "__footer_brand__" ? `2px solid ${theme.primaryColor}` : "none",
              outlineOffset: "2px",
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            {footer.brandText}
          </p>
        </div>
      )}
    </div>
  );
}
