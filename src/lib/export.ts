import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function exportAsPng(element: HTMLElement, filename = "menu.png") {
  const canvas = await html2canvas(element, {
    useCORS: true,
    scale: 2,
    backgroundColor: null,
  } as any);
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function exportAsPdf(element: HTMLElement, filename = "menu.pdf") {
  const canvas = await html2canvas(element, {
    useCORS: true,
    scale: 2,
    backgroundColor: null,
  } as any);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? "landscape" : "portrait",
    unit: "px",
    format: [canvas.width / 2, canvas.height / 2],
  });
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
  pdf.save(filename);
}

export function exportAsHtml(element: HTMLElement, filename = "menu.html") {
  const blob = new Blob(
    [
      `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0;box-sizing:border-box;}</style></head><body>${element.outerHTML}</body></html>`,
    ],
    { type: "text/html" }
  );
  const link = document.createElement("a");
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}
