import { useEffect, useRef } from "react";

export const AdBanner468x60 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAd = () => {
      if (!containerRef.current) return;
      
      const win = window as any;
      if (win.atOptions === undefined) {
        win.atOptions = {};
      }
      win.atOptions = {
        key: "1a312f9d66b39ae68001fff40d2e629c",
        format: "iframe",
        height: 60,
        width: 728,
        params: {},
      };
      
      // Load the ad script
      const script = document.createElement("script");
      script.src = "https://www.highperformanceformat.com/1a312f9d66b39ae68001fff40d2e629c/invoke.js";
      script.async = true;
      containerRef.current.appendChild(script);
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full flex flex-col items-center gap-4 ${className}`}>
      {/* Top Ad */}
      <div ref={containerRef} className="flex justify-center py-2 sm:py-3 px-2 sm:px-4">
      <div style={{ minHeight: "60px", width: "728px", maxWidth: "100%", flexShrink: 0 }} />
      </div>
      
      {/* Middle Content */}
      <div className="w-full flex justify-center">
      {/* Your main content goes here */}
      </div>
      
      {/* Bottom Ad */}
      <div className="flex justify-center py-2 sm:py-3 px-2 sm:px-4">
      <div style={{ minHeight: "60px", width: "728px", maxWidth: "100%", flexShrink: 0 }} />
      </div>
    </div>
  );
};

export default AdBanner468x60;
