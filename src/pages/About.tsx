import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import StickerBadge from "@/components/StickerBadge";
import { Link } from "react-router-dom";
import {
  FileText,
  Image,
  Code,
  Zap,
  ShieldCheck,
  Heart,
  ArrowRight,
} from "lucide-react";

const About = () => {
  const highlights = [
    {
      title: "100% In-Browser Privacy",
      desc: "Your files never touch remote cloud servers. All conversions, compression, and mathematical tasks execute directly in your device's memory using WebAssembly and HTML5 Canvas.",
      icon: ShieldCheck,
      color: "bg-blue text-white",
      badge: "Private",
    },
    {
      title: "Instant Execution",
      desc: "Zero queues or network upload bottlenecks. Experience immediate results powered by client-side browser performance.",
      icon: Zap,
      color: "bg-primary text-white",
      badge: "Fast",
    },
    {
      title: "Free for Everyone",
      desc: "No mandatory subscriptions, trial periods, or sneaky watermarks. Our mission is to keep high-utility digital tools free and accessible worldwide.",
      icon: Heart,
      color: "bg-pink text-foreground",
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
        <section className="pt-28 pb-8 sm:pt-32 sm:pb-10 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <StickerBadge color="white" rotation={-2}>
              About Our Platform
            </StickerBadge>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight">
              About uTools.online
            </h1>
            <p className="font-sans font-bold text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              An independent, privacy-first digital utility suite engineered for students, designers, developers, and everyday users.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-3xl flex-1 space-y-10">
          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">What uTools.online is</h2>
            <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">
              uTools.online is a collection of free utilities for everyday jobs: merging and compressing PDFs, resizing and converting images, counting words, generating QR codes and passwords, and working out loan, SIP, GST and age calculations. Each tool has its own page with a plain-language explanation of what it does, the method behind the result, a worked example and the limits you should know about before relying on it.
            </p>
            <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">
              Alongside the tools we publish step-by-step guides on the same subjects, such as how an EMI is calculated or which image format to choose, so you can understand the answer as well as get it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">Why we built it</h2>
            <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">
              Many file and calculator sites ask for an account, hide the download behind pop-ups, add watermarks, or send your documents to a server you know nothing about. We wanted tools that open instantly, need no sign-up, and keep your files on your own device wherever that is technically possible.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">How your files are handled</h2>
            <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">
              The tools run in your browser using the Canvas API, WebAssembly and JavaScript libraries. For these tools the file you choose is processed in your device's memory and is not sent to our servers. Each tool page states how it processes data, and our <Link to="/privacy-policy" className="underline text-secondary">Privacy Policy</Link> explains what limited information the site and its advertising partners do collect.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">How the site is funded</h2>
            <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">
              uTools.online is free to use. It is supported by advertising served by Google AdSense. Ads are labelled, kept separate from tools and results, and never required to use a tool. Read the <Link to="/advertising-disclosure" className="underline text-secondary">Advertising Disclosure</Link> for details, including how to manage ad personalisation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">Editorial standards and corrections</h2>
            <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">
              Explanations, formulas and worked examples are written to be checked: calculations are recomputed before publication, and we describe estimates as estimates. Calculators and health, tax or legal topics are general information, not professional advice; see our <Link to="/disclaimer" className="underline text-secondary">Disclaimer</Link>.
            </p>
            <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">
              If you find an error, a broken tool or an unclear explanation, please <Link to="/contact" className="underline text-secondary">contact us</Link>. Confirmed mistakes are corrected as soon as we can.
            </p>
          </section>

          <div className="card-ink p-6 sm:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-extrabold text-xl text-foreground">Ready to explore?</h2>
              <p className="font-sans font-bold text-sm text-muted-foreground mt-0.5">Browse every tool or start with a guide.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/tools" className="btn-blue text-sm px-5 py-2.5">
                <span>All tools</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <Link to="/guides" className="btn-white text-sm px-5 py-2.5">Guides</Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SEOPage>
  );
};

export default About;
