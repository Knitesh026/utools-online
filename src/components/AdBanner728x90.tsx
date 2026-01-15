import { useEffect } from "react";

export const AdBanner728x90 = ({ className = "" }: { className?: string }) => {
  useEffect(() => {
    const loadAd = () => {
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
      document.body.appendChild(script);
    };

    loadAd();
  }, []);

  return (
    <div className={`flex justify-center py-4 ${className}`}>
      <div style={{ minHeight: "90px", width: "728px", maxWidth: "100%" }} />
    </div>
  );
};

export default AdBanner728x90;
