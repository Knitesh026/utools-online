import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { toolCategories } from "@/data/tools";
import ToolCard from "@/components/ToolCard";

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    toolCategories[0]?.name || null
  );

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      {/* Hero Section */}
      <section className="relative py-12 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              All Tools & Utilities
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our complete collection of free online tools. Find exactly what you need to simplify your workflow.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-16">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 rounded-xl border border-border bg-card focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-foreground mb-2">No tools found</h2>
              <p className="text-muted-foreground">Try adjusting your search query</p>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredCategories.map((category, index) => (
                <div key={category.name}>
                  {/* Category Header */}
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.name ? null : category.name
                      )
                    }
                    className="w-full flex items-center justify-between mb-8 group hover:opacity-75 transition-opacity"
                  >
                    <div className="text-left">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                        {category.name}
                      </h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                    <ChevronDown
                      className={`h-6 w-6 text-primary flex-shrink-0 transition-transform ${
                        expandedCategory === category.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Tools Grid */}
                  {expandedCategory === category.name && (
                    <div className="mb-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {category.tools.map((tool) => (
                          <ToolCard
                            key={tool.title}
                            title={tool.title}
                            icon={tool.icon}
                            to={tool.to}
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

      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)}+
              </h3>
              <p className="text-muted-foreground">Free Tools Available</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {toolCategories.length}
              </h3>
              <p className="text-muted-foreground">Tool Categories</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                100%
              </h3>
              <p className="text-muted-foreground">Free & No Sign-up</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools;
