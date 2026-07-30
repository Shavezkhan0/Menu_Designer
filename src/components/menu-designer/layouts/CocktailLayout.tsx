"use client";

import { motion } from "framer-motion";
import MenuItemCard from "@/components/menu-designer/MenuPreview/MenuItemCard";
import type { MenuItem } from "@/data/menuData";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

interface Props {
  items: MenuItem[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function CocktailLayout({ items }: Props) {
  const { theme, setSelectedItemId } = useMenuDesigner();

  const groups: (MenuItem | MenuItem[])[] = [];
  for (let i = 0; i < items.length; i++) {
    if (i % 3 === 0) {
      groups.push(items[i]);
    } else {
      const pair = [items[i]];
      if (i + 1 < items.length) pair.push(items[++i]);
      groups.push(pair);
    }
  }

  let globalIdx = 0;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-4xl px-6 py-8"
    >
      {groups.map((group) => {
        if (Array.isArray(group)) {
          const currentIdx = globalIdx;
          globalIdx += group.length;
          return (
            <div key={group[0].id} className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {group.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  index={currentIdx + group.indexOf(item)}
                  onSelect={() => setSelectedItemId(item.id)}
                />
              ))}
            </div>
          );
        }

        const item = group;
        const idx = globalIdx++;

        return (
          <div key={item.id} className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              onClick={() => setSelectedItemId(item.id)}
              className="group relative cursor-pointer overflow-hidden rounded-xl p-6"
              style={{
                background: `linear-gradient(135deg, rgba(167,139,250,0.06) 0%, transparent 60%)`,
                border: `1px solid rgba(167,139,250,0.15)`,
                boxShadow: `0 0 40px rgba(167,139,250,0.05)`,
              }}
            >
              <div
                className="pointer-events-none absolute -inset-20 opacity-30"
                style={{
                  background: `radial-gradient(circle at 30% 50%, rgba(167,139,250,0.08) 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                <div className="mb-1 flex items-start justify-between">
                  <h3
                    className="text-xl font-bold leading-tight"
                    style={{
                      fontFamily: theme.fontFamily,
                      color: theme.textColor,
                    }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="shrink-0 text-lg font-semibold"
                    style={{
                      fontFamily: "Geist Mono, monospace",
                      color: theme.primaryColor,
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {item.isSignature && (
                  <span
                    className="mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor: "rgba(245,158,11,0.15)",
                      color: "#f59e0b",
                    }}
                  >
                    ★ Signature
                  </span>
                )}

                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "rgba(161,161,170,1)" }}
                >
                  {item.description}
                </p>

                <div
                  className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]"
                  style={{ color: "rgba(113,113,122,1)" }}
                >
                  {item.alcoholContent && (
                    <span className="font-mono">{item.alcoholContent}</span>
                  )}
                  {item.servingStyle && (
                    <span>{item.servingStyle}</span>
                  )}
                  {item.garnish && (
                    <span>Garnish: {item.garnish}</span>
                  )}
                </div>

                <div
                  className="mt-4"
                  style={{
                    height: "1px",
                    background: `linear-gradient(to right, transparent, ${theme.primaryColor}, transparent)`,
                    opacity: 0.3,
                  }}
                />
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
