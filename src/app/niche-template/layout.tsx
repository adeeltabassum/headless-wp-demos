import type { Metadata } from "next";
import "@/styles/niche-template/niche-template.css";

export const metadata: Metadata = {
  title: "Niche Blog — Master Template",
  description: "Skeleton preview of the reusable niche blog master template.",
};

export default function NicheTemplateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
