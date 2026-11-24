import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import CategoryToolsGrid from "@/components/CategoryToolsGrid";
import { toolCategories } from "@/data/tools";

const popularTitles: Array<{ title: string; badge?: string }> = [
  { title: "Merge PDF", badge: "Popular" },
  { title: "Compress PDF" },
  { title: "Background Remover", badge: "AI / Canvas" },
  { title: "Image Compressor" },
  { title: "QR Code Generator" },
  { title: "EMI Calculator" },
  { title: "Word Counter" },
  { title: "Password Generator" },
  { title: "PDF to Word" },
];

const POPULAR = "Featured";

export function PopularToolsSection() {
  const [active, setActive] = useState<string>(POPULAR);

  const popular = useMemo(
    () =>
      popularTitles
        .map(({ title, badge }) => {
          for (const cat of toolCategories) {
            const tool = cat.tools.find((t) => t.title === title);
            if (tool) return { ...tool, category: cat.name, badge };
          }
          return null;
        })
        .filter((t): t is NonNullable<typeof t> => t !== null),
    [],
  );

  const activeCategory = toolCategories.find((c) => c.name === active);
  const tabs = [POPULAR, ...toolCategories.map((c) => c.name)];

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary block mb-1.5">
              Instant Browser Execution
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-950 leading-none">
              Start with these
            </h2>
          </div>

          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80"
            role="tablist"
            aria-label="Tool categories"
          >
            {tabs.map((name) => {
              const isActive = active === name;
              return (
                <button
                  key={name}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(name)}
                  className={`px-3.5 py-1.5 rounded-xl font-sans font-semibold text-xs sm:text-[13px] whitespace-nowrap transition-all duration-150 ease-out-quart active:scale-[0.97] ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
                  }`}
                >
                  {name.replace(" Tools", "")}
                </button>
              );
            })}
          </div>
        </div>

        {active === POPULAR ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 animate-fade-in">
            {popular.map((tool) => (
              <ToolCard
                key={tool.title}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                to={tool.to}
                category={tool.category}
                badge={tool.badge}
              />
            ))}
          </div>
        ) : (
          activeCategory && (
            <CategoryToolsGrid
              categoryName={activeCategory.name}
              categoryDescription={activeCategory.description}
              tools={activeCategory.tools}
            />
          )
        )}

        <div className="flex justify-center mt-10">
          <Link to="/tools" className="btn-blue text-sm sm:text-base px-7 py-3.5">
            <Sparkles className="w-4 h-4 mr-2 text-rose-400" />
            <span>View all free tools</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PopularToolsSection;
