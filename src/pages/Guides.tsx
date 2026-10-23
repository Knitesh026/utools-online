import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import { allGuides as guidesData } from "@/data/allGuides";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Clock } from "lucide-react";
import AdUnit from "@/components/AdUnit";
import StickerBadge from "@/components/StickerBadge";

const Guides = () => {
  return (
    <SEOPage
      title="Practical Guides & Educational Tutorials - uTools.online"
      description="Read free step-by-step guides on calculating percentages, compound interest, PDF compression, image optimization, and web utilities."
      canonical="https://utoolss.online/guides"
      keywords="percentage calculation guide, compound interest guide, PDF compression tutorial, UUID guide, QR code guide"
    >
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        {/* Directory Hero Header - Compact & Clean */}
        <section className="relative pt-28 pb-8 sm:pt-32 sm:pb-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <StickerBadge color="white" rotation={-3}>
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                Educational Resources · {guidesData.length} Guides
              </StickerBadge>
            </div>
            
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight leading-tight">
              Practical Guides & How-Tos
            </h1>
            
            <p className="font-sans font-bold text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Step-by-step mathematical explanations, compression benchmarks, and utility workflows designed to help you get the most out of your tools.
            </p>
          </div>
        </section>


        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 flex-1 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {guidesData.map((guide) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className="card-ink p-5 sm:p-6 rounded-2xl bg-white flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary text-white border border-border shadow-hard-sm">
                      {guide.category}
                    </span>
                    <div className="flex items-center gap-1 font-sans font-bold text-[11px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{guide.readTime}</span>
                    </div>
                  </div>

                  <h2 className="font-display font-extrabold text-base sm:text-lg text-foreground group-hover:text-blue transition-colors line-clamp-2 leading-snug">
                    {guide.title}
                  </h2>

                  <p className="font-sans font-medium text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t-2 border-border/20 flex items-center justify-between font-sans font-extrabold text-xs text-blue">
                  <span>Read Full Guide</span>
                  <div className="w-6 h-6 rounded-lg bg-background border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-foreground transition-all">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <div className="py-6 px-4 flex justify-center bg-white/40 border-t-2 border-border/20">
          <AdUnit placement="inline" />
        </div>

        <Footer />
      </div>
    </SEOPage>
  );
};

export default Guides;
