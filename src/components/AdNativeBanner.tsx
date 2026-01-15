import { useEffect, useRef } from "react";

export const AdNativeBanner = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Load the native banner script
    const script = document.createElement("script");
    script.src = "https://pl28438939.effectivegatecpm.com/1ecd23d58fd3a85d73e66bb4e80a97da/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div ref={containerRef} className={`w-full flex justify-center items-center py-4 ${className}`}>
      <div id="container-1ecd23d58fd3a85d73e66bb4e80a97da" className="flex justify-center w-full" />
    </div>
  );
};

export default AdNativeBanner;
