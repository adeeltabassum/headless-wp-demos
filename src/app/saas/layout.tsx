import type { Metadata } from "next";
import { SaasStyles } from "@/components/saas/SaasStyles";
import "@/styles/saas/saas.css";

export const metadata: Metadata = {
  title: "SAAS Template",
  description: "A modern SAAS landing page template",
};

export default function SaasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SaasStyles />
      <div className="elementor-kit-8">{children}</div>
    </>
  );
}
