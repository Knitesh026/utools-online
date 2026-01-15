import { useEffect } from "react";

export const AdBanner468x60 = ({ className = "" }: { className?: string }) => {
  useEffect(() => {
    const loadAd = () => {
      const win = window as any;
      if (win.atOptions === undefined) {
        win.atOptions = {};
      }
      win.atOptions = {
        key: "1a312f9d66b39ae68001fff40d2e629c",
        format: "iframe",
        height: 60,
        width: 468,
        params: {},
      };
      
      // Load the ad script
      const script = document.createElement("script");
      script.src = "https://www.highperformanceformat.com/1a312f9d66b39ae68001fff40d2e629c/invoke.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadAd();
  }, []);

  return (
    <div className={`flex justify-center py-3 ${className}`}>
      <div style={{ minHeight: "60px", width: "468px", maxWidth: "100%" }} />
    </div>
  );
};

export default AdBanner468x60;
