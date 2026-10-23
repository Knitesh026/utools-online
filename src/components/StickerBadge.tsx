import React from 'react';

interface StickerBadgeProps {
  children: React.ReactNode;
  color?: 'yellow' | 'red' | 'pink' | 'blue' | 'white' | 'green';
  rotation?: number; // small tilt in degrees; keep within +-3 so it reads as a label, not a gimmick
  shape?: 'pill' | 'star' | 'circle';
  className?: string;
  icon?: React.ReactNode;
}

export const StickerBadge: React.FC<StickerBadgeProps> = ({
  children,
  color = 'red',
  rotation = 0,
  shape = 'pill',
  className = '',
  icon,
}) => {
  const colorStyles = {
    red: 'bg-primary text-white',
    yellow: 'bg-yellow text-foreground',
    pink: 'bg-pink text-foreground',
    blue: 'bg-sky text-foreground',
    white: 'bg-white text-foreground',
    green: 'bg-lime text-foreground',
  }[color];

  const shapeStyles = {
    pill: 'px-3 py-1 rounded-full',
    circle: 'w-16 h-16 rounded-full flex flex-col items-center justify-center p-2 text-center text-[11px] leading-tight',
    star: 'px-3.5 py-1.5 rounded-full',
  }[shape];

  const tilt = Math.max(-3, Math.min(3, rotation));

  return (
    <span
      className={`inline-flex items-center justify-center gap-1.5 font-display font-extrabold uppercase tracking-wide text-xs border-2 border-border select-none cursor-default ${colorStyles} ${shapeStyles} ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default StickerBadge;
