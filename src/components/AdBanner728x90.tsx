import { useEffect, useRef } from "react";

let banner728Counter = 0;

export const AdBanner728x90 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerIdRef = useRef<number>(banner728Counter++);

  useEffect(() => {
    const loadAd = () => {
      if (!containerRef.current) return;
      
      const bannerId = bannerIdRef.current;
      const uniqueKey = `atOptions_728x90_${bannerId}`;
      
      // Create and append setup script
      const setupScript = document.createElement("script");
      setupScript.textContent = `
        (function() {
          window["${uniqueKey}"] = {
            key: "ba27b45b1809423897eb07da8ecdc101",
            format: "iframe",
            height: 90,
            width: 728,
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
        adScript.src = "https://www.highperformanceformat.com/ba27b45b1809423897eb07da8ecdc101/invoke.js";
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
      <div ref={containerRef} style={{ minHeight: "90px", width: "100%", maxWidth: "728px" }} />
    </div>
  );
};

export default AdBanner728x90;
