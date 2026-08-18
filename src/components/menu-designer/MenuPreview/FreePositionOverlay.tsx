"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, type PanInfo } from "framer-motion";
import type { MenuItem } from "@/data/menuData";
import { useMenuDesigner, type ThemeSettings, type LayoutStyle, type FreeItemPosition } from "@/hooks/useMenuDesigner";
import { screenDeltaToCanvasDelta } from "@/lib/freePosition";
import FreeItemCardContent from "./FreeItemCardContent";

export interface FreePositionOverlayProps {
  items: MenuItem[];
  positions: Record<string, FreeItemPosition>;
  theme: ThemeSettings;
  activeLayout: LayoutStyle;
  displayScale: number;
  isExport?: boolean;
}

export default function FreePositionOverlay({ items, positions, theme, activeLayout, displayScale, isExport }: FreePositionOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {items.map((item) => {
        const position = positions[item.id];
        if (!position) return null;
        return (
          <FreePositionCard
            key={item.id}
            item={item}
            position={position}
            theme={theme}
            activeLayout={activeLayout}
            displayScale={displayScale}
            isExport={isExport}
          />
        );
      })}
    </div>
  );
}

interface FreePositionCardProps {
  item: MenuItem;
  position: FreeItemPosition;
  theme: ThemeSettings;
  activeLayout: LayoutStyle;
  displayScale: number;
  isExport?: boolean;
}

function FreePositionCard({ item, position, theme, activeLayout, displayScale, isExport }: FreePositionCardProps) {
  const setFreePosition = useMenuDesigner((s) => s.setFreePosition);
  const [isSelected, setIsSelected] = useState(false);
  const dragOffsetX = useMotionValue(0);
  const dragOffsetY = useMotionValue(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSelected) return;
    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsSelected(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isSelected]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const { dx, dy } = screenDeltaToCanvasDelta(info.offset.x, info.offset.y, displayScale);
    setFreePosition(item.id, { x: position.x + dx, y: position.y + dy, width: position.width, height: position.height });
    dragOffsetX.set(0);
    dragOffsetY.set(0);
    setIsSelected(false);
  }

  function handleResizeCommit(dx: number, dy: number) {
    const { dx: cdx, dy: cdy } = screenDeltaToCanvasDelta(dx, dy, displayScale);
    const nextWidth = Math.max(40, position.width + cdx);
    const nextHeight = Math.max(40, position.height + cdy);
    setFreePosition(item.id, { x: position.x, y: position.y, width: nextWidth, height: nextHeight });
    setIsSelected(false);
  }

  return (
    <motion.div
      ref={rootRef}
      drag={!isExport}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsSelected(true)}
      onDrag={(_, info) => {
        dragOffsetX.set(info.offset.x);
        dragOffsetY.set(info.offset.y);
      }}
      onDragEnd={handleDragEnd}
      onDoubleClick={() => !isExport && setIsSelected(true)}
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
      <FreeItemCardContent item={item} theme={theme} activeLayout={activeLayout} width={position.width} height={position.height} />
      {isSelected && !isExport && <ResizeHandle theme={theme} onCommit={handleResizeCommit} />}
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
