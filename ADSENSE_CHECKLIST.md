# AdSense readiness checklist

Automated checks live in `scripts/adsense-audit.mjs` (run `npm run dev`, then `npm run audit`).
Last result: 70 pages, no issues (every page has one H1, a unique title and description, a canonical URL,
a sensible amount of original text, working internal links, and no Adsterra code).

## Do these yourself before applying (only you can)
1. **Confirm the domain.** The site, sitemap, canonicals and `ads.txt` all use `utoolss.online`, while the brand is "uTools.online".
   AdSense must be approved for the exact domain that serves the pages. If the real domain is `utools.online`,
   search-and-replace `utoolss.online` across `src/`, `public/` and `index.html`, then run `npm run sitemap`.
2. **Make sure `support@utoolss.online` really receives mail.** The Contact, Privacy and Accessibility pages promise replies.
3. **Add who runs the site.** Google and visitors trust a named owner. Add a short "Who is behind uTools.online" paragraph to `src/pages/About.tsx` (name or team, country, a sentence of background). I did not invent one.
4. **Turn on consent for EEA/UK/Switzerland.** In AdSense go to Privacy & messaging, create a GDPR message and publish it. It is free, and required for those visitors.
5. **Create ad units** in AdSense (Ads > By ad unit > Display), then put the slot ids in `.env` / your host's environment:
   `VITE_ADSENSE_SLOT_INLINE` and `VITE_ADSENSE_SLOT_SIDEBAR`. With them blank, no manual ad boxes render and Auto ads still work.
6. **Deploy with prerendering** so crawlers get real text without JavaScript. On Vercel or Netlify `npm run build` now prerenders
   all 70 pages automatically (it uses a bundled Chromium when the build server has no Chrome, and falls back to a normal build if that fails).
   Check the build log for `prerender: saved 70 pages`. Locally, `npm run build:prerender` does the same.
7. **Leave `VITE_STIRLING_PDF_URL` unset in production.** If set, Merge PDF would send files to that server and the privacy copy would be wrong.
8. After deploying, submit `https://<your-domain>/sitemap.xml` in Google Search Console and wait until the guides and several tool pages show as indexed (search `site:<your-domain>`) before you apply.

## What was changed for AdSense
- Adsterra: no code remained except empty stubs, which are deleted. One `AdUnit` component now serves Google ads only, shows nothing until a slot id exists, and is placed at most once or twice per page, never above the content.
- `ads.txt` used the wrong id format (`ca-pub-...`); it now reads `google.com, pub-..., DIRECT, f08c47fec0942fa0`.
- `robots.txt` explicitly allows `Mediapartners-Google`.
- Every tool page now has 800+ words of original, tool-specific explanation (what it is, how it works, steps, worked example, use cases, tips, limits, FAQ) with FAQ structured data.
- 16 long-form guides (1,000+ words each), a working guide article page (it crashed before), an HTML sitemap page and a generated `sitemap.xml`.
- Privacy, Cookie, Advertising Disclosure, Terms, Disclaimer and Accessibility pages rewritten; Google ad-cookie disclosures and opt-out links added.
- Removed unverifiable claims (user counts, files-processed numbers, fake testimonials) and the fake "message sent" contact form.
- Removed tools that did not work (GIF Maker, APNG Maker, PDF Lock/Unlock, Base64 to Image) and links to six tools that never existed.
- Fixed tools that misled users: QR and barcode now generate locally (QR text used to be sent to a third party, and the barcodes would not scan), password and UUID use secure randomness, Compress PDF no longer shows invented savings, PDF to Image/PDF to Word now work, E-sign writes the name and date, BMI imperial units, negative temperatures, Reset crashes on ten pages.

## Search Console findings (read on 23 Oct 2026, property https://utoolss.online/)
- Indexed: 1 page (the home page, last crawled 10 Sep). Not indexed: 37, all "Discovered - currently not indexed", none ever crawled.
  That status means Google knows the URL from the sitemap but has not fetched it yet. It is common for new sites with thin or script-only pages.
- The sitemap Google last read (17 Oct) listed 38 URLs including `/gif-maker`, a tool that was removed. The new sitemap has 70 URLs.
- Live site at the time of checking: new build deployed, but pages were empty JavaScript shells (no H1, no text in the HTML).
- 0 clicks, no Core Web Vitals data yet (too little traffic).

## After the prerendered build is live
1. Search Console > Sitemaps: remove nothing, re-submit `sitemap.xml` so Google re-reads the 70-URL version.
2. URL Inspection > Test live URL > View tested page: confirm the HTML contains the page text, then **Request indexing** for the home page,
   `/tools`, `/guides` and your five best tool pages (about 10 requests per day are allowed).
3. Check Pages > Indexing weekly. New sites often take 2-6 weeks to be fully crawled; keep adding useful guides.
4. Get a few real links to the site (your other projects, social profiles, relevant directories). Pages with no inbound links are crawled last.

## Done in Search Console on 23 Oct 2026
- Re-submitted `sitemap.xml` (accepted).
- Requested indexing for: `/`, `/tools`, `/guides`, `/merge-pdf`, `/compress-pdf`, `/emi-calculator`, `/image-compressor`, `/qr-code`.
- The live site did not yet serve prerendered HTML at that time (every URL returned the same 4 KB shell). Check the Vercel build log for a
  line starting `prerender:`. If it says skipped or failed, run `npm run build:prerender` locally and deploy `dist/`, then use
  URL Inspection > Request indexing again on the same pages (the daily limit resets).
