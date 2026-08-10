"use client";

import { createContext, useContext, type ReactNode } from "react";

export interface PreviewNavigationValue {
  enabled: true;
  siteBase: string;
  pathname: string;
  navigate: (href: string) => void;
}

const PreviewNavigationContext = createContext<PreviewNavigationValue | null>(null);

export function PreviewNavigationProvider({
  value,
  children,
}: {
  value: PreviewNavigationValue;
  children: ReactNode;
}) {
  return <PreviewNavigationContext.Provider value={value}>{children}</PreviewNavigationContext.Provider>;
}

export function usePreviewNavigation(): PreviewNavigationValue | null {
  return useContext(PreviewNavigationContext);
}
