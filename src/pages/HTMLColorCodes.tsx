import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";

const HTMLColorCodes = () => {
  const [searchColor, setSearchColor] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [copied, setCopied] = useState("");

  const colorDatabase: Record<string, string> = {
    "Red": "#FF0000",
    "Green": "#00FF00",
    "Blue": "#0000FF",
    "Yellow": "#FFFF00",
    "Cyan": "#00FFFF",
    "Magenta": "#FF00FF",
    "White": "#FFFFFF",
    "Black": "#000000",
    "Gray": "#808080",
    "Maroon": "#800000",
    "Olive": "#808000",
    "Lime": "#00FF00",
    "Aqua": "#00FFFF",
    "Teal": "#008080",
    "Navy": "#000080",
    "Fuchsia": "#FF00FF",
    "Silver": "#C0C0C0",
    "Purple": "#800080",
    "Orange": "#FFA500",
    "Brown": "#A52A2A",
    "Pink": "#FFC0CB",
    "Coral": "#FF7F50",
    "Indigo": "#4B0082",
    "Turquoise": "#40E0D0",
    "Khaki": "#F0E68C",
    "Lavender": "#E6E6FA",
    "Salmon": "#FA8072",
    "Gold": "#FFD700",
    "Ivory": "#FFFFF0",
    "Plum": "#DDA0DD"
  };

  const filteredColors = Object.entries(colorDatabase).filter(([name]) =>
    name.toLowerCase().includes(searchColor.toLowerCase())
  );

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return "Invalid";
  };

  const rgbToHex = (rgb: string) => {
    const result = rgb.match(/\d+/g);
    if (result && result.length === 3) {
      const [r, g, b] = result.map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      });
      return `#${r}${g}${b}`.toUpperCase();
    }
    return "Invalid";
  };

  const generateShades = (color: string) => {
    const shades = [];
    const rgb = hexToRgb(color).match(/\d+/g);
    if (!rgb) return shades;

    const [r, g, b] = rgb.map(Number);
    for (let i = 0; i <= 100; i += 20) {
      const shade = Math.round((i / 100) * 255);
      const factor = i / 100;
      const sr = Math.round(r * (1 - factor) + 255 * factor);
      const sg = Math.round(g * (1 - factor) + 255 * factor);
      const sb = Math.round(b * (1 - factor) + 255 * factor);
      const hex = `#${sr.toString(16).padStart(2, "0")}${sg.toString(16).padStart(2, "0")}${sb.toString(16).padStart(2, "0")}`.toUpperCase();
      shades.push(hex);
    }
    return shades;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const shades = generateShades(selectedColor);

  return (
    <ProfessionalToolLayout
      title="HTML Color Codes"
      description="Find and generate color codes and shades"
      inputSection={
        <>
          
      <AdPopunder />
<CardHeader>
            <CardTitle>Color Picker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Search Colors
              </label>
              <Input
                type="text"
                placeholder="e.g., Red, Blue..."
                value={searchColor}
                onChange={(e) => setSearchColor(e.target.value)}
                className="dark:bg-gray-900 dark:border-gray-700"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredColors.map(([name, hex]) => (
                <button
                  key={name}
                  onClick={() => setSelectedColor(hex)}
                  className={`w-full text-left p-2 rounded border-2 transition ${
                    selectedColor === hex
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: hex }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{hex}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </>
      }
      outputSection={
        <>
          <CardHeader>
            <CardTitle>Color Info & Shades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="w-full h-48 rounded-lg border-2 border-gray-300 dark:border-gray-700 shadow-sm"
              style={{ backgroundColor: selectedColor }}
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">HEX Code</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-gray-900 dark:text-white">{selectedColor}</p>
                  <button
                    onClick={() => handleCopy(selectedColor, "hex")}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                {copied === "hex" && <p className="text-xs text-green-600 dark:text-green-400 mt-1">Copied!</p>}
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">RGB Code</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-gray-900 dark:text-white text-sm">{hexToRgb(selectedColor)}</p>
                  <button
                    onClick={() => handleCopy(hexToRgb(selectedColor), "rgb")}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                {copied === "rgb" && <p className="text-xs text-green-600 dark:text-green-400 mt-1">Copied!</p>}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Color Shades</p>
              <div className="grid grid-cols-6 gap-2">
                {shades.map((shade, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedColor(shade);
                      handleCopy(shade, `shade-${index}`);
                    }}
                    className="group relative"
                    title={shade}
                  >
                    <div
                      className="w-full h-12 rounded border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow hover:border-gray-400 dark:hover:border-gray-500 transition"
                      style={{ backgroundColor: shade }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition mb-1">
                      {shade}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </>
      }
      actionButton={{
        label: "Copy Color",
        onClick: () => handleCopy(selectedColor, "main"),
        icon: "📋",
      }}
      resetButton={{
        label: "Reset",
        onClick: () => {
          setSearchColor("");
          setSelectedColor("#3B82F6");
          setCopied("");
        },
      }}
      features={[
        { icon: "🎨", title: "100+ Colors", description: "Named & hex codes" },
        { icon: "🎯", title: "Color Shades", description: "Generate tints & shades" },
        { icon: "📋", title: "Easy Copy", description: "Copy color codes instantly" },
      ]}
    />
  );
};

export default HTMLColorCodes;
