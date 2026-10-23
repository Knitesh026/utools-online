// Crawls every URL in public/sitemap.xml in a real browser and checks the things AdSense reviewers
// and Google's spam policies care about. Usage: node scripts/adsense-audit.mjs [baseUrl]
// Start the site first (npm run dev, or npm run preview after a build).
import { existsSync, readFileSync } from "node:fs";
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] || "http://localhost:8080";
const chrome = [process.env.CHROME_PATH, "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find((p) => p && existsSync(p));
if (!chrome) throw new Error("Set CHROME_PATH to a Chrome/Chromium binary.");

const routes = [...readFileSync("public/sitemap.xml", "utf8").matchAll(/<loc>https:\/\/utoolss\.online([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
const registered = new Set(routes);
const MIN_WORDS = { tool: 700, guide: 900, legal: 250, other: 120 };
const kind = (r) => (r.startsWith("/guides/") ? "guide" : ["/privacy-policy", "/terms-of-service", "/cookie-policy", "/disclaimer", "/advertising-disclosure", "/accessibility"].includes(r) ? "legal" : ["/", "/tools", "/guides", "/about", "/contact", "/faq", "/sitemap"].includes(r) ? "other" : "tool");

const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ["--no-sandbox"] });
const rows = [];
const titles = new Map();
const descs = new Map();
const sentences = new Map();

for (const route of routes) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));
  await page.setRequestInterception(true);
  page.on("request", (r) => (/googlesyndication|doubleclick|fonts\.g/.test(r.url()) ? r.abort() : r.continue()));
  const resp = await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 45000 }).catch(() => null);
  await page.waitForSelector("h1", { timeout: 8000 }).catch(() => {});
  const d = await page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    const text = main.innerText || "";
    const links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => h && h.startsWith("/") && !h.startsWith("//"));
    const imgsNoAlt = [...document.images].filter((i) => !i.hasAttribute("alt")).length;
    return {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content || "",
      canonical: document.querySelector('link[rel="canonical"]')?.href || "",
      robots: document.querySelector('meta[name="robots"]')?.content || "",
      h1: document.querySelectorAll("h1").length,
      h2: document.querySelectorAll("h2").length,
      words: text.split(/\s+/).filter(Boolean).length,
      links,
      imgsNoAlt,
      emptyAdBoxes: [...document.querySelectorAll("ins.adsbygoogle")].length,
      html: document.documentElement.outerHTML,
      sents: text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.split(" ").length >= 9),
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
    };
  });
  const issues = [];
  const k = kind(route);
  if (!resp || resp.status() !== 200) issues.push(`HTTP ${resp?.status()}`);
  if (d.h1 !== 1) issues.push(`h1 count ${d.h1}`);
  if (d.words < MIN_WORDS[k]) issues.push(`thin: ${d.words} words (< ${MIN_WORDS[k]})`);
  if (!d.title || d.title.length < 15 || d.title.length > 100) issues.push(`title length ${d.title.length}`);
  if (!d.desc || d.desc.length < 70 || d.desc.length > 170) issues.push(`description length ${d.desc.length}`);
  if (/noindex/i.test(d.robots)) issues.push("noindex");
  if (!d.canonical.endsWith(route === "/" ? "/" : route)) issues.push(`canonical mismatch: ${d.canonical}`);
  if (d.imgsNoAlt) issues.push(`${d.imgsNoAlt} img without alt`);
  if (d.overflow) issues.push("horizontal overflow");
  if (errors.length) issues.push(`js errors: ${errors[0]}`);
  if (/adsterra|popunder|highperformanceformat|profitablecpm/i.test(d.html)) issues.push("Adsterra remnants");
  const broken = [...new Set(d.links.map((l) => l.split(/[?#]/)[0].replace(/\/$/, "") || "/"))].filter((l) => !registered.has(l) && !["/privacy", "/terms", "/qr-code-generator"].includes(l) && !/\.(png|ico|webp|xml|txt)$/.test(l));
  if (broken.length) issues.push(`links to unregistered routes: ${broken.slice(0, 4).join(", ")}`);
  titles.set(d.title, [...(titles.get(d.title) || []), route]);
  descs.set(d.desc, [...(descs.get(d.desc) || []), route]);
  if (k === "tool" || k === "guide") d.sents.forEach((s) => sentences.set(s, [...(sentences.get(s) || []), route]));
  rows.push({ route, kind: k, words: d.words, issues });
  await page.close();
}
await browser.close();

for (const [t, rs] of titles) if (rs.length > 1) rows.find((r) => r.route === rs[1]).issues.push(`duplicate title with ${rs[0]}`);
for (const [t, rs] of descs) if (rs.length > 1 && t) rows.find((r) => r.route === rs[1]).issues.push(`duplicate description with ${rs[0]}`);
const shared = [...sentences].filter(([, rs]) => new Set(rs).size > 1);
if (shared.length) console.log(`\nSentences repeated across pages: ${shared.length}`, shared.slice(0, 5).map(([s, rs]) => `\n  "${s.slice(0, 90)}..." -> ${[...new Set(rs)].slice(0, 3).join(", ")}`).join(""));

const bad = rows.filter((r) => r.issues.length);
console.log(`\nChecked ${rows.length} pages. Word counts: min ${Math.min(...rows.map((r) => r.words))}, median ${rows.map((r) => r.words).sort((a, b) => a - b)[Math.floor(rows.length / 2)]}.`);
if (!bad.length) console.log("No issues found.");
for (const r of bad) console.log(`- ${r.route} (${r.kind}, ${r.words} words): ${r.issues.join("; ")}`);
process.exit(bad.length ? 1 : 0);
