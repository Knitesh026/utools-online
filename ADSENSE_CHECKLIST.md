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
6. **Deploy with prerendering** so crawlers get real text without JavaScript: `npm run build:prerender` on a machine with Chrome,
   then deploy `dist/`. Netlify's default build image has no Chrome, so use `netlify deploy --prod --dir=dist` or run it in CI with Chrome installed.
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
