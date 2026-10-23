import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import AdUnit from "@/components/AdUnit";
import { allGuides } from "@/data/allGuides";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";

const SITE = "https://utoolss.online";

const GuideDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = allGuides.find((g) => g.slug === slug);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const { content } = guide;
  const related = allGuides.filter((g) => g.slug !== guide.slug && g.category === guide.category).concat(
    allGuides.filter((g) => g.slug !== guide.slug && g.category !== guide.category)
  ).slice(0, 3);
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

        <section className="pt-28 sm:pt-32 pb-6 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Link to="/guides" className="btn-white text-sm px-4 py-1.5 mb-5 inline-flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>All guides</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-sm font-sans font-bold text-muted-foreground mb-3">
              <span className="font-display font-extrabold text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-yellow text-foreground border-2 border-border">
                {guide.category}
              </span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{guide.readTime}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{guide.publishedAt}</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tighter leading-[1.02]">
              {guide.title}
            </h1>
            <p className="font-sans font-bold text-lg text-muted-foreground mt-3 leading-relaxed">{guide.excerpt}</p>
            <p className="font-sans font-bold text-sm text-muted-foreground mt-3">
              By the <Link to="/about" className="underline text-secondary">uTools.online editorial team</Link>
            </p>
          </div>
        </section>

        <main className="px-4 sm:px-6 pb-12 flex-1">
          <article className="max-w-3xl mx-auto space-y-8">
            <p className="font-sans font-semibold text-lg leading-relaxed text-foreground/90">{content.introduction}</p>

            {content.sections.map((section, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight pt-2">{section.heading}</h2>
                {section.body.map((para, i) => (
                  <p key={i} className="font-sans font-semibold text-base leading-relaxed text-foreground/85">{para}</p>
                ))}
                {section.codeOrFormula && (
                  <pre className="bg-white border-2 border-border rounded-3xl p-4 overflow-x-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {section.codeOrFormula}
                  </pre>
                )}
                {section.callout && (
                  <p className="bg-accent border-2 border-border rounded-3xl p-4 font-sans font-bold text-base leading-relaxed">
                    {section.callout}
                  </p>
                )}
                {idx + 1 === midpoint && <AdUnit placement="inline" />}
              </section>
            ))}

            <section className="bg-white border-2 border-border rounded-[2rem] p-6 space-y-2">
              <h2 className="font-display font-extrabold text-2xl">Summary</h2>
              <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">{content.summary}</p>
            </section>

            <section className="bg-yellow border-2 border-border rounded-[2rem] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-extrabold text-xl">Try it yourself</h2>
                <p className="font-sans font-bold text-sm mt-1">Put this guide to work with {guide.relatedTool.name}.</p>
              </div>
              <Link to={guide.relatedTool.path} className="btn-blue px-6 py-3 text-sm shrink-0">
                Open tool <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">Frequently asked questions</h2>
              {content.faq.map((f, i) => (
                <details key={i} className="group bg-white border-2 border-border rounded-3xl px-5 py-3 open:bg-accent" open={i === 0}>
                  <summary className="cursor-pointer list-none font-display font-extrabold text-base flex justify-between gap-3">
                    <span>{f.q}</span>
                    <span aria-hidden className="text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85 pt-2">{f.a}</p>
                </details>
              ))}
            </section>

            {related.length > 0 && (
              <section className="space-y-3">
                <h2 className="font-display font-extrabold text-2xl">Keep reading</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {related.map((g) => (
                    <Link key={g.slug} to={`/guides/${g.slug}`} className="card-ink bg-white p-4 flex flex-col gap-2">
                      <span className="font-sans font-extrabold text-xs uppercase tracking-wide text-muted-foreground">{g.category}</span>
                      <span className="font-display font-extrabold text-base leading-snug">{g.title}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          <script type="application/ld+json" data-faq-schema="true" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
          <script type="application/ld+json" data-faq-schema="true" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </main>

        <Footer />
      </div>
    </SEOPage>
  );
};

export default GuideDetail;
