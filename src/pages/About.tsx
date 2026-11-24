import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import StickerBadge from "@/components/StickerBadge";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Heart, ArrowRight, Sparkles } from "lucide-react";

const About = () => {
  const highlights = [
    {
      title: "100% In-Browser Privacy",
      desc: "Your files never touch remote cloud servers. All conversions, compression, and mathematical tasks execute directly in your device's memory using WebAssembly and HTML5 Canvas.",
      icon: ShieldCheck,
      accent: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
      badge: "Private",
    },
    {
      title: "Instant Execution",
      desc: "Zero queues or network upload bottlenecks. Experience immediate results powered by client-side browser performance.",
      icon: Zap,
      accent: "bg-indigo-50 text-indigo-600 border-indigo-200/80",
      badge: "Fast",
    },
    {
      title: "Free for Everyone",
      desc: "No mandatory subscriptions, trial periods, or sneaky watermarks. Our mission is to keep high-utility digital tools free and accessible worldwide.",
      icon: Heart,
      accent: "bg-rose-50 text-rose-600 border-rose-200/80",
      badge: "Open",
    },
  ];

  return (
    <SEOPage
      title="About Us - uTools.online Mission & Technology"
      description="Learn about uTools.online, our client-side in-browser privacy architecture, and our mission to provide 100% free digital utilities."
      canonical="https://utoolss.online/about"
    >
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        {/* Hero Header */}
        <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-12 px-4 sm:px-6 text-center border-b border-slate-200/70 bg-white/60 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-studio-grid [mask-image:radial-gradient(ellipse_80%_75%_at_50%_10%,#000_45%,transparent_100%)] pointer-events-none"
          />
          <div className="max-w-3xl mx-auto space-y-3.5 relative z-10">
            <StickerBadge color="red" icon={<Sparkles className="w-3.5 h-3.5" />}>
              About Our Platform
            </StickerBadge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight">
              About uTools.online
            </h1>
            <p className="font-sans font-medium text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              An independent, privacy-first digital utility suite engineered for students, designers, developers, and everyday users.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-4xl flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-studio space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.accent}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-950">{item.title}</h3>
                  <p className="font-sans font-medium text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-slate-950">
              What uTools.online is
            </h2>
            <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
              uTools.online is a collection of free utilities for everyday jobs: merging and compressing PDFs, resizing and converting images, counting words, generating QR codes and passwords, and working out loan, SIP, GST and age calculations. Each tool has its own page with a plain-language explanation of what it does, the method behind the result, a worked example and the limits you should know about before relying on it.
            </p>
            <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
              Alongside the tools we publish step-by-step guides on the same subjects, such as how an EMI is calculated or which image format to choose, so you can understand the answer as well as get it.
            </p>
          </section>

          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-slate-950">
              Why we built it
            </h2>
            <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
              Many file and calculator sites ask for an account, hide the download behind pop-ups, add watermarks, or send your documents to a server you know nothing about. We wanted tools that open instantly, need no sign-up, and keep your files on your own device wherever that is technically possible.
            </p>
          </section>

          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-slate-950">
              How your files are handled
            </h2>
            <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
              The tools run in your browser using the Canvas API, WebAssembly and JavaScript libraries. For these tools the file you choose is processed in your device's memory and is not sent to our servers. Each tool page states how it processes data, and our{" "}
              <Link to="/privacy-policy" className="underline font-semibold text-secondary">
                Privacy Policy
              </Link>{" "}
              explains what limited information the site and its advertising partners do collect.
            </p>
          </section>

          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-slate-950">
              How the site is funded
            </h2>
            <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
              uTools.online is free to use. It is supported by advertising served by Google AdSense. Ads are labelled, kept separate from tools and results, and never required to use a tool. Read the{" "}
              <Link to="/advertising-disclosure" className="underline font-semibold text-secondary">
                Advertising Disclosure
              </Link>{" "}
              for details, including how to manage ad personalisation.
            </p>
          </section>

          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-slate-950">
              Editorial standards and corrections
            </h2>
            <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
              Explanations, formulas and worked examples are written to be checked: calculations are recomputed before publication, and we describe estimates as estimates. Calculators and health, tax or legal topics are general information, not professional advice; see our{" "}
              <Link to="/disclaimer" className="underline font-semibold text-secondary">
                Disclaimer
              </Link>
              .
            </p>
            <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
              If you find an error, a broken tool or an unclear explanation, please{" "}
              <Link to="/contact" className="underline font-semibold text-secondary">
                contact us
              </Link>
              . Confirmed mistakes are corrected as soon as we can.
            </p>
          </section>

          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-slate-950">
              Who maintains uTools.online
            </h2>
            <p className="font-sans font-medium text-sm sm:text-base leading-relaxed text-slate-600">
              uTools.online is created, designed, and maintained by{" "}
              <a
                href="https://prematech.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-secondary"
              >
                Prematech Digital
              </a>{" "}
              (https://prematech.co.in/), an independent software engineering and digital product studio focused on fast, accessible, privacy-respecting web utilities.
            </p>
          </section>

          <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-hard-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-xl text-white">Ready to explore?</h2>
              <p className="font-sans font-normal text-xs sm:text-sm text-slate-300 mt-0.5">
                Browse every tool or start with a guide.
              </p>
            </div>
            <div className="flex gap-2.5">
              <Link to="/tools" className="btn-primary text-xs sm:text-sm px-5 py-2.5">
                <span>All tools</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <Link to="/guides" className="btn-white text-xs sm:text-sm px-5 py-2.5">
                Guides
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SEOPage>
  );
};

export default About;
