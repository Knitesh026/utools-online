import { useEffect, useRef } from "react";

export const AdBanner728x90 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAd = () => {
      if (!containerRef.current) return;
      
      // Create a script element that sets atOptions and loads the ad
      const script = document.createElement("script");
      script.textContent = `
        window.atOptions728x90 = {
          key: "ba27b45b1809423897eb07da8ecdc101",
          format: "iframe",
          height: 90,
          width: 728,
          params: {}
        };
        window.atOptions = window.atOptions728x90;
      `;
      containerRef.current.appendChild(script);
      
      // Load the ad invoke script
      const adScript = document.createElement("script");
      adScript.src = "https://www.highperformanceformat.com/ba27b45b1809423897eb07da8ecdc101/invoke.js";
      adScript.async = true;
      containerRef.current.appendChild(adScript);
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full flex justify-center px-2 sm:px-4 ${className}`}>
      <div ref={containerRef} style={{ minHeight: "90px", width: "100%", maxWidth: "728px" }} />
    </div>
  );
};

export default AdBanner728x90;
