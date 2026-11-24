import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import { toolCategories } from "@/data/tools";
import { allGuides } from "@/data/allGuides";
import { ArrowUpRight, Layers, BookOpen, ShieldCheck } from "lucide-react";

const info = [
  ["About", "/about"],
  ["Contact", "/contact"],
  ["FAQ", "/faq"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms of Service", "/terms-of-service"],
  ["Cookie Policy", "/cookie-policy"],
  ["Disclaimer", "/disclaimer"],
  ["Advertising Disclosure", "/advertising-disclosure"],
  ["Accessibility", "/accessibility"],
];

const SitemapPage = () => (
  <SEOPage
    title="Sitemap - uTools.online"
    description="Every free tool, guide and information page on uTools.online in one list, grouped by category so you can find what you need."
    canonical="https://utoolss.online/sitemap"
  >
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <section className="relative pt-28 pb-8 sm:pt-36 sm:pb-10 px-4 sm:px-6 border-b border-slate-200/70 bg-white/60 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-studio-grid [mask-image:radial-gradient(ellipse_80%_75%_at_50%_10%,#000_45%,transparent_100%)] pointer-events-none"
        />
        <div className="max-w-5xl mx-auto relative z-10 space-y-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary block">
            Platform Index
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-950">
            Sitemap
          </h1>
          <p className="font-sans font-medium text-sm sm:text-base text-slate-600 max-w-2xl">
            Complete directory of every interactive browser utility, technical guide, and policy document on uTools.online.
          </p>
        </div>
      </section>

      <main className="flex-1 px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200/80 text-primary flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="font-display font-bold text-2xl text-slate-950">Tools</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {toolCategories.map((c) => (
                <div
                  key={c.name}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-studio space-y-3"
                >
                  <h3 className="font-display font-bold text-lg text-slate-950 border-b border-slate-100 pb-2">
                    {c.name}
                  </h3>
                  <ul className="space-y-2">
                    {c.tools.map((t) => (
                      <li key={t.to}>
                        <Link
                          className="font-sans font-medium text-sm text-slate-700 hover:text-primary flex items-center justify-between group transition-colors"
                          to={t.to}
                        >
                          <span>{t.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </span>
              <h2 className="font-display font-bold text-2xl text-slate-950">Guides</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {allGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    className="font-sans font-medium text-sm text-slate-700 hover:text-primary flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 hover:bg-rose-50/40 border border-slate-200/60 transition-colors"
                    to={`/guides/${g.slug}`}
                  >
                    <span className="truncate pr-2">{g.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h2 className="font-display font-bold text-2xl text-slate-950">About the site</h2>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {info.map(([label, to]) => (
                <li key={to}>
                  <Link
                    className="font-sans font-medium text-sm text-slate-700 hover:text-primary flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100 border border-slate-200/60 transition-colors"
                    to={to}
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  </SEOPage>
);

export default SitemapPage;
