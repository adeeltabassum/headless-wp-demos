"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SaasContent } from "@/lib/saas/content";
import { saasSampleContent } from "@/lib/saas/content";

const SaasContentContext = createContext<SaasContent>(saasSampleContent);

export function SaasPreviewProvider({
  content,
  children,
}: {
  content: SaasContent;
  children: ReactNode;
}) {
  return <SaasContentContext.Provider value={content}>{children}</SaasContentContext.Provider>;
}

/** Alias used by Studio / published sites. */
export function SaasContentProvider({
  content,
  children,
}: {
  content: SaasContent;
  children: ReactNode;
}) {
  return <SaasPreviewProvider content={content}>{children}</SaasPreviewProvider>;
}

export function useSaasContent(): SaasContent {
  return useContext(SaasContentContext);
}

/** @deprecated Use useSaasContent — never null (falls back to sample). */
export function useSaasPreviewContent(): SaasContent {
  return useSaasContent();
}
