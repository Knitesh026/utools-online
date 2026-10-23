// Saves a fully rendered copy of every public page into dist/ so crawlers, including the
// AdSense review bot, see real text without executing JavaScript.
// Needs Chrome or Chromium locally (set CHROME_PATH if it is not found). Skips quietly otherwise.
import { createServer } from "node:http";
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import puppeteer from "puppeteer-core";

const DIST = process.env.DIST_DIR || "dist";
const PORT = 4173;
const isCI = Boolean(process.env.VERCEL || process.env.NETLIFY || process.env.CI);
if (process.argv.includes("--if-ci") && !isCI && !process.env.PRERENDER) {
  console.log("prerender: skipped (not a CI build; run `npm run build:prerender` to force).");
  process.exit(0);
}

// Prefer a local Chrome; on build servers without one, use the bundled Chromium.
let chrome = process.env.FORCE_BUNDLED_CHROMIUM ? undefined : [process.env.CHROME_PATH, "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => p && existsSync(p));
let launchArgs = ["--no-sandbox"];
if (!chrome) {
  try {
    const { default: chromium } = await import("@sparticuz/chromium");
    chrome = await chromium.executablePath();
    launchArgs = chromium.args;
  } catch (e) {
    console.warn("prerender: no Chrome available, skipping. The site still works; pages just are not pre-rendered.", String(e).slice(0, 120));
    process.exit(0);
  }
}

const sitemap = readFileSync("public/sitemap.xml", "utf8");
const routes = [...sitemap.matchAll(/<loc>https:\/\/utoolss\.online([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".ico": "image/x-icon", ".svg": "image/svg+xml", ".webp": "image/webp", ".json": "application/json", ".webmanifest": "application/manifest+json", ".txt": "text/plain", ".xml": "application/xml" };

const index = readFileSync(join(DIST, "index.html"));
const server = createServer((req, res) => {
  const path = decodeURIComponent(req.url.split("?")[0]);
  const file = join(DIST, path);
  if (path !== "/" && existsSync(file) && extname(file)) {
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
    return res.end(readFileSync(file));
  }
  res.writeHead(200, { "content-type": "text/html" });
  res.end(index);
}).listen(PORT);

try {
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: launchArgs });
let done = 0;
for (const route of routes) {
  const page = await browser.newPage();
  // Keep third-party ad scripts out of the saved HTML.
  await page.setRequestInterception(true);
  page.on("request", (r) => (/googlesyndication|doubleclick|googleadservices/.test(r.url()) ? r.abort() : r.continue()));
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0", timeout: 45000 });
  await page.waitForSelector("h1", { timeout: 15000 }).catch(() => {});
  let html = await page.content();
  html = html.replace(/<script[^>]*pagead2\.googlesyndication[^>]*><\/script>/g, '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1294105144279821" crossorigin="anonymous"></script>');
  const out = route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");
  mkdirSync(join(out, ".."), { recursive: true });
  writeFileSync(out, "<!doctype html>" + html.replace(/^<!DOCTYPE html>/i, ""));
  await page.close();
  done++;
}
await browser.close();
console.log(`prerender: saved ${done} pages`);
} catch (e) {
  console.warn("prerender failed, deploying the normal build instead:", String(e).slice(0, 200));
}
server.close();
