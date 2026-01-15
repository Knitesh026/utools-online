import { useEffect } from "react";

export const AdNativeBanner = ({ className = "" }: { className?: string }) => {
  useEffect(() => {
    // Load the native banner script
    const script = document.createElement("script");
    script.src = "https://pl28438939.effectivegatecpm.com/1ecd23d58fd3a85d73e66bb4e80a97da/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);
  }, []);

  return (
    <div className={`py-4 ${className}`}>
      <div id="container-1ecd23d58fd3a85d73e66bb4e80a97da" className="flex justify-center" />
    </div>
  );
};

export default AdNativeBanner;
