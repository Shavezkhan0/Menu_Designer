"use client";

import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menuData";
import { MENU_CATEGORIES } from "@/data/menuData";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";
import type { ThemeSettings, MenuBorderSettings, BackgroundSettings } from "@/hooks/useMenuDesigner";

interface Props {
  items: MenuItem[];
}

const CATEGORY_EMOJI: Record<string, string> = {
  cocktails: "🍸",
  mocktails: "🥤",
  coffee: "☕",
  tea: "🍵",
  wine: "🍷",
  beer: "🍺",
  "soft-drinks": "🥛",
  juices: "🍹",
};

const GOLD = "#c9a84c";

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

export default function SmartGridLayout({ items }: Props) {
  const { theme, menuBorder, background, setSelectedItemId } = useMenuDesigner();
  const groups = chunkItems(items);

  if (items.length === 0) return <></>;

  const categoryId = items[0].category;
  const categoryLabel =
    MENU_CATEGORIES.find((c) => c.id === categoryId)?.label?.toUpperCase() ??
    categoryId.toUpperCase();

  const borderInline = getBorderStyle(menuBorder);

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
        {/* Category title */}
        <div className="mb-8 flex flex-col items-center">
          <h2
            className="text-center text-lg font-bold tracking-[0.15em]"
            style={{
              fontFamily: theme.fontFamily,
              color: theme.headingColor,
            }}
          >
            {categoryLabel}
          </h2>
          <hr
            style={{
              marginTop: "8px",
              width: "60px",
              border: "none",
              borderTop: `1px solid ${GOLD}`,
              opacity: 0.4,
            }}
          />
        </div>

        {/* Items */}
        <div className="space-y-10">
          {groups.map((group) => {
            if (Array.isArray(group)) {
              return (
                <div
                  key={`pair-${group[0].id}-${group[1].id}`}
                  className="grid grid-cols-2 gap-x-6 gap-y-10"
                >
                  {group.map((item, idx) => (
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
              <div key={`solo-${group.id}`} className="flex justify-center">
                <div style={{ width: "48%" }}>
                  <SmartCard
                    item={group}
                    index={0}
                    theme={theme}
                    imageShape={theme.imageShape}
                    onSelect={() => setSelectedItemId(group.id)}
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      onClick={onSelect}
      className="flex w-full flex-col items-center text-center"
    >
      {/* Image or emoji */}
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
            backgroundColor: "rgba(255,255,255,0.04)",
            fontSize: "48px",
            lineHeight: 1,
          }}
        >
          {emoji}
        </div>
      ) : null}

      {/* Name */}
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

      {/* Description */}
      <p
        className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed"
        style={{
          color: theme.subheadingColor,
          maxWidth: "200px",
        }}
      >
        {item.description}
      </p>
    </motion.button>
  );
}
