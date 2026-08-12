"use client";

import type { WorkingDraft } from "@/lib/builder/mergePatch";
import { PreviewPanel } from "./PreviewPanel";
import { LocalPreviewPanel } from "./LocalPreviewPanel";
import { SaasPreviewPanel } from "./SaasPreviewPanel";

export function TemplatePreviewPanel({ draft }: { draft: WorkingDraft }) {
  const templateId = draft.templateId || "niche-template";

  if (templateId === "local") return <LocalPreviewPanel draft={draft} />;
  if (templateId === "saas") return <SaasPreviewPanel draft={draft} />;
  return <PreviewPanel draft={draft} />;
}
