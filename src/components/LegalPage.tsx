import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";

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
      <section className="pt-28 pb-6 sm:pt-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tighter">{title}</h1>
          <p className="font-sans font-bold text-sm text-muted-foreground">Last updated: {updated}</p>
          <p className="font-sans font-semibold text-lg leading-relaxed text-foreground/85">{intro}</p>
        </div>
      </section>

      <main className="flex-1 px-4 sm:px-6 pb-14">
        <div className="max-w-3xl mx-auto space-y-8">
          {sections.map((s) => (
            <section key={s.heading} className="space-y-3">
              <h2 className="font-display font-extrabold text-2xl tracking-tight">{s.heading}</h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="font-sans font-semibold text-base leading-relaxed text-foreground/85">{p}</p>
              ))}
              {s.bullets && (
                <ul className="list-disc pl-5 space-y-1.5 marker:text-primary">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="font-sans font-semibold text-base leading-relaxed text-foreground/85">{b}</li>
                  ))}
                </ul>
              )}
              {s.links && (
                <ul className="space-y-1">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="font-sans font-bold text-base text-secondary underline break-words">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="font-sans font-bold text-sm text-muted-foreground border-t-2 border-border/20 pt-4">
            Questions about this page? <Link to="/contact" className="underline text-secondary">Contact us</Link> or see our{" "}
            <Link to="/privacy-policy" className="underline text-secondary">Privacy Policy</Link>,{" "}
            <Link to="/cookie-policy" className="underline text-secondary">Cookie Policy</Link> and{" "}
            <Link to="/advertising-disclosure" className="underline text-secondary">Advertising Disclosure</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  </SEOPage>
);

export default LegalPage;
