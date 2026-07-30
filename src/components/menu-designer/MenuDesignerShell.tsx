"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { exportAsPng, exportAsPdf, exportAsHtml } from "@/lib/export";
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Download,
  Sparkles,
} from "lucide-react";
import LeftSidebar from "@/components/menu-designer/LeftSidebar/LeftSidebar";
import MenuPreviewCanvas from "@/components/menu-designer/MenuPreview/MenuPreviewCanvas";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

const FONT_LINKS: Record<string, string> = {
  "Playfair Display, serif": "Playfair+Display:wght@400;500;600;700",
  "Cormorant Garamond, serif": "Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400",
  "Inter, sans-serif": "Inter:wght@400;500;600;700",
  "Libre Baskerville, serif": "Libre+Baskerville:wght@400;700",
  "Great Vibes, cursive": "Great+Vibes:wght@400",
};

const DEVICES = [
  { id: "desktop" as const, icon: Monitor, label: "Desktop", key: "1" },
  { id: "tablet" as const, icon: Tablet, label: "Tablet", key: "2" },
  { id: "mobile" as const, icon: Smartphone, label: "Mobile", key: "3" },
];

export default function MenuDesignerShell() {
  const { activeDevice, setActiveDevice, theme, isAIPanelOpen, setIsAIPanelOpen } =
    useMenuDesigner();
  const [loaded, setLoaded] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleExport = async (type: "png" | "pdf" | "html") => {
    const el = canvasRef.current;
    if (!el) return;
    setExporting(true);
    try {
      if (type === "png") await exportAsPng(el);
      else if (type === "pdf") await exportAsPdf(el);
      else exportAsHtml(el);
    } catch {
      // silently fail
    }
    setExportOpen(false);
    setExporting(false);
  };

  // 0.8s splash screen
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Google Font injection
  useEffect(() => {
    const match = theme.fontFamily.match(/^['"]?([^,'"]+)/);
    const familyKey = match?.[1].trim();
    if (!familyKey) return;
    const urlKey = Object.keys(FONT_LINKS).find((k) =>
      k.startsWith(familyKey)
    );
    if (!urlKey) return;
    const existing = document.querySelector(
      `link[data-font="${familyKey}"]`
    );
    if (existing) return;
    document.querySelectorAll("link[data-font]").forEach((el) => el.remove());
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${FONT_LINKS[urlKey]}&display=swap`;
    link.setAttribute("data-font", familyKey);
    document.head.appendChild(link);
  }, [theme.fontFamily]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "1") setActiveDevice("desktop");
      else if (e.key === "2") setActiveDevice("tablet");
      else if (e.key === "3") setActiveDevice("mobile");
      else if (e.key === "Escape") setIsAIPanelOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setActiveDevice, setIsAIPanelOpen]);

  // Close export dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    };
    if (exportOpen) {
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }
  }, [exportOpen]);

  return (
    <>
      {/* Splash screen */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#0a0a0f" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6 size-24 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(167,139,250,0.3) 0%, rgba(167,139,250,0) 70%)",
              }}
            />
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-xl font-semibold tracking-wide"
              style={{ color: "rgba(244,244,245,0.9)" }}
            >
              Menu Designer
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main UI */}
      <AnimatePresence mode="wait">
        {loaded && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-col"
          >
            {/* Top Bar */}
            <div
              className="flex h-12 shrink-0 items-center justify-between px-4"
              style={{
                backgroundColor: "#0a0a0f",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Left — Back */}
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: "rgba(161,161,170,1)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(212,212,216,1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(161,161,170,1)")
                }
              >
                <ArrowLeft className="size-4" />
                Menu Designer
              </button>

              {/* Center — Device Preview Toggle */}
              <div
                className="relative flex items-center rounded-full"
                style={{ border: "1px solid rgba(63,63,70,1)", overflow: "hidden" }}
              >
                {DEVICES.map(({ id, icon: Icon, label, key }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveDevice(id)}
                    className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      color: activeDevice === id ? "#fff" : "rgba(113,113,122,1)",
                    }}
                  >
                    {activeDevice === id && (
                      <motion.span
                        layoutId="device-indicator"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: "rgba(63,63,70,1)" }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className="size-3.5" />
                      <span>{label}</span>
                      <span
                        className="ml-0.5 text-[10px]"
                        style={{ color: "rgba(82,82,91,1)" }}
                      >
                        {key}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              {/* Right */}
              <div className="flex items-center gap-2">
                {/* Export */}
                <div ref={exportRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setExportOpen(!exportOpen)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      color: "rgba(212,212,216,1)",
                      border: "1px solid rgba(63,63,70,1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(39,39,42,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <Download className="size-3.5" />
                    Export
                  </button>

                  <AnimatePresence>
                    {exportOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full z-50 mt-1 w-32 overflow-hidden rounded-lg"
                        style={{
                          backgroundColor: "rgba(24,24,27,1)",
                          border: "1px solid rgba(63,63,70,1)",
                          boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                        }}
                      >
                        {(["png", "pdf", "html"] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            disabled={exporting}
                            onClick={() => handleExport(type)}
                            className="flex w-full items-center px-3 py-2 text-xs font-medium transition-colors disabled:opacity-40"
                            style={{
                              color: "rgba(212,212,216,1)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "rgba(39,39,42,1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }}
                          >
                            {exporting ? "Exporting…" : `Export as ${type.toUpperCase()}`}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* AI */}
                <button
                  type="button"
                  onClick={() => setIsAIPanelOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  }}
                >
                  <Sparkles className="size-3.5" />
                  AI
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
              <LeftSidebar />
              <main
                className="flex flex-1 flex-col overflow-hidden"
                style={{ backgroundColor: "#111118" }}
              >
                <div
                  className="flex-1 overflow-hidden"
                  style={{
                    padding: activeDevice === "desktop" ? "0" : "16px",
                  }}
                >
                  <MenuPreviewCanvas ref={canvasRef} />
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
