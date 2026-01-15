import { useEffect, useRef } from "react";

export const AdNativeBanner = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAd = () => {
      if (!containerRef.current) return;
      
      // Load the native banner script
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "https://pl28438939.effectivegatecpm.com/1ecd23d58fd3a85d73e66bb4e80a97da/invoke.js";
      containerRef.current.appendChild(script);
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full flex justify-center py-6 sm:py-8 px-2 sm:px-4 ${className}`}>
      <div ref={containerRef} id="container-1ecd23d58fd3a85d73e66bb4e80a97da" />
    </div>
  );
};

export default AdNativeBanner;
