import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@/styles/niche-template/niche-template.css";
import "@/styles/scai/tokens.css";
import "@/styles/scai/components.css";
import "@/styles/scai/studio.css";
import { isAccessGateConfigured, verifySessionToken, SESSION_COOKIE } from "@/lib/builder/auth";
import { LoginGate } from "@/components/studio/LoginGate";

export const metadata: Metadata = {
  title: "SCAI Studio — Site Builder",
  description: "Describe your site, let AI draft it, and publish.",
};
export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  if (isAccessGateConfigured()) {
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    if (!verifySessionToken(token)) {
      return <LoginGate />;
    }
  }
  return children;
}
