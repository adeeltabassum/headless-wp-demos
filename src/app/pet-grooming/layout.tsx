import type { Metadata } from "next";
import "@/styles/niche-template/niche-template.css";
import { PetGroomingContent as content } from "@/lib/sites/pet-grooming/content";

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
