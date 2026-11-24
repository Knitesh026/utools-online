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

        {/* Directory Hero Header */}
        <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-12 px-4 sm:px-6 border-b border-slate-200/70 bg-white/60 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-studio-grid [mask-image:radial-gradient(ellipse_80%_75%_at_50%_10%,#000_45%,transparent_100%)] pointer-events-none"
          />
          <div className="max-w-4xl mx-auto text-center space-y-3.5 relative z-10">
            <div className="flex items-center justify-center gap-2">
              <StickerBadge color="red" icon={<BookOpen className="w-3.5 h-3.5" />}>
                Educational Resources · {guidesData.length} Deep-Dive Guides
              </StickerBadge>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-[1.04]">
              Practical Guides & How-Tos
            </h1>

            <p className="font-sans font-medium text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Step-by-step mathematical explanations, compression benchmarks, and utility workflows designed to help you get the most out of your tools.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {guidesData.map((guide) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className="card-ink spotlight-card p-6 rounded-2xl bg-white flex flex-col justify-between group"
              >
                <div className="space-y-3.5 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-semibold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
                      {guide.category}
                    </span>
                    <div className="flex items-center gap-1 font-mono font-medium text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{guide.readTime}</span>
                    </div>
                  </div>

                  <h2 className="font-display font-bold text-lg sm:text-xl text-slate-950 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {guide.title}
                  </h2>

                  <p className="font-sans font-medium text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="relative z-10 pt-4 mt-5 border-t border-slate-100 flex items-center justify-between font-display font-bold text-xs sm:text-sm text-slate-900 group-hover:text-primary transition-colors">
                  <span>Read Full Guide</span>
                  <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <div className="py-6 px-4 flex justify-center">
          <AdUnit placement="inline" />
        </div>

        <Footer />
      </div>
    </SEOPage>
  );
};

export default Guides;
