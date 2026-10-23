import { Link } from "react-router-dom";
import type { ToolContent } from "@/data/toolContent";

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

  const h2 = "font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-foreground";
  const p = "font-sans font-semibold text-base leading-relaxed text-foreground/85";

  return (
    <article className="space-y-10 sm:space-y-12" aria-label={`About ${content.name}`}>
      <section className="space-y-3">
        <h2 className={h2}>About {content.name}</h2>
        {content.intro.map((t, i) => (
          <p key={i} className={p}>{t}</p>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className={h2}>How {content.name} works</h2>
        {content.howItWorks.map((t, i) => (
          <p key={i} className={p}>{t}</p>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className={h2}>How to use {content.name}</h2>
        <ol className="space-y-3">
          {content.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="coin w-8 h-8 bg-yellow font-display font-black text-sm" aria-hidden>{i + 1}</span>
              <span className={`${p} pt-0.5`}>{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white border-2 border-border rounded-[2rem] p-5 sm:p-7 space-y-2">
        <h2 className={h2}>Worked example: {content.example.title}</h2>
        <p className={p}>{content.example.text}</p>
      </section>

      <section className="space-y-4">
        <h2 className={h2}>When this tool helps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {content.useCases.map((u) => (
            <div key={u.title} className="bg-white border-2 border-border rounded-3xl p-5 space-y-1.5">
              <h3 className="font-display font-extrabold text-lg text-foreground">{u.title}</h3>
              <p className="font-sans font-semibold text-sm leading-relaxed text-foreground/80">{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className={h2}>Tips for better results</h2>
        <ul className="space-y-2.5 list-disc pl-5 marker:text-primary">
          {content.tips.map((t, i) => (
            <li key={i} className={p}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="bg-accent border-2 border-border rounded-[2rem] p-5 sm:p-7 space-y-2">
        <h2 className={h2}>What it cannot do</h2>
        <p className={p}>{content.limitations}</p>
      </section>

      <section className="space-y-4">
        <h2 className={h2}>Frequently asked questions</h2>
        <div className="space-y-2.5">
          {content.faqs.map((f, i) => (
            <details key={i} className="group bg-white border-2 border-border rounded-3xl px-5 py-3 open:bg-accent" open={i === 0}>
              <summary className="cursor-pointer list-none font-display font-extrabold text-base sm:text-lg text-foreground flex items-center justify-between gap-3">
                <span>{f.question}</span>
                <span aria-hidden className="text-xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className={`${p} pt-2`}>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="font-sans font-bold text-sm text-muted-foreground">
        Written and reviewed by the uTools.online editorial team, October 2026. See our{" "}
        <Link to="/about" className="text-secondary underline">editorial approach</Link> or{" "}
        <Link to="/contact" className="text-secondary underline">report a mistake</Link>.
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
