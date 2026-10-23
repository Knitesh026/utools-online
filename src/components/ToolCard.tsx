import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CardProps {
  title: string;
  description?: string;
  icon: React.ElementType;
  number?: string | number;
  to?: string;
  category?: string;
  badge?: string;
}

/** Flat colour plane for a tool's icon coin. Category wins; title keywords are the fallback. */
export function getToolTileStyle(title: string, category?: string) {
  const cat = category?.toLowerCase() ?? '';
  if (cat.includes('document')) return 'bg-yellow text-foreground';
  if (cat.includes('image')) return 'bg-pink text-foreground';
  if (cat.includes('text')) return 'bg-lime text-foreground';
  if (cat.includes('color')) return 'bg-sky text-foreground';
  if (cat.includes('calculator')) return 'bg-peach text-foreground';
  if (cat.includes('utility') || cat.includes('developer')) return 'bg-lilac text-foreground';

  const lower = title.toLowerCase();
  if (lower.includes('pdf') || lower.includes('word') || lower.includes('docx')) return 'bg-yellow text-foreground';
  if (lower.includes('image') || lower.includes('jpg') || lower.includes('png') || lower.includes('gif')) return 'bg-pink text-foreground';
  if (lower.includes('counter') || lower.includes('text') || lower.includes('case')) return 'bg-lime text-foreground';
  if (lower.includes('calculator') || lower.includes('bmi')) return 'bg-peach text-foreground';
  return 'bg-lilac text-foreground';
}

const ToolCard = ({ title, description = "", icon: Icon, to, category, badge }: CardProps) => {
  const tileColor = getToolTileStyle(title, category);

  const cardInner = (
    <div className="card-ink group relative flex items-center gap-3.5 p-3.5 sm:p-4 bg-white rounded-3xl cursor-pointer h-full hover:bg-accent">
      {badge && (
        <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 text-[10px] font-display font-extrabold uppercase bg-pink text-foreground border-2 border-border rounded-full">
          {badge}
        </span>
      )}

      <div className={`coin w-12 h-12 sm:w-13 sm:h-13 ${tileColor}`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.2} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-sans font-extrabold text-sm sm:text-base text-foreground leading-tight truncate">
          {title}
        </h3>
        <p className="font-sans font-bold text-xs sm:text-[13px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
          {description || "Free browser utility tool"}
        </p>
      </div>

      <ChevronRight className="w-5 h-5 flex-shrink-0 text-foreground group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block rounded-3xl">
        {cardInner}
      </Link>
    );
  }

  return cardInner;
};

export default ToolCard;
