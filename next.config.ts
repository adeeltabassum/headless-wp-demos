import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  // The builder's "edit a published site" flow reads each site's
  // content.json sidecar via fs at request time — make sure Vercel's
  // serverless file tracing bundles those alongside the API route that
  // isn't otherwise statically importing them.
  outputFileTracingIncludes: {
    "/api/builder/sites/[slug]": ["./src/lib/sites/**/content.json"],
  },
  async redirects() {
    return [
      { source: "/demos", destination: "/templates", permanent: true },
      { source: "/demos/:path*", destination: "/templates/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
