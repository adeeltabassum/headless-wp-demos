import { NextRequest, NextResponse } from "next/server";
import { ChatResponseSchema, type BuilderDraft } from "@/lib/builder/schema";
import { generateStructured, isLlmConfigured, type LlmMessage } from "@/lib/builder/llm";
import { mockChatTurn } from "@/lib/builder/mock";

const SYSTEM_PROMPT = `You are the assistant inside a non-technical website-building wizard for the "niche-template" blog theme. A user describes their site idea in plain language; your job is to extract structured fields into a JSON "patch" and hold a natural conversation, asking about ONE missing field at a time.

Patch fields you may set (all optional, omit anything you are not confident about):
- slug: kebab-case URL slug, only when setting siteName for the first time
- siteName: string
- niche: short description of what the site is about
- tone: writing tone/voice, e.g. "friendly and expert"
- description: one-sentence SEO description
- theme: { primary, onPrimary, text, muted, border, background, surface, ink, onInk, fontBody, fontHeading, radiusSm, radiusMd, radiusLg, containerWidth } — CSS color hex strings / font-family strings / px sizes. Only set colors the user actually asked for.
- hero: { title, subtitle, button, background }
- categories: [{ label, slug?, description?, background? }] — 2 to 6 main topics the site covers
- articles: [{ title, excerpt?, category, content?: string[] }] — category must match one of the categories' labels
- sidebar: { about, legal, tags: string[] }
- footer: { newsletterText, copyright }
- pages: { about, faq, privacy, terms, contactIntro } — each a short paragraph string

Rules:
- Never fabricate a slug except when deriving it from a brand-new siteName.
- Keep "reply" conversational and short (1-3 sentences).
- If required fields (siteName, niche, categories, tone) are still missing, ask about exactly one of them next and list all still-missing ones in "missingFields".
- Output ONLY JSON matching: { "reply": string, "missingFields"?: string[], "patch"?: { ...fields above } }. No markdown, no prose outside the JSON.`;

interface ChatRequestBody {
  message?: unknown;
  draft?: unknown;
  history?: unknown;
}

export async function POST(req: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "message is required." }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: "message is too long (max 4000 characters)." }, { status: 400 });
  }

  const draft = body.draft && typeof body.draft === "object" ? (body.draft as Record<string, unknown>) : {};

  const history: LlmMessage[] = Array.isArray(body.history)
    ? (body.history as unknown[])
        .filter(
          (m): m is LlmMessage =>
            !!m &&
            typeof m === "object" &&
            ((m as LlmMessage).role === "user" || (m as LlmMessage).role === "assistant") &&
            typeof (m as LlmMessage).content === "string"
        )
        .slice(-12)
    : [];

  if (!isLlmConfigured()) {
    return NextResponse.json({ ...mockChatTurn(message, draft as Partial<BuilderDraft>), mock: true });
  }

  try {
    const result = await generateStructured({
      system: `${SYSTEM_PROMPT}\n\nCurrent draft so far (JSON): ${JSON.stringify(draft)}`,
      messages: [...history, { role: "user", content: message }],
      schema: ChatResponseSchema,
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[api/builder/chat]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Chat generation failed." },
      { status: 502 }
    );
  }
}
