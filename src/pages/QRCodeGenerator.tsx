import { useState } from "react";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const QRCodeGenerator = () => {
  const [text, setText] = useState("https://example.com");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState("M");

  const generateQR = async () => {
    if (!text.trim()) {
      setError("Please enter text or URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const encodedText = encodeURIComponent(text);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&ecc=${errorLevel}`;
      setQrCode(qrUrl);
    } catch (err) {
      setError("Failed to generate QR code");
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qrcode.png";
    link.click();
  };

  const handleReset = () => {
    setText("https://example.com");
    setQrCode("");
    setError("");
    setSize(256);
    setErrorLevel("M");
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>QR Code Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100 block mb-2">
            Text or URL
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm min-h-20 resize-none dark:bg-gray-950"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100 block mb-2">
            Size: {size}x{size}px
          </label>
          <input
            type="range"
            min="128"
            max="512"
            step="64"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {[128, 256, 384, 512].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  size === s
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100 block mb-3">
            Error Correction Level
          </label>
          <div className="space-y-2">
            {[
              { value: "L", label: "Low (7%)" },
              { value: "M", label: "Medium (15%)" },
              { value: "Q", label: "Quartile (25%)" },
              { value: "H", label: "High (30%)" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                <input
                  type="radio"
                  name="errorLevel"
                  value={opt.value}
                  checked={errorLevel === opt.value}
                  onChange={() => setErrorLevel(opt.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </>
  );

  const outputSection = qrCode ? (
    <>
      <CardHeader>
        <CardTitle>Generated QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center bg-white dark:bg-gray-950 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <img src={qrCode} alt="Generated QR Code" className="max-w-xs" />
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="QR Code Generator"
      description="Create QR codes for any text, URL, or data with customizable settings"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      actionButton={{
        label: "Generate QR Code",
        onClick: generateQR,
        loading,
        icon: "Zap"
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset
      }}
      features={[
        {
          icon: "⚡",
          title: "Instant Generation",
          description: "Create QR codes in seconds"
        },
        {
          icon: "🎯",
          title: "Error Correction",
          description: "Multiple correction levels"
        },
        {
          icon: "📥",
          title: "Download",
          description: "Save as PNG image"
        }
      ]}
      colorTheme={{
        gradient: "from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950",
        accent: "blue"
      }}
    >
      
      {qrCode && (
        <div className="mt-4">
          <button
            onClick={downloadQR}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
          >
            Download QR Code
          </button>
        </div>
      )}
    </ProfessionalToolLayout>
  );
};

export default QRCodeGenerator;
