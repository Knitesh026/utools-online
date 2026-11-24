import { ReactNode, ComponentType, isValidElement } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Layers,
  Zap,
  RotateCcw,
  Lock,
} from "lucide-react";
import AdUnit, { hasAdSlot } from "@/components/AdUnit";
import ToolArticle from "@/components/ToolArticle";
import SEOPage from "@/components/SEOPage";
import toolsMetadata from "@/data/toolsMetadata";
import { getToolContent } from "@/data/toolContent";
import ToolCard from "./ToolCard";
import StickerBadge from "./StickerBadge";
import { toolCategories } from "@/data/tools";
import { Link, useLocation } from "react-router-dom";

// Tool pages pass icons as emoji strings, elements, or lucide components; render all three safely.
const renderFeatureIcon = (icon: unknown): ReactNode => {
  if (typeof icon === "string" || isValidElement(icon)) return icon as ReactNode;
  if (icon && (typeof icon === "function" || typeof icon === "object")) {
    const Icon = icon as ComponentType<{ className?: string }>;
    return <Icon className="w-4 h-4 text-slate-700" />;
  }
  return null;
};

export interface ProfessionalToolLayoutProps {
  /** Optional tool icon; accepted for page convenience, not rendered. */
  icon?: unknown;
  title: string;
  description: string;
  inputSection: ReactNode;
  outputSection?: ReactNode;
  error?: string;
  children?: ReactNode;
  toolKey?: string;
  category?: string;
  colorTheme?: {
    gradient: string;
    accent: string;
  };
  features?: Array<{
    icon: string | ReactNode | ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }>;
  howToUse?: string[];
  aboutText?: string;
  /** Accepted for page convenience; the long-form article comes from toolContent. */
  aboutTitle?: string;
  aboutDescription?: string;
  commonUses?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  actionButton?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    icon?: string;
    disabled?: boolean;
  };
  resetButton?: {
    label: string;
    onClick: () => void;
  };
}

