import { useState } from "react";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

const HexToRGB = () => {
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidHex = (h: string) => /^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(h);

  const hexToRgb = (h: string) => {
    const hexStr = h.replace("#", "");
    if (hexStr.length === 3) {
      return hexStr
        .split("")
        .map((x) => parseInt(x + x, 16))
        .join(", ");
    }
    const r = parseInt(hexStr.substring(0, 2), 16);
    const g = parseInt(hexStr.substring(2, 4), 16);
    const b = parseInt(hexStr.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  };

  const convert = () => {
    setLoading(true);
    if (!hex) {
      setError("Please enter a hex color");
      setLoading(false);
      return;
    }

    if (!isValidHex(hex)) {
      setError("Invalid hex color format. Use #RRGGBB or #RGB");
      setLoading(false);
      return;
    }

    try {
      setError("");
      setRgb(`rgb(${hexToRgb(hex)})`);
    } catch (err) {
      setError("Failed to convert color");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rgb);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHex("");
    setRgb("");
    setError("");
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Hex Color Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="hex" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Hex Color
          </Label>
          <Input
            id="hex"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#RRGGBB or #RGB"
            className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
        </div>

        {hex && isValidHex(hex) && (
          <div
            className="h-20 rounded-lg border-4 border-gray-300 dark:border-gray-600 shadow-sm transition-colors"
            style={{ backgroundColor: hex }}
          />
        )}
      </CardContent>
    </>
  );

  const outputSection = rgb ? (
    <>
      <CardHeader>
        <CardTitle>RGB Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-900 dark:bg-gray-950 rounded-lg text-white font-mono break-all border border-gray-700">
          {rgb}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">HEX</div>
            <div className="text-xl font-bold text-blue-900 dark:text-blue-400 mt-1 break-all">{hex}</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="text-sm font-semibold text-green-700 dark:text-green-300">RGB</div>
            <div className="text-xl font-bold text-green-900 dark:text-green-400 mt-1 break-all">{rgb}</div>
          </div>
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Hex to RGB Converter"
      description="Convert between hex and RGB color formats instantly"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      actionButton={{
        label: "Convert",
        onClick: convert,
        icon: "Palette",
        loading,
        disabled: !hex,
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        { icon: "🎨", title: "Color Conversion", description: "Hex to RGB conversion" },
        { icon: "🔄", title: "Instant", description: "Real-time conversion" },
        { icon: "📋", title: "Easy Copy", description: "One-click clipboard" },
      ]}
      children={rgb ? (
        <button
          onClick={handleCopy}
          className={`w-full mt-4 px-8 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            copied
              ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          } text-white`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy RGB
            </>
          )}
        </button>
      ) : undefined}
    />
  );
};

export default HexToRGB;
