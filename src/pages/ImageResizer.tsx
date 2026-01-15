import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

const ImageResizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [resized, setResized] = useState<string>("");
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [maintainAspect, setMaintainAspect] = useState(true);
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
    setResized("");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setPreview(e.target?.result as string);
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleHeightChange = (newHeight: string) => {
    setHeight(newHeight);
    if (maintainAspect && file && preview) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const newWidth = Math.round(parseFloat(newHeight) * aspectRatio);
        setWidth(newWidth.toString());
      };
      img.src = preview;
    }
  };

  const handleWidthChange = (newWidth: string) => {
    setWidth(newWidth);
    if (maintainAspect && file && preview) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const newHeight = Math.round(parseFloat(newWidth) / aspectRatio);
        setHeight(newHeight.toString());
      };
      img.src = preview;
    }
  };

  const resizeImage = async () => {
    if (!file || !preview) return;

    setProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const img = new Image();

      img.onload = () => {
        const w = parseFloat(width);
        const h = parseFloat(height);

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, w, h);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setResized(e.target?.result as string);
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
      setError("Failed to resize image");
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resized) return;

    const link = document.createElement("a");
    link.href = resized;
    link.download = `resized-${file?.name || "image.png"}`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setResized("");
    setWidth("800");
    setHeight("600");
    setMaintainAspect(true);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <label htmlFor="file-input-resizer" className="cursor-pointer block">
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <Upload className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, WebP up to 50MB</p>
          </div>
          <input
            id="file-input-resizer"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>

        {preview && (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <img
                src={preview}
                alt="preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium mb-2 block">Width (px)</Label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  min="1"
                  className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:ring-blue-500"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Height (px)</Label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  min="1"
                  className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:ring-blue-500"
                />
              </div>
            </div>

            <label className="flex items-center cursor-pointer p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <input
                type="checkbox"
                checked={maintainAspect}
                onChange={(e) => setMaintainAspect(e.target.checked)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Maintain aspect ratio</span>
            </label>
          </div>
        )}

        {!preview && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">No image selected</p>
          </div>
        )}
      </CardContent>
    </>
  );

  const outputSection = resized ? (
    <>
      <CardHeader>
        <CardTitle>Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <img
            src={resized}
            alt="resized"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">NEW DIMENSIONS</p>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-200 mt-2">
            {width}×{height}
          </p>
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Image Resizer"
      description="Resize images to custom dimensions with ease"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      actionButton={{
        label: "Resize",
        onClick: resizeImage,
        icon: "Maximize2",
        loading: processing,
        disabled: !preview || processing,
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        {
          icon: "📏",
          title: "Custom Size",
          description: "Set any width and height",
        },
        {
          icon: "🔒",
          title: "Aspect Ratio",
          description: "Maintain proportions",
        },
        {
          icon: "⚡",
          title: "Instant Resize",
          description: "Real-time preview",
        },
      ]}
      children={
        resized && (
          <Button
            onClick={handleDownload}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
          >
            
      <AdPopunder />
<Download className="w-4 h-4 mr-2" />
            Download Resized Image
          </Button>
        )
      }
    />
  );
};

export default ImageResizer;
