import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";
import { getCanvasPixelSize } from "@/hooks/useMenuDesigner";
import { putExportPayload } from "@/lib/exportStore";
import { isMenuExportPayload } from "@/lib/exportPayload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { format?: string; payload?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { format, payload } = body;
  if (format !== "pdf" && format !== "png") {
    return NextResponse.json({ error: "format must be 'pdf' or 'png'" }, { status: 400 });
  }
  if (!isMenuExportPayload(payload)) {
    return NextResponse.json({ error: "Invalid export payload" }, { status: 400 });
  }

  const { width: pxW, height: pxH } = getCanvasPixelSize(payload.canvasSize);

  // Hand the payload to the render page via a single-use in-process token
  // rather than a query-string blob, then navigate over the container's own
  // loopback interface. That keeps this correct behind a load balancer with
  // multiple replicas — the whole request lifecycle stays on this one box —
  // and avoids URL-length limits when a background image is a large data URI.
  const id = await putExportPayload(payload);
  const port = req.nextUrl.port || process.env.PORT || "3000";
  const renderUrl = `http://127.0.0.1:${port}/menu-export?id=${id}`;

  const browser = await chromium.launch({
    // Required for headless Chromium inside most containers (no sandbox
    // namespace support) and to avoid /dev/shm crashes with the small
    // shared-memory default most container runtimes ship with.
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage({ viewport: { width: pxW, height: pxH } });
    const response = await page.goto(renderUrl, { waitUntil: "networkidle", timeout: 30_000 });
    if (!response || !response.ok()) {
      throw new Error(`Render page returned ${response?.status() ?? "no response"}`);
    }
    await page.evaluate(() => document.fonts.ready);

    if (format === "pdf") {
      const pdf = await page.pdf({
        width: `${pxW}px`,
        height: `${pxH}px`,
        printBackground: true,
        margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
      });
      return new NextResponse(new Uint8Array(pdf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="menu.pdf"',
        },
      });
    }

    const png = await page.locator("#menu-preview-content").screenshot({ type: "png" });
    return new NextResponse(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="menu.png"',
      },
    });
  } catch (err) {
    console.error("Export render failed:", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  } finally {
    await browser.close();
  }
}
