"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, Loader2 } from "lucide-react";
import { useMenuDesigner, type BackgroundType } from "@/hooks/useMenuDesigner";

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
  const { background, setBackground } = useMenuDesigner();
  const colorInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
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
      {/* Background Type Tabs */}
      <div className="relative mb-4 flex gap-0.5 rounded-lg p-0.5" style={{ backgroundColor: "rgba(24,24,27,1)" }}>
        {BG_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setBackground({ type: tab.id })}
            className="relative z-10 flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              color: background.type === tab.id ? "rgba(244,244,245,1)" : "rgba(113,113,122,1)",
            }}
          >
            {background.type === tab.id && (
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
      {background.type === "color" && (
        <>
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => colorInputRef.current?.click()}
              className="size-9 shrink-0 rounded-lg transition-transform hover:scale-110"
              style={{ backgroundColor: background.value }}
            />
            <input
              ref={colorInputRef}
              type="color"
              value={background.value}
              onChange={(e) => setBackground({ value: e.target.value })}
              className="hidden"
            />
            <input
              type="text"
              value={background.value}
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
            {COLOR_PRESETS.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => setBackground({ type: "color", value: hex })}
                className="size-7 rounded-lg transition-transform hover:scale-110"
                style={{
                  backgroundColor: hex,
                  outline: background.value === hex ? "2px solid #a78bfa" : "1px solid rgba(63,63,70,1)",
                  outlineOffset: 2,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Gradient Mode */}
      {background.type === "gradient" && (
        <div className="flex flex-wrap gap-2">
          {GRADIENT_PRESETS.map((g) => (
            <button
              key={g.label}
              type="button"
              onClick={() => setBackground({ type: "gradient", value: g.value })}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                background: g.value,
                border: background.value === g.value
                  ? "1.5px solid #a78bfa"
                  : "1.5px solid rgba(255,255,255,0.06)",
                color: "rgba(244,244,245,0.9)",
                outline: background.value === g.value ? "2px solid rgba(167,139,250,0.3)" : "none",
                outlineOffset: -1,
              }}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      {/* Image Mode */}
      {background.type === "image" && (
        <>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          {background.value ? (
            <div className="relative mb-3">
              <img
                src={background.value}
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

      {/* Separator */}
      <div
        className="my-4"
        style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.04)" }}
      />

      {/* Blur Slider */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        BLUR
      </p>
      <div className="mb-4 flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={20}
          value={background.blur}
          onChange={(e) => setBackground({ blur: Number(e.target.value) })}
          className="flex-1 cursor-pointer"
          style={{
            accentColor: "#a78bfa",
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(to right, #a78bfa ${(background.blur / 20) * 100}%, rgba(63,63,70,1) ${(background.blur / 20) * 100}%)`,
          }}
        />
        <span
          className="w-8 text-right text-xs font-mono"
          style={{ color: "rgba(161,161,170,1)" }}
        >
          {background.blur}
        </span>
      </div>

      {/* Brightness Slider */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        BRIGHTNESS
      </p>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.1}
          value={background.brightness}
          onChange={(e) => setBackground({ brightness: Number(e.target.value) })}
          className="flex-1 cursor-pointer"
          style={{
            accentColor: "#a78bfa",
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(to right, #a78bfa ${((background.brightness - 0.5) / 1) * 100}%, rgba(63,63,70,1) ${((background.brightness - 0.5) / 1) * 100}%)`,
          }}
        />
        <span
          className="w-8 text-right text-xs font-mono"
          style={{ color: "rgba(161,161,170,1)" }}
        >
          {background.brightness.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
