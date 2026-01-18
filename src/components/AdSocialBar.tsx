import { useEffect } from "react";

export const AdSocialBar = () => {
  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById("social-bar-1")) return;

    const script1 = document.createElement("script");
    script1.id = "social-bar-1";
    script1.src = "https://pl28438956.effectivegatecpm.com/00/f0/09/00f00986598af8d8398d08edf55aff69.js";
    script1.async = true;

    document.body.append(script1);
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default AdSocialBar;
