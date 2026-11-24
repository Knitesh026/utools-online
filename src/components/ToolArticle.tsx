import { Link } from "react-router-dom";
import type { ToolContent } from "@/data/toolContent";
import { BookOpen, Cpu, CheckCircle2, AlertTriangle, HelpCircle, Lightbulb } from "lucide-react";

/**
 * Original, tool-specific written content shown with every tool.
 * All text stays in the DOM (native <details> for FAQs) so it is visible to crawlers
 * and to the AdSense review bot without running any interaction.
 */
export const ToolArticle = ({ content }: { content: ToolContent }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const h2 = "font-display font-bold text-xl sm:text-2xl tracking-tight text-slate-950";
  const p = "font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600";

  return (
    <article className="space-y-8 pt-4" aria-label={`About ${content.name}`}>
      {/* Overview & How It Works */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-studio space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200/80 text-primary flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </span>
            <h2 className={h2}>About {content.name}</h2>
          </div>
          {content.intro.map((t, i) => (
            <p key={i} className={p}>
              {t}
            </p>
          ))}
        </section>

        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-studio space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </span>
            <h2 className={h2}>How {content.name} works</h2>
          </div>
          {content.howItWorks.map((t, i) => (
            <p key={i} className={p}>
              {t}
            </p>
          ))}
        </section>
      </div>

      {/* Step-by-Step Instructions */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-studio space-y-4">
        <h2 className={h2}>How to use {content.name}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {content.steps.map((s, i) => (
            <li
              key={i}
              className="flex gap-3.5 p-4 rounded-xl bg-slate-50/80 border border-slate-200/70"
            >
              <span
                className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5"
                aria-hidden
              >
                0{i + 1}
              </span>
              <span className="font-sans font-medium text-sm leading-relaxed text-slate-700">
                {s}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Worked Example */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-hard-lg space-y-2.5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-rose-400 font-semibold">
          Practical Walkthrough
        </span>
        <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white">
          Worked example: {content.example.title}
        </h2>
        <p className="font-sans font-normal text-sm sm:text-base leading-relaxed text-slate-300">
          {content.example.text}
        </p>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className={h2}>When this tool helps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.useCases.map((u) => (
            <div
              key={u.title}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-hard-sm space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">
                  {u.title}
                </h3>
              </div>
              <p className="font-sans font-medium text-xs sm:text-sm leading-relaxed text-slate-600">
                {u.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips & Limitations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <section className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-studio space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h2 className={h2}>Tips for better results</h2>
          </div>
          <ul className="space-y-2.5 list-disc pl-5 marker:text-primary">
            {content.tips.map((t, i) => (
              <li key={i} className="font-sans font-medium text-sm leading-relaxed text-slate-600">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:col-span-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-2.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <h2 className="font-display font-bold text-lg sm:text-xl text-amber-950">
              What it cannot do
            </h2>
          </div>
          <p className="font-sans font-medium text-sm leading-relaxed text-amber-900/85">
            {content.limitations}
          </p>
        </section>
      </div>

      {/* FAQs */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className={h2}>Frequently asked questions</h2>
        </div>
        <div className="space-y-2.5">
          {content.faqs.map((f, i) => (
            <details
              key={i}
              className="group bg-white border border-slate-200/90 rounded-2xl px-5 py-3.5 shadow-hard-sm open:border-primary/30 open:shadow-studio transition-all"
              open={i === 0}
            >
              <summary className="cursor-pointer list-none font-display font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-3">
                <span>{f.question}</span>
                <span
                  aria-hidden
                  className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm leading-none group-open:rotate-45 group-open:bg-slate-900 group-open:text-white transition-all"
                >
                  +
                </span>
              </summary>
              <p className="font-sans font-medium text-sm leading-relaxed text-slate-600 pt-2.5">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <p className="font-sans font-medium text-xs text-slate-500 border-t border-slate-200/70 pt-4">
        Written and reviewed by the uTools.online editorial team, October 2026. See our{" "}
        <Link to="/about" className="text-secondary font-semibold underline underline-offset-2">
          editorial approach
        </Link>{" "}
        or{" "}
        <Link to="/contact" className="text-secondary font-semibold underline underline-offset-2">
          report a mistake
        </Link>
        .
      </p>

      <script
        type="application/ld+json"
        data-faq-schema="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </article>
  );
};

export default ToolArticle;
