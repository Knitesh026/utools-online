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

    // Load Adsterra ad script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.adsterra.com/code/banner.js`;
    
    // Insert before loading to ensure atob and other globals are available
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Adsterra ad
      if (typeof (window as any).atob === "function") {
        // Ad code will auto-initialize based on data attributes
        console.log(`[AdUnit] ${type} loaded successfully`);
      }
    };

    script.onerror = () => {
      console.error(`[AdUnit] Failed to load ${type}`);
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
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
        <div
          data-zone-id={config.zoneId}
          data-ad-width="auto"
          data-ad-height="auto"
          style={{ minHeight: type === "banner-728x90" ? "90px" : "60px" }}
        />
      </div>
    );
  }

  if (type === "native") {
    return (
      <div className={className}>
        <div
          data-zone-id={config.zoneId}
          data-ad-width="auto"
          data-ad-height="auto"
        />
      </div>
    );
  }

  if (type === "social-bar" || type === "popunder") {
    // These render invisibly via script
    return (
      <div
        data-zone-id={config.zoneId}
        style={{ display: "none" }}
      />
    );
  }

  return null;
};

export default AdUnit;

