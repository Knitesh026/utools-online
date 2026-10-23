import React from 'react';
import { ShieldCheck, Zap, Heart } from 'lucide-react';

export const ReviewsAndWhySection: React.FC = () => {
  const whyCards = [
    {
      title: "We know the code",
      desc: "Every single tool in our catalog runs modern client-side WebAssembly and canvas APIs. We never send your documents to a mystery third-party cloud.",
      icon: ShieldCheck,
      bg: "bg-yellow",
      tag: "Client-side",
    },
    {
      title: "Zero upload delays",
      desc: "Instant processing on your local machine. No queueing behind other users, no waiting for gigabytes to upload and re-download.",
      icon: Zap,
      bg: "bg-sky",
      tag: "Instant",
    },
    {
      title: "Free that stays free",
      desc: "Every utility is free with no locked pro features, no watermarks, and no surprise paywalls when you hit download. Ads on the site cover the running costs.",
      icon: Heart,
      bg: "bg-pink",
      tag: "No paywall",
    },
  ];

  const standards = [
    {
      title: "We explain the method",
      desc: "Each tool page describes how the result is produced, shows a worked example and lists what the tool cannot do, so you can judge whether to trust the output.",
      bg: "bg-lime",
    },
    {
      title: "We correct mistakes",
      desc: "If a formula, explanation or result looks wrong, tell us through the contact page. Verified errors are fixed and the page's review date is updated.",
      bg: "bg-peach",
    },
    {
      title: "Ads stay separate",
      desc: "Advertising is labelled and kept apart from tools and results. We never ask you to click an ad, and no ad is placed over a control.",
      bg: "bg-lilac",
    },
  ];

  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 space-y-14">
        <div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tighter leading-none mb-6">
            Built for your privacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {whyCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className={`card-ink ${card.bg} p-6 flex flex-col justify-between gap-6`}>
                  <div>
                    <span className="coin w-12 h-12 bg-white mb-4">
                      <Icon className="w-5 h-5" strokeWidth={2.3} />
                    </span>
                    <h3 className="font-display font-extrabold text-2xl mb-2 tracking-tight">{card.title}</h3>
                    <p className="font-sans font-bold text-sm leading-relaxed">{card.desc}</p>
                  </div>
                  <span className="self-start font-display font-extrabold text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-foreground text-background">
                    {card.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tighter leading-none mb-6">
            How we keep this site useful
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {standards.map((item) => (
              <div key={item.title} className={`card-ink ${item.bg} p-6 flex flex-col gap-2`}>
                <h3 className="font-display font-extrabold text-xl tracking-tight">{item.title}</h3>
                <p className="font-sans font-bold text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsAndWhySection;
