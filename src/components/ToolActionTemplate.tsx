import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export interface ToolActionTemplateProps {
  title: string;
  description: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
    color: string; // e.g., "orange", "red", "purple"
  }>;
  children: ReactNode; // Main content area
  resultSection?: ReactNode; // Result display area
  colorTheme?: {
    gradient: string;
    accent: string;
    icon: string;
    border: string;
  };
}

export const ToolActionTemplate = ({
  title,
  description,
  features,
  children,
  resultSection,
  colorTheme,
}: ToolActionTemplateProps) => {
  return (
    <main className="flex-1 container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {description}
        </p>
      </section>

      {/* Features Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`flex gap-3 items-start p-4 rounded-lg border transition-all hover:shadow-md
              ${getFeatureColors(feature.color)}`}
          >
            <span className="text-lg">{feature.icon}</span>
            <div>
              <h4 className="font-semibold text-foreground">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="mb-12">
        {children}
      </div>

      {/* Result Section */}
      {resultSection && (
        <section className={`p-8 rounded-xl border
          ${colorTheme?.gradient || 'bg-gradient-to-br from-primary/10 to-secondary/10'}
          ${colorTheme?.border || 'border-border'}`}
        >
          {resultSection}
        </section>
      )}
    </main>
  );
};

function getFeatureColors(color: string): string {
  const colorMap: Record<string, string> = {
    orange: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800",
    red: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    purple: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800",
    pink: "bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800",
    blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
  };
  return colorMap[color] || colorMap.blue;
}

export default ToolActionTemplate;
