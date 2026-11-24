import { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  Sparkles,
  Image as ImageIcon,
  FileText,
  Type,
  Palette,
  Calculator,
  Wrench,
} from "lucide-react";
import { toolCategories } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import AdUnit from "@/components/AdUnit";
import { useSearchParams, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOPage from "@/components/SEOPage";
import StickerBadge from "@/components/StickerBadge";

const categoryIcons: Record<string, any> = {
  All: Sparkles,
  "Image Tools": ImageIcon,
  "Document Tools": FileText,
  "Text Tools": Type,
  "Color Tools": Palette,
  "Calculator Tools": Calculator,
  "Utility Tools": Wrench,
};

const categoryAccents: Record<string, string> = {
  "Image Tools": "bg-indigo-50 text-indigo-600 border-indigo-200/80",
  "Document Tools": "bg-rose-50 text-rose-600 border-rose-200/80",
  "Text Tools": "bg-emerald-50 text-emerald-600 border-emerald-200/80",
  "Color Tools": "bg-sky-50 text-sky-600 border-sky-200/80",
  "Calculator Tools": "bg-amber-50 text-amber-600 border-amber-200/80",
  "Utility Tools": "bg-blue-50 text-blue-600 border-blue-200/80",
};

const Tools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const routeParams = useParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");

  const urlSearch = searchParams.get("search");
  useEffect(() => {
    if (urlSearch !== null) setSearchQuery(urlSearch);
  }, [urlSearch]);

  const selectedCategory = useMemo(() => {
    if (routeParams.category) {
      const decoded = decodeURIComponent(routeParams.category).toLowerCase().replace(/-/g, " ");
      const found = toolCategories.find(
        (c) =>
          c.name.toLowerCase() === decoded ||
          c.name.toLowerCase().replace(" tools", "") === decoded,
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

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return toolCategories
      .filter((cat) => selectedCategory === "All" || cat.name === selectedCategory)
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            (t.description && t.description.toLowerCase().includes(q)),
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
        <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-14 px-4 sm:px-6 border-b border-slate-200/70 bg-white/60 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-studio-grid [mask-image:radial-gradient(ellipse_80%_75%_at_50%_10%,#000_45%,transparent_100%)] pointer-events-none"
          />

          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
            <div className="flex items-center justify-center gap-2">
              <StickerBadge color="red" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Full Directory · {totalToolCount} Browser Utilities
              </StickerBadge>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-950 tracking-tight leading-[1.03]">
              All Tools & Utilities
            </h1>

            <p className="font-sans font-medium text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore our complete suite of free browser-based tools. No account required, zero remote uploads, and instant processing on your device.
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-2xl mx-auto pt-3">
              <div className="relative flex items-center bg-white rounded-2xl border border-slate-200/95 shadow-studio focus-within:border-primary/50 focus-within:shadow-[0_0_0_4px_rgba(237,43,62,0.08)] transition-all">
                <div className="pl-4 sm:pl-5 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search tools by name or description (e.g. compress pdf, crop, emi)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3.5 px-3.5 text-sm sm:text-base font-sans font-medium bg-transparent border-0 focus:outline-none text-slate-900 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-2 mr-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
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
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
            <button
              onClick={() => handleCategorySelect("All")}
              className={`btn-pressable px-4 py-2 text-xs sm:text-sm font-sans font-semibold whitespace-nowrap gap-2 rounded-xl border ${
                selectedCategory === "All"
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>All Tools</span>
              <span
                className={`font-mono text-[11px] px-2 py-0.5 rounded-md ${
                  selectedCategory === "All"
                    ? "bg-white/15 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
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
                  className={`btn-pressable px-4 py-2 text-xs sm:text-sm font-sans font-semibold whitespace-nowrap gap-2 rounded-xl border ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name.replace(" Tools", "")}</span>
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-white/15 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {cat.tools.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Result Counter */}
          {searchQuery && (
            <div className="mb-8 flex items-center justify-between text-xs sm:text-sm text-slate-700 bg-white border border-slate-200/90 shadow-hard-sm px-5 py-3.5 rounded-2xl">
              <span>
                Found <strong className="text-primary font-bold">{totalMatchingTools}</strong> tools matching "
                <strong>{searchQuery}</strong>"
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="text-secondary hover:underline font-bold"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Tools Grid or Empty State */}
          {filteredCategories.length === 0 ? (
            <div className="card-ink text-center py-16 bg-white rounded-2xl p-8 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-primary flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-2xl text-slate-950 mb-2">
                No matching tools found
              </h2>
              <p className="font-sans font-medium text-xs sm:text-sm text-slate-500 mb-6">
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
                const accent =
                  categoryAccents[category.name] || "bg-slate-100 text-slate-700 border-slate-200";

                return (
                  <section key={category.name} className="space-y-5">
                    {/* Category Section Header */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${accent}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950 tracking-tight">
                            {category.name}
                          </h2>
                          <p className="font-sans font-medium text-xs text-slate-500">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-semibold text-xs px-3 py-1 bg-white border border-slate-200/90 rounded-full text-slate-600 shadow-2xs">
                        {category.tools.length} Tools
                      </span>
                    </div>

                    {/* Category Tools Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="card-ink mt-8 bg-white rounded-2xl p-6 sm:p-8">
            <h3 className="font-display font-bold text-lg sm:text-xl text-slate-950 mb-4">
              Explore by Utility Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {toolCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className="btn-pressable p-3.5 rounded-xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-primary/40 text-left group flex flex-col justify-between transition-all"
                >
                  <span className="font-display font-bold text-xs sm:text-sm text-slate-900 group-hover:text-primary transition-colors">
                    {cat.name.replace(" Tools", "")}
                  </span>
                  <span className="font-mono font-medium text-[11px] text-slate-500 mt-1">
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
