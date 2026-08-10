import type { ZodType } from "zod";
import { friendlyGeminiQuotaError, parseGeminiRetrySeconds, sleep } from "./geminiErrors";

const TEXT_MODELS = (
  process.env.GEMINI_TEXT_MODELS ||
  process.env.GEMINI_TEXT_MODEL ||
  "gemini-2.5-flash,gemini-2.0-flash,gemini-1.5-flash"
)
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

export function isLlmConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

export interface LlmMessage {
  role: "user" | "assistant";
  content: string;
}

async function callGeminiModel(
  model: string,
  apiKey: string,
  system: string,
  messages: LlmMessage[]
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.5,
      },
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Gemini API error ${res.status}: ${text}`);
  }

  const data = JSON.parse(text);
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const out = parts.map((p: { text?: string }) => p.text ?? "").join("");
  if (!out) throw new Error("Gemini returned an empty response.");
  return out;
}

async function callGemini(system: string, messages: LlmMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("LLM_NOT_CONFIGURED");

  const models = TEXT_MODELS.length ? TEXT_MODELS : ["gemini-2.5-flash"];
  let lastError = "No models configured.";

  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await callGeminiModel(model, apiKey, system, messages);
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        const is429 = lastError.includes("429") || lastError.includes("RESOURCE_EXHAUSTED");
        if (is429 && attempt < 2) {
          const waitMs = (parseGeminiRetrySeconds(lastError) ?? 20) * 1000;
          await sleep(waitMs);
          continue;
        }
        if (!is429 && !lastError.includes("404")) break;
      }
    }
  }

  throw new Error(friendlyGeminiQuotaError(lastError, "text"));
}

function extractJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Model did not return valid JSON.");
  }
}

export async function generateStructured<T>(params: {
  system: string;
  messages: LlmMessage[];
  schema: ZodType<T>;
}): Promise<T> {
  const { system, schema } = params;
  let messages = params.messages;

  for (let attempt = 0; attempt < 2; attempt++) {
    const raw = await callGemini(system, messages);
    const json = extractJson(raw);
    const result = schema.safeParse(json);
    if (result.success) return result.data;

    if (attempt === 0) {
      messages = [
        ...messages,
        { role: "assistant", content: raw },
        {
          role: "user",
          content: `That JSON did not match the required shape: ${result.error.message}. Reply again with corrected JSON only, no prose.`,
        },
      ];
      continue;
    }
    throw new Error(`Model output failed validation: ${result.error.message}`);
  }

  throw new Error("Unreachable");
}
