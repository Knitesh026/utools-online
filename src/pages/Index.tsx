import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MetricsBar } from "@/components/MetricsBar";
import { BrowseCategories } from "@/components/BrowseCategories";
import { PopularToolsSection } from "@/components/PopularToolsSection";
import { ReviewsAndWhySection } from "@/components/ReviewsAndWhySection";
import AdUnit from "@/components/AdUnit";
import SEOPage from "@/components/SEOPage";
import { websiteSchema } from "@/lib/seoHelpers";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { allGuides as guidesData } from "@/data/allGuides";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Are my files ever uploaded to any servers?",
    a: "No. All tools on uTools execute client-side in your web browser using HTML5 Canvas, WebAssembly, and local JavaScript engines. Your documents, photos, and media never leave your device.",
  },
  {
    q: "Is uTools really 100% free with no hidden charges?",
    a: "Yes. All tools are completely free. There are no paid subscriptions, credit card forms, watermarks, or artificial export delays. We sustain the platform exclusively through clean, non-intrusive banner advertisements.",
  },
  {
    q: "Do I need to create an account or sign in?",
    a: "No account registration is required. You can bookmark any tool and use it immediately without entering personal details, email addresses, or passwords.",
  },
  {
    q: "Does uTools work on mobile devices and tablets?",
    a: "Yes. Every page and tool is fully responsive and touch-optimized, functioning smoothly on smartphones, iPads, Android tablets, laptops, and desktop computers.",
  },
];

const guideBadges = [
  "bg-rose-50 text-rose-700 border-rose-200/80",
  "bg-indigo-50 text-indigo-700 border-indigo-200/80",
  "bg-emerald-50 text-emerald-700 border-emerald-200/80",
];

const Index = () => {
  return (
    <SEOPage
      title="uTools.online - Free Online Tools for PDF, Images, Text and Calculators"
      description="Free online tools and guides for PDF, image, text and calculator tasks. Files are processed in your browser, with no sign-up and clear explanations of how each tool works."
      canonical="https://utoolss.online/"
      keywords="free online tools, PDF tools, image tools, calculators, EMI calculator, QR code generator, online converter"
      schema={websiteSchema}
    >
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        <main className="flex-1">
          <Hero />

          <BrowseCategories />

          {/* In-content ad */}
          <div className="py-4 px-4 flex justify-center">
            <AdUnit placement="inline" />
          </div>

          <PopularToolsSection />
          <MetricsBar />
          <ReviewsAndWhySection />

          {/* Guides Section */}
          <section className="py-12 sm:py-16 border-t border-slate-200/70 bg-white/50">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary block mb-1.5">
                    Deep-Dive Documentation
                  </span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950 leading-none">
                    Guides and how-tos
                  </h2>
                  <p className="font-sans font-medium text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
                    Step-by-step explanations, compression benchmarks, and utility workflows.
                  </p>
                </div>
                <Link to="/guides" className="btn-white text-xs sm:text-sm px-5 py-2.5">
                  <BookOpen className="w-4 h-4 mr-1.5 text-primary" />
                  <span>All guides</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {guidesData.slice(0, 3).map((guide, i) => (
                  <Link
                    key={guide.slug}
                    to={`/guides/${guide.slug}`}
                    className="card-ink spotlight-card bg-white p-6 flex flex-col justify-between gap-6 group"
                  >
                    <div className="space-y-3.5 relative z-10">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono font-semibold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                            guideBadges[i % guideBadges.length]
                          }`}
                        >
                          {guide.category}
                        </span>
                        <span className="flex items-center gap-1 font-mono font-medium text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          {guide.readTime}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl leading-snug text-slate-950 group-hover:text-primary transition-colors line-clamp-2">
                        {guide.title}
                      </h3>
                      <p className="font-sans font-medium text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {guide.excerpt}
                      </p>
                    </div>
                    <span className="relative z-10 flex items-center gap-1.5 font-display font-bold text-xs sm:text-sm text-slate-900 group-hover:text-primary transition-colors pt-2 border-t border-slate-100">
                      <span>Read guide</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
              <div className="text-center mb-8">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary block mb-1.5">
                  Platform FAQ
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950 leading-none">
                  Quick answers
                </h2>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={f.q}
                    value={`item-${i}`}
                    className="bg-white border border-slate-200/90 rounded-2xl px-5 shadow-hard-sm data-[state=open]:border-primary/30 data-[state=open]:shadow-studio transition-all"
                  >
                    <AccordionTrigger className="font-display font-bold text-base sm:text-lg text-slate-900 text-left hover:no-underline py-4">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans font-medium text-sm sm:text-base text-slate-600 leading-relaxed pb-4">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Bottom native ad */}
          <div className="py-6 px-4 flex justify-center">
            <AdUnit placement="inline" />
          </div>
        </main>

        <Footer />
      </div>
    </SEOPage>
  );
};

export default Index;
