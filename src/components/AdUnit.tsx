import { useEffect } from "react";

/**
 * Adsterra Ad Unit Component
 * Integrates Adsterra ad network with cookie consent
 */

interface AdUnitProps {
  type: "banner-728x90" | "banner-468x60" | "popunder" | "smartlink" | "native" | "social-bar";
  className?: string;
  hasConsent?: boolean;
}

const PUBLISHER_ID = "5522399";

const AdConfigs: Record<string, { zoneId: string }> = {
  "banner-728x90": { zoneId: "28338452" },
  "banner-468x60": { zoneId: "28338459" },
  "popunder": { zoneId: "28338432" },
  "smartlink": { zoneId: "28338456" },
  "native": { zoneId: "28338440" },
  "social-bar": { zoneId: "28338457" },
};

export const AdUnit: React.FC<AdUnitProps> = ({ type, className = "", hasConsent = true }) => {
  const config = AdConfigs[type];

  useEffect(() => {
    // Only load ads if user has given consent
    if (!hasConsent || !config) {
      console.log(`[AdUnit] Skipping ${type} - consent: ${hasConsent}, config: ${!!config}`);
      return;
    }

    // Adsterra requires a short delay for DOM to be ready
    const loadAdScript = () => {
      try {
        // Method 1: Try Adsterra's standard async script with zone ID
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://www.adsterra.com/code/bootstrap.js";
        script.setAttribute("data-zone-id", config.zoneId);
        
        const timeoutId = setTimeout(() => {
          console.warn(`[AdUnit] ${type} (zone ${config.zoneId}) bootstrap timeout - trying v2 endpoint`);
          // Method 2: Fallback to banner-v2.js endpoint
          const fallbackScript = document.createElement("script");
          fallbackScript.type = "text/javascript";
          fallbackScript.async = true;
          fallbackScript.src = "https://www.adsterra.com/code/banner-v2.js";
          fallbackScript.setAttribute("data-zone-id", config.zoneId);
          fallbackScript.onload = () => {
            console.log(`[AdUnit] ${type} (zone ${config.zoneId}) loaded via banner-v2`);
          };
          fallbackScript.onerror = () => {
            console.warn(`[AdUnit] ${type} (zone ${config.zoneId}) fallback (banner-v2) also failed`);
          };
          document.body.appendChild(fallbackScript);
        }, 6000); // 6 second timeout before fallback
        
        script.onload = () => {
          clearTimeout(timeoutId);
          console.log(`[AdUnit] ${type} (zone ${config.zoneId}) loaded via bootstrap`);
        };
        
        script.onerror = () => {
          clearTimeout(timeoutId);
          console.warn(`[AdUnit] Bootstrap load failed for ${type} (zone ${config.zoneId})`);
        };
        
        document.body.appendChild(script);
      } catch (e) {
        console.error(`[AdUnit] Error loading ${type}:`, e);
      }
    };

    // Load after a small delay to ensure page is ready
    const timer = setTimeout(loadAdScript, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [type, config, hasConsent]);

  if (!hasConsent) {
    return (
      <div className={`flex justify-center items-center bg-gray-100 dark:bg-gray-900 py-4 rounded ${className}`}>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Accept cookies to view ads
        </p>
      </div>
    );
  }

  if (!config) return null;

  // Render based on ad type
  if (type.startsWith("banner")) {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <div id={`container-${config.zoneId}`} data-zone-id={config.zoneId} />
      </div>
    );
  }

  if (type === "native") {
    return (
      <div className={className}>
        <div id={`container-${config.zoneId}`} data-zone-id={config.zoneId} />
      </div>
    );
  }

  if (type === "smartlink") {
    return (
      <div className={className}>
        <div id={`container-${config.zoneId}`} data-zone-id={config.zoneId} />
      </div>
    );
  }

  if (type === "social-bar" || type === "popunder") {
    // These render invisibly but still need container
    return <div id={`container-${config.zoneId}`} data-zone-id={config.zoneId} style={{ display: "none" }} />;
  }

  return null;
};

export default AdUnit;

