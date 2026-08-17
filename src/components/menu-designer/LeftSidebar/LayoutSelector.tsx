"use client";

import { motion } from "framer-motion";
import { useMenuDesigner, type LayoutStyle } from "@/hooks/useMenuDesigner";

interface LayoutOption {
  id: LayoutStyle;
  label: string;
  thumbnail: React.ReactNode;
}

const LAYOUTS: LayoutOption[] = [
  {
    id: "vertical-grid",
    label: "Vertical Grid",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        <rect x={8} y={6} width={20} height={20} rx={3} stroke="currentColor" strokeWidth={1.5} fill="currentColor" fillOpacity={0.08} opacity={0.6} />
        <rect x={32} y={6} width={20} height={20} rx={3} stroke="currentColor" strokeWidth={1.5} fill="currentColor" fillOpacity={0.08} opacity={0.6} />
        <rect x={12} y={28} width={12} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={36} y={28} width={12} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={14} y={33} width={8} height={2} rx={1} fill="currentColor" opacity={0.35} />
        <rect x={38} y={33} width={8} height={2} rx={1} fill="currentColor" opacity={0.35} />
        <rect x={8} y={40} width={20} height={20} rx={3} stroke="currentColor" strokeWidth={1.5} fill="currentColor" fillOpacity={0.08} opacity={0.6} />
        <rect x={32} y={40} width={20} height={20} rx={3} stroke="currentColor" strokeWidth={1.5} fill="currentColor" fillOpacity={0.08} opacity={0.6} />
      </svg>
    ),
  },
  {
    id: "horizontal-row",
    label: "Horizontal Row",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        <rect x={6} y={6} width={16} height={16} rx={2} stroke="currentColor" strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} opacity={0.6} />
        <rect x={26} y={10} width={28} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={26} y={16} width={20} height={2} rx={1} fill="currentColor" opacity={0.35} />
        <rect x={6} y={28} width={16} height={16} rx={2} stroke="currentColor" strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} opacity={0.6} />
        <rect x={26} y={32} width={28} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={26} y={38} width={20} height={2} rx={1} fill="currentColor" opacity={0.35} />
      </svg>
    ),
  },
  {
    id: "text-only",
    label: "Text Only",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        <rect x={10} y={8} width={16} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={34} y={8} width={16} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={12} y={14} width={12} height={2} rx={1} fill="currentColor" opacity={0.35} />
        <rect x={36} y={14} width={12} height={2} rx={1} fill="currentColor" opacity={0.35} />
        <rect x={10} y={24} width={16} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={34} y={24} width={16} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={12} y={30} width={12} height={2} rx={1} fill="currentColor" opacity={0.35} />
        <rect x={36} y={30} width={12} height={2} rx={1} fill="currentColor" opacity={0.35} />
        <rect x={10} y={40} width={16} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={34} y={40} width={16} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={12} y={46} width={12} height={2} rx={1} fill="currentColor" opacity={0.35} />
        <rect x={36} y={46} width={12} height={2} rx={1} fill="currentColor" opacity={0.35} />
      </svg>
    ),
  },
  {
    id: "text-row",
    label: "Text Row",
    thumbnail: (
      <svg viewBox="0 0 60 60" className="h-full w-full" fill="none">
        <rect x={18} y={6} width={24} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={20} y={12} width={20} height={2} rx={1} fill="currentColor" opacity={0.35} />
        <rect x={18} y={22} width={24} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={20} y={28} width={20} height={2} rx={1} fill="currentColor" opacity={0.35} />
        <rect x={18} y={38} width={24} height={2.5} rx={1} fill="currentColor" opacity={0.7} />
        <rect x={20} y={44} width={20} height={2} rx={1} fill="currentColor" opacity={0.35} />
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
