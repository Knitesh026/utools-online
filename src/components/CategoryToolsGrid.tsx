import React from 'react';
import { Link } from "react-router-dom";
import { Tool } from "@/data/tools";

interface CategoryToolsGridProps {
  categoryName: string;
  categoryDescription: string;
  tools: Tool[];
}

const CategoryToolsGrid = ({
  categoryName,
  categoryDescription,
  tools,
}: CategoryToolsGridProps) => {
  return (
    <section className="mb-20">
      <div className="mb-12">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
          {categoryName}
        </h3>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">{categoryDescription}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          
          return (
            <Link key={tool.title} to={tool.to}>
              <div className="flex h-24 overflow-hidden bg-card shadow-lg rounded-xl hover:shadow-xl transition-all">
                <svg width={16} height={96} xmlns="http://www.w3.org/2000/svg">
                  <path d="M 8 0 Q 4 4.8, 8 9.6 T 8 19.2 Q 4 24, 8 28.8 T 8 38.4 Q 4 43.2, 8 48 T 8 57.6 Q 4 62.4, 8 67.2 T 8 76.8 Q 4 81.6, 8 86.4 T 8 96 L 0 96 L 0 0 Z" fill="hsl(var(--secondary))" stroke="hsl(var(--secondary))" strokeWidth={2} strokeLinecap="round" />
                </svg>
                <div className="flex items-center justify-center px-3 flex-shrink-0">
                  <Icon height={30} width={30} stroke="hsl(var(--secondary))" strokeWidth="1.5" />
                </div>
                <div className="mx-2.5 overflow-hidden w-full flex flex-col justify-center">
                  <p className="text-lg font-bold text-secondary overflow-hidden text-ellipsis whitespace-nowrap">
                    {tool.title}
                  </p>
                  <p className="overflow-hidden leading-5 text-muted-foreground text-sm max-h-10">
                    {tool.description || "Try this tool"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryToolsGrid;
