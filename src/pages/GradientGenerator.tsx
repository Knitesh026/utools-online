import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

const GradientGenerator = () => {
  const [angle, setAngle] = useState("45");
  const [color1, setColor1] = useState("#FF6B6B");
  const [color2, setColor2] = useState("#4ECDC4");
  const [gradientType, setGradientType] = useState("linear");
  const [copied, setCopied] = useState(false);

  const cssGradient =
    gradientType === "linear"
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setAngle("45");
    setColor1("#FF6B6B");
    setColor2("#4ECDC4");
    setGradientType("linear");
    setCopied(false);
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Gradient Type</label>
          <div className="flex gap-2">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="linear"
                checked={gradientType === "linear"}
                onChange={(e) => setGradientType(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Linear</span>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="radial"
                checked={gradientType === "radial"}
                onChange={(e) => setGradientType(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Radial</span>
            </label>
          </div>
        </div>

        {gradientType === "linear" && (
          <div>
            <label htmlFor="angle" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
              Angle: {angle}°
            </label>
            <input
              id="angle"
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="w-full mt-2"
            />
          </div>
        )}

        <div>
          <label htmlFor="color1" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
            Color 1
          </label>
          <div className="flex gap-2 mt-2">
            <input
              id="color1"
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border border-gray-200 dark:border-gray-700"
            />
            <input
              type="text"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="flex-1 p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white rounded"
            />
          </div>
        </div>

        <div>
          <label htmlFor="color2" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
            Color 2
          </label>
          <div className="flex gap-2 mt-2">
            <input
              id="color2"
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border border-gray-200 dark:border-gray-700"
            />
            <input
              type="text"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="flex-1 p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white rounded"
            />
          </div>
        </div>
      </CardContent>
    </>
  );

  const outputSection = (
    <>
      <CardHeader>
        <CardTitle>Preview & Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="w-full h-48 rounded-lg shadow-lg border-4 border-gray-200 dark:border-gray-700"
          style={{ background: cssGradient }}
        />

        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">CSS CODE</p>
          <div className="p-3 bg-gray-900 dark:bg-black text-white rounded font-mono text-xs break-all max-h-24 overflow-y-auto">
            background: {cssGradient};
          </div>
        </div>
      </CardContent>
    </>
  );

  return (
    <ProfessionalToolLayout
      title="Gradient Generator"
      description="Create beautiful CSS gradients with live preview"
      inputSection={inputSection}
      outputSection={outputSection}
      actionButton={{
        label: "Generate",
        onClick: () => 
      <AdPopunder />
{},
        icon: "Palette",
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        { icon: "🎨", title: "Linear & Radial", description: "Multiple gradient types" },
        { icon: "🎯", title: "Customizable", description: "Full control and preview" },
        { icon: "📋", title: "Copy CSS", description: "Ready-to-use code" },
      ]}
      children={
        <button
          onClick={() => handleCopy(`background: ${cssGradient};`)}
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
              Copy CSS Code
            </>
          )}
        </button>
      }
    />
  );
};

export default GradientGenerator;
