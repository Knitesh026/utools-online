import { useEffect, useRef } from "react";

let banner468Counter = 0;

export const AdBanner468x60 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerIdRef = useRef<number>(banner468Counter++);

  useEffect(() => {
    const loadAd = () => {
      if (!containerRef.current) return;
      
      const bannerId = bannerIdRef.current;
      const uniqueKey = `atOptions_468x60_${bannerId}`;
      
      // Create and append setup script
      const setupScript = document.createElement("script");
      setupScript.textContent = `
        (function() {
          window["${uniqueKey}"] = {
            key: "1a312f9d66b39ae68001fff40d2e629c",
            format: "iframe",
            height: 60,
            width: 468,
            params: {}
          };
          window.atOptions = window["${uniqueKey}"];
        })();
      `;
      containerRef.current.appendChild(setupScript);
      
      // Load the ad invoke script after a staggered delay
      setTimeout(() => {
        if (!containerRef.current) return;
        const adScript = document.createElement("script");
        adScript.src = "https://www.highperformanceformat.com/1a312f9d66b39ae68001fff40d2e629c/invoke.js";
        adScript.async = true;
        containerRef.current?.appendChild(adScript);
      }, 200 + bannerId * 100);
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full flex justify-center px-2 sm:px-4 ${className}`}>
      <div ref={containerRef} style={{ minHeight: "60px", width: "100%", maxWidth: "468px" }} />
    </div>
  );
};

export default AdBanner468x60;
