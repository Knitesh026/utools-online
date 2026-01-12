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

    // Load Adsterra ad script for this specific zone
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://cdn.adn.thebrave.io/ads/${config.zoneId}/embed.js`;
    script.onload = () => {
      console.log(`[AdUnit] ${type} (zone ${config.zoneId}) loaded successfully`);
    };
    script.onerror = () => {
      console.error(`[AdUnit] Failed to load ${type} (zone ${config.zoneId})`);
    };
    
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
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

