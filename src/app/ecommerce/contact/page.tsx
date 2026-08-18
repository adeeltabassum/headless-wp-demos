import type { Metadata } from "next";
import { EcommerceShell } from "@/components/ecommerce/EcommerceShell";
import { ContactView } from "@/components/ecommerce/contact/ContactView";
import { ecommerceSampleContent } from "@/lib/ecommerce/sample-content";
import { defaultEcommerceTheme } from "@/lib/ecommerce/theme";

export const metadata: Metadata = {
  title: ecommerceSampleContent.contact.metadata.title,
  description: ecommerceSampleContent.contact.metadata.description,
  icons: { icon: ecommerceSampleContent.favicon },
};

export default function EcommerceContactPage() {
  return (
    <EcommerceShell content={ecommerceSampleContent} theme={defaultEcommerceTheme}>
      <ContactView />
    </EcommerceShell>
  );
}
