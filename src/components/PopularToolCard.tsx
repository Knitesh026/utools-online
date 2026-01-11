import React from 'react';
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface PopularToolCardProps {
  title: string;
  icon: LucideIcon;
  to: string;
  description?: string;
}

const PopularToolCard = ({
  title,
  icon: Icon,
  to,
  description = "",
}: PopularToolCardProps) => {
  return (
    <Link to={to}>
      <div className="flex h-16 overflow-hidden bg-card shadow-lg rounded-[0.5rem] hover:shadow-xl transition-all">
        <svg width={16} height={64} xmlns="http://www.w3.org/2000/svg">
          <path d="M 8 0 
               Q 4 4.8, 8 9.6 
               T 8 19.2 
               Q 4 24, 8 28.8 
               T 8 38.4 
               Q 4 43.2, 8 48 
               T 8 57.6 
               Q 4 62.4, 8 67.2 
               T 8 76.8 
               Q 4 81.6, 8 86.4 
               T 8 96 
               L 0 96 
               L 0 0 
               Z" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth={2} strokeLinecap="round" />
        </svg>
        <div className="flex items-center justify-center px-2 flex-shrink-0">
          <Icon height={20} width={20} stroke="hsl(var(--primary))" strokeWidth="1.5" />
        </div>
        <div className="mx-2 overflow-hidden w-full flex flex-col justify-center">
          <p className="text-sm font-bold text-primary leading-6 mr-3 overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </p>
          <p className="overflow-hidden leading-4 text-muted-foreground text-xs max-h-8">
            {description || "Check out this amazing tool!"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PopularToolCard;
