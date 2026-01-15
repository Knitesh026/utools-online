import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdBanner368x60 from "@/components/AdBanner368x60";

export interface ProfessionalToolLayoutProps {
  title: string;
  description: string;
  inputSection: ReactNode;
  outputSection?: ReactNode;
  error?: string;
  children?: ReactNode;
  colorTheme?: {
    gradient: string;
    accent: string;
  };
  features?: Array<{
    icon: string;
    title: string;
    description: string;
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
  colorTheme = { gradient: "from-blue-50 to-indigo-50", accent: "blue" },
  features,
  actionButton,
  resetButton,
}: ProfessionalToolLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            {description}
          </p>
        </section>

        {/* Features Grid */}
        {features && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-12">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all dark:bg-gray-900">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6 md:mb-8 dark:border-red-800 dark:bg-red-950">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="dark:text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Input Section */}
          <div className="flex flex-col lg:col-span-2">
            <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-900 flex-1 shadow-sm hover:shadow-md transition-shadow">
              {inputSection}
            </Card>
          </div>

          {/* Sidebar Ad Space */}
          <div className="flex flex-col">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-semibold">Advertisement</p>
              <AdBanner368x60 />
            </div>
          </div>
        </div>

        {/* Output Section - Full Width */}
        {outputSection && (
          <div className="flex flex-col mt-6 md:mt-8">
            <Card className="border-gray-200 dark:border-gray-700 flex-1 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
              {outputSection}
            </Card>
          </div>
        )}

        {/* Custom Children Content */}
        {children}

        {/* Action Buttons */}
        {(actionButton || resetButton) && (
          <div className="mt-8 flex gap-3 justify-center flex-wrap sm:flex-nowrap">
            {actionButton && (
              <Button
                onClick={actionButton.onClick}
                disabled={actionButton.loading || actionButton.disabled}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-2 flex items-center gap-2 rounded-lg font-medium transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionButton.loading ? "Processing..." : actionButton.label}
                {!actionButton.loading && <ChevronRight className="w-4 h-4" />}
              </Button>
            )}
            {resetButton && (
              <Button
                onClick={resetButton.onClick}
                variant="outline"
                className="px-8 py-2 rounded-lg font-medium transition-all dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {resetButton.label}
              </Button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProfessionalToolLayout;
