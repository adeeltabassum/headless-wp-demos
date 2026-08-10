import { createHmac, timingSafeEqual } from "crypto";

/**
 * Shared-password access gate for /studio. Deliberately the simplest thing
 * that works — a single env var, no user accounts — but isolated behind
 * this module so swapping in real per-user auth later only touches this
 * file plus src/app/studio/layout.tsx, per the plan's future-proofing seam.
 */

export const SESSION_COOKIE = "builder_session";

export function isAccessGateConfigured(): boolean {
  return !!process.env.BUILDER_ACCESS_PASSWORD;
}

function sign(password: string): string {
  return createHmac("sha256", password).update("niche-template-builder-access").digest("hex");
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.BUILDER_ACCESS_PASSWORD;
  if (!expected) return true;
  return candidate === expected;
}

export function issueSessionToken(): string {
  return sign(process.env.BUILDER_ACCESS_PASSWORD || "");
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!isAccessGateConfigured()) return true;
  if (!token) return false;
  const expected = issueSessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
