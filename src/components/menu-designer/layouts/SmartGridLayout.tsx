"use client";

import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menuData";
import { MENU_CATEGORIES } from "@/data/menuData";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";
import type { ThemeSettings } from "@/hooks/useMenuDesigner";

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

export default function SmartGridLayout({ items }: Props) {
  const { theme, setSelectedItemId } = useMenuDesigner();
  const groups = chunkItems(items);

  if (items.length === 0) return <></>;

  const categoryId = items[0].category;
  const categoryLabel =
    MENU_CATEGORIES.find((c) => c.id === categoryId)?.label?.toUpperCase() ??
    categoryId.toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative px-6 py-8"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {/* Gold border frame */}
      <div
        style={{
          border: `2px solid ${GOLD}`,
          borderRadius: "4px",
          padding: "32px 20px",
          boxShadow: `inset 0 0 40px ${GOLD}14, 0 0 0 1px ${GOLD}33`,
        }}
      >
        {/* Category title */}
        <div className="mb-8 flex flex-col items-center">
          <h2
            className="text-center text-lg font-bold tracking-[0.15em]"
            style={{
              fontFamily: theme.fontFamily,
              color: "#fff",
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
  onSelect,
}: {
  item: MenuItem;
  index: number;
  theme: ThemeSettings;
  onSelect: () => void;
}) {
  const emoji = CATEGORY_EMOJI[item.category] ?? "🍸";

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      onClick={onSelect}
      className="flex w-full flex-col items-center text-center"
    >
      {/* Image circle */}
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="mb-3"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            objectFit: "cover",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.6))",
          }}
        />
      ) : (
        <div
          className="mb-3 flex items-center justify-center"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.04)",
            fontSize: "48px",
            lineHeight: 1,
          }}
        >
          {emoji}
        </div>
      )}

      {/* Name */}
      <h3
        className="text-sm font-bold leading-tight"
        style={{
          fontFamily: theme.fontFamily,
          color: "#fff",
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
          color: "rgba(200,190,170,0.8)",
          maxWidth: "200px",
        }}
      >
        {item.description}
      </p>
    </motion.button>
  );
}
