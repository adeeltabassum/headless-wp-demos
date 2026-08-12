import { NextRequest, NextResponse } from "next/server";
import type { ZodTypeAny } from "zod";
import {
  SectionSchemas,
  buildSectionPrompt,
  fallbackArticlesPayload,
  fallbackPagePayload,
  type SectionContext,
  type SectionKey,
} from "@/lib/builder/sections";
import { friendlyGeminiQuotaError, parseGeminiRetrySeconds } from "@/lib/builder/geminiErrors";
import { generateStructured, isLlmConfigured } from "@/lib/builder/llm";
import { mockSection } from "@/lib/builder/mock";

const SECTION_KEYS = Object.keys(SectionSchemas) as SectionKey[];

interface GenerateSectionBody {
  section?: unknown;
  context?: unknown;
}

/**
 * One-click "draft this section" generation — also what powers the
 * per-field/per-card Regenerate button in the builder UI (same endpoint,
 * called again with the same section+context).
 */
export async function POST(req: NextRequest) {
  let body: GenerateSectionBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const section = body.section as SectionKey;
  if (!section || !SECTION_KEYS.includes(section)) {
    return NextResponse.json(
      { error: `section must be one of: ${SECTION_KEYS.join(", ")}` },
      { status: 400 }
    );
  }

  const context = (body.context && typeof body.context === "object" ? body.context : {}) as SectionContext;
  if (!context.siteName || typeof context.siteName !== "string") {
    return NextResponse.json({ error: "context.siteName is required." }, { status: 400 });
  }

  const schema: ZodTypeAny = SectionSchemas[section];

  if (!isLlmConfigured()) {
    return NextResponse.json({ data: mockSection(section, context), mock: true });
  }

  try {
    const prompt = buildSectionPrompt(section, context);
    const data = await generateStructured({
      system:
        "You are a copywriting assistant for a website-building wizard. Always respond with ONLY the requested JSON matching the schema. No markdown fences, no prose.",
      messages: [{ role: "user", content: prompt }],
      schema,
    });
    return NextResponse.json({ data });
  } catch (err) {
    console.error("[api/builder/generate-section]", err);

    // After generateStructured's built-in retry, fall back to a minimal valid payload
    // for structured sections so the UI never receives invalid layout-breaking data.
    if (section === "articles") {
      return NextResponse.json({ data: fallbackArticlesPayload(context), fallback: true });
    }
    if (section === "page") {
      return NextResponse.json({ data: fallbackPagePayload(context), fallback: true });
    }

    const raw = err instanceof Error ? err.message : "Section generation failed.";
    const friendly = friendlyGeminiQuotaError(raw, "text");
    const retryAfter = parseGeminiRetrySeconds(raw);
    const status = raw.includes("429") || raw.includes("RESOURCE_EXHAUSTED") ? 429 : 502;
    return NextResponse.json({ error: friendly, retryAfter }, { status });
  }
}
