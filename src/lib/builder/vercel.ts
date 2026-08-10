/**
 * Best-effort Vercel deployment status lookup for a given git branch, so
 * the Studio UI can show "Deploying…" -> "Live at https://...". Requires
 * VERCEL_TOKEN + VERCEL_PROJECT_ID (VERCEL_TEAM_ID optional, for team
 * scoped projects). Not required for publish to work — a PR's Vercel
 * preview link is also always visible directly on the PR itself.
 */

export function isVercelConfigured(): boolean {
  return !!process.env.VERCEL_TOKEN && !!process.env.VERCEL_PROJECT_ID;
}

export interface VercelDeploymentStatus {
  state: "not_configured" | "queued" | "building" | "ready" | "error" | "not_found";
  url?: string;
}

export async function getDeploymentForBranch(branch: string): Promise<VercelDeploymentStatus> {
  if (!isVercelConfigured()) return { state: "not_configured" };

  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  const params = new URLSearchParams({ projectId: projectId!, "meta-githubCommitRef": branch, limit: "1" });
  if (teamId) params.set("teamId", teamId);

  const res = await fetch(`https://api.vercel.com/v6/deployments?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Vercel API error ${res.status}: ${await res.text()}`);

  const data = await res.json();
  const deployment = data?.deployments?.[0];
  if (!deployment) return { state: "not_found" };

  const stateMap: Record<string, VercelDeploymentStatus["state"]> = {
    QUEUED: "queued",
    BUILDING: "building",
    INITIALIZING: "building",
    READY: "ready",
    ERROR: "error",
    CANCELED: "error",
  };

  return {
    state: stateMap[deployment.readyState] || "queued",
    url: deployment.url ? `https://${deployment.url}` : undefined,
  };
}
