"use client";

import { Fragment } from "react";
import type { MenuItem } from "@/data/menuData";
import { useMenuDesigner, type ThemeSettings, type LayoutStyle, type FreeItemPosition } from "@/hooks/useMenuDesigner";
import DraggableFreeBox from "./DraggableFreeBox";
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
  const setFreePosition = useMenuDesigner((s) => s.setFreePosition);
  const clearFreePosition = useMenuDesigner((s) => s.clearFreePosition);

  const showImage = (activeLayout === "vertical-grid" || activeLayout === "horizontal-row") && theme.imageShape !== "none";

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {items.map((item) => {
        const position = positions[item.id];
        if (!position) return null;

        const imageKey = `${item.id}::image`;
        const headingKey = `${item.id}::heading`;
        const descriptionKey = `${item.id}::description`;
        const imagePos = positions[imageKey];
        const headingPos = positions[headingKey];
        const descPos = positions[descriptionKey];

        return (
          <Fragment key={item.id}>
            <DraggableFreeBox
              id={item.id}
              position={position}
              theme={theme}
              displayScale={displayScale}
              isExport={isExport}
              onCommit={(pos) => setFreePosition(item.id, pos)}
              onReset={() => clearFreePosition(item.id)}
            >
              <FreeItemCardContent
                item={item}
                theme={theme}
                activeLayout={activeLayout}
                width={position.width}
                height={position.height}
                displayScale={displayScale}
                isExport={isExport}
              />
            </DraggableFreeBox>

            {imagePos && showImage && item.image && (
              <DraggableFreeBox
                id={imageKey}
                position={imagePos}
                theme={theme}
                displayScale={displayScale}
                isExport={isExport}
                onCommit={(pos) => setFreePosition(imageKey, pos)}
                onReset={() => clearFreePosition(imageKey)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  draggable={false}
                  className="h-full w-full object-cover"
                  style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
                />
              </DraggableFreeBox>
            )}

            {headingPos && (
              <DraggableFreeBox
                id={headingKey}
                position={headingPos}
                theme={theme}
                displayScale={displayScale}
                isExport={isExport}
                onCommit={(pos) => setFreePosition(headingKey, pos)}
                onReset={() => clearFreePosition(headingKey)}
              >
                <div className="flex h-full w-full items-center justify-center overflow-hidden text-center">
                  <h3
                    className="font-bold leading-tight"
                    style={{
                      fontFamily: theme.fontFamily,
                      color: theme.headingColor,
                      fontSize: `${Math.round(Math.max(10, Math.min(140, headingPos.height * 0.5)))}px`,
                    }}
                  >
                    {item.name}
                  </h3>
                </div>
              </DraggableFreeBox>
            )}

            {descPos && (
              <DraggableFreeBox
                id={descriptionKey}
                position={descPos}
                theme={theme}
                displayScale={displayScale}
                isExport={isExport}
                onCommit={(pos) => setFreePosition(descriptionKey, pos)}
                onReset={() => clearFreePosition(descriptionKey)}
              >
                <div className="flex h-full w-full items-center justify-center overflow-hidden text-center">
                  <p
                    className="leading-relaxed"
                    style={{
                      color: theme.subheadingColor,
                      fontSize: `${Math.round(Math.max(9, Math.min(72, descPos.height * 0.3)))}px`,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </DraggableFreeBox>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
