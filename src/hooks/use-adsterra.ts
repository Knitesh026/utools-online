import { useEffect } from "react";

export const useAdsterraAds = () => {
  useEffect(() => {
    // Initialize Adsterra ads
    const script = document.createElement("script");
    script.src = "//a.adsterra.com/s/js/160616fe745475bed521854a284bae67/index.js?t=" + Math.random();
    script.async = true;
    document.head.appendChild(script);

    // Force reload ads periodically
    const interval = setInterval(() => {
      if ((window as any).AdController) {
        try {
          (window as any).AdController?.reload?.();
        } catch (e) {
          console.log("Ad reload error:", e);
        }
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
};

export default useAdsterraAds;
