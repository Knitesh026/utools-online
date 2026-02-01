// Helper function to create SEO-wrapped tool pages
import { ReactNode } from 'react';
import { SEOPage } from '@/components/SEOPage';
import toolsMetadata from '@/data/toolsMetadata';

interface ToolPageProps {
  toolKey: string;
  children: ReactNode;
}

export const SEOToolWrapper = ({ toolKey, children }: ToolPageProps) => {
  const metadata = toolsMetadata[toolKey as keyof typeof toolsMetadata];
  
  if (!metadata) {
    return <>{children}</>;
  }

  const currentUrl = `https://utoolss.online/${toolKey}`;
  const breadcrumbs = [
    { name: 'Home', url: 'https://utoolss.online' },
    { name: 'Tools', url: 'https://utoolss.online/tools' },
    { name: metadata.title.split(' - ')[0], url: currentUrl }
  ];

  return (
    <SEOPage
      title={metadata.title}
      description={metadata.description}
      keywords={metadata.keywords}
      canonical={currentUrl}
      breadcrumbs={breadcrumbs}
      toolName={metadata.title.split(' - ')[0]}
      toolDescription={metadata.description}
    >
      <>
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 hidden-on-mobile">
          <p className="text-sm text-gray-700 dark:text-gray-300">{metadata.longDescription}</p>
        </div>
        {children}
      </>
    </SEOPage>
  );
};

export default SEOToolWrapper;
