"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, Loader2 } from "lucide-react";
import { useMenuDesigner, type BackgroundType, type MenuBorderSettings } from "@/hooks/useMenuDesigner";

const COLOR_PRESETS = [
  "#0d0d14",
  "#1a0a2e",
  "#0a1628",
  "#1a1008",
  "#1a0808",
  "#0a1a0a",
];

const GRADIENT_PRESETS = [
  { label: "Midnight", value: "linear-gradient(135deg, #0d0d14 0%, #1a1025 100%)" },
  { label: "Deep Ocean", value: "linear-gradient(135deg, #0a1628 0%, #0d0d14 100%)" },
  { label: "Velvet", value: "linear-gradient(135deg, #1a0a2e 0%, #0d0d14 100%)" },
  { label: "Ember", value: "linear-gradient(135deg, #1a1008 0%, #0d0d14 100%)" },
  { label: "Forest", value: "linear-gradient(135deg, #0a1a0a 0%, #0d0d14 100%)" },
  { label: "Rose", value: "linear-gradient(135deg, #1a0808 0%, #0d0d14 100%)" },
];

const BG_TABS: { id: BackgroundType; label: string }[] = [
  { id: "color", label: "Color" },
  { id: "gradient", label: "Gradient" },
  { id: "image", label: "Image" },
];

