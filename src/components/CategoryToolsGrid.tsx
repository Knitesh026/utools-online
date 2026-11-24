import React from "react";
import { Tool } from "@/data/tools";
import ToolCard from "@/components/ToolCard";

interface CategoryToolsGridProps {
  categoryName: string;
  categoryDescription?: string;
  tools: Tool[];
  colorTheme?: {
    gradient: string;
    accentColor: string;
    iconColor: string;
    borderColor: string;
  };
}

const CategoryToolsGrid = ({
  categoryName,
  categoryDescription,
  tools,
}: CategoryToolsGridProps) => {
  return (
    <div className="bg-white/90 border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-studio animate-fade-in">
      {/* Category header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
              {categoryName}
            </h3>
            <span className="font-mono font-semibold text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
              {tools.length} {tools.length === 1 ? "tool" : "tools"}
            </span>
          </div>
          {categoryDescription && (
            <p className="font-sans font-medium text-xs sm:text-sm text-slate-500 mt-1">
              {categoryDescription}
            </p>
          )}
        </div>
      </div>

      {/* Grid of tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {tools.map((tool) => (
          <ToolCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            to={tool.to}
            category={categoryName}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryToolsGrid;
