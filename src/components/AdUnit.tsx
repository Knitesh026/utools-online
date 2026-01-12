import { useEffect } from "react";

/**
 * AdUnit Component - Flexible ad placement system
 * Supports multiple ad networks and formats
 */

interface AdUnitProps {
  type: "banner-728x90" | "banner-468x60" | "popunder" | "smartlink" | "native" | "social-bar";
  className?: string;
}

interface BannerConfig {
  network: string;
  key: string;
  format: string;
  width: number;
  height: number;
  scriptUrl: string;
}

interface PopunderConfig {
  network: string;
  type: string;
  scriptUrl: string;
}

interface SmarklinkConfig {
  network: string;
  type: string;
  url: string;
}

interface NativeConfig {
  network: string;
  type: string;
  containerId: string;
  scriptUrl: string;
}

interface SocialBarConfig {
  network: string;
  type: string;
  scriptUrl: string;
}

type AdConfig = BannerConfig | PopunderConfig | SmarklinkConfig | NativeConfig | SocialBarConfig;

const AdConfigs: Record<string, AdConfig> = {
  "banner-728x90": {
    network: "highperformanceformat",
    key: "ba27b45b1809423897eb07da8ecdc101",
    format: "iframe",
    width: 728,
    height: 90,
    scriptUrl: "https://www.highperformanceformat.com/ba27b45b1809423897eb07da8ecdc101/invoke.js",
  } as BannerConfig,
  "banner-468x60": {
    network: "highperformanceformat",
    key: "1a312f9d66b39ae68001fff40d2e629c",
    format: "iframe",
    width: 468,
    height: 60,
    scriptUrl: "https://www.highperformanceformat.com/1a312f9d66b39ae68001fff40d2e629c/invoke.js",
  } as BannerConfig,
  "popunder": {
    network: "effectivegatecpm",
    type: "popunder",
    scriptUrl: "https://pl28438931.effectivegatecpm.com/9e/4f/c4/9e4fc482b5b90a0eaa81c26b92deb385.js",
  } as PopunderConfig,
  "smartlink": {
    network: "effectivegatecpm",
    type: "smartlink",
    url: "https://www.effectivegatecpm.com/nkhtd0p2h?key=763203b70816cd6a51493184bec2be82",
  } as SmarklinkConfig,
  "native": {
    network: "effectivegatecpm",
    type: "native",
    containerId: "container-1ecd23d58fd3a85d73e66bb4e80a97da",
    scriptUrl: "https://pl28438939.effectivegatecpm.com/1ecd23d58fd3a85d73e66bb4e80a97da/invoke.js",
  } as NativeConfig,
  "social-bar": {
    network: "effectivegatecpm",
    type: "socialbar",
    scriptUrl: "https://pl28438956.effectivegatecpm.com/00/f0/09/00f00986598af8d8398d08edf55aff69.js",
  } as SocialBarConfig,
};

export const AdUnit: React.FC<AdUnitProps> = ({ type, className = "" }) => {
  const config = AdConfigs[type];

  useEffect(() => {
    if (!config) return;

    // Load script based on ad type
    if (type.startsWith("banner")) {
      // Banner ads use atOptions pattern
      const bannerConfig = config as BannerConfig;
      const script = document.createElement("script");
      script.innerHTML = `
        atOptions = {
          'key' : '${bannerConfig.key}',
          'format' : 'iframe',
          'height' : ${bannerConfig.height},
          'width' : ${bannerConfig.width},
          'params' : {}
        };
      `;
      document.head.appendChild(script);

      const invokeScript = document.createElement("script");
      invokeScript.src = bannerConfig.scriptUrl;
      invokeScript.async = true;
      document.head.appendChild(invokeScript);

      return () => {
        if (document.head.contains(script)) document.head.removeChild(script);
        if (document.head.contains(invokeScript)) document.head.removeChild(invokeScript);
      };
    } else {
      // Other ad types load directly
      const otherConfig = config as PopunderConfig | SocialBarConfig | NativeConfig;
      const script = document.createElement("script");
      script.src = otherConfig.scriptUrl;
      script.async = true;
      if (type === "popunder" || type === "social-bar") {
        script.setAttribute("data-cfasync", "false");
      }
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) document.head.removeChild(script);
      };
    }
  }, [type, config]);

  if (!config) return null;

  // Render based on ad type
  if (type.startsWith("banner")) {
    const bannerConfig = config as BannerConfig;
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <div style={{ width: bannerConfig.width, height: bannerConfig.height }} />
      </div>
    );
  }

  if (type === "native") {
    const nativeConfig = config as NativeConfig;
    return (
      <div className={className}>
        <div id={nativeConfig.containerId} />
      </div>
    );
  }

  if (type === "smartlink") {
    const smartlinkConfig = config as SmarklinkConfig;
    return (
      <div className={className}>
        <a href={smartlinkConfig.url} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-opacity">
          Learn more
        </a>
      </div>
    );
  }

  // Popunder and social-bar render invisibly via script
  return null;
};

export default AdUnit;
