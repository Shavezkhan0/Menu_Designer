"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Copy,
  Check,
  RotateCw,
  FileText,
  GlassWater,
  Building2,
  Wand2,
  Palette,
  Star,
} from "lucide-react";
import { useMenuDesigner } from "@/hooks/useMenuDesigner";

interface QuickAction {
  label: string;
  icon: typeof Sparkles;
  type: string;
  getPrompt: () => string;
}

export default function AIAssistant() {
  const { selectedItemId, restaurantInfo } = useMenuDesigner();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickActions: QuickAction[] = [
    {
      label: "Write Description",
      icon: FileText,
      type: "description",
      getPrompt: () =>
        selectedItemId
          ? `Write a premium 1-2 sentence menu description for the selected item.`
          : "Write a premium 1-2 sentence description for a signature cocktail menu item.",
    },
    {
      label: "Suggest Names",
      icon: GlassWater,
      type: "names",
      getPrompt: () =>
        "Suggest 5 creative, premium cocktail names with a brief description for each.",
    },
    {
      label: "Restaurant Bio",
      icon: Building2,
      type: "bio",
      getPrompt: () =>
        restaurantInfo.name
          ? `Write an elegant 'About Us' description for ${restaurantInfo.name}, a premium dining establishment.`
          : "Write an elegant 'About Us' description for a premium dining establishment.",
    },
    {
      label: "Premium Style",
      icon: Wand2,
      type: "premium",
      getPrompt: () =>
        "Rewrite all menu descriptions in an ultra-luxury, fine-dining style using sophisticated language.",
    },
    {
      label: "Generate Theme",
      icon: Palette,
      type: "theme",
      getPrompt: () =>
        "Suggest a premium restaurant visual theme with color palette, font pairing, and background style.",
    },
    {
      label: "Chef's Picks",
      icon: Star,
      type: "signature",
      getPrompt: () =>
        "Suggest 6 signature items that should be highlighted as 'Chef's Picks' on a premium cocktail menu.",
    },
  ];

  const executePrompt = async (text: string, _type?: string) => {
    setPrompt(text);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/grok/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, type: _type ?? "general" }),
      });

      if (!res.ok) throw new Error("Failed to generate response");

      const data = await res.json();
      setResult(data.text ?? data.result ?? JSON.stringify(data));
    } catch {
      setError("Failed to generate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    executePrompt(action.getPrompt(), action.type);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    executePrompt(prompt.trim());
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (!result) return;
    useMenuDesigner.getState().setRestaurantInfo({ tagline: result.slice(0, 200) });
  };

  return (
    <div
      className="relative overflow-hidden px-4 py-5"
      style={{
        background:
          "radial-gradient(ellipse at top left, rgba(167,139,250,0.06) 0%, transparent 60%)",
      }}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span
          className="text-[11px] font-medium tracking-[0.1em]"
          style={{ color: "rgba(113,113,122,1)" }}
        >
          ⚡ AI ASSISTANT
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{
            backgroundColor: "rgba(167,139,250,0.15)",
            color: "#a78bfa",
          }}
        >
          Grok
        </span>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask AI to write descriptions, suggest names, generate themes..."
        rows={3}
        className="mb-3 w-full resize-none rounded-xl px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-zinc-600"
        style={{
          backgroundColor: "rgba(24,24,27,1)",
          border: error
            ? "1px solid rgba(239,68,68,0.5)"
            : "1px solid rgba(63,63,70,1)",
          color: "rgba(244,244,245,1)",
          minHeight: "80px",
        }}
        onFocus={(e) => {
          if (!error) e.target.style.borderColor = "#a78bfa";
        }}
        onBlur={(e) => {
          if (!error) e.target.style.borderColor = "rgba(63,63,70,1)";
        }}
      />

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mb-2 text-[11px]"
            style={{ color: "rgba(239,68,68,0.8)" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Quick Actions Grid */}
      <div className="mb-3 grid grid-cols-2 gap-1.5">
        {quickActions.map((action) => (
          <button
            key={action.type}
            type="button"
            onClick={() => handleQuickAction(action)}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[11px] font-medium transition-colors disabled:opacity-50"
            style={{
              backgroundColor: "rgba(24,24,27,1)",
              border: "1px solid rgba(63,63,70,1)",
              color: "rgba(212,212,216,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(39,39,42,1)";
              e.currentTarget.style.borderColor = "#a78bfa";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(24,24,27,1)";
              e.currentTarget.style.borderColor = "rgba(63,63,70,1)";
            }}
          >
            <action.icon className="size-3 shrink-0" />
            <span className="truncate">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Generate Button */}
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
        }}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="inline-flex"
          >
            <Sparkles className="size-4" />
          </motion.span>
        )}
        {loading ? "Generating..." : "Generate"}
      </button>

      {/* Result Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mt-3 overflow-hidden"
          >
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "rgba(24,24,27,1)",
                border: "1px solid rgba(63,63,70,1)",
              }}
            >
              <p
                className="whitespace-pre-wrap text-sm leading-relaxed"
                style={{ color: "rgba(244,244,245,1)" }}
              >
                {result}
              </p>

              {/* Action Buttons */}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleApply}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: "rgba(167,139,250,0.15)",
                    color: "#a78bfa",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(167,139,250,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(167,139,250,0.15)";
                  }}
                >
                  <Check className="size-3" />
                  Apply
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: "rgba(39,39,42,1)",
                    color: "rgba(161,161,170,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(63,63,70,1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(39,39,42,1)";
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="size-3" style={{ color: "#22c55e" }} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      Copy
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => executePrompt(prompt)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: "rgba(39,39,42,1)",
                    color: "rgba(161,161,170,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(63,63,70,1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(39,39,42,1)";
                  }}
                >
                  <RotateCw className="size-3" />
                  Regenerate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
