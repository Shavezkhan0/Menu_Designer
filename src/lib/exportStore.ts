import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { randomUUID } from "crypto";

/**
 * Single-use handoff for passing a design payload from the export API route
 * to the internal /menu-export render page that Playwright navigates to.
 *
 * This has to be real filesystem state, not a module-scope Map: Next.js
 * compiles route handlers and page components into separate bundles/layers,
 * so an in-memory singleton isn't reliably shared between them — a write in
 * the route handler can land in a different module instance than the one the
 * page reads from. The filesystem is process-wide, so it doesn't hit that.
 *
 * It's still safe behind a load balancer with multiple replicas: Playwright
 * always navigates to 127.0.0.1 from the same container process that wrote
 * the file, so the read always happens on the same box as the write.
 */
const DIR = path.join(os.tmpdir(), "menu-designer-export");
const TTL_MS = 30_000;

async function ensureDir() {
  await fs.mkdir(DIR, { recursive: true });
}

async function cleanupStale() {
  try {
    const files = await fs.readdir(DIR);
    await Promise.all(
      files.map(async (name) => {
        const file = path.join(DIR, name);
        const stat = await fs.stat(file).catch(() => null);
        if (stat && Date.now() - stat.mtimeMs > TTL_MS) {
          await fs.unlink(file).catch(() => {});
        }
      })
    );
  } catch {
    // best effort — directory may not exist yet
  }
}

export async function putExportPayload(payload: unknown): Promise<string> {
  await ensureDir();
  void cleanupStale();
  const id = randomUUID();
  await fs.writeFile(path.join(DIR, `${id}.json`), JSON.stringify(payload), "utf8");
  return id;
}

export async function consumeExportPayload(id: string): Promise<unknown | undefined> {
  const file = path.join(DIR, `${id}.json`);
  try {
    const text = await fs.readFile(file, "utf8");
    fs.unlink(file).catch(() => {});
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
