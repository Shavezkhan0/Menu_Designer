"use client";

import { useMenuDesigner, type CanvasPreset, type CanvasUnit, getDefaultCanvasSize } from "@/hooks/useMenuDesigner";

const PRESETS: { value: CanvasPreset; label: string }[] = [
  { value: "a3", label: "A3" },
  { value: "a4", label: "A4" },
  { value: "a5", label: "A5" },
  { value: "a6", label: "A6" },
  { value: "letter", label: "US Letter" },
  { value: "custom", label: "Custom" },
];

const UNIT_OPTIONS: { value: CanvasUnit; label: string }[] = [
  { value: "px", label: "px" },
  { value: "mm", label: "mm" },
  { value: "in", label: "in" },
];

export default function DocumentPanel() {
  const { canvasSize, setCanvasSize } = useMenuDesigner();

  const handlePreset = (preset: CanvasPreset) => {
    setCanvasSize(getDefaultCanvasSize(preset));
  };

  const handleChange = (field: "width" | "height", value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    setCanvasSize({ ...canvasSize, [field]: num, preset: "custom" });
  };

  const handleUnit = (unit: CanvasUnit) => {
    setCanvasSize({ ...canvasSize, unit });
  };

  return (
    <div className="space-y-3 px-4 pb-4">
      <p
        className="text-[10px] font-medium uppercase tracking-wider"
        style={{ color: "rgba(113,113,122,1)" }}
      >
        Page Size
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {PRESETS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => handlePreset(value)}
            className="rounded-lg px-3 py-2 text-xs font-medium transition-colors"
            style={{
              backgroundColor: canvasSize.preset === value ? "rgba(167,139,250,0.15)" : "rgba(39,39,42,0.5)",
              color: canvasSize.preset === value ? "#a78bfa" : "rgba(212,212,216,1)",
              border: canvasSize.preset === value ? "1px solid rgba(167,139,250,0.3)" : "1px solid rgba(63,63,70,1)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              className="mb-1 block text-[10px] font-medium uppercase tracking-wider"
              style={{ color: "rgba(113,113,122,1)" }}
            >
              Width
            </label>
            <input
              type="number"
              min={1}
              value={canvasSize.width}
              onChange={(e) => handleChange("width", e.target.value)}
              className="w-full rounded-lg border px-2.5 py-1.5 text-xs font-medium outline-none transition-colors focus:border-purple-500/50"
              style={{
                backgroundColor: "rgba(39,39,42,0.5)",
                borderColor: "rgba(63,63,70,1)",
                color: "rgba(212,212,216,1)",
              }}
            />
          </div>
          <div>
            <label
              className="mb-1 block text-[10px] font-medium uppercase tracking-wider"
              style={{ color: "rgba(113,113,122,1)" }}
            >
              Height
            </label>
            <input
              type="number"
              min={1}
              value={canvasSize.height}
              onChange={(e) => handleChange("height", e.target.value)}
              className="w-full rounded-lg border px-2.5 py-1.5 text-xs font-medium outline-none transition-colors focus:border-purple-500/50"
              style={{
                backgroundColor: "rgba(39,39,42,0.5)",
                borderColor: "rgba(63,63,70,1)",
                color: "rgba(212,212,216,1)",
              }}
            />
          </div>
        </div>

        <div className="flex gap-1">
          {UNIT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleUnit(value)}
              className="flex-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-colors"
              style={{
                backgroundColor: canvasSize.unit === value ? "rgba(167,139,250,0.15)" : "rgba(39,39,42,0.5)",
                color: canvasSize.unit === value ? "#a78bfa" : "rgba(161,161,170,1)",
                border: canvasSize.unit === value ? "1px solid rgba(167,139,250,0.3)" : "1px solid rgba(63,63,70,1)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
