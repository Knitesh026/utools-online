import { useEffect, useRef, useMemo } from "react";
import { adManager } from "@/lib/adManager";

export const AdBanner300x250 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerId = useMemo(() => `banner_300x250_${Date.now()}_${Math.random()}`, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const config = {
      key: "ba27b45b1809423897eb07da8ecdc101",
      format: "iframe",
      height: 250,
      width: 300,
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
      className={`ad-container-300x250 flex justify-center ${className}`}
      style={{ minHeight: "250px", minWidth: "300px" }}
    />
  );
};

export default AdBanner300x250;
