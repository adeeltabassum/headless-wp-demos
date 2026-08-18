import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/gallery/screenshots");
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { id: "niche-template", url: "http://localhost:3000/niche-template" },
  { id: "local", url: "http://localhost:3000/local" },
  { id: "saas", url: "http://localhost:3000/saas" },
  { id: "ecommerce", url: "http://localhost:3000/ecommerce" },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

for (const pageInfo of pages) {
  const page = await context.newPage();
  console.log("Capturing", pageInfo.id);
  await page.goto(pageInfo.url, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(1500);
  const file = path.join(outDir, `${pageInfo.id}.png`);
  await page.screenshot({ path: file, type: "png" });
  console.log("OK", file, fs.statSync(file).size);
  await page.close();
}

await browser.close();
console.log("DONE");
