import { useState, useEffect } from "react";
import { X } from "lucide-react";

/**
 * CookieConsent Component
 * Floating banner to request user permission for third-party ad cookies
 */
export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show banner only if no consent decision yet
      setVisible(true);
    }

    // Listen for changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cookieConsent" && e.newValue) {
        setVisible(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
    // Trigger reload to load ads
    window.dispatchEvent(new StorageEvent("storage", { key: "cookieConsent", newValue: "accepted" }));
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setVisible(false);
    window.dispatchEvent(new StorageEvent("storage", { key: "cookieConsent", newValue: "rejected" }));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-4 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
          🍪 Cookie Consent
        </h3>
        <button
          onClick={handleReject}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0 ml-2"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        We use cookies to show relevant ads and improve your experience. Accepting helps support our free tools.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;

