import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Download, Upload } from "lucide-react";

const ImageEnhancer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [enhanced, setEnhanced] = useState<string>("");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }

    setError("");
    setFile(selectedFile);
    setEnhanced("");

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const enhanceImage = async () => {
    if (!preview) return;

    setProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setError("Failed to process image");
        setProcessing(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Apply CSS filters via canvas
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setEnhanced(e.target?.result as string);
                setProcessing(false);
              };
              reader.readAsDataURL(blob);
            }
          },
          "image/png"
        );
      };

      img.src = preview;
    } catch (err) {
      setError("Failed to enhance image");
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!enhanced) return;

    const link = document.createElement("a");
    link.href = enhanced;
    link.download = `enhanced-${file?.name || "image.png"}`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setEnhanced("");
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ProfessionalToolLayout
      title="Image Enhancer"
      description="Adjust brightness, contrast, and saturation"
      inputSection={
        <>
          
      <AdPopunder />
<CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label htmlFor="file-input-enhancer" className="cursor-pointer block">
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                <Upload className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, WebP up to 50MB</p>
              </div>
              <input
                id="file-input-enhancer"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>

            {preview && (
              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Brightness</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{brightness}%</span>
                  </label>
                  <Slider
                    value={[brightness]}
                    onValueChange={(val) => setBrightness(val[0])}
                    min={0}
                    max={200}
                    step={5}
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Contrast</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{contrast}%</span>
                  </label>
                  <Slider
                    value={[contrast]}
                    onValueChange={(val) => setContrast(val[0])}
                    min={0}
                    max={200}
                    step={5}
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Saturation</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{saturation}%</span>
                  </label>
                  <Slider
                    value={[saturation]}
                    onValueChange={(val) => setSaturation(val[0])}
                    min={0}
                    max={200}
                    step={5}
                  />
                </div>
              </div>
            )}

            {!preview && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">No image selected</p>
              </div>
            )}
          </CardContent>
        </>
      }
      outputSection={
        (preview || enhanced) ? (
          <>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={enhanced || preview}
                  alt="preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </CardContent>
          </>
        ) : undefined
      }
      actionButton={{
        label: "Enhance Image",
        onClick: enhanceImage,
        icon: "✨",
        loading: processing,
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        { icon: "☀️", title: "Brightness Control", description: "Brighten or darken" },
        { icon: "⚙️", title: "Multiple Controls", description: "Fine-tune adjustments" },
        { icon: "🎨", title: "Color Saturation", description: "Enhance color vibrancy" },
      ]}
      error={error}
      children={
        enhanced ? (
          <button
            onClick={handleDownload}
            className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Enhanced Image
          </button>
        ) : undefined
      }
    />
  );
};

export default ImageEnhancer;