export default function BackgroundPanel() {
  const { background, setBackground, setActiveBackgroundLayer, menuBorder, setMenuBorder, showTopShadow, setShowTopShadow, showBottomShadow, setShowBottomShadow } = useMenuDesigner();
  const activeLayerConfig = background[background.activeLayer];
  const colorInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const borderColorRef = useRef<HTMLInputElement>(null);

  const BORDER_STYLES: { value: MenuBorderSettings["style"]; label: string }[] = [
    { value: "none", label: "None" },
    { value: "solid", label: "Solid" },
    { value: "double", label: "Double" },
    { value: "dashed", label: "Dashed" },
    { value: "dotted", label: "Dotted" },
    { value: "gold-frame", label: "Gold Frame" },
  ];
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setBackground({ type: "image", value: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateBackground = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/grok/generate-background", {
        method: "POST",
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      setBackground({ type: "image", value: data.imageUrl });
    } catch {
      // silently fail
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="px-4 py-5">
      {/* Target Layer Selector */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        TARGET LAYER
      </p>
      <div className="relative mb-6 flex gap-0.5 rounded-lg p-0.5" style={{ backgroundColor: "rgba(24,24,27,1)" }}>
        {["top", "middle", "bottom", "full"].map((layer) => (
          <button
            key={layer}
            type="button"
            onClick={() => setActiveBackgroundLayer(layer as any)}
            className="relative z-10 flex-1 rounded-md px-2 py-1.5 text-[10px] font-medium transition-colors uppercase"
            style={{
              color: background.activeLayer === layer ? "rgba(244,244,245,1)" : "rgba(113,113,122,1)",
            }}
          >
            {background.activeLayer === layer && (
              <motion.div
                layoutId="bg-layer-indicator"
                className="absolute inset-0 rounded-md"
                style={{ backgroundColor: "rgba(39,39,42,1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{layer}</span>
          </button>
        ))}
      </div>

      {/* Separator */}
      <div
        className="my-4"
        style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.04)" }}
      />

      {/* Background Type Tabs */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        BACKGROUND TYPE
      </p>
      <div className="relative mb-4 flex gap-0.5 rounded-lg p-0.5" style={{ backgroundColor: "rgba(24,24,27,1)" }}>
        {BG_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setBackground({ type: tab.id })}
            className="relative z-10 flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              color: activeLayerConfig.type === tab.id ? "rgba(244,244,245,1)" : "rgba(113,113,122,1)",
            }}
          >
            {activeLayerConfig.type === tab.id && (
              <motion.div
                layoutId="bg-tab-indicator"
                className="absolute inset-0 rounded-md"
                style={{ backgroundColor: "rgba(39,39,42,1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Color Mode */}
      {activeLayerConfig.type === "color" && (
        <>
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => colorInputRef.current?.click()}
              className="size-9 shrink-0 rounded-lg transition-transform hover:scale-110"
              style={{ backgroundColor: activeLayerConfig.value }}
            />
            <input
              ref={colorInputRef}
              type="color"
              value={activeLayerConfig.value}
              onChange={(e) => setBackground({ value: e.target.value })}
              className="hidden"
            />
            <input
              type="text"
              value={activeLayerConfig.value}
              onChange={(e) => setBackground({ value: e.target.value })}
              className="w-full rounded-lg px-3 py-2 text-xs font-mono outline-none"
              style={{
                backgroundColor: "rgba(24,24,27,1)",
                border: "1px solid rgba(63,63,70,1)",
                color: "rgba(244,244,245,1)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(63,63,70,1)")}
            />
          </div>
          <div className="flex gap-2">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setBackground({ type: "color", value: preset })}
                className="size-7 rounded-lg transition-transform hover:scale-110"
                style={{
                  backgroundColor: preset,
                  boxShadow: activeLayerConfig.value === preset ? "0 0 0 2px rgba(24,24,27,1), 0 0 0 4px rgba(63,63,70,1)" : "none",
                  outlineOffset: 2,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Gradient Mode */}
      {activeLayerConfig.type === "gradient" && (
        <div className="flex flex-wrap gap-2">
          {GRADIENT_PRESETS.map((g) => (
            <button
              key={g.label}
              type="button"
              onClick={() => setBackground({ type: "gradient", value: g.value })}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                background: g.value,
                border: activeLayerConfig.value === g.value
                  ? "1.5px solid #a78bfa"
                  : "1.5px solid rgba(255,255,255,0.06)",
                color: "rgba(244,244,245,0.9)",
                outline: activeLayerConfig.value === g.value ? "2px solid rgba(167,139,250,0.3)" : "none",
                outlineOffset: -1,
              }}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      {/* Image Mode */}
      {activeLayerConfig.type === "image" && (
        <>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          {activeLayerConfig.value ? (
            <div className="relative mb-3">
              <img
                src={activeLayerConfig.value}
                alt="Background preview"
                className="h-20 w-full rounded-xl object-cover"
              />
              <button
                type="button"
                onClick={() => setBackground({ value: "" })}
                className="absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl py-5 transition-colors"
              style={{
                border: "1.5px dashed rgba(63,63,70,1)",
                backgroundColor: "rgba(24,24,27,1)",
                color: "rgba(113,113,122,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(82,82,91,1)";
                e.currentTarget.style.color = "rgba(161,161,170,1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(63,63,70,1)";
                e.currentTarget.style.color = "rgba(113,113,122,1)";
              }}
            >
              <Upload className="size-4" />
              <span className="text-sm">Upload Background</span>
            </button>
          )}

          {/* AI Generate */}
          <button
            type="button"
            onClick={() => setAiOpen(!aiOpen)}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            }}
          >
            <Sparkles className="size-3.5" />
            GENERATE WITH AI
          </button>

          {aiOpen && (
            <div className="mt-2 space-y-2">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder='e.g. "Luxury black marble with gold veins"'
                rows={2}
                className="w-full resize-none rounded-lg px-3 py-2 text-xs outline-none transition-colors placeholder:text-zinc-600"
                style={{
                  backgroundColor: "rgba(24,24,27,1)",
                  border: "1px solid rgba(63,63,70,1)",
                  color: "rgba(244,244,245,1)",
                }}
              />
              <button
                type="button"
                onClick={handleGenerateBackground}
                disabled={aiLoading || !aiPrompt.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-opacity disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                }}
              >
                {aiLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5" />
                )}
                {aiLoading ? "Generating..." : "Generate Background"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Adjustments */}
      {(activeLayerConfig.type === "image" || activeLayerConfig.type === "gradient" || activeLayerConfig.type === "color") && (
        <div className="mt-8 space-y-6">
          <p
            className="mb-2 text-[11px] font-medium tracking-[0.1em]"
            style={{ color: "rgba(113,113,122,1)" }}
          >
            ADJUSTMENTS
          </p>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-medium" style={{ color: "rgba(161,161,170,1)" }}>
                Blur
              </label>
              <span className="text-xs" style={{ color: "rgba(113,113,122,1)" }}>
                {activeLayerConfig.blur}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={activeLayerConfig.blur}
              onChange={(e) => setBackground({ blur: Number(e.target.value) })}
              className="w-full cursor-pointer"
              style={{
                accentColor: "#a78bfa",
                height: 4,
                borderRadius: 2,
                background: `linear-gradient(to right, #a78bfa ${(activeLayerConfig.blur / 20) * 100}%, rgba(63,63,70,1) ${(activeLayerConfig.blur / 20) * 100}%)`,
              }}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-medium" style={{ color: "rgba(161,161,170,1)" }}>
                Brightness
              </label>
              <span className="text-xs" style={{ color: "rgba(113,113,122,1)" }}>
                {Math.round(activeLayerConfig.brightness * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={activeLayerConfig.brightness}
              onChange={(e) => setBackground({ brightness: Number(e.target.value) })}
              className="w-full cursor-pointer"
              style={{
                accentColor: "#a78bfa",
                height: 4,
                borderRadius: 2,
                background: `linear-gradient(to right, #a78bfa ${(activeLayerConfig.brightness / 2) * 100}%, rgba(63,63,70,1) ${(activeLayerConfig.brightness / 2) * 100}%)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Separator */}
      <div
        className="my-4"
        style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.04)" }}
      />

      {/* ── Shadows ── */}
      <p
        className="mb-3 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        SHADOWS
      </p>
      {[
        {
          label: "Top Shadow",
          checked: showTopShadow,
          onChange: setShowTopShadow,
        },
        {
          label: "Bottom Shadow",
          checked: showBottomShadow,
          onChange: setShowBottomShadow,
        },
      ].map(({ label, checked, onChange }) => (
        <div
          key={label}
          className="mb-2 flex items-center justify-between rounded-lg px-3 py-2.5"
          style={{
            backgroundColor: "rgba(24,24,27,1)",
            border: "1px solid rgba(63,63,70,1)",
          }}
        >
          <span className="text-xs font-medium" style={{ color: "rgba(161,161,170,1)" }}>
            {label}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="relative h-5 w-9 rounded-full transition-colors"
            style={{
              backgroundColor: checked ? "#a78bfa" : "rgba(63,63,70,1)",
            }}
          >
            <span
              className="absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform"
              style={{ left: "2px", transform: checked ? "translateX(16px)" : "translateX(0)" }}
            />
          </button>
        </div>
      ))}

      {/* Separator */}
      <div
        className="my-4"
        style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.04)" }}
      />

      {/* ── Menu Border ── */}
      <p
        className="mb-3 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        MENU BORDER
      </p>

      {/* Style */}
      <p className="mb-1.5 text-xs" style={{ color: "rgba(113,113,122,1)" }}>
        Style
      </p>
      <select
        value={menuBorder.style}
        onChange={(e) => setMenuBorder({ style: e.target.value as MenuBorderSettings["style"] })}
        className="mb-3 w-full rounded-lg px-3 py-2 text-xs outline-none transition-colors"
        style={{
          backgroundColor: "rgba(24,24,27,1)",
          border: "1px solid rgba(63,63,70,1)",
          color: "rgba(244,244,245,1)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(63,63,70,1)")}
      >
        {BORDER_STYLES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      {/* Color */}
      <p className="mb-1.5 text-xs" style={{ color: "rgba(113,113,122,1)" }}>
        Color
      </p>
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => borderColorRef.current?.click()}
          className="size-9 shrink-0 rounded-lg transition-transform hover:scale-110"
          style={{ backgroundColor: menuBorder.color }}
        />
        <input
          ref={borderColorRef}
          type="color"
          value={menuBorder.color}
          onChange={(e) => setMenuBorder({ color: e.target.value })}
          className="hidden"
        />
        <input
          type="text"
          value={menuBorder.color}
          onChange={(e) => setMenuBorder({ color: e.target.value })}
          className="flex-1 rounded-lg px-3 py-2 text-xs font-mono outline-none"
          style={{
            backgroundColor: "rgba(24,24,27,1)",
            border: "1px solid rgba(63,63,70,1)",
            color: "rgba(244,244,245,1)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(63,63,70,1)")}
        />
      </div>

      {/* Sliders */}
      {[
        { label: "Size", key: "size" as const, min: 0, max: 20, step: 1 },
        { label: "Offset X", key: "offsetX" as const, min: -100, max: 100, step: 1 },
        { label: "Offset Y", key: "offsetY" as const, min: -100, max: 100, step: 1 },
        { label: "Padding X", key: "paddingX" as const, min: 0, max: 100, step: 1 },
        { label: "Padding Y", key: "paddingY" as const, min: 0, max: 100, step: 1 },
      ].map(({ label, key, min, max, step }) => (
        <div key={key} className="mb-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs" style={{ color: "rgba(113,113,122,1)" }}>
              {label}
            </span>
            <span
              className="text-xs font-mono"
              style={{ color: "rgba(161,161,170,1)" }}
            >
              {menuBorder[key]}
            </span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={menuBorder[key]}
            onChange={(e) => setMenuBorder({ [key]: Number(e.target.value) })}
            className="w-full cursor-pointer"
            style={{
              accentColor: "#a78bfa",
              height: 4,
              borderRadius: 2,
              background: `linear-gradient(to right, #a78bfa ${((menuBorder[key] - min) / (max - min)) * 100}%, rgba(63,63,70,1) ${((menuBorder[key] - min) / (max - min)) * 100}%)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
