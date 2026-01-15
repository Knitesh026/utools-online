import { useEffect, useRef } from "react";

export const AdBanner300x250 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAd = () => {
      if (!containerRef.current) return;
      
      // Set atOptions in the window/global scope
      (window as any).atOptions = {
        key: "ba27b45b1809423897eb07da8ecdc101",
        format: "iframe",
        height: 250,
        width: 300,
        params: {}
      };
      
      // Load the ad invoke script with a small delay
      setTimeout(() => {
        if (!containerRef.current) return;
        const adScript = document.createElement("script");
        adScript.src = "https://www.highperformanceformat.com/ba27b45b1809423897eb07da8ecdc101/invoke.js";
        adScript.async = true;
        containerRef.current?.appendChild(adScript);
      }, 50);
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`ad-container-300x250 flex justify-center ${className}`}
      style={{ minHeight: "250px", minWidth: "300px" }}
    />
  );
};

export default AdBanner300x250;
