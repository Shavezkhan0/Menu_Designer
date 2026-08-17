import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import JSZip from "jszip";
import type { MenuPage } from "@/lib/pagination";
import { computeMenuPages } from "@/lib/pagination";
import type { LayoutStyle } from "@/hooks/useMenuDesigner";
import type { MenuItem } from "@/data/menuData";

export interface ExportOptions {
  items: MenuItem[];
  layout: LayoutStyle;
  showCategoryNames: boolean;
  pageWidth: number;
  pageHeight: number;
}

async function renderPageToCanvas(
  page: MenuPage,
  options: ExportOptions
): Promise<HTMLCanvasElement> {
  const { pageWidth, pageHeight } = options;

  const wrapper = document.createElement("div");
  wrapper.style.cssText = `
    position: fixed;
    top: -99999px;
    left: -99999px;
    width: ${pageWidth}px;
    z-index: -1;
  `;
  document.body.appendChild(wrapper);

  const pageEl = document.createElement("div");
  pageEl.style.cssText = `
    width: ${pageWidth}px;
    min-height: ${pageHeight}px;
    background: #ffffff;
    overflow: hidden;
    position: relative;
  `;

  const contentEl = document.getElementById("menu-preview-content");
  if (contentEl) {
    const clone = contentEl.cloneNode(true) as HTMLElement;
    clone.style.minHeight = "auto";
    pageEl.appendChild(clone);
  }

  wrapper.appendChild(pageEl);
  await new Promise((r) => requestAnimationFrame(r));
  await new Promise((r) => requestAnimationFrame(r));

  const canvas = await html2canvas(pageEl, {
    useCORS: true,
    allowTaint: true,
    scale: 2,
    backgroundColor: "#ffffff",
    width: pageWidth,
    height: pageHeight,
    logging: false,
  });

  document.body.removeChild(wrapper);
  return canvas;
}

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

function downloadDataURL(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportCurrentPageAsPng(element: HTMLElement, filename = "menu.png") {
  const clone = element.cloneNode(true) as HTMLElement;
  const wrapper = document.createElement("div");
  wrapper.style.cssText = `
    position: fixed;
    top: -99999px;
    left: -99999px;
    width: ${element.scrollWidth}px;
    background: transparent;
    z-index: -1;
  `;
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  await new Promise((r) => requestAnimationFrame(r));
  await new Promise((r) => requestAnimationFrame(r));

  const canvas = await html2canvas(clone, {
    useCORS: true,
    allowTaint: true,
    scale: 2,
    backgroundColor: null,
    width: element.scrollWidth,
    height: clone.scrollHeight,
    logging: false,
  });

  document.body.removeChild(wrapper);
  downloadDataURL(canvas.toDataURL("image/png"), filename);
}

export async function exportAsPngZip(options: ExportOptions, filename = "menu-pages.zip") {
  const pages = computeMenuPages(options.items, options.layout, {
    showCategoryNames: options.showCategoryNames,
  });

  if (pages.length === 0) return;

  if (pages.length === 1) {
    const canvas = await renderPageToCanvas(pages[0], options);
    downloadDataURL(canvas.toDataURL("image/png"), filename.replace(/\.zip$/, ".png"));
    return;
  }

  const zip = new JSZip();
  for (let i = 0; i < pages.length; i++) {
    const canvas = await renderPageToCanvas(pages[i], options);
    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b!), "image/png")
    );
    zip.file(`page-${String(i + 1).padStart(2, "0")}.png`, blob);
  }
  const zipBlob = await zip.generateAsync({ type: "blob" });
  downloadBlob(zipBlob, filename);
}

export async function exportCurrentPageAsPdf(element: HTMLElement, filename = "menu.pdf") {
  const clone = element.cloneNode(true) as HTMLElement;
  const wrapper = document.createElement("div");
  wrapper.style.cssText = `
    position: fixed;
    top: -99999px;
    left: -99999px;
    width: ${element.scrollWidth}px;
    background: transparent;
    z-index: -1;
  `;
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  await new Promise((r) => requestAnimationFrame(r));
  await new Promise((r) => requestAnimationFrame(r));

  const canvas = await html2canvas(clone, {
    useCORS: true,
    allowTaint: true,
    scale: 2,
    backgroundColor: null,
    width: element.scrollWidth,
    height: clone.scrollHeight,
    logging: false,
  });

  document.body.removeChild(wrapper);

  const imgData = canvas.toDataURL("image/png");
  const pxW = canvas.width / 2;
  const pxH = canvas.height / 2;

  const pdf = new jsPDF({
    orientation: pxW > pxH ? "landscape" : "portrait",
    unit: "px",
    format: [pxW, pxH],
    hotfixes: ["px_scaling"],
  });
  pdf.addImage(imgData, "PNG", 0, 0, pxW, pxH);
  pdf.save(filename);
}

export async function exportAsPdf(options: ExportOptions, filename = "menu.pdf") {
  const pages = computeMenuPages(options.items, options.layout, {
    showCategoryNames: options.showCategoryNames,
  });

  if (pages.length === 0) return;

  const { pageWidth: pxW, pageHeight: pxH } = options;

  const pdf = new jsPDF({
    orientation: pxW > pxH ? "landscape" : "portrait",
    unit: "px",
    format: [pxW, pxH],
    hotfixes: ["px_scaling"],
  });

  for (let i = 0; i < pages.length; i++) {
    if (i > 0) pdf.addPage([pxW, pxH]);
    const canvas = await renderPageToCanvas(pages[i], options);
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, pxW, pxH);
  }

  pdf.save(filename);
}

export function exportCurrentPageAsHtml(element: HTMLElement, filename = "menu.html") {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Menu</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #ffffff; }
  </style>
</head>
<body>${element.outerHTML}</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  downloadBlob(blob, filename);
}

export function exportAsHtml(options: ExportOptions, filename = "menu.html") {
  const pages = computeMenuPages(options.items, options.layout, {
    showCategoryNames: options.showCategoryNames,
  });

  if (pages.length === 0) return;

  const pageSections = pages
    .map(
      (_, i) => `
    <section class="menu-page" style="break-after: page; page-break-after: always;">
      <!-- Page ${i + 1} content -->
    </section>`
    )
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Menu</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #ffffff; }
    @media print {
      .menu-page { break-after: page; page-break-after: always; }
      .menu-page:last-child { break-after: auto; page-break-after: auto; }
    }
  </style>
</head>
<body>
  ${pageSections}
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  downloadBlob(blob, filename);
}
