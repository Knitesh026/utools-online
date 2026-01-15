import { useEffect } from "react";

interface AdsterraAdProps {
  slotId: string;
  type?: "horizontal" | "vertical" | "square";
  className?: string;
}

export const AdsterraAd = ({
  slotId,
  type = "horizontal",
  className = "",
}: AdsterraAdProps) => {
  useEffect(() => {
    // Push Adsterra ads
    if ((window as any).atob) {
      try {
        (window as any).AdController?.new?.({
          method: "banner",
          target: slotId,
          format: "js",
        });
      } catch (e) {
        console.log("Adsterra ad loading error:", e);
      }
    }

    // Reload ads if not showing
    setTimeout(() => {
      if ((window as any).atob) {
        try {
          (window as any).AdController?.new?.({
            method: "banner",
            target: slotId,
            format: "js",
          });
        } catch (e) {
          console.log("Adsterra ad retry error:", e);
        }
      }
    }, 1000);
  }, [slotId]);

  const getContainerClass = () => {
    const baseClass = "flex justify-center items-center min-h-[100px]";
    switch (type) {
      case "horizontal":
        return `${baseClass} w-full bg-gray-100 dark:bg-gray-900 rounded-lg`;
      case "vertical":
        return `${baseClass} w-[300px] h-[600px] bg-gray-100 dark:bg-gray-900 rounded-lg`;
      case "square":
        return `${baseClass} w-[300px] h-[300px] bg-gray-100 dark:bg-gray-900 rounded-lg`;
      default:
        return baseClass;
    }
  };

  return (
    <div
      id={slotId}
      className={`${getContainerClass()} ${className}`}
      data-ad-type={type}
    >
      {/* Ad will be injected here by Adsterra script */}
    </div>
  );
};

export default AdsterraAd;
