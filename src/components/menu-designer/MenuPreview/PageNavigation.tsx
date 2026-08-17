"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onNavigate: (page: number) => void;
}

export default function PageNavigation({ currentPage, totalPages, onNavigate }: Props) {
  useEffect(() => {
    if (totalPages <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentPage > 1) {
        onNavigate(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < totalPages) {
        onNavigate(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages, onNavigate]);

  if (totalPages <= 1) return null;

  return (
    <div
      className="flex shrink-0 items-center justify-center gap-3 border-t px-4 py-2.5"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        backgroundColor: "rgba(24,24,27,0.8)",
      }}
    >
      <button
        type="button"
        onClick={() => onNavigate(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex size-7 items-center justify-center rounded-full transition-colors disabled:opacity-30"
        style={{
          backgroundColor: "rgba(63,63,70,0.5)",
          color: "rgba(161,161,170,1)",
        }}
      >
        <ChevronLeft className="size-4" />
      </button>

      <span className="min-w-[120px] text-center text-xs font-medium" style={{ color: "rgba(161,161,170,1)" }}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onNavigate(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex size-7 items-center justify-center rounded-full transition-colors disabled:opacity-30"
        style={{
          backgroundColor: "rgba(63,63,70,0.5)",
          color: "rgba(161,161,170,1)",
        }}
      >
        <ChevronRight className="size-4" />
      </button>

      <span className="ml-2 text-[10px]" style={{ color: "rgba(82,82,91,1)" }}>
        ← →
      </span>
    </div>
  );
}
