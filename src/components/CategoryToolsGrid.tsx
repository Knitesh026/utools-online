import React from 'react';
import { Link } from "react-router-dom";
import { Tool } from "@/data/tools";

interface CategoryToolsGridProps {
  categoryName: string;
  categoryDescription: string;
  tools: Tool[];
  colorTheme: {
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
  colorTheme,
}: CategoryToolsGridProps) => {
  // Create a light background color from the accent color
  const getLightBackground = (accentColor: string) => {
    // Convert rgb() to rgba with low opacity for light background
    return accentColor.replace('rgb', 'rgba').replace(')', ', 0.05)');
  };

  return (
    <div className="rounded-lg sm:rounded-[0.5rem] p-3 sm:p-6 bg-card shadow-md overflow-x-hidden" style={{ backgroundColor: getLightBackground(colorTheme.accentColor) }}>
      <section className="mb-0">
        <div className={`mb-4 sm:mb-6 pb-0 border-b-0`}>
          <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-foreground mb-1 sm:mb-2 leading-tight" style={{ color: colorTheme.accentColor }}>
            {categoryName}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">{categoryDescription}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 mt-3 sm:mt-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            
            return (
              <Link key={tool.title} to={tool.to}>
                <div className="flex h-14 sm:h-16 overflow-hidden bg-card shadow-lg rounded-sm sm:rounded-[0.5rem] hover:shadow-xl transition-all hover:scale-105" style={{ borderLeft: `4px solid ${colorTheme.accentColor}` }}>
                  <svg width={16} height={64} xmlns="http://www.w3.org/2000/svg">
                    <path d="M 8 0 Q 4 4.8, 8 9.6 T 8 19.2 Q 4 24, 8 28.8 T 8 38.4 Q 4 43.2, 8 48 T 8 57.6 Q 4 62.4, 8 67.2 T 8 76.8 Q 4 81.6, 8 86.4 T 8 96 L 0 96 L 0 0 Z" fill={colorTheme.accentColor} stroke={colorTheme.accentColor} strokeWidth={2} strokeLinecap="round" />
                  </svg>
                  <div className="flex items-center justify-center px-2 sm:px-3 flex-shrink-0">
                    <Icon height={18} width={18} stroke={colorTheme.iconColor} strokeWidth="1.5" />
                  </div>
                  <div className="mx-1.5 sm:mx-2.5 overflow-hidden w-full flex flex-col justify-center">
                    <p className="text-xs sm:text-sm font-bold overflow-hidden text-ellipsis whitespace-nowrap text-foreground">
                      {tool.title}
                    </p>
                    <p className="overflow-hidden leading-4 text-muted-foreground text-xs max-h-8">
                      {tool.description || "Try this tool"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CategoryToolsGrid;
