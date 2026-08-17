"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

export default function HeaderPanel() {
  const { restaurantInfo, showHeader, setRestaurantInfo, setShowHeader } =
    useMenuDesigner();
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setRestaurantInfo({ logoUrl: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="px-4 py-5">
      {/* Header Visibility */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        HEADER VISIBILITY
      </p>
      <div
        className="mb-5 flex items-center justify-between rounded-lg px-3 py-2.5"
        style={{
          backgroundColor: "rgba(24,24,27,1)",
          border: "1px solid rgba(63,63,70,1)",
        }}
      >
        <span className="text-xs font-medium" style={{ color: "rgba(161,161,170,1)" }}>
          Show Header
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={showHeader}
          onClick={() => setShowHeader(!showHeader)}
          className="relative h-5 w-9 rounded-full transition-colors"
          style={{
            backgroundColor: showHeader ? "#a78bfa" : "rgba(63,63,70,1)",
          }}
        >
          <span
            className="absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform"
            style={{ left: "2px", transform: showHeader ? "translateX(16px)" : "translateX(0)" }}
          />
        </button>
      </div>

      {/* Separator */}
      <div
        className="mb-5"
        style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.04)" }}
      />

      {/* Restaurant Name */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        RESTAURANT NAME
      </p>
      <input
        type="text"
        value={restaurantInfo.name}
        onChange={(e) => setRestaurantInfo({ name: e.target.value })}
        placeholder="e.g. Maison Blanche"
        className="mb-3 w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder:text-zinc-600"
        style={{
          backgroundColor: "rgba(24,24,27,1)",
          border: "1px solid rgba(63,63,70,1)",
          color: "rgba(244,244,245,1)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(63,63,70,1)")}
      />

      {/* Tagline */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        TAGLINE
      </p>
      <input
        type="text"
        value={restaurantInfo.tagline}
        onChange={(e) => setRestaurantInfo({ tagline: e.target.value })}
        placeholder="e.g. Fine Dining & Craft Cocktails"
        className="mb-4 w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder:text-zinc-600"
        style={{
          backgroundColor: "rgba(24,24,27,1)",
          border: "1px solid rgba(63,63,70,1)",
          color: "rgba(244,244,245,1)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(63,63,70,1)")}
      />

      {/* Logo Upload */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        LOGO
      </p>
      <input
        ref={logoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleLogoUpload}
      />
      {restaurantInfo.logoUrl ? (
        <div className="mb-4 flex items-center gap-3">
          <img
            src={restaurantInfo.logoUrl}
            alt="Logo preview"
            className="size-12 rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={() => setRestaurantInfo({ logoUrl: null })}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors"
            style={{
              color: "rgba(161,161,170,1)",
              border: "1px solid rgba(63,63,70,1)",
            }}
          >
            <X className="size-3" />
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => logoInputRef.current?.click()}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl py-5 transition-colors"
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
          <span className="text-sm">Upload Logo</span>
        </button>
      )}

      <p
        className="text-[11px] leading-relaxed"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        When enabled, the header displays the restaurant name, tagline, and logo at the top of the menu.
      </p>
    </div>
  );
}
