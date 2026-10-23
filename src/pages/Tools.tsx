import { useState, useMemo, useEffect } from "react";
import { Search, X, Sparkles, Mountain, FileText, Type, Palette, Calculator, Wrench } from "lucide-react";
import { toolCategories } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import AdUnit from "@/components/AdUnit";
import { useSearchParams, useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import StickerBadge from "@/components/StickerBadge";

const categoryIcons: Record<string, any> = {
  "All": Sparkles,
  "Image Tools": Mountain,
  "Document Tools": FileText,
  "Text Tools": Type,
  "Color Tools": Palette,
  "Calculator Tools": Calculator,
  "Utility Tools": Wrench,
};

const Tools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const routeParams = useParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");

  // Header and hero search send visitors here with ?search=term
  const urlSearch = searchParams.get("search");
  useEffect(() => {
    if (urlSearch !== null) setSearchQuery(urlSearch);
  }, [urlSearch]);
  
  // Resolve category from either URL route param or query param
  const selectedCategory = useMemo(() => {
    if (routeParams.category) {
      const decoded = decodeURIComponent(routeParams.category).toLowerCase().replace(/-/g, " ");
      const found = toolCategories.find((c) => 
        c.name.toLowerCase() === decoded || 
        c.name.toLowerCase().replace(" tools", "") === decoded
      );
      if (found) return found.name;
    }
    return searchParams.get("category") || "All";
  }, [routeParams.category, searchParams]);

  const totalToolCount = useMemo(() => {
    return toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0);
  }, []);

  const handleCategorySelect = (category: string) => {
    if (category === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  // Filter tools based on search query & selected category
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return toolCategories
      .filter((cat) => selectedCategory === "All" || cat.name === selectedCategory)
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            (t.description && t.description.toLowerCase().includes(q))
        ),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [searchQuery, selectedCategory]);

  const totalMatchingTools = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.tools.length, 0);
  }, [filteredCategories]);

  return (
    <SEOPage
      title="All Tools & Utilities - Complete Free Online Collection | uTools.online"
      description="Browse every free online tool for images, PDFs, text, colours and calculations. Files are processed in your browser, with no sign-up."
      canonical="https://utoolss.online/tools"
      keywords="free online tools, PDF tools, image editor, online utilities, word counter, image converter"
    >
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        {/* Directory Hero Header */}
        <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <StickerBadge color="white" rotation={-4}>
                Full Directory · {totalToolCount} Utilities
              </StickerBadge>
            </div>
            
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-foreground tracking-tight leading-tight">
              All Tools & Utilities
            </h1>
            
            <p className="font-sans font-bold text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore our complete suite of free browser-based tools. No account required, zero remote uploads, and instant processing on your device.
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-2xl mx-auto mt-6">
              <div className="relative flex items-center bg-white rounded-full border-2 border-border">
                <div className="pl-4 sm:pl-5 text-muted-foreground">
                  <Search className="w-5 h-5 text-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search tools by name or description (e.g. compress pdf, ocr, crop)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 px-4 text-base font-sans font-bold bg-transparent border-0 focus:outline-none text-foreground placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-2 mr-3 text-foreground hover:bg-background rounded-lg border border-border"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>


        {/* Main Content Area */}
        <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1">
          {/* Category Filter Pills Toolbar */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
            <button
              onClick={() => handleCategorySelect("All")}
              className={`btn-pressable px-4 py-2 text-xs sm:text-sm font-sans font-extrabold whitespace-nowrap gap-2 ${
                selectedCategory === "All"
                  ? "bg-primary text-white shadow-hard-lg"
                  : "bg-white text-foreground hover:bg-white/80 shadow-hard-sm"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Tools</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full border border-border ${selectedCategory === "All" ? "bg-white text-foreground" : "bg-background text-foreground"}`}>
                {totalToolCount}
              </span>
            </button>

            {toolCategories.map((cat) => {
              const Icon = categoryIcons[cat.name] || Sparkles;
              const isSelected = selectedCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`btn-pressable px-4 py-2 text-xs sm:text-sm font-sans font-extrabold whitespace-nowrap gap-2 ${
                    isSelected
                      ? "bg-primary text-white shadow-hard-lg"
                      : "bg-white text-foreground hover:bg-white/80 shadow-hard-sm"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name.replace(" Tools", "")}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border border-border ${isSelected ? "bg-white text-foreground" : "bg-background text-foreground"}`}>
                    {cat.tools.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Result Counter */}
          {searchQuery && (
            <div className="card-ink mb-8 flex items-center justify-between text-xs sm:text-sm text-foreground bg-white px-5 py-3 rounded-2xl">
              <span>
                Found <strong className="text-blue font-black">{totalMatchingTools}</strong> tools matching "<strong>{searchQuery}</strong>"
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="text-blue hover:underline font-extrabold"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Tools Grid or Empty State */}
          {filteredCategories.length === 0 ? (
            <div className="card-ink text-center py-16 bg-white rounded-3xl p-8 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-primary border-2 border-border text-foreground flex items-center justify-center mx-auto mb-4 shadow-hard-sm">
                <Search className="w-7 h-7" />
              </div>
              <h2 className="font-display font-extrabold text-2xl text-foreground mb-2">No matching tools found</h2>
              <p className="font-sans font-semibold text-xs sm:text-sm text-muted-foreground mb-6">
                We couldn't find any tools matching your criteria. Try adjusting your search query or clear the filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategorySelect("All");
                }}
                className="btn-blue text-xs sm:text-sm px-6 py-2.5"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category) => {
                const Icon = categoryIcons[category.name] || Sparkles;

                return (
                  <section key={category.name} className="space-y-6">
                    {/* Category Section Header */}
                    <div className="flex items-center justify-between pb-3 border-b-2 border-border/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary border-2 border-border flex items-center justify-center shadow-hard-sm">
                          <Icon className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight">
                            {category.name}
                          </h2>
                          <p className="font-sans font-bold text-xs text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <span className="font-display font-extrabold text-xs uppercase px-3 py-1 bg-white border-2 border-border rounded-full shadow-hard-sm">
                        {category.tools.length} Tools
                      </span>
                    </div>

                    {/* Category Tools Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {category.tools.map((tool) => (
                        <ToolCard
                          key={tool.title}
                          title={tool.title}
                          description={tool.description}
                          icon={tool.icon}
                          to={tool.to}
                          category={category.name}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {/* Mid-Page Native Ad */}
          <div className="py-10 flex justify-center">
            <AdUnit placement="inline" />
          </div>

          {/* Quick Category Directory Links */}
          <div className="card-ink mt-12 bg-white rounded-3xl p-8">
            <h3 className="font-display font-extrabold text-xl text-foreground mb-4">
              Explore by Utility Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {toolCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className="btn-pressable p-3 rounded-xl bg-background border-2 border-border text-left group flex flex-col justify-between"
                >
                  <span className="font-display font-extrabold text-xs text-foreground group-hover:text-blue transition-colors">
                    {cat.name.replace(" Tools", "")}
                  </span>
                  <span className="font-sans font-bold text-[10px] text-muted-foreground mt-1">
                    {cat.tools.length} utilities
                  </span>
                </button>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SEOPage>
  );
};

export default Tools;
