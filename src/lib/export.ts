import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

/**
 * Clones the element, removes overflow/height constraints, renders it fully,
 * then captures as canvas. This is the key fix: html2canvas cannot capture
 * content that is overflow:hidden or inside a scroll container.
 */
async function captureElement(element: HTMLElement): Promise<HTMLCanvasElement> {
  // Create a temporary off-screen clone at natural height
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

  // Let the DOM paint
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
  return canvas;
}

export async function exportAsPng(element: HTMLElement, filename = "menu.png") {
  const canvas = await captureElement(element);
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportAsPdf(element: HTMLElement, filename = "menu.pdf") {
  const canvas = await captureElement(element);
  const imgData = canvas.toDataURL("image/png");

  // canvas dimensions are at scale:2 so divide by 2 for real px
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

export function exportAsHtml(element: HTMLElement, filename = "menu.html") {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Menu</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0d0d14; }
  </style>
</head>
<body>${element.outerHTML}</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  const link = document.createElement("a");
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
