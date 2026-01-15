import { useEffect } from "react";

export const useAdsterraAds = () => {
  useEffect(() => {
    // The script is already loaded in index.html
    // This hook just ensures AdController is available globally
    if (!(window as any).AdController) {
      (window as any).AdController = {};
    }
  }, []);
};

export default useAdsterraAds;
