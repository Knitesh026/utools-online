import { useEffect, useRef } from "react";

export const AdBanner728x90 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAd = () => {
      if (!containerRef.current) return;
      
      const win = window as any;
      if (win.atOptions === undefined) {
        win.atOptions = {};
      }
      win.atOptions = {
        key: "ba27b45b1809423897eb07da8ecdc101",
        format: "iframe",
        height: 90,
        width: 728,
        params: {},
      };
      
      // Load the ad script
      const script = document.createElement("script");
      script.src = "https://www.highperformanceformat.com/ba27b45b1809423897eb07da8ecdc101/invoke.js";
      script.async = true;
      containerRef.current.appendChild(script);
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className={`w-full flex justify-center items-center py-4 px-2 sm:px-4 ${className}`}>
      <div style={{ minHeight: "90px", width: "728px", maxWidth: "100%" }} />
    </div>
  );
};

export default AdBanner728x90;
