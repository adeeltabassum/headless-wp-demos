"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LocalContent } from "@/lib/local/content";
import { localSampleContent } from "@/lib/local/sample-content";

const LocalContentContext = createContext<LocalContent>(localSampleContent);

export function LocalContentProvider({
  content,
  children,
}: {
  content: LocalContent;
  children: ReactNode;
}) {
  return <LocalContentContext.Provider value={content}>{children}</LocalContentContext.Provider>;
}

export function useLocalContent(): LocalContent {
  return useContext(LocalContentContext);
}
