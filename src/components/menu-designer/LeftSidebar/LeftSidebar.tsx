"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Layers,
  Palette,
  Image,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";
import CategorySelector from "./CategorySelector";
import LayoutSelector from "./LayoutSelector";
import BrandingPanel from "./BrandingPanel";
import BackgroundPanel from "./BackgroundPanel";
import AIAssistant from "./AIAssistant";

interface SectionDef {
  id: string;
  label: string;
  icon: typeof LayoutGrid;
  component: ReactNode;
}

const SECTIONS: SectionDef[] = [
  { id: "Categories", label: "Categories", icon: LayoutGrid, component: <CategorySelector /> },
  { id: "Layout", label: "Layout", icon: Layers, component: <LayoutSelector /> },
  { id: "Branding", label: "Branding", icon: Palette, component: <BrandingPanel /> },
  { id: "Background", label: "Background", icon: Image, component: <BackgroundPanel /> },
  { id: "AI Tools", label: "AI Tools", icon: Sparkles, component: <AIAssistant /> },
];

export default function LeftSidebar() {
  const { activeSidebarSection, setActiveSidebarSection } = useMenuDesigner();

  const toggle = (id: string) => {
    setActiveSidebarSection(activeSidebarSection === id ? null : id);
  };

  return (
    <aside
      className="flex shrink-0 flex-col overflow-hidden"
      style={{
        width: "280px",
        backgroundColor: "#0a0a0f",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Accordion sections */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(82,82,91,1) rgba(39,39,42,1)" }}>
        {SECTIONS.map((section, idx) => {
          const open = activeSidebarSection === section.id;

          return (
            <div key={section.id}>
              {idx > 0 && (
                <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.05)" }} />
              )}

              {/* Header */}
              <motion.button
                type="button"
                onClick={() => toggle(section.id)}
                className="flex w-full items-center justify-between px-4"
                style={{ height: "40px" }}
                whileHover={{ backgroundColor: "rgba(24,24,27,0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex items-center gap-2">
                  <section.icon className="size-4" style={{ color: "rgba(161,161,170,1)" }} />
                  <motion.span
                    className="text-[13px] font-medium"
                    style={{ color: "rgba(212,212,216,1)" }}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {section.label}
                  </motion.span>
                </div>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{ display: "flex", color: "rgba(113,113,122,1)" }}
                >
                  <ChevronDown className="size-3.5" />
                </motion.span>
              </motion.button>

              {/* Body */}
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key={section.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="overflow-hidden"
                    style={{ padding: "4px 0 0 0" }}
                  >
                    {section.component}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "10px 16px",
        }}
      >
        <p
          className="text-center text-[11px]"
          style={{ color: "rgba(82,82,91,1)" }}
        >
          Menu Designer v1.0
        </p>
      </div>
    </aside>
  );
}
