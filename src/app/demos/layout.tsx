import type { Metadata } from "next";
import "@/styles/scai/gallery.css";

export const metadata: Metadata = {
  title: "Project Demos | Headless WP",
  description: "Browse all recreated website demos in one place.",
};

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
