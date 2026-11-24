import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import { ShieldCheck, Calendar, ChevronRight } from "lucide-react";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: { label: string; href: string }[];
}

interface LegalPageProps {
  title: string;
  description: string;
  path: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const SITE = "https://utoolss.online";

/** Shared layout for policy pages: plain, readable, fully server-visible text. */
export const LegalPage = ({ title, description, path, updated, intro, sections }: LegalPageProps) => (
  <SEOPage
    title={`${title} - uTools.online`}
    description={description}
    canonical={`${SITE}${path}`}
    breadcrumbs={[
      { name: "Home", url: SITE },
      { name: title, url: `${SITE}${path}` },
    ]}
  >
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <section className="relative pt-24 pb-8 sm:pt-28 sm:pb-10 px-4 sm:px-6 border-b border-slate-200/70 bg-white/60 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-studio-grid [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_40%,transparent_100%)] pointer-events-none"
        />
        <div className="max-w-3xl mx-auto relative z-10 space-y-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 font-sans font-semibold text-xs text-slate-500"
          >
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{title}</span>
          </nav>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-950">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              Last updated: {updated}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Transparent Platform Policy
            </span>
          </div>

          <p className="font-sans font-medium text-base sm:text-lg leading-relaxed text-slate-600 pt-2">
            {intro}
          </p>
        </div>
      </section>

      <main className="flex-1 px-4 sm:px-6 py-10 sm:py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {sections.map((s) => (
            <section
              key={s.heading}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-studio space-y-3"
            >
              <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-slate-950">
                {s.heading}
              </h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {s.links && (
                <ul className="space-y-1.5 pt-1">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans font-semibold text-sm sm:text-base text-secondary underline underline-offset-2 break-words"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p className="font-sans font-medium text-sm text-slate-500 bg-slate-100/80 border border-slate-200/80 rounded-2xl p-5">
            Questions about this page?{" "}
            <Link to="/contact" className="underline font-semibold text-secondary">
              Contact us
            </Link>{" "}
            or see our{" "}
            <Link to="/privacy-policy" className="underline font-semibold text-secondary">
              Privacy Policy
            </Link>
            ,{" "}
            <Link to="/cookie-policy" className="underline font-semibold text-secondary">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link to="/advertising-disclosure" className="underline font-semibold text-secondary">
              Advertising Disclosure
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  </SEOPage>
);

export default LegalPage;
