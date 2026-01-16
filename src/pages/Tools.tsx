import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { toolCategories } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { AdNativeBanner } from "@/components/AdNativeBanner";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Tools = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const categoryParam = searchParams.get("category");
  
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    categoryParam || toolCategories[0]?.name || null
  );

  // Update expanded category when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setExpandedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filter tools based on search query
  const filteredCategories = toolCategories
    .map((category) => ({
      ...category,
      tools: category.tools.filter((tool) =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.tools.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-white to-accent/5">
      <Header />
      <AdNativeBanner />
      {/* Hero Section */}
      <section className="relative py-4 px-4 sm:py-24 sm:px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              All Tools & Utilities
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
              Explore our complete collection of free online tools. Find exactly what you need to simplify your workflow.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-2 sm:py-3 rounded-xl border border-border bg-card focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-4 px-4 sm:py-8 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-foreground mb-2">No tools found</h2>
              <p className="text-muted-foreground">Try adjusting your search query</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredCategories.map((category, index) => (
                <div key={category.name}>
                  {/* Category Header with colored background */}
                  <div className={`rounded-lg sm:rounded-xl p-2 sm:p-3 mb-2 sm:mb-3 bg-gradient-to-r ${category.colorTheme.gradient} border-l-4`} style={{ borderColor: category.colorTheme.accentColor }}>
                    <button
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === category.name ? null : category.name
                        )
                      }
                      className="w-full flex items-center justify-between group hover:opacity-75 transition-opacity"
                    >
                      <div className="text-left">
                        <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-foreground mb-1" style={{ color: category.colorTheme.accentColor }}>
                          {category.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 transition-transform`}
                        style={{ color: category.colorTheme.accentColor }}
                      />
                    </button>
                  </div>

                  {/* Tools Grid */}
                  {expandedCategory === category.name && (
                    <div className="mb-3 sm:mb-4">
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                        {category.tools.map((tool) => (
                          <ToolCard
                            key={tool.title}
                            title={tool.title}
                            icon={tool.icon}
                            to={tool.to}
                            colorTheme={category.colorTheme}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ad Banner Before Footer */}
      <div className="py-4 px-4 sm:py-6 sm:px-6 flex justify-center bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <AdNativeBanner />
      </div>

      {/* Stats Section */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center">
              <h3 className="text-2xl sm:text-4xl font-bold text-primary mb-2">
                {toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)}+
              </h3>
              <p className="text-xs sm:text-base text-muted-foreground">Free Tools Available</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl sm:text-4xl font-bold text-primary mb-2">
                {toolCategories.length}
              </h3>
              <p className="text-xs sm:text-base text-muted-foreground">Tool Categories</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl sm:text-4xl font-bold text-primary mb-2">
                100%
              </h3>
              <p className="text-xs sm:text-base text-muted-foreground">Free & No Sign-up</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Tools;
