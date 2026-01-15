import { useEffect, useRef, useMemo } from "react";
import { adManager } from "@/lib/adManager";

export const AdBanner468x60 = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerId = useMemo(() => `banner_468x60_${Date.now()}_${Math.random()}`, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const config = {
      key: "1a312f9d66b39ae68001fff40d2e629c",
      format: "iframe",
      height: 60,
      width: 468,
      params: {},
    };

    adManager.register(
      bannerId,
      config,
      "https://www.highperformanceformat.com/1a312f9d66b39ae68001fff40d2e629c/invoke.js",
      containerRef.current
    );

    return () => {
      adManager.unregister(bannerId);
    };
  }, [bannerId]);

  return (
    <div className={`w-full flex justify-center px-2 sm:px-4 ${className}`}>
      <div ref={containerRef} style={{ minHeight: "60px", width: "100%", maxWidth: "468px" }} />
    </div>
  );
};

export default AdBanner468x60;
