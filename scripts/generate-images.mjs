/**
 * Batch image generator using the Gemini API (Nano Banana / gemini-2.5-flash-image).
 *
 * Usage:
 *   node scripts/generate-images.mjs <manifest.json>
 *   node scripts/generate-images.mjs scripts/image-manifests/saas.json
 *
 * Requires GEMINI_API_KEY in the environment (see .env.local).
 * Get a free key at https://aistudio.google.com/apikey
 *
 * Manifest format (array of jobs):
 * [
 *   {
 *     "output": "public/saas/images/hero.png",
 *     "prompt": "A clean SaaS dashboard screenshot, dark UI, charts, minimal",
 *     "aspectRatio": "16:9"   // optional, defaults to "1:1"
 *   }
 * ]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error(
    "Missing GEMINI_API_KEY. Add it to site/.env.local, e.g.\n  GEMINI_API_KEY=your-key-here"
  );
  process.exit(1);
}

const manifestArg = process.argv[2];
if (!manifestArg) {
  console.error("Usage: node scripts/generate-images.mjs <manifest.json>");
  process.exit(1);
}

const manifestPath = path.isAbsolute(manifestArg)
  ? manifestArg
  : path.join(ROOT, manifestArg);

const jobs = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

async function generateImage({ prompt, aspectRatio = "1:1" }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio },
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData?.data);

  if (!imagePart) {
    throw new Error("No image returned by the model. Response: " + JSON.stringify(data));
  }

  return Buffer.from(imagePart.inlineData.data, "base64");
}

async function run() {
  console.log(`Generating ${jobs.length} image(s) with ${MODEL}...\n`);

  for (const job of jobs) {
    const outPath = path.isAbsolute(job.output) ? job.output : path.join(ROOT, job.output);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    console.log(`→ ${job.output}`);
    console.log(`  prompt: ${job.prompt}`);

    try {
      const buffer = await generateImage(job);
      fs.writeFileSync(outPath, buffer);
      console.log(`  saved (${buffer.length} bytes)\n`);
    } catch (err) {
      console.error(`  FAILED: ${err.message}\n`);
    }
  }

  console.log("Done.");
}

run();
