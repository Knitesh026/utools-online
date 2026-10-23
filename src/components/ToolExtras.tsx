import { useLocation } from "react-router-dom";
import SEOPage from "@/components/SEOPage";
import ToolArticle from "@/components/ToolArticle";
import AdUnit from "@/components/AdUnit";
import { getToolContent } from "@/data/toolContent";
import toolsMetadata from "@/data/toolsMetadata";

const SITE = "https://utoolss.online";

/**
 * Drop-in for tool pages that do not use ProfessionalToolLayout: sets the page's
 * title, description and canonical, then renders the written article and one ad slot.
 */
export const ToolExtras = () => {
  const { pathname } = useLocation();
  const content = getToolContent(pathname);
  if (!content) return null;

  const meta = (toolsMetadata as Record<string, { title: string; description: string; keywords: string }>)[pathname.replace(/^\//, "")];
  const title = meta?.title ?? `${content.name} - Free Online Tool | uTools.online`;
  const description = meta?.description ?? `${content.intro[0].slice(0, 150).trim()}...`;
  const url = `${SITE}${pathname}`;

  return (
    <SEOPage
      title={title}
      description={description}
      canonical={url}
      keywords={meta?.keywords}
      toolName={content.name}
      toolDescription={description}
      breadcrumbs={[
        { name: "Home", url: SITE },
        { name: "Tools", url: `${SITE}/tools` },
        { name: content.name, url },
      ]}
    >
      <div className="max-w-4xl mx-auto mt-14 space-y-8 text-foreground">
        <AdUnit placement="inline" />
        <ToolArticle content={content} />
      </div>
    </SEOPage>
  );
};

export default ToolExtras;
