import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, ChevronRight, ShieldCheck, HelpCircle, BookOpen, Layers, CheckCircle2, Sparkles } from "lucide-react";
import AdUnit, { hasAdSlot } from "@/components/AdUnit";
import ToolArticle from "@/components/ToolArticle";
import SEOPage from "@/components/SEOPage";
import toolsMetadata from "@/data/toolsMetadata";
import { getToolContent } from "@/data/toolContent";
import ToolCard from "./ToolCard";
import StickerBadge from "./StickerBadge";
import { toolCategories } from "@/data/tools";
import { Link, useLocation } from "react-router-dom";

export interface ProfessionalToolLayoutProps {
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
    icon: string | ReactNode;
    title: string;
    description: string;
  }>;
  howToUse?: string[];
  aboutText?: string;
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
  // Original per-tool article. Pages that supply their own copy through props still render it.
  const content = getToolContent(pathname);
  const steps = howToUse && howToUse.length > 0 ? howToUse : [];
  const activeFaqs = faqs && faqs.length > 0 ? faqs : [];

  const metaKey = pathname.replace(/^\//, "").replace(/\/$/, "");
  const meta = (toolsMetadata as Record<string, { title: string; description: string; keywords: string }>)[metaKey];
  const seoTitle = meta?.title ?? `${title} - Free Online Tool | uTools.online`;
  const seoDescription = meta?.description ?? (description.length >= 70 ? description : `${description} Free, private and explained step by step on uTools.online.`);
  const seoUrl = `https://utoolss.online${pathname}`;

  const matchedCategory = toolCategories.find(c => c.name.toLowerCase() === category.toLowerCase()) || toolCategories[0];
  const relatedTools = matchedCategory ? matchedCategory.tools.filter(t => !t.title.toLowerCase().includes(title.toLowerCase())).slice(0, 4) : [];

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

      {/* Tool header: breadcrumb, title, privacy pills */}
      <div className="w-full pt-28 pb-6 sm:pt-32 sm:pb-8 px-4">
        <div className="container mx-auto max-w-5xl space-y-4">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 font-sans font-extrabold text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/tools?category=${encodeURIComponent(matchedCategory.name)}`} className="hover:text-foreground">
              {matchedCategory.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{title}</span>
          </nav>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-foreground leading-[0.98]">
            {title}
          </h1>

          <p className="font-sans font-bold text-base sm:text-lg max-w-2xl text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <StickerBadge color="green" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              100% private in-browser
            </StickerBadge>
            <StickerBadge color="yellow">Free and fast</StickerBadge>
          </div>
        </div>
      </div>


      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 max-w-5xl space-y-6">
        {/* Features Highlight (if provided) */}
        {features && features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="card-ink bg-white p-4 flex items-start gap-3"
              >
                <div className="text-xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-foreground">
                    {feature.title}
                  </h4>
                  <p className="font-sans font-medium text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert
            variant="destructive"
            className="border-2 border-border bg-pink text-foreground rounded-3xl"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-sans font-bold text-xs sm:text-sm">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content Workspace with Sidebar Ad */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Primary Tool Area */}
          <div className="flex-1 w-full space-y-5 min-w-0">
            {/* Input Section */}
            <div className="bg-white border-2 border-border rounded-[2rem] p-4 sm:p-6 overflow-hidden">
              {inputSection}
            </div>

            {/* Action Buttons (Effect 2) */}
            {(actionButton || resetButton) && (
              <div className="flex gap-3 justify-center flex-wrap sm:flex-nowrap pt-1">
                {actionButton && (
                  <button
                    onClick={actionButton.onClick}
                    disabled={actionButton.loading || actionButton.disabled}
                    className="btn-primary px-8 py-3.5 text-base font-bold disabled:opacity-50 text-white"
                  >
                    <span>{actionButton.loading ? "Processing..." : actionButton.label}</span>
                    {!actionButton.loading && <ChevronRight className="w-4 h-4 ml-1" />}
                  </button>
                )}
                {resetButton && (
                  <button
                    onClick={resetButton.onClick}
                    className="btn-white px-6 py-3.5 text-base font-bold"
                  >
                    {resetButton.label}
                  </button>
                )}
              </div>
            )}

            {/* Output Section */}
            {outputSection && (
              <div className="bg-white border-2 border-border rounded-[2rem] p-4 sm:p-6">
                {outputSection}
              </div>
            )}

            {/* Custom Children */}
            {children}
          </div>

          {/* Sidebar Unit */}
          {hasAdSlot("sidebar") && (
            <div className="w-full lg:w-80 flex-shrink-0 hidden lg:block sticky top-28">
              <div className="bg-white border-2 border-border rounded-[2rem] p-3">
                <AdUnit placement="sidebar" className="my-0" />
              </div>
            </div>
          )}
        </div>


        {content ? (
          <ToolArticle content={content} />
        ) : (
          <>
            {steps.length > 0 && (
              <section className="bg-white border-2 border-border rounded-[2rem] p-5 sm:p-7 space-y-4">
                <h2 className="font-display font-extrabold text-2xl text-foreground">How to use {title}</h2>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps.map((step, idx) => (
                    <li key={idx} className="p-4 rounded-3xl bg-background border-2 border-border font-sans font-semibold text-sm">
                      <strong className="font-display mr-1">{idx + 1}.</strong>{step}
                    </li>
                  ))}
                </ol>
              </section>
            )}
            {aboutText && (
              <section className="bg-white border-2 border-border rounded-[2rem] p-5 sm:p-7 space-y-3">
                <h2 className="font-display font-extrabold text-2xl text-foreground">About {title}</h2>
                <p className="font-sans font-semibold text-base leading-relaxed text-foreground/85">{aboutText}</p>
              </section>
            )}
            {activeFaqs.length > 0 && (
              <section className="space-y-3">
                <h2 className="font-display font-extrabold text-2xl text-foreground">Frequently asked questions</h2>
                {activeFaqs.map((faq, idx) => (
                  <details key={idx} className="bg-white border-2 border-border rounded-3xl px-5 py-3">
                    <summary className="cursor-pointer font-display font-extrabold text-base">{faq.question}</summary>
                    <p className="font-sans font-semibold text-sm leading-relaxed pt-2 text-foreground/80">{faq.answer}</p>
                  </details>
                ))}
              </section>
            )}
          </>
        )}

        <AdUnit placement="inline" />

        {/* Content Block 4: Related Tools Grid */}
        {relatedTools.length > 0 && (
          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground font-display font-extrabold text-lg sm:text-xl">
                <Layers className="w-5 h-5 text-pink" />
                <h2>Related Tools in {matchedCategory.name}</h2>
              </div>
              <Link
                to={`/tools?category=${encodeURIComponent(matchedCategory.name)}`}
                className="font-sans font-extrabold text-xs text-blue hover:underline"
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
