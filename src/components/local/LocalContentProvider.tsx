"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { localContent } from "@/lib/local/content";

export type LocalContent = typeof localContent;

const LocalContentContext = createContext<LocalContent>(localContent);

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
