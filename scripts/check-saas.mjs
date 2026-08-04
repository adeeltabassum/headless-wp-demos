import http from "node:http";

function get(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, data }));
      })
      .on("error", reject);
  });
}

const page = await get("http://localhost:3000/saas");
const links = [...page.data.matchAll(/href="(\/saas\/css\/[^"]+)"/g)].map((m) => m[1]);
console.log("page status:", page.status);
console.log("css links:", links.length);

const sample = [
  "/saas/css/elementor-frontend.css",
  "/saas/css/post-4837.css",
  "/saas/css/post-430.css",
];
for (const path of sample) {
  const r = await get(`http://localhost:3000${path}`);
  const hasDisplay = r.data.includes("display:var(--display)") || r.data.includes("display: var(--display)");
  console.log(path, "status", r.status, "bytes", r.data.length, "hasDisplayVar", hasDisplay);
}