export const ProfessionalToolLayout = ({
  title,
  description,
  inputSection,
  outputSection,
  error,
  children,
  category = "Image Tools",
  features,
  howToUse,
  aboutText,
  faqs,
  actionButton,
  resetButton,
}: ProfessionalToolLayoutProps) => {
  const { pathname } = useLocation();
  const content = getToolContent(pathname);
  const steps = howToUse && howToUse.length > 0 ? howToUse : [];
  const activeFaqs = faqs && faqs.length > 0 ? faqs : [];

  const metaKey = pathname.replace(/^\//, "").replace(/\/$/, "");
  const meta = (
    toolsMetadata as Record<string, { title: string; description: string; keywords: string }>
  )[metaKey];
  const seoTitle = meta?.title ?? `${title} - Free Online Tool | uTools.online`;
  const seoDescription =
    meta?.description ??
    (description.length >= 70
      ? description
      : `${description} Free, private and explained step by step on uTools.online.`);
  const seoUrl = `https://utoolss.online${pathname}`;

  const matchedCategory =
    toolCategories.find((c) =>
      c.tools.some((t) => t.to === pathname || t.title.toLowerCase() === title.toLowerCase()),
    ) ||
    toolCategories.find((c) => c.name.toLowerCase() === category.toLowerCase()) ||
    toolCategories[0];

  const relatedTools = matchedCategory
    ? matchedCategory.tools
        .filter((t) => t.to !== pathname && !t.title.toLowerCase().includes(title.toLowerCase()))
        .slice(0, 4)
    : [];

  return (
    <SEOPage
      title={seoTitle}
      description={seoDescription}
      canonical={seoUrl}
      keywords={meta?.keywords}
      toolName={title}
      toolDescription={seoDescription}
      breadcrumbs={[
        { name: "Home", url: "https://utoolss.online" },
        { name: "Tools", url: "https://utoolss.online/tools" },
        { name: title, url: seoUrl },
      ]}
    >
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        {/* Architectural Tool Header */}
        <div className="relative w-full pt-24 pb-6 sm:pt-28 sm:pb-8 px-4 border-b border-slate-200/70 bg-white/60 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-studio-grid [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_40%,transparent_100%)] pointer-events-none"
          />

          <div className="container mx-auto max-w-5xl relative z-10 space-y-3.5">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 font-sans font-semibold text-xs text-slate-500"
            >
              <Link to="/" className="hover:text-slate-900 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                to={`/tools?category=${encodeURIComponent(matchedCategory.name)}`}
                className="hover:text-slate-900 transition-colors"
              >
                {matchedCategory.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-bold">{title}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950 leading-[1.04]">
                  {title}
                </h1>
                <p className="font-sans font-medium text-sm sm:text-base text-slate-600 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <StickerBadge color="green" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                  100% private in-browser
                </StickerBadge>
                <StickerBadge color="blue" icon={<Zap className="w-3.5 h-3.5" />}>
                  Instant local engine
                </StickerBadge>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 container mx-auto px-4 md:px-6 py-8 max-w-5xl space-y-8">
          {/* Error Alert */}
          {error && (
            <Alert
              variant="destructive"
              className="border border-rose-200 bg-rose-50 text-rose-900 rounded-2xl shadow-xs animate-scale-in"
            >
              <AlertCircle className="h-4 w-4 text-rose-600" />
              <AlertDescription className="font-sans font-semibold text-xs sm:text-sm text-rose-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Main Workbench Area with Optional Sidebar Ad */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1 w-full space-y-5 min-w-0">
              {/* Primary Studio Workbench Card */}
              <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-studio-lg overflow-hidden">
                {/* Workbench Status Chrome */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-slate-50/90 border-b border-slate-200/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-mono font-semibold text-[11px] uppercase tracking-wider text-slate-600">
                      {matchedCategory.name} Workbench
                    </span>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-slate-500">
                    <Lock className="w-3 h-3 text-emerald-600" /> Zero remote upload
                  </span>
                </div>

                {/* Input Section */}
                <div className="studio-workbench-panel p-2 sm:p-3">{inputSection}</div>

                {/* Action Bar (when actionButton or resetButton props are passed) */}
                {(actionButton || resetButton) && (
                  <div className="px-5 sm:px-7 pb-6 pt-2 flex flex-wrap sm:flex-nowrap items-center gap-3 border-t border-slate-100 bg-slate-50/40">
                    {actionButton && (
                      <button
                        onClick={actionButton.onClick}
                        disabled={actionButton.loading || actionButton.disabled}
                        className="btn-primary flex-1 sm:flex-initial px-7 py-3 text-sm sm:text-base font-bold disabled:opacity-50 text-white"
                      >
                        <span>{actionButton.loading ? "Processing..." : actionButton.label}</span>
                        {!actionButton.loading && <ChevronRight className="w-4 h-4 ml-1.5" />}
                      </button>
                    )}
                    {resetButton && (
                      <button
                        onClick={resetButton.onClick}
                        className="btn-white px-5 py-3 text-sm font-semibold text-slate-700"
                      >
                        <RotateCcw className="w-4 h-4 mr-1.5 text-slate-500" />
                        <span>{resetButton.label}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Output Section */}
              {outputSection && (
                <div className="bg-white dark:bg-card border border-emerald-200/90 rounded-2xl shadow-studio overflow-hidden animate-fade-in">
                  <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-emerald-50/70 border-b border-emerald-200/60 text-xs">
                    <span className="font-mono font-bold text-[11px] uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Output Ready
                    </span>
                    <span className="font-mono text-[11px] text-emerald-700">
                      Processed locally
                    </span>
                  </div>
                  <div className="studio-workbench-panel p-2 sm:p-3">{outputSection}</div>
                </div>
              )}

              {/* Custom Children (e.g. extra download buttons or charts) */}
              {children}

              {/* Features Highlight Strip */}
              {features && features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3 shadow-hard-sm"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-base shrink-0">
                        {renderFeatureIcon(feature.icon)}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-900">
                          {feature.title}
                        </h4>
                        <p className="font-sans font-medium text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Ad Unit */}
            {hasAdSlot("sidebar") && (
              <div className="w-full lg:w-80 flex-shrink-0 hidden lg:block sticky top-24">
                <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-studio">
                  <AdUnit placement="sidebar" className="my-0" />
                </div>
              </div>
            )}
          </div>

          {/* Comprehensive Written Tool Documentation */}
          {content ? (
            <ToolArticle content={content} />
          ) : (
            <>
              {steps.length > 0 && (
                <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-4">
                  <h2 className="font-display font-bold text-2xl text-slate-950">
                    How to use {title}
                  </h2>
                  <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {steps.map((step, idx) => (
                      <li
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 font-sans font-medium text-sm text-slate-700"
                      >
                        <strong className="font-mono font-bold text-primary mr-1.5">
                          0{idx + 1}.
                        </strong>
                        {step}
                      </li>
                    ))}
                  </ol>
                </section>
              )}
              {aboutText && (
                <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-studio space-y-3">
                  <h2 className="font-display font-bold text-2xl text-slate-950">
                    About {title}
                  </h2>
                  <p className="font-sans font-medium text-base leading-relaxed text-slate-600">
                    {aboutText}
                  </p>
                </section>
              )}
              {activeFaqs.length > 0 && (
                <section className="space-y-3">
                  <h2 className="font-display font-bold text-2xl text-slate-950">
                    Frequently asked questions
                  </h2>
                  {activeFaqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="bg-white border border-slate-200/90 rounded-2xl px-5 py-3.5 shadow-hard-sm"
                    >
                      <summary className="cursor-pointer font-display font-bold text-base text-slate-900">
                        {faq.question}
                      </summary>
                      <p className="font-sans font-medium text-sm leading-relaxed pt-2 text-slate-600">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </section>
              )}
            </>
          )}

          <AdUnit placement="inline" />

          {/* Related Tools Grid */}
          {relatedTools.length > 0 && (
            <section className="space-y-4 pt-4 border-t border-slate-200/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-slate-950 font-display font-bold text-lg sm:text-xl">
                  <span className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200/80 flex items-center justify-center text-primary">
                    <Layers className="w-4 h-4" />
                  </span>
                  <h2>Related Tools in {matchedCategory.name}</h2>
                </div>
                <Link
                  to={`/tools?category=${encodeURIComponent(matchedCategory.name)}`}
                  className="font-sans font-bold text-xs text-primary hover:underline"
                >
                  View all in {matchedCategory.name} →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {relatedTools.map((tool) => (
                  <ToolCard
                    key={tool.title}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    to={tool.to}
                    category={matchedCategory.name}
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </SEOPage>
  );
};

export default ProfessionalToolLayout;
