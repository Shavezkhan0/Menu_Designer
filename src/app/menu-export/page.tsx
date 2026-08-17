import { notFound } from "next/navigation";
import { MENU_ITEMS } from "@/data/menuData";
import { computeMenuPages } from "@/lib/pagination";
import { consumeExportPayload } from "@/lib/exportStore";
import { isMenuExportPayload } from "@/lib/exportPayload";
import MenuPageView from "@/components/menu-designer/MenuPreview/MenuPageView";

export default async function MenuExportPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const payload = id ? await consumeExportPayload(id) : undefined;
  if (!isMenuExportPayload(payload)) notFound();

  const {
    selectedCategories,
    selectedItemIds,
    activeLayout,
    showCategoryNames,
    canvasSize,
    theme,
    background,
    menuBorder,
    showHeader,
    restaurantInfo,
    footer,
  } = payload;

  const hasSelectedItems = selectedItemIds.length > 0;
  const items =
    selectedCategories.length > 0
      ? MENU_ITEMS.filter((item) => selectedCategories.includes(item.category))
      : hasSelectedItems
        ? MENU_ITEMS.filter((item) => selectedItemIds.includes(item.id))
        : MENU_ITEMS;

  const pages = computeMenuPages(items, activeLayout, {
    showCategoryNames,
    itemsPerPageOverride: items.length || undefined,
  });

  return (
    <MenuPageView
      pages={pages}
      canvasSize={canvasSize}
      theme={theme}
      background={background}
      menuBorder={menuBorder}
      showHeader={showHeader}
      restaurantInfo={restaurantInfo}
      footer={footer}
      activeLayout={activeLayout}
      isExport
    />
  );
}
