import type { ReactNode } from "react";
import { saasThemeToCssVars, type SaasTheme } from "@/lib/saas/theme";

/** Injects Elementor/global theme CSS vars for a SaaS page tree. */
export function SaasRoot({ theme, children }: { theme: SaasTheme; children: ReactNode }) {
  return (
    <div className="saas-page elementor-kit-8" style={saasThemeToCssVars(theme)}>
      {children}
    </div>
  );
}
