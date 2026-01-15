import { useEffect, useRef } from "react";

export const AdBanner468x60 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAd = () => {
      if (!containerRef.current) return;
      
      // Create a script element that sets atOptions and loads the ad
      const script = document.createElement("script");
      script.textContent = `
        window.atOptions468x60 = {
          key: "1a312f9d66b39ae68001fff40d2e629c",
          format: "iframe",
          height: 60,
          width: 468,
          params: {}
        };
        window.atOptions = window.atOptions468x60;
      `;
      containerRef.current.appendChild(script);
      
      // Load the ad invoke script
      const adScript = document.createElement("script");
      adScript.src = "https://www.highperformanceformat.com/1a312f9d66b39ae68001fff40d2e629c/invoke.js";
      adScript.async = true;
      containerRef.current.appendChild(adScript);
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
