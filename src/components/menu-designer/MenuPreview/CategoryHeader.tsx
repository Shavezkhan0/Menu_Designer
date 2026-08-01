"use client";

import { MENU_CATEGORIES } from "@/data/menuData";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

const GOLD = "#d4af37";

interface Props {
  categoryId: string;
}

export default function CategoryHeader({ categoryId }: Props) {
  const { theme, showCategoryNames } = useMenuDesigner();

  if (!showCategoryNames) return null;

  const label =
    MENU_CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId;

  return (
    <div className="mb-6 flex flex-col items-center">
      <h2
        className="text-center text-lg font-bold uppercase tracking-[0.15em]"
        style={{ fontFamily: theme.fontFamily, color: theme.headingColor }}
      >
        {label}
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
  );
}
