import React from 'react';

interface CardProps {
  title: string;
  description?: string;
  icon: React.ElementType;
  number?: string | number;
  to?: string;
  colorTheme?: {
    gradient: string;
    accentColor: string;
    iconColor: string;
    borderColor: string;
  };
}

const Card = ({ title, description = "", icon: Icon, number, to, colorTheme }: CardProps) => {
  const defaultColor = "hsl(var(--primary))";
  const accentColor = colorTheme?.accentColor || defaultColor;
  const iconColor = colorTheme?.iconColor || defaultColor;

  const content = (
    <div className="flex w-full h-16 overflow-hidden bg-card shadow-lg rounded-[0.5rem] hover:shadow-xl transition-all hover:scale-105" style={{ borderLeft: `4px solid ${accentColor}` }}>
      <svg width={16} height={64} xmlns="http://www.w3.org/2000/svg">
        <path d="M 8 0 Q 4 4.8, 8 9.6 T 8 19.2 Q 4 24, 8 28.8 T 8 38.4 Q 4 43.2, 8 48 T 8 57.6 Q 4 62.4, 8 67.2 T 8 76.8 Q 4 81.6, 8 86.4 T 8 96 L 0 96 L 0 0 Z" fill={accentColor} stroke={accentColor} strokeWidth={2} strokeLinecap="round" />
      </svg>
      <div className="flex items-center justify-center px-2 flex-shrink-0">
        <Icon height={20} width={20} stroke={iconColor} strokeWidth="1.5" />
      </div>
      <div className="mx-2 overflow-hidden w-full flex flex-col justify-center">
        <p className="text-sm font-bold overflow-hidden text-ellipsis whitespace-nowrap" style={{ color: accentColor }}>
          {title}
        </p>
        <p className="overflow-hidden leading-4 text-muted-foreground text-xs max-h-8">
          {description || "Try this tool"}
        </p>
      </div>
    </div>
  );

  if (to) {
    return <a href={to}>{content}</a>;
  }

  return content;
};

export default Card;
