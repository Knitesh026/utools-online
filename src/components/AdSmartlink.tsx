import { forwardRef } from "react";

export const AdSmartlink = forwardRef<
  HTMLAnchorElement,
  { className?: string; text?: string }
>(({ className = "", text = "Visit our partner site" }, ref) => {
  const smartlinkUrl = "https://www.effectivegatecpm.com/nkhtd0p2h?key=763203b70816cd6a51493184bec2be82";

  return (
    <a
      ref={ref}
      href={smartlinkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${className}`}
    >
      {text}
    </a>
  );
});

AdSmartlink.displayName = "AdSmartlink";

export default AdSmartlink;
