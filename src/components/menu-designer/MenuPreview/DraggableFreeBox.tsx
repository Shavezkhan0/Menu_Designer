"use client";

import { motion, useMotionValue, type PanInfo } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useMenuDesigner, type ThemeSettings, type FreeItemPosition } from "@/hooks/useMenuDesigner";
import { screenDeltaToCanvasDelta } from "@/lib/freePosition";

export interface DraggableFreeBoxProps {
  id: string;
  position: FreeItemPosition;
  theme: ThemeSettings;
  displayScale: number;
  isExport?: boolean;
  onCommit: (position: FreeItemPosition) => void;
  onReset: () => void;
  children: React.ReactNode;
}

export default function DraggableFreeBox({ id, position, theme, displayScale, isExport, onCommit, onReset, children }: DraggableFreeBoxProps) {
  const selectedItemId = useMenuDesigner((s) => s.selectedItemId);
  const setSelectedItemId = useMenuDesigner((s) => s.setSelectedItemId);
  const isSelected = selectedItemId === id;
  const dragOffsetX = useMotionValue(0);
  const dragOffsetY = useMotionValue(0);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const { dx, dy } = screenDeltaToCanvasDelta(info.offset.x, info.offset.y, displayScale);
    onCommit({ x: position.x + dx, y: position.y + dy, width: position.width, height: position.height });
    dragOffsetX.set(0);
    dragOffsetY.set(0);
  }

  function handleResizeCommit(dx: number, dy: number) {
    const { dx: cdx, dy: cdy } = screenDeltaToCanvasDelta(dx, dy, displayScale);
    const nextWidth = Math.max(40, position.width + cdx);
    const nextHeight = Math.max(40, position.height + cdy);
    onCommit({ x: position.x, y: position.y, width: nextWidth, height: nextHeight });
  }

  function handleReset() {
    onReset();
    setSelectedItemId(null);
  }

  return (
    <motion.div
      drag={!isExport}
      dragMomentum={false}
      dragElastic={0}
      data-canvas-item="true"
      onClick={() => !isExport && setSelectedItemId(id)}
      onDragStart={() => !isExport && setSelectedItemId(id)}
      onDrag={(_, info) => {
        dragOffsetX.set(info.offset.x);
        dragOffsetY.set(info.offset.y);
      }}
      onDragEnd={handleDragEnd}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: position.width,
        height: position.height,
        x: dragOffsetX,
        y: dragOffsetY,
        pointerEvents: isExport ? "none" : "auto",
        cursor: isExport ? "default" : "grab",
        zIndex: isSelected ? 30 : 20,
        outline: isSelected ? `2px solid ${theme.primaryColor}` : "none",
        outlineOffset: "2px",
        touchAction: "none",
      }}
    >
      {children}
      {isSelected && !isExport && (
        <>
          <ResizeHandle theme={theme} onCommit={handleResizeCommit} />
          <ResetHandle theme={theme} onReset={handleReset} />
        </>
      )}
    </motion.div>
  );
}

function ResizeHandle({ theme, onCommit }: { theme: ThemeSettings; onCommit: (dx: number, dy: number) => void }) {
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={(e) => e.stopPropagation()}
      onDrag={(_, info) => {
        dx.set(info.offset.x);
        dy.set(info.offset.y);
      }}
      onDragEnd={(_, info) => {
        onCommit(info.offset.x, info.offset.y);
        dx.set(0);
        dy.set(0);
      }}
      style={{
        position: "absolute",
        right: -6,
        bottom: -6,
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#fff",
        border: `2px solid ${theme.primaryColor}`,
        cursor: "nwse-resize",
        touchAction: "none",
      }}
    />
  );
}

function ResetHandle({ theme, onReset }: { theme: ThemeSettings; onReset: () => void }) {
  return (
    <button
      type="button"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onReset();
      }}
      title="Reset to default position"
      style={{
        position: "absolute",
        top: -10,
        right: -10,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#fff",
        border: `2px solid ${theme.primaryColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <RotateCcw size={11} color={theme.primaryColor} />
    </button>
  );
}
