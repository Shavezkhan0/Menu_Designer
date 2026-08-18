"use client";

import { motion } from "framer-motion";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";
import type { LayoutStyle } from "@/hooks/useMenuDesigner";
import type { MenuItem } from "@/data/menuData";
import { getSpotlightArrangement, spotlightShowsImage } from "@/lib/spotlight";
import { getSpotlightScale } from "@/lib/responsiveScale";

export interface SpotlightLayoutProps {
  items: MenuItem[];
  layoutStyle: LayoutStyle;
  isExport?: boolean;
}

const BASE_SQ = 190;
const BASE_RECT_W = 230;
const BASE_RECT_H = 170;

export default function SpotlightLayout({ items, layoutStyle, isExport }: SpotlightLayoutProps) {
  const { theme, setSelectedItemId } = useMenuDesigner();

  const arrangement = getSpotlightArrangement(items.length, layoutStyle);
  if (!arrangement) return null;

  const scale = getSpotlightScale(items.length);
  const showImage = spotlightShowsImage(layoutStyle) && theme.imageShape !== "none";

  const isGridish = layoutStyle === "vertical-grid" || layoutStyle === "text-only";

  const BASE_HEADING_PX = isGridish ? 14 : 16;
  const BASE_DESC_PX = isGridish ? 11 : 12;

  const headingPx = `${Math.round(BASE_HEADING_PX * scale)}px`;
  const descScale = Math.min(scale, 2.2);
  const descPx = `${Math.round(BASE_DESC_PX * descScale)}px`;

  function buildImageStyle(shape: string): React.CSSProperties | null {
    const imgSq = Math.round(BASE_SQ * scale);
    const rectW = Math.round(BASE_RECT_W * scale);
    const rectH = Math.round(BASE_RECT_H * scale);
    switch (shape) {
      case "circular":
        return { borderRadius: "50%", width: `${imgSq}px`, height: `${imgSq}px`, objectFit: "cover" };
      case "rectangle":
        return { borderRadius: "8px", width: `${rectW}px`, height: `${rectH}px`, objectFit: "cover" };
      case "square":
        return { borderRadius: "0px", width: `${imgSq}px`, height: `${imgSq}px`, objectFit: "cover" };
      case "blend":
        return { borderRadius: "0px", width: `${imgSq}px`, height: `${imgSq}px`, objectFit: "cover", mixBlendMode: "screen" };
      case "none":
        return null;
    }
    return null;
  }

  function renderImage(item: MenuItem, imgStyle: React.CSSProperties | null) {
    if (!showImage || !imgStyle) return null;
    if (item.image) {
      return (
        <img
          src={item.image}
          alt={item.name}
          className="mb-3"
          style={{
            ...imgStyle,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
          }}
        />
      );
    }
    return (
      <div
        className="mb-3 flex items-center justify-center"
        style={{
          ...imgStyle,
          backgroundColor: "rgba(0,0,0,0.04)",
          fontSize: `${Math.round(36 * scale)}px`,
          lineHeight: 1,
        }}
      >
        🍸
      </div>
    );
  }

  function renderImageHorizontal(item: MenuItem, imgStyle: React.CSSProperties | null) {
    if (!showImage || !imgStyle) return null;
    if (item.image) {
      return (
        <img
          src={item.image}
          alt={item.name}
          className="shrink-0"
          style={{
            ...imgStyle,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
          }}
        />
      );
    }
    return (
      <div
        className="shrink-0 flex items-center justify-center"
        style={{
          ...imgStyle,
          backgroundColor: "rgba(0,0,0,0.04)",
          fontSize: `${Math.round(28 * scale)}px`,
          lineHeight: 1,
        }}
      >
        🍸
      </div>
    );
  }

  function VerticalCard({ item }: { item: MenuItem }) {
    const imgStyle = buildImageStyle(theme.imageShape);
    return (
      <motion.button
        type="button"
        initial={isExport ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -2 }}
        onClick={() => setSelectedItemId(item.id)}
        className="flex flex-col items-center text-center"
      >
        {renderImage(item, imgStyle)}
        <h3
          className="font-bold leading-tight"
          style={{
            fontFamily: theme.fontFamily,
            color: theme.headingColor,
            letterSpacing: "0.04em",
            fontSize: headingPx,
          }}
        >
          {item.name}
        </h3>
        <p
          className="mt-1.5 line-clamp-3 leading-relaxed"
          style={{ color: theme.subheadingColor, fontSize: descPx }}
        >
          {item.description}
        </p>
      </motion.button>
    );
  }

  function HorizontalCard({ item, index }: { item: MenuItem; index: number }) {
    const imgStyle = buildImageStyle(theme.imageShape);
    return (
      <motion.button
        type="button"
        initial={isExport ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -1 }}
        onClick={() => setSelectedItemId(item.id)}
        className={`flex items-start gap-5 ${index % 2 === 0 ? "flex-row text-left" : "flex-row-reverse text-right"}`}
      >
        {renderImageHorizontal(item, imgStyle)}
        <div className="flex flex-1 flex-col justify-center pt-1">
          <h3
            className="font-bold leading-tight"
            style={{
              fontFamily: theme.fontFamily,
              color: theme.headingColor,
              fontSize: headingPx,
            }}
          >
            {item.name}
          </h3>
          <p
            className="mt-1.5 line-clamp-3 leading-relaxed"
            style={{ color: theme.subheadingColor, fontSize: descPx }}
          >
            {item.description}
          </p>
        </div>
      </motion.button>
    );
  }

  const Card = isGridish ? VerticalCard : HorizontalCard;

  return (
    <motion.div
      initial={isExport ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex flex-1 flex-col h-full w-full px-10 py-10"
    >
      {arrangement === "single" && (
        <div className="flex flex-1 items-center justify-center">
          <Card item={items[0]} index={0} />
        </div>
      )}

      {arrangement === "stack-2" && (
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center">
            <Card item={items[0]} index={0} />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <Card item={items[1]} index={1} />
          </div>
        </div>
      )}

      {arrangement === "triangle-3" && (
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-row items-center justify-center gap-x-8">
            <div className="flex-1">
              <Card item={items[0]} index={0} />
            </div>
            <div className="flex-1">
              <Card item={items[1]} index={1} />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div style={{ width: "50%" }}>
              <Card item={items[2]} index={2} />
            </div>
          </div>
        </div>
      )}

      {arrangement === "stack-3" && (
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center">
            <Card item={items[0]} index={0} />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <Card item={items[1]} index={1} />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <Card item={items[2]} index={2} />
          </div>
        </div>
      )}
    </motion.div>
  );
}
