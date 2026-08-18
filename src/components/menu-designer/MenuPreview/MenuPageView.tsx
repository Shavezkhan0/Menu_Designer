"use client";

import type { MenuPage } from "@/lib/pagination";
import {
  getCanvasPixelSize,
  getBackgroundImageCss,
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
}: MenuPageViewProps) {
  const { width: pxW, height: pxH } = getCanvasPixelSize(canvasSize);
  const LayoutComponent = LAYOUT_MAP[activeLayout];

  const bgStyle: React.CSSProperties =
    background.type === "image" && background.value
      ? { backgroundImage: getBackgroundImageCss(background.value), backgroundSize: "cover", backgroundPosition: "center" }
      : background.type === "gradient"
        ? { backgroundImage: background.value }
        : { backgroundColor: background.value };

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
            {restaurantInfo.logoUrl && (
              <img
                src={restaurantInfo.logoUrl}
                alt="Logo"
                className="mb-4 object-cover"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  boxShadow: `0 0 0 3px ${theme.primaryColor}`,
                }}
              />
            )}
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
        </div>
      )}

      {/* Layout content — all pages stacked */}
      <div className="relative z-10 flex flex-1 flex-col">
        {isSpotlight && pages[0] ? (
          <SpotlightLayout items={pages[0].items} layoutStyle={activeLayout} isExport={isExport} />
        ) : (
          pages.map((page, i) => (
            <LayoutComponent
              key={`${page.categoryId ?? "flat"}-${i}`}
              items={page.items}
              showCategoryHeader={page.showCategoryHeader}
              categoryId={page.categoryId}
              startIndex={page.startItemIndex}
              isExport={isExport}
            />
          ))
        )}
      </div>

      {/* Footer — brand signature wordmark */}
      {footer.showBrandSignature && footer.brandText && (
        <div
          className="relative z-10 px-6 py-8 text-center overflow-hidden"
        >
          <p
            style={{
              fontFamily: "var(--font-brand-signature), 'Alex Brush', cursive",
              fontSize: "32px",
              fontWeight: 400,
              letterSpacing: "normal",
              lineHeight: 1.2,
              color: footer.brandColor || (isLightBg(theme.backgroundColor) ? SIGNATURE_DARK : SIGNATURE_LIGHT),
            }}
          >
            {footer.brandText}
          </p>
        </div>
      )}
    </div>
  );
}
