import type { Metadata } from "next";
import "@/styles/scai/gallery.css";

export const metadata: Metadata = {
  title: "Templates | SCAI",
  description: "Browse production-ready Next.js templates for fast site development.",
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
