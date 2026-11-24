import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import AdUnit from "@/components/AdUnit";
import { allGuides } from "@/data/allGuides";
import { ArrowLeft, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";

const SITE = "https://utoolss.online";

const GuideDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = allGuides.find((g) => g.slug === slug);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const { content } = guide;
  const related = allGuides
    .filter((g) => g.slug !== guide.slug && g.category === guide.category)
    .concat(allGuides.filter((g) => g.slug !== guide.slug && g.category !== guide.category))
    .slice(0, 3);
  const midpoint = Math.ceil(content.sections.length / 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: "2026-10-01",
    dateModified: "2026-10-23",
    author: { "@type": "Organization", name: "uTools.online editorial team", url: `${SITE}/about` },
    publisher: { "@type": "Organization", name: "uTools.online", url: SITE },
    mainEntityOfPage: `${SITE}/guides/${guide.slug}`,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SEOPage
      title={guide.title.length > 60 ? guide.title : `${guide.title} | uTools.online`}
      description={guide.excerpt}
      canonical={`${SITE}/guides/${guide.slug}`}
      keywords={`${guide.title}, ${guide.category}, how to guide, online tutorial`}
      breadcrumbs={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: guide.title, url: `${SITE}/guides/${guide.slug}` },
      ]}
    >
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        <section className="relative pt-24 sm:pt-28 pb-8 px-4 sm:px-6 border-b border-slate-200/70 bg-white/60 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-studio-grid [mask-image:radial-gradient(ellipse_80%_75%_at_50%_10%,#000_45%,transparent_100%)] pointer-events-none"
          />
          <div className="max-w-3xl mx-auto relative z-10">
            <Link
              to="/guides"
              className="btn-white text-xs sm:text-sm px-3.5 py-1.5 mb-5 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All guides</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-medium text-slate-500 mb-3.5">
              <span className="font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
                {guide.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {guide.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {guide.publishedAt}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-950 leading-[1.05]">
              {guide.title}
            </h1>
            <p className="font-sans font-medium text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed">
              {guide.excerpt}
            </p>
            <p className="font-sans font-medium text-xs sm:text-sm text-slate-500 mt-3">
              By the{" "}
              <Link to="/about" className="underline font-semibold text-secondary">
                uTools.online editorial team
              </Link>
            </p>
          </div>
        </section>

        <main className="px-4 sm:px-6 py-10 sm:py-12 flex-1">
          <article className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio">
              <p className="font-sans font-medium text-base sm:text-lg leading-relaxed text-slate-700">
                {content.introduction}
              </p>
            </div>

            {content.sections.map((section, idx) => (
              <section
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-3.5"
              >
                <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-slate-950">
                  {section.heading}
                </h2>
                {section.body.map((para, i) => (
                  <p key={i} className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
                    {para}
                  </p>
                ))}
                {section.codeOrFormula && (
                  <pre className="bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {section.codeOrFormula}
                  </pre>
                )}
                {section.callout && (
                  <p className="bg-amber-50/80 border border-amber-200/80 text-amber-950 rounded-xl p-4 font-sans font-medium text-sm sm:text-base leading-relaxed">
                    {section.callout}
                  </p>
                )}
                {idx + 1 === midpoint && <AdUnit placement="inline" />}
              </section>
            ))}

            <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-studio space-y-2">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950">Summary</h2>
              <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
                {content.summary}
              </p>
            </section>

            {/* Interactive Tool Callout */}
            <section className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-hard-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-rose-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Interactive Utility
                </span>
                <h2 className="font-display font-bold text-xl sm:text-2xl">Try it yourself</h2>
                <p className="font-sans font-normal text-xs sm:text-sm text-slate-300">
                  Put this guide to work with {guide.relatedTool.name}.
                </p>
              </div>
              <Link
                to={guide.relatedTool.path}
                className="btn-primary px-6 py-3 text-xs sm:text-sm shrink-0"
              >
                <span>Open tool</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-slate-950">
                Frequently asked questions
              </h2>
              {content.faq.map((f, i) => (
                <details
                  key={i}
                  className="group bg-white border border-slate-200/90 rounded-2xl px-5 py-3.5 shadow-hard-sm open:border-primary/30 open:shadow-studio transition-all"
                  open={i === 0}
                >
                  <summary className="cursor-pointer list-none font-display font-bold text-sm sm:text-base text-slate-900 flex justify-between gap-3">
                    <span>{f.q}</span>
                    <span
                      aria-hidden
                      className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm leading-none group-open:rotate-45 group-open:bg-slate-900 group-open:text-white transition-all"
                    >
                      +
                    </span>
                  </summary>
                  <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600 pt-2.5">
                    {f.a}
                  </p>
                </details>
              ))}
            </section>

            {related.length > 0 && (
              <section className="space-y-3.5 pt-4 border-t border-slate-200/80">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950">
                  Keep reading
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {related.map((g) => (
                    <Link
                      key={g.slug}
                      to={`/guides/${g.slug}`}
                      className="card-ink bg-white p-4 sm:p-5 flex flex-col gap-2 group"
                    >
                      <span className="font-mono font-semibold text-[10px] uppercase tracking-wider text-primary">
                        {g.category}
                      </span>
                      <span className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors leading-snug">
                        {g.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          <script
            type="application/ld+json"
            data-faq-schema="true"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
          <script
            type="application/ld+json"
            data-faq-schema="true"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </main>

        <Footer />
      </div>
    </SEOPage>
  );
};

export default GuideDetail;
