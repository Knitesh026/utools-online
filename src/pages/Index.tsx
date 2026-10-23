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
import { ArrowRight, Clock } from "lucide-react";
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

const guideTints = ["bg-yellow", "bg-pink", "bg-lime"];

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

          {/* Guides */}
          <section className="py-10 sm:py-14">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
                <div>
                  <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tighter leading-none">
                    Guides and how-tos
                  </h2>
                  <p className="font-sans font-bold text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
                    Step-by-step explanations, compression benchmarks, and utility workflows.
                  </p>
                </div>
                <Link to="/guides" className="btn-white text-sm px-5 py-2">
                  All guides <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {guidesData.slice(0, 3).map((guide, i) => (
                  <Link
                    key={guide.slug}
                    to={`/guides/${guide.slug}`}
                    className={`card-ink ${guideTints[i % guideTints.length]} p-5 sm:p-6 flex flex-col justify-between gap-6 group`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-extrabold text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-foreground text-background">
                          {guide.category}
                        </span>
                        <span className="flex items-center gap-1 font-sans font-extrabold text-xs">
                          <Clock className="w-3.5 h-3.5" />
                          {guide.readTime}
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-xl leading-tight line-clamp-3">
                        {guide.title}
                      </h3>
                      <p className="font-sans font-bold text-sm leading-relaxed line-clamp-3">
                        {guide.excerpt}
                      </p>
                    </div>
                    <span className="flex items-center gap-2 font-display font-extrabold text-sm">
                      Read guide
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-10 sm:py-14">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tighter leading-none text-center mb-8">
                Quick answers
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={f.q}
                    value={`item-${i}`}
                    className="bg-white border-2 border-border rounded-3xl px-5 data-[state=open]:bg-accent"
                  >
                    <AccordionTrigger className="font-display font-extrabold text-base sm:text-lg text-left hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans font-bold text-sm sm:text-base text-muted-foreground leading-relaxed">
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
