"use client";

import { motion } from "framer-motion";
import { useMenuDesigner, type LayoutStyle } from "@/hooks/useMenuDesigner";

interface LayoutOption {
  id: LayoutStyle;
  label: string;
  thumbnail: React.ReactNode;
}

const bar = (w: string, x: number, y: number, h = 3) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    rx={1.5}
    fill="currentColor"
    opacity={0.6}
  />
);

const LAYOUTS: LayoutOption[] = [
  {
    id: "single-column",
    label: "Single Column",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        {bar("40", 10, 12, 4)}
        {bar("36", 10, 22, 4)}
        {bar("38", 10, 32, 4)}
        {bar("34", 10, 42, 4)}
      </svg>
    ),
  },
  {
    id: "two-column",
    label: "Two Column",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        {bar("18", 10, 8, 4)}
        {bar("18", 32, 8, 4)}
        {bar("18", 10, 18, 4)}
        {bar("18", 32, 18, 4)}
        {bar("18", 10, 28, 4)}
        {bar("18", 32, 28, 4)}
        {bar("18", 10, 38, 4)}
        {bar("18", 32, 38, 4)}
      </svg>
    ),
  },
  {
    id: "grid",
    label: "Grid",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        <rect x={8} y={8} width={20} height={20} rx={2} stroke="currentColor" strokeWidth={2} fill="none" opacity={0.6} />
        <rect x={32} y={8} width={20} height={20} rx={2} stroke="currentColor" strokeWidth={2} fill="none" opacity={0.6} />
        <rect x={8} y={32} width={20} height={20} rx={2} stroke="currentColor" strokeWidth={2} fill="none" opacity={0.6} />
        <rect x={32} y={32} width={20} height={20} rx={2} stroke="currentColor" strokeWidth={2} fill="none" opacity={0.6} />
      </svg>
    ),
  },
  {
    id: "card",
    label: "Card",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        <rect x={16} y={10} width={30} height={22} rx={2} stroke="currentColor" strokeWidth={1.5} fill="currentColor" fillOpacity={0.08} opacity={0.6} />
        <rect x={14} y={16} width={30} height={22} rx={2} stroke="currentColor" strokeWidth={1.5} fill="currentColor" fillOpacity={0.12} opacity={0.7} />
        <rect x={12} y={22} width={30} height={22} rx={2} stroke="currentColor" strokeWidth={1.5} fill="currentColor" fillOpacity={0.16} opacity={0.8} />
      </svg>
    ),
  },
  {
    id: "premium",
    label: "Premium",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        <rect x={18} y={10} width={24} height={2} rx={1} fill="currentColor" opacity={0.3} />
        <rect x={12} y={18} width={36} height={6} rx={2} fill="currentColor" opacity={0.5} />
        <rect x={16} y={28} width={28} height={3} rx={1.5} fill="currentColor" opacity={0.35} />
        <rect x={14} y={34} width={32} height={3} rx={1.5} fill="currentColor" opacity={0.35} />
        <rect x={18} y={40} width={24} height={3} rx={1.5} fill="currentColor" opacity={0.35} />
        <rect x={12} y={47} width={36} height={6} rx={2} fill="currentColor" opacity={0.5} />
      </svg>
    ),
  },
  {
    id: "cocktail",
    label: "Cocktail",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        {bar("28", 22, 8, 4)}
        {bar("16", 12, 18, 4)}
        {bar("28", 22, 28, 4)}
        {bar("16", 12, 38, 4)}
        {bar("28", 22, 48, 4)}
      </svg>
    ),
  },
  {
    id: "fine-dining",
    label: "Fine Dining",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        <rect x={25} y={8} width={10} height={2} rx={1} fill="currentColor" opacity={0.3} />
        <rect x={20} y={14} width={20} height={5} rx={2} fill="currentColor" opacity={0.5} />
        <rect x={22} y={24} width={16} height={3} rx={1.5} fill="currentColor" opacity={0.35} />
        <rect x={24} y={30} width={12} height={2} rx={1} fill="currentColor" opacity={0.25} />
        <rect x={22} y={36} width={16} height={3} rx={1.5} fill="currentColor" opacity={0.35} />
        <rect x={24} y={42} width={12} height={2} rx={1} fill="currentColor" opacity={0.25} />
        <rect x={20} y={48} width={20} height={5} rx={2} fill="currentColor" opacity={0.5} />
      </svg>
    ),
  },
  {
    id: "smart-grid",
    label: "Smart Grid",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        <rect x={15} y={8} width={30} height={44} rx={2} stroke="currentColor" strokeWidth={1} fill="none" opacity={0.5} />
        <circle cx={30} cy={20} r={6} fill="currentColor" opacity={0.6} />
        <rect x={20} y={32} width={20} height={3} rx={1.5} fill="currentColor" opacity={0.7} />
        <rect x={18} y={38} width={24} height={2} rx={1} fill="currentColor" opacity={0.4} />
      </svg>
    ),
  },
];

export default function LayoutSelector() {
  const { activeLayout, setActiveLayout } = useMenuDesigner();

  return (
    <div className="px-4 pb-5">
      <p
        className="mb-3 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        LAYOUT STYLE
      </p>
      <div className="grid grid-cols-2 gap-2">
        {LAYOUTS.map((layout) => {
          const isSelected = activeLayout === layout.id;

          return (
            <motion.button
              key={layout.id}
              onClick={() => setActiveLayout(layout.id)}
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                mass: 0.5,
              }}
              className="flex flex-col items-center gap-1.5 rounded-xl p-2 transition-colors"
              style={{
                border: isSelected
                  ? "1px solid #a78bfa"
                  : "1px solid rgba(39,39,42,1)",
                backgroundColor: isSelected
                  ? "rgba(167,139,250,0.1)"
                  : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "rgba(63,63,70,1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "rgba(39,39,42,1)";
                }
              }}
            >
              <div
                className="h-[60px] w-full rounded-lg"
                style={{
                  color: isSelected
                    ? "#a78bfa"
                    : "rgba(161,161,170,1)",
                }}
              >
                {layout.thumbnail}
              </div>
              <span
                className="text-[12px] font-medium leading-tight"
                style={{
                  color: isSelected
                    ? "#a78bfa"
                    : "rgba(161,161,170,1)",
                }}
              >
                {layout.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
