import { useEffect } from "react";

export const AdPopunder = () => {
  useEffect(() => {
    const loadPopunder = () => {
      // Load the popunder script
      const script = document.createElement("script");
      script.src = "https://pl28438931.effectivegatecpm.com/9e/4f/c4/9e4fc482b5b90a0eaa81c26b92deb385.js";
      script.async = true;
      document.head.appendChild(script);
    };

    // Load popunder on component mount
    loadPopunder();
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default AdPopunder;
