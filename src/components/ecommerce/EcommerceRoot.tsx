import type { ReactNode } from "react";
import { ecommerceThemeToCssVars, type EcommerceTheme } from "@/lib/ecommerce/theme";

/** Wraps ecommerce pages and injects theme as --ec-* CSS vars. */
export function EcommerceRoot({
  theme,
  children,
}: {
  theme: EcommerceTheme;
  children: ReactNode;
}) {
  return (
    <div className="ec-page" style={ecommerceThemeToCssVars(theme)}>
      {children}
    </div>
  );
}
