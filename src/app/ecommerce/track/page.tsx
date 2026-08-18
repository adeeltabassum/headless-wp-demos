import type { Metadata } from "next";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { TrackView } from "@/components/ecommerce/track/TrackView";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";

export const metadata: Metadata = {
  title: ecommerceSampleContent.track.metadata.title,
  description: ecommerceSampleContent.track.metadata.description,
  icons: { icon: ecommerceSampleContent.favicon },
};

export default function EcommerceTrackPage() {
  return (
    <EcommerceShell content={ecommerceSampleContent} theme={defaultEcommerceTheme}>
      <TrackView />
    </EcommerceShell>
  );
}
