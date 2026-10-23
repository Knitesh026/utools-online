import React from 'react';
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
    <div className="bg-white border-2 border-border rounded-[2rem] p-5 sm:p-7">
      {/* Category header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b-2 border-border/20">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground tracking-tight">
              {categoryName}
            </h3>
            <span className="font-display font-black text-xs uppercase px-2.5 py-0.5 rounded-full bg-yellow text-foreground border-2 border-border">
              {tools.length} {tools.length === 1 ? 'tool' : 'tools'}
            </span>
          </div>
          {categoryDescription && (
            <p className="font-sans font-bold text-xs sm:text-sm text-muted-foreground mt-1">
              {categoryDescription}
            </p>
          )}
        </div>
      </div>

      {/* Grid of tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
