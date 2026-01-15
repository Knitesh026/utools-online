import { useEffect, useRef, useMemo } from "react";
import { adManager } from "@/lib/adManager";

export const AdBannerSticky320x100 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerId = useMemo(() => `banner_sticky_320x100_${Date.now()}_${Math.random()}`, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const config = {
      key: "ba27b45b1809423897eb07da8ecdc101",
      format: "iframe",
      height: 100,
      width: 320,
      params: {},
    };

    adManager.register(
      bannerId,
      config,
      "https://www.highperformanceformat.com/ba27b45b1809423897eb07da8ecdc101/invoke.js",
      containerRef.current
    );

    return () => {
      adManager.unregister(bannerId);
    };
  }, [bannerId]);

  return (
    <div 
      ref={containerRef} 
      className={`ad-container-sticky-mobile fixed bottom-0 left-0 right-0 z-40 flex justify-center md:hidden bg-white border-t ${className}`}
      style={{ minHeight: "100px", minWidth: "100%" }}
    />
  );
};

export default AdBannerSticky320x100;
