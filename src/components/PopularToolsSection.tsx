import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import CategoryToolsGrid from "@/components/CategoryToolsGrid";
import { toolCategories } from "@/data/tools";

/** Titles looked up in data/tools.ts so icon, description and route always match the catalog. */
const popularTitles: Array<{ title: string; badge?: string }> = [
  { title: "Merge PDF" },
  { title: "Compress PDF" },
  { title: "Background Remover" },
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
    []
  );

  const activeCategory = toolCategories.find((c) => c.name === active);
  const tabs = [POPULAR, ...toolCategories.map((c) => c.name)];

  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tighter leading-none mb-6">
          Start with these
        </h2>

        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar" role="tablist" aria-label="Tool categories">
          {tabs.map((name) => {
            const isActive = active === name;
            return (
              <button
                key={name}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(name)}
                className={`px-4 py-2 rounded-full border-2 border-border font-sans font-extrabold text-sm whitespace-nowrap transition-colors ${
                  isActive ? "bg-foreground text-background" : "bg-white hover:bg-yellow"
                }`}
              >
                {name.replace(" Tools", "")}
              </button>
            );
          })}
        </div>

        {active === POPULAR ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
            <CategoryToolsGrid categoryName={activeCategory.name} tools={activeCategory.tools} />
          )
        )}

        <div className="flex justify-center mt-10">
          <Link to="/tools" className="btn-blue text-base px-8 py-3.5">
            <span>View all free tools</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PopularToolsSection;
