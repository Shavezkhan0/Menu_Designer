"use client";

import { useRef } from "react";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

const CARD_STYLES = ["glass", "solid", "minimal", "bordered"] as const;

const FONT_OPTIONS = [
  { value: "Playfair Display, serif", label: "Playfair Display" },
  { value: "Cormorant Garamond, serif", label: "Cormorant Garamond" },
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Libre Baskerville, serif", label: "Libre Baskerville" },
  { value: "Great Vibes, cursive", label: "Great Vibes" },
];

export default function BrandingPanel() {
  const { theme, setTheme } = useMenuDesigner();
  const primaryColorRef = useRef<HTMLInputElement>(null);
  const accentColorRef = useRef<HTMLInputElement>(null);
  const headingColorRef = useRef<HTMLInputElement>(null);
  const subheadingColorRef = useRef<HTMLInputElement>(null);

  const IMAGE_SHAPES = ["circular", "rectangle", "square", "none", "blend"] as const;

  return (
    <div className="px-4 py-5">
      {/* Theme Colors */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        THEME COLORS
      </p>
      <div className="mb-4 flex gap-3">
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-xs" style={{ color: "rgba(113,113,122,1)" }}>
            Primary
          </span>
          <button
            type="button"
            onClick={() => primaryColorRef.current?.click()}
            className="size-9 rounded-lg transition-transform hover:scale-110"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <input
            ref={primaryColorRef}
            type="color"
            value={theme.primaryColor}
            onChange={(e) => setTheme({ primaryColor: e.target.value })}
            className="hidden"
          />
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-xs" style={{ color: "rgba(113,113,122,1)" }}>
            Accent
          </span>
          <button
            type="button"
            onClick={() => accentColorRef.current?.click()}
            className="size-9 rounded-lg transition-transform hover:scale-110"
            style={{ backgroundColor: theme.accentColor }}
          />
          <input
            ref={accentColorRef}
            type="color"
            value={theme.accentColor}
            onChange={(e) => setTheme({ accentColor: e.target.value })}
            className="hidden"
          />
        </div>
      </div>

      {/* Font Picker */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        MENU FONT
      </p>
      <select
        value={theme.fontFamily}
        onChange={(e) => setTheme({ fontFamily: e.target.value })}
        className="mb-4 w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors"
        style={{
          backgroundColor: "rgba(24,24,27,1)",
          border: "1px solid rgba(63,63,70,1)",
          color: "rgba(244,244,245,1)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(63,63,70,1)")}
      >
        {FONT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ fontFamily: opt.value }}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Card Style */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        CARD STYLE
      </p>
      <div className="flex flex-wrap gap-1.5">
        {CARD_STYLES.map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => setTheme({ cardStyle: style })}
            className="rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors"
            style={{
              backgroundColor:
                theme.cardStyle === style
                  ? "#a78bfa"
                  : "rgba(39,39,42,0.5)",
              color:
                theme.cardStyle === style
                  ? "rgba(255,255,255,1)"
                  : "rgba(212,212,216,1)",
              border:
                theme.cardStyle === style
                  ? "1px solid transparent"
                  : "1px solid rgba(63,63,70,1)",
            }}
          >
            {style}
          </button>
        ))}
      </div>

      {/* Heading Settings */}
      <p
        className="mb-2 mt-4 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        HEADING SETTINGS
      </p>
      <div className="mb-4 flex gap-3">
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-xs" style={{ color: "rgba(113,113,122,1)" }}>
            Heading
          </span>
          <button
            type="button"
            onClick={() => headingColorRef.current?.click()}
            className="size-9 rounded-lg transition-transform hover:scale-110"
            style={{ backgroundColor: theme.headingColor }}
          />
          <input
            ref={headingColorRef}
            type="color"
            value={theme.headingColor}
            onChange={(e) => setTheme({ headingColor: e.target.value })}
            className="hidden"
          />
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-xs" style={{ color: "rgba(113,113,122,1)" }}>
            Subheading
          </span>
          <button
            type="button"
            onClick={() => subheadingColorRef.current?.click()}
            className="size-9 rounded-lg transition-transform hover:scale-110"
            style={{ backgroundColor: theme.subheadingColor }}
          />
          <input
            ref={subheadingColorRef}
            type="color"
            value={theme.subheadingColor}
            onChange={(e) => setTheme({ subheadingColor: e.target.value })}
            className="hidden"
          />
        </div>
      </div>

      {/* Image Style */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        IMAGE STYLE
      </p>
      <select
        value={theme.imageShape}
        onChange={(e) => setTheme({ imageShape: e.target.value as typeof theme.imageShape })}
        className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors"
        style={{
          backgroundColor: "rgba(24,24,27,1)",
          border: "1px solid rgba(63,63,70,1)",
          color: "rgba(244,244,245,1)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(63,63,70,1)")}
      >
        {IMAGE_SHAPES.map((shape) => (
          <option key={shape} value={shape} className="capitalize">
            {shape.charAt(0).toUpperCase() + shape.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
