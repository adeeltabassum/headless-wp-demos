"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { EcommerceContent } from "@/lib/ecommerce/content";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";

const EcommerceContentContext = createContext<EcommerceContent>(ecommerceSampleContent);

export function EcommerceContentProvider({
  content,
  children,
}: {
  content: EcommerceContent;
  children: ReactNode;
}) {
  return (
    <EcommerceContentContext.Provider value={content}>{children}</EcommerceContentContext.Provider>
  );
}

export function useEcommerceContent(): EcommerceContent {
  return useContext(EcommerceContentContext);
}
