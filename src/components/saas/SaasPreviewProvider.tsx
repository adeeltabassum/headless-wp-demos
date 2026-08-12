"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SaasDraftContent } from "@/lib/builder/deriveSaas";

const SaasPreviewContext = createContext<SaasDraftContent | null>(null);

export function SaasPreviewProvider({ content, children }: { content: SaasDraftContent; children: ReactNode }) {
  return <SaasPreviewContext.Provider value={content}>{children}</SaasPreviewContext.Provider>;
}

export function useSaasPreviewContent(): SaasDraftContent | null {
  return useContext(SaasPreviewContext);
}
