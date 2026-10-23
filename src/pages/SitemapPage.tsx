import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import { toolCategories } from "@/data/tools";
import { allGuides } from "@/data/allGuides";

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
      <main className="flex-1 px-4 sm:px-6 pt-28 sm:pt-32 pb-14">
        <div className="max-w-5xl mx-auto space-y-10">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tighter">Sitemap</h1>

          <section className="space-y-6">
            <h2 className="font-display font-extrabold text-2xl">Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolCategories.map((c) => (
                <div key={c.name} className="space-y-2">
                  <h3 className="font-display font-extrabold text-lg">{c.name}</h3>
                  <ul className="space-y-1">
                    {c.tools.map((t) => (
                      <li key={t.to}><Link className="font-sans font-bold text-secondary underline" to={t.to}>{t.title}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-2xl">Guides</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {allGuides.map((g) => (
                <li key={g.slug}><Link className="font-sans font-bold text-secondary underline" to={`/guides/${g.slug}`}>{g.title}</Link></li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-2xl">About the site</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1">
              {info.map(([label, to]) => (
                <li key={to}><Link className="font-sans font-bold text-secondary underline" to={to}>{label}</Link></li>
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
