import { NextRequest, NextResponse } from "next/server";
import { getDeploymentForBranch, isVercelConfigured } from "@/lib/builder/vercel";

/** GET /api/builder/publish/status?branch=builder/my-site-123 — polled by the Studio UI after a real publish. */
export async function GET(req: NextRequest) {
  const branch = req.nextUrl.searchParams.get("branch");
  if (!branch) {
    return NextResponse.json({ error: "branch query param is required." }, { status: 400 });
  }

  if (!isVercelConfigured()) {
    return NextResponse.json({
      state: "not_configured",
      note: "Set VERCEL_TOKEN and VERCEL_PROJECT_ID to poll deploy status here — until then, check the PR's own Vercel preview comment/checks.",
    });
  }

  try {
    const status = await getDeploymentForBranch(branch);
    return NextResponse.json(status);
  } catch (err) {
    console.error("[api/builder/publish/status]", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Status lookup failed." }, { status: 502 });
  }
}
