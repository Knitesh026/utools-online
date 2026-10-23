import { useEffect, useRef } from "react";

/**
 * Google AdSense display unit.
 *
 * Renders nothing until a real slot id is configured, so the site never shows
 * empty placeholder boxes. Create ad units in AdSense, then set the ids in .env:
 *   VITE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx   (optional, defaults below)
 *   VITE_ADSENSE_SLOT_INLINE=1234567890
 *   VITE_ADSENSE_SLOT_SIDEBAR=1234567891
 *
 * If you use Auto ads only, leave the slots empty: the script in index.html
 * handles placement and this component stays hidden.
 */
const CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-1294105144279821";

const SLOTS = {
  inline: import.meta.env.VITE_ADSENSE_SLOT_INLINE as string | undefined,
  sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR as string | undefined,
};

/** True when a real slot id is configured for this placement. */
export const hasAdSlot = (placement: keyof typeof SLOTS) => Boolean(SLOTS[placement]);

interface AdUnitProps {
  placement: keyof typeof SLOTS;
  className?: string;
}

export const AdUnit = ({ placement, className = "" }: AdUnitProps) => {
  const slot = SLOTS[placement];
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    pushed.current = true;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // The AdSense script may be blocked by the visitor; nothing to do.
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <aside aria-label="Advertisement" className={`w-full flex flex-col items-center my-6 ${className}`}>
      <span className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground mb-1">
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: "90px" }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};

export default AdUnit;
