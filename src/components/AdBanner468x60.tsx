import { useEffect, useRef } from "react";

export const AdBanner368x60 = ({ className = "" }: { className?: string }) => {
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
        width: 368,
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
    <div className={`w-full flex justify-center px-2 sm:px-4 ${className}`}>
      <div ref={containerRef} style={{ minHeight: "60px", width: "100%", maxWidth: "368px" }} />
    </div>
  );
};

export default AdBanner368x60;
