import { useEffect, useRef, useMemo } from "react";
import { adManager } from "@/lib/adManager";

export const AdBanner728x90 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerId = useMemo(() => `banner_728x90_${Date.now()}_${Math.random()}`, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const config = {
      key: "ba27b45b1809423897eb07da8ecdc101",
      format: "iframe",
      height: 90,
      width: 728,
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
    <div className={`w-full flex justify-center px-2 sm:px-4 ${className}`}>
      <div ref={containerRef} style={{ minHeight: "90px", width: "100%", maxWidth: "728px" }} />
    </div>
  );
};

export default AdBanner728x90;
