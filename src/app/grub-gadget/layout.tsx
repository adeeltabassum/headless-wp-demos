import type { Metadata } from "next";
import "@/styles/grub-gadget/grub-gadget.css";

export const metadata: Metadata = {
  title: "Grub Gadget - Kitchen Appliance Reviews & Guides",
  description: "Expert reviews and guides for toaster ovens, microwaves, and kitchen appliances",
  icons: { icon: "/grub-gadget/images/favicon.png" },
};

export default function GrubGadgetLayout({ children }: { children: React.ReactNode }) {
  return <div className="gg-page">{children}</div>;
}
