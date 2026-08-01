"use client";

import { useMenuDesigner } from "@/hooks/useMenuDesigner";

export default function FooterPanel() {
  const { restaurantInfo, setRestaurantInfo, showFooter, setShowFooter } =
    useMenuDesigner();

  const fields: { label: string; key: "phone" | "email" | "address" | "website"; placeholder: string }[] = [
    { label: "PHONE", key: "phone", placeholder: "e.g. 555-0100" },
    { label: "EMAIL", key: "email", placeholder: "e.g. info@example.com" },
    { label: "ADDRESS", key: "address", placeholder: "e.g. 123 Main St" },
    { label: "WEBSITE", key: "website", placeholder: "e.g. www.example.com" },
  ];

  return (
    <div className="px-4 py-5">
      {/* Footer Visibility */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        FOOTER VISIBILITY
      </p>
      <div
        className="mb-5 flex items-center justify-between rounded-lg px-3 py-2.5"
        style={{
          backgroundColor: "rgba(24,24,27,1)",
          border: "1px solid rgba(63,63,70,1)",
        }}
      >
        <span className="text-xs font-medium" style={{ color: "rgba(161,161,170,1)" }}>
          Show Footer
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={showFooter}
          onClick={() => setShowFooter(!showFooter)}
          className="relative h-5 w-9 rounded-full transition-colors"
          style={{
            backgroundColor: showFooter ? "#a78bfa" : "rgba(63,63,70,1)",
          }}
        >
          <span
            className="absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform"
            style={{ left: "2px", transform: showFooter ? "translateX(16px)" : "translateX(0)" }}
          />
        </button>
      </div>

      {/* Separator */}
      <div
        className="mb-5"
        style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.04)" }}
      />

      {/* Contact Fields */}
      <p
        className="mb-2 text-[11px] font-medium tracking-[0.1em]"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        CONTACT INFO
      </p>
      {fields.map(({ label, key, placeholder }) => (
        <div key={key} className="mb-3">
          <p
            className="mb-1.5 text-xs font-medium"
            style={{ color: "rgba(161,161,170,1)" }}
          >
            {label}
          </p>
          <input
            type="text"
            value={restaurantInfo[key]}
            onChange={(e) => setRestaurantInfo({ [key]: e.target.value })}
            placeholder={placeholder}
            className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder:text-zinc-600"
            style={{
              backgroundColor: "rgba(24,24,27,1)",
              border: "1px solid rgba(63,63,70,1)",
              color: "rgba(244,244,245,1)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(63,63,70,1)")}
          />
        </div>
      ))}

      <p
        className="text-[11px] leading-relaxed"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        Leave a field blank to hide it in the footer preview.
      </p>
    </div>
  );
}
