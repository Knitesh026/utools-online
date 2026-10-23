// Builds public/sitemap.xml from the routes registered in src/App.tsx and the guide slugs.
// Aliases (/privacy, /terms, /qr-code-generator) are skipped so each page is listed once.
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://utoolss.online";
const app = readFileSync("src/App.tsx", "utf8");
const skip = new Set(["/privacy", "/terms", "/qr-code-generator", "/category/:category"]);
const routes = [...new Set([...app.matchAll(/path="(\/[^"*:]*)"/g)].map((m) => m[1]))].filter((r) => !skip.has(r));

const slugs = ["src/data/guides.ts", "src/data/guidesMore.ts"].flatMap((f) =>
  [...readFileSync(f, "utf8").matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => `/guides/${m[1]}`)
);

const today = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === "/" ? "1.0" : r === "/tools" || r === "/guides" ? "0.9" : r.startsWith("/guides/") ? "0.7" : ["/about", "/contact", "/faq", "/privacy-policy", "/terms-of-service", "/cookie-policy", "/disclaimer", "/advertising-disclosure", "/accessibility", "/sitemap"].includes(r) ? "0.4" : "0.8");

const urls = [...routes, ...slugs]
  .map((r) => `  <url>\n    <loc>${SITE}${r === "/" ? "/" : r}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(r)}</priority>\n  </url>`)
  .join("\n");

writeFileSync("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`sitemap.xml: ${routes.length} pages + ${slugs.length} guides`);
