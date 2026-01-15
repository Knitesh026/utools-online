import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload } from "lucide-react";

const ImageUpscaler = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [upscaled, setUpscaled] = useState<string>("");
  const [scale, setScale] = useState(2);
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [upscaledSize, setUpscaledSize] = useState({ width: 0, height: 0 });
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
    setUpscaled("");

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);

      const img = new Image();
      img.onload = () => {
        setOriginalSize({ width: img.width, height: img.height });
        setUpscaledSize({ width: img.width * scale, height: img.height * scale });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const upscaleImage = async () => {
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
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Use high-quality image smoothing
        ctx.imageSmoothingQuality = "high";
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        setUpscaledSize({ width: newWidth, height: newHeight });

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setUpscaled(e.target?.result as string);
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
      setError("Failed to upscale image");
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!upscaled) return;

    const link = document.createElement("a");
    link.href = upscaled;
    link.download = `upscaled-${scale}x-${file?.name || "image.png"}`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setUpscaled("");
    setScale(2);
    setOriginalSize({ width: 0, height: 0 });
    setUpscaledSize({ width: 0, height: 0 });
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };  return (
    <ProfessionalToolLayout
      title="Image Upscaler"
      description="Enlarge images while preserving quality"
      inputSection={
        <>
          
      <AdPopunder />
<CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label htmlFor="file-input-upscaler" className="cursor-pointer block">
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                <Upload className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, WebP up to 50MB</p>
              </div>
              <input
                id="file-input-upscaler"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>

            {preview && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Original Size</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
                      {originalSize.width} x {originalSize.height}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Result Size</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
                      {upscaledSize.width} x {upscaledSize.height}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Upscale Factor</label>
                  <Select value={String(scale)} onValueChange={(val) => setScale(Number(val) as 2 | 3 | 4)}>
                    <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2x Upscale</SelectItem>
                      <SelectItem value="3">3x Upscale</SelectItem>
                      <SelectItem value="4">4x Upscale</SelectItem>
                    </SelectContent>
                  </Select>
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
        (preview || upscaled) ? (
          <>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={upscaled || preview}
                  alt="preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </CardContent>
          </>
        ) : undefined
      }
      actionButton={{
        label: "Upscale Image",
        onClick: upscaleImage,
        icon: "🔍",
        loading: processing,
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        { icon: "🔍", title: "Enlarge Images", description: "2x, 3x, 4x scaling" },
        { icon: "✨", title: "Quality Preservation", description: "Advanced smoothing" },
        { icon: "📏", title: "Size Display", description: "Original & result info" },
      ]}
      error={error}
      children={
        upscaled ? (
          <button
            onClick={handleDownload}
            className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Upscaled Image
          </button>
        ) : undefined
      }
    />
  );
};

export default ImageUpscaler;
