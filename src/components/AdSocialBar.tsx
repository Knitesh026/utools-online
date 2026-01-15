import { useEffect } from "react";

export const AdSocialBar = () => {
  useEffect(() => {
    const loadSocialBar = () => {
      // Load the social bar script
      const script = document.createElement("script");
      script.src = "https://pl28438956.effectivegatecpm.com/00/f0/09/00f00986598af8d8398d08edf55aff69.js";
      script.async = true;
      document.body.appendChild(script);
    };

    // Load social bar on component mount
    loadSocialBar();
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default AdSocialBar;
