import React from "react";
import { ShieldCheck, Zap, Heart, BookOpen, CheckCircle2, Layout } from "lucide-react";

export const ReviewsAndWhySection: React.FC = () => {
  const whyCards = [
    {
      title: "We know the code",
      desc: "Every single tool in our catalog runs modern client-side WebAssembly and canvas APIs. We never send your documents to a mystery third-party cloud.",
      icon: ShieldCheck,
      accent: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
      tag: "Client-side Engine",
    },
    {
      title: "Zero upload delays",
      desc: "Instant processing on your local machine. No queueing behind other users, no waiting for gigabytes to upload and re-download.",
      icon: Zap,
      accent: "bg-indigo-50 text-indigo-600 border-indigo-200/80",
      tag: "Instant Execution",
    },
    {
      title: "Free that stays free",
      desc: "Every utility is free with no locked pro features, no watermarks, and no surprise paywalls when you hit download. Ads on the site cover the running costs.",
      icon: Heart,
      accent: "bg-rose-50 text-rose-600 border-rose-200/80",
      tag: "No Paywall",
    },
  ];

  const standards = [
    {
      title: "We explain the method",
      desc: "Each tool page describes how the result is produced, shows a worked example and lists what the tool cannot do, so you can judge whether to trust the output.",
      icon: BookOpen,
      accent: "text-blue-600 bg-blue-50 border-blue-200/70",
    },
    {
      title: "We correct mistakes",
      desc: "If a formula, explanation or result looks wrong, tell us through the contact page. Verified errors are fixed and the page's review date is updated.",
      icon: CheckCircle2,
      accent: "text-amber-600 bg-amber-50 border-amber-200/70",
    },
    {
      title: "Ads stay separate",
      desc: "Advertising is labelled and kept apart from tools and results. We never ask you to click an ad, and no ad is placed over a control.",
      icon: Layout,
      accent: "text-purple-600 bg-purple-50 border-purple-200/70",
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 space-y-16">
        <div>
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary block mb-1.5">
              Zero-Trust Browser Architecture
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950 leading-none">
              Built for your privacy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {whyCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="card-ink spotlight-card p-6 sm:p-7 flex flex-col justify-between gap-6 bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className={`w-11 h-11 rounded-xl border flex items-center justify-center ${card.accent}`}>
                        <Icon className="w-5 h-5" strokeWidth={2.1} />
                      </span>
                      <span className="font-mono font-semibold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                        {card.tag}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl mb-2 tracking-tight text-slate-950">
                      {card.title}
                    </h3>
                    <p className="font-sans font-medium text-sm text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-secondary block mb-1.5">
              Editorial & Engineering Rigor
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950 leading-none">
              How we keep this site useful
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {standards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="card-ink p-6 sm:p-7 flex flex-col gap-3 bg-slate-50/70 hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${item.accent}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight text-slate-950">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-sans font-medium text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsAndWhySection;
