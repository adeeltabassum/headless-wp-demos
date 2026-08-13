import type { ReactNode } from "react";
import { localThemeToCssVars, type LocalTheme } from "@/lib/local/theme";

/**
 * Wraps a local-business page tree and injects theme as --fb-* CSS vars.
 * This is the only place a site's colors get applied to the skeleton.
 */
export function LocalRoot({ theme, children }: { theme: LocalTheme; children: ReactNode }) {
  return (
    <div className="fb-page" style={localThemeToCssVars(theme)}>
      {children}
    </div>
  );
}
