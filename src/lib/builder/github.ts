/**
 * Minimal GitHub Git Data API client for the publish pipeline. Builds one
 * atomic multi-file commit (blob → tree → commit → branch ref → PR)
 * instead of N sequential per-file Contents API calls, so a publish can
 * never land as a partial/broken commit.
 *
 * Requires GITHUB_TOKEN (repo-scoped PAT or fine-grained token with
 * contents+pull-requests write access) and GITHUB_REPO ("owner/repo").
 */

const API = "https://api.github.com";

export function isGithubConfigured(): boolean {
  return !!process.env.GITHUB_TOKEN && !!process.env.GITHUB_REPO;
}

function repoSlug(): { owner: string; repo: string } {
  const full = process.env.GITHUB_REPO || "";
  const [owner, repo] = full.split("/");
  if (!owner || !repo) throw new Error('GITHUB_REPO must be set as "owner/repo".');
  return { owner, repo };
}

async function gh<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured.");
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${init?.method || "GET"} ${path} -> ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export interface CommitFile {
  path: string;
  content: string;
  /** "utf-8" for text files (content.ts, theme.ts, routes), "base64" for images. */
  encoding: "utf-8" | "base64";
}

export interface CommitAndPrParams {
  branchName: string;
  baseBranch?: string;
  commitMessage: string;
  prTitle: string;
  prBody: string;
  files: CommitFile[];
}

export async function commitFilesAndOpenPr({
  branchName,
  baseBranch = "main",
  commitMessage,
  prTitle,
  prBody,
  files,
}: CommitAndPrParams): Promise<{ prUrl: string; branchName: string }> {
  const { owner, repo } = repoSlug();
  const base = `/repos/${owner}/${repo}`;

  const baseRef = await gh<{ object: { sha: string } }>(`${base}/git/ref/heads/${baseBranch}`);
  const baseCommitSha = baseRef.object.sha;
  const baseCommit = await gh<{ tree: { sha: string } }>(`${base}/git/commits/${baseCommitSha}`);

  const blobs = await Promise.all(
    files.map(async (file) => {
      const blob = await gh<{ sha: string }>(`${base}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({ content: file.content, encoding: file.encoding === "base64" ? "base64" : "utf-8" }),
      });
      return { path: file.path, sha: blob.sha };
    })
  );

  const tree = await gh<{ sha: string }>(`${base}/git/trees`, {
    method: "POST",
    body: JSON.stringify({
      base_tree: baseCommit.tree.sha,
      tree: blobs.map((b) => ({ path: b.path, mode: "100644", type: "blob", sha: b.sha })),
    }),
  });

  const commit = await gh<{ sha: string }>(`${base}/git/commits`, {
    method: "POST",
    body: JSON.stringify({ message: commitMessage, tree: tree.sha, parents: [baseCommitSha] }),
  });

  await gh(`${base}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: commit.sha }),
  });

  const pr = await gh<{ html_url: string }>(`${base}/pulls`, {
    method: "POST",
    body: JSON.stringify({ title: prTitle, head: branchName, base: baseBranch, body: prBody }),
  });

  return { prUrl: pr.html_url, branchName };
}
