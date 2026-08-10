import type { ReactNode } from "react";
import { nicheThemeToCssVars, type NicheTheme } from "@/lib/niche-template/theme";

/**
 * Wraps a whole niche-blog page tree, injecting that site's theme as CSS
 * custom properties. This is the only place a site's colors/fonts get
 * applied — every skeleton component below just reads `var(--nt-*)`.
 */
export function NicheTemplateRoot({
  theme,
  children,
}: {
  theme: NicheTheme;
  children: ReactNode;
}) {
  return (
    <div className="nt-page" style={nicheThemeToCssVars(theme)}>
      {children}
    </div>
  );
}
