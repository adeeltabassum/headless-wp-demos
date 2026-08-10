"use client";

import { useState } from "react";

export function LoginGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/builder/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Incorrect password.");
        return;
      }
      window.location.reload();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="scai scai-studio builder-gate">
      <form className="builder-gate__card" onSubmit={submit}>
        <div className="scai-logo" style={{ marginBottom: 4 }}>
          <span className="scai-logo__mark">S</span>
          <span>
            SCAI <span className="grad-text">Studio</span>
          </span>
        </div>
        <h1>Sign in</h1>
        <p>SEO Content AI site builder — enter the access password to continue.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Access password"
          autoFocus
        />
        {error && <p className="builder-gate__error">{error}</p>}
        <button type="submit" disabled={loading || !password}>
          {loading ? "Checking…" : "Continue"}
        </button>
      </form>
    </div>
  );
}
