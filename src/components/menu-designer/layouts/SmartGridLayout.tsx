"use client";

import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menuData";
import CategoryHeader from "@/components/menu-designer/MenuPreview/CategoryHeader";
import { useMenuDesigner, type PageLayoutProps } from "@/hooks/useMenuDesigner";
import type { ThemeSettings, MenuBorderSettings } from "@/hooks/useMenuDesigner";

const CATEGORY_EMOJI: Record<string, string> = {
  cocktails: "🍸",
  mocktails: "🥤",
};

function chunkItems(items: MenuItem[]): (MenuItem | MenuItem[])[] {
  const groups: (MenuItem | MenuItem[])[] = [];
  let i = 0;
  while (i < items.length) {
    if (i + 1 < items.length) {
      groups.push([items[i], items[i + 1]]);
      i += 2;
    } else {
      groups.push(items[i]);
      i += 1;
    }
  }
  return groups;
}

function getBorderStyle(border: MenuBorderSettings) {
  if (border.style === "none") return {};
  if (border.style === "gold-frame") {
    return {
      border: `2px solid ${border.color}`,
      borderRadius: "4px",
      boxShadow: `inset 0 0 40px ${border.color}14, 0 0 0 1px ${border.color}33`,
    };
  }
  return {
    border: `${border.size}px ${border.style} ${border.color}`,
    borderRadius: "4px",
  };
}

function getImageStyle(shape: ThemeSettings["imageShape"]) {
  switch (shape) {
    case "circular":
      return { borderRadius: "50%", objectFit: "cover" as const };
    case "rectangle":
      return { borderRadius: "8px", objectFit: "cover" as const };
    case "square":
      return { borderRadius: "0px", objectFit: "cover" as const };
    case "blend":
      return { borderRadius: "0px", objectFit: "cover" as const, mixBlendMode: "screen" as const };
    case "none":
      return null;
  }
}

function SmartCard({
  item,
  index,
  theme,
  imageShape,
  onSelect,
}: {
  item: MenuItem;
  index: number;
  theme: ThemeSettings;
  imageShape: ThemeSettings["imageShape"];
  onSelect: () => void;
}) {
  const emoji = CATEGORY_EMOJI[item.category] ?? "🍸";
  const imgStyle = imageShape !== "none" ? getImageStyle(imageShape) : null;
  const showImage = imageShape !== "none";

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      onClick={onSelect}
      className="flex w-full flex-col items-center text-center"
    >
      {showImage && item.image && imgStyle ? (
        <img
          src={item.image}
          alt={item.name}
          className="mb-3"
          style={{
            width: "140px",
            height: "140px",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.6))",
            ...imgStyle,
          }}
        />
      ) : showImage && !item.image ? (
        <div
          className="mb-3 flex items-center justify-center"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: imgStyle?.borderRadius ?? "50%",
            backgroundColor: "rgba(0,0,0,0.04)",
            fontSize: "48px",
            lineHeight: 1,
          }}
        >
          {emoji}
        </div>
      ) : null}
      <h3
        className="text-sm font-bold leading-tight"
        style={{
          fontFamily: theme.fontFamily,
          color: theme.headingColor,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {item.name}
      </h3>
      <p
        className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed"
        style={{ color: theme.subheadingColor, maxWidth: "200px" }}
      >
        {item.description}
      </p>
    </motion.button>
  );
}

export default function SmartGridLayout({ items, showCategoryHeader, categoryId }: PageLayoutProps) {
  const { theme, menuBorder, background, setSelectedItemId } = useMenuDesigner();

  if (items.length === 0) return <></>;

  const borderInline = getBorderStyle(menuBorder);
  const chunks = chunkItems(items);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative px-6 py-8"
      style={{
        backgroundColor: (
          (background.full.type !== "color" || background.full.value !== "transparent") ||
          (background.middle.type !== "color" || background.middle.value !== "transparent")
        ) ? "transparent" : theme.backgroundColor,
      }}
    >
      <div
        style={{
          transform: `translate(${menuBorder.offsetX}px, ${menuBorder.offsetY}px)`,
          padding: `${menuBorder.paddingY}px ${menuBorder.paddingX}px`,
          ...borderInline,
        }}
      >
        {showCategoryHeader && categoryId && <CategoryHeader categoryId={categoryId} />}
        <div className="space-y-10">
          {chunks.map((chunk, i) => {
            if (Array.isArray(chunk)) {
              return (
                <div
                  key={`pair-${chunk[0].id}-${chunk[1].id}`}
                  className="grid grid-cols-2 gap-x-6 gap-y-10"
                >
                  {chunk.map((item, idx) => (
                    <SmartCard
                      key={item.id}
                      item={item}
                      index={idx}
                      theme={theme}
                      imageShape={theme.imageShape}
                      onSelect={() => setSelectedItemId(item.id)}
                    />
                  ))}
                </div>
              );
            }
            return (
              <div key={`solo-${chunk.id}`} className="flex justify-center">
                <div style={{ width: "48%" }}>
                  <SmartCard
                    item={chunk}
                    index={0}
                    theme={theme}
                    imageShape={theme.imageShape}
                    onSelect={() => setSelectedItemId(chunk.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
