import { ReactNode } from "react";
import { AdBanner300x250 } from "./AdBanner300x250";
import { AdBanner350x768 } from "./AdBanner350x768";

interface AdSidebarProps {
  className?: string;
  useSkyscraper?: boolean; // true = 350x768, false = 300x250
  hideOnMobile?: boolean;
}

/**
 * Reusable sidebar component for sticky ad placement
 * Responsive: Hidden on mobile, visible on tablet+
 * Sticky positioning on scroll
 */
export const AdSidebar = ({ 
  className = "", 
  useSkyscraper = false,
  hideOnMobile = true 
}: AdSidebarProps) => {
  return (
    <aside 
      className={`
        ${hideOnMobile ? "hidden md:block" : "block"} 
        w-full md:w-[300px] lg:w-[350px]
        flex-shrink-0
        ${className}
      `}
    >
      <div className="sticky top-20 md:top-24">
        {useSkyscraper ? (
          <AdBanner350x768 className="md:w-[350px]" />
        ) : (
          <AdBanner300x250 className="md:w-[300px]" />
        )}
      </div>
    </aside>
  );
};

export default AdSidebar;
