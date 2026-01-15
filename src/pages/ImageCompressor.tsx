import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [compressed, setCompressed] = useState<string>("");
  const [quality, setQuality] = useState(70);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

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
    setOriginalSize(selectedFile.size);
    setCompressedSize(0);
    setCompressed("");

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const compressImage = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setCompressed(e.target?.result as string);
                setCompressedSize(blob.size);
                setProcessing(false);
              };
              reader.readAsDataURL(blob);
            }
          },
          "image/jpeg",
          quality / 100
        );
      };

      img.src = preview;
    } catch (err) {
      setError("Failed to compress image");
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressed) return;

    const link = document.createElement("a");
    link.href = compressed;
    link.download = `compressed-${file?.name || "image.jpg"}`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setCompressed("");
    setQuality(70);
    setOriginalSize(0);
    setCompressedSize(0);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const compressionRatio = originalSize > 0 && compressedSize > 0 
    ? Math.round((1 - compressedSize / originalSize) * 100) 
    : 0;

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <label htmlFor="file-input-compressor" className="cursor-pointer block">
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <Upload className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, WebP up to 50MB</p>
          </div>
          <input
            id="file-input-compressor"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Quality: {quality}%
              </label>
              <Slider
                value={[quality]}
                onValueChange={(val) => setQuality(val[0])}
                min={10}
                max={100}
                step={5}
              />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Original Size</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">{formatBytes(originalSize)}</p>
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
  );

  const outputSection = compressed ? (
    <>
      <CardHeader>
        <CardTitle>Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <img
            src={compressed}
            alt="compressed"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">COMPRESSED</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{formatBytes(compressedSize)}</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-xs font-semibold text-green-700 dark:text-green-300">REDUCTION</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">{compressionRatio}%</p>
          </div>
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Image Compressor"
      description="Reduce image file size while maintaining quality"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      actionButton={{
        label: "Compress",
        onClick: compressImage,
        icon: "Zap",
        loading: processing,
        disabled: !preview || processing,
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        {
          icon: "🗜️",
          title: "High Compression",
          description: "Reduce size up to 80%",
        },
        {
          icon: "⚙️",
          title: "Quality Control",
          description: "Adjust compression level",
        },
        {
          icon: "⚡",
          title: "Instant Results",
          description: "Real-time compression",
        },
      ]}
      children={
        compressed && (
          <Button
            onClick={handleDownload}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
          >
            
      <AdPopunder />
<Download className="w-4 h-4 mr-2" />
            Download Compressed Image
          </Button>
        )
      }
    />
  );
};

export default ImageCompressor;
