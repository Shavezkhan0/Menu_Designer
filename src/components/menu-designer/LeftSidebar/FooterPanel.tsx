"use client";

import { useMenuDesigner } from "@/hooks/useMenuDesigner";

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function isLightBg(hex: string): boolean {
  const c = parseHex(hex);
  if (!c) return true;
  return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255 > 0.5;
}

export default function FooterPanel() {
  const { footer, setFooter, theme } = useMenuDesigner();

  return (
    <div className="px-4 py-5">
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        BRAND SIGNATURE
      </p>
      <div
        className="mb-5 flex items-center justify-between rounded-lg px-3 py-2.5"
        style={{
          backgroundColor: "rgba(24,24,27,1)",
          border: "1px solid rgba(63,63,70,1)",
        }}
      >
        <span className="text-xs font-medium" style={{ color: "rgba(161,161,170,1)" }}>
          Show Brand Signature
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={footer.showBrandSignature}
          onClick={() => setFooter({ showBrandSignature: !footer.showBrandSignature })}
          className="relative h-5 w-9 rounded-full transition-colors"
          style={{
            backgroundColor: footer.showBrandSignature ? "#a78bfa" : "rgba(63,63,70,1)",
          }}
        >
          <span
            className="absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform"
            style={{ left: "2px", transform: footer.showBrandSignature ? "translateX(16px)" : "translateX(0)" }}
          />
        </button>
      </div>

<div className="mb-3">
        <p
          className="mb-1.5 text-xs font-medium"
          style={{ color: "rgba(161,161,170,1)" }}
        >
          Brand Text
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={footer.brandText}
            onChange={(e) => setFooter({ brandText: e.target.value })}
            placeholder="e.g. Deli Cocktail House"
            className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder:text-zinc-600"
            style={{
              backgroundColor: "rgba(24,24,27,1)",
              border: "1px solid rgba(63,63,70,1)",
              color: "rgba(244,244,245,1)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(63,63,70,1)")}
          />
          <button
            type="button"
            onClick={() => setFooter({ brandColor: undefined })}
            className="rounded-full px-2 py-1.5 text-xs transition-colors"
            style={{
              backgroundColor: "rgba(39,39,42,1)",
              border: "1px solid rgba(63,63,70,1)",
              color: "rgba(212,212,216,1)",
            }}
          >
            Reset to auto
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span
            className="w-10 h-5 rounded-md px-2 text-sm"
            style={{
              fontFamily: "var(--font-brand-signature), 'Alex Brush', cursive",
              fontSize: "32px",
              lineHeight: 1.2,
              color: footer.brandColor
                ? footer.brandColor
                : isLightBg(theme.backgroundColor)
                  ? "#6B3226"
                  : "#F4D9C9",
            }}
          >
            {footer.brandText}
          </span>
        </div>
      </div>

      {/* Brand Color Preview */}
      <div className="mb-3">
        <p className="mb-1.5 text-xs font-medium" style={{ color: "rgba(161,161,170,1)" }}>
          Brand Color
        </p>
        <div className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full"
            style={{
              backgroundColor: footer.brandColor || "auto",
              border: "1px solid rgba(63,63,70,1)",
            }}
          >
            {/* Visual preview - show auto contrast text when no color set */}
          </span>
          <input
            type="color"
            value={footer.brandColor ?? "#a78bfa"}
            onChange={(e) => setFooter({ brandColor: e.target.value })}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
