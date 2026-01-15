import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, RefreshCw } from "lucide-react";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";

const ImageConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [converted, setConverted] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState("jpeg");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const formatOptions = [
    { value: "jpeg", label: "JPEG (JPG)" },
    { value: "png", label: "PNG" },
    { value: "webp", label: "WebP" },
    { value: "bmp", label: "BMP" },
    { value: "gif", label: "GIF" },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }

    setError("");
    setFile(selectedFile);
    setConverted("");

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const convertImage = async () => {
    if (!file || !preview) return;

    setProcessing(true);
    setError("");

    try {
      const canvas = document.createElement("canvas");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setError("Failed to process image");
          setProcessing(false);
          return;
        }

        ctx.drawImage(img, 0, 0);

        // Convert to requested format
        const mimeType = `image/${outputFormat === "jpeg" ? "jpeg" : outputFormat}`;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setConverted(url);
            }
            setProcessing(false);
          },
          mimeType,
          0.95
        );
      };

      img.onerror = () => {
        setError("Failed to load image");
        setProcessing(false);
      };

      img.src = preview;
    } catch (err) {
      setError("Conversion failed. Please try again.");
      setProcessing(false);
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!converted) return;
    const link = document.createElement("a");
    link.href = converted;
    const extension = outputFormat === "jpeg" ? "jpg" : outputFormat;
    link.download = `converted-image.${extension}`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setConverted("");
    setError("");
    setOutputFormat("jpeg");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Select an image to convert</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label htmlFor="file-input-converter" className="cursor-pointer block">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
          >
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 50MB</p>
          </div>
          <input
            id="file-input-converter"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>

        {preview && (
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-3 aspect-video flex items-center justify-center">
              <img
                src={preview}
                alt="preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Output Format</label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formatOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={convertImage}
                disabled={processing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {processing ? "Converting..." : "Convert"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {!preview && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No image selected</p>
          </div>
        )}
      </CardContent>
    </>
  );

  const outputSection = converted ? (
    <>
      <CardHeader>
        <CardTitle>Converted Image</CardTitle>
        <CardDescription>{outputFormat.toUpperCase()} format</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-100 rounded-lg p-3 aspect-video flex items-center justify-center">
          <img
            src={converted}
            alt="converted"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <Button
          onClick={handleDownload}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Converted Image
        </Button>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Image Converter"
      description="Convert images between different formats with ease"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      features={[
        { icon: "🔄", title: "Multiple Formats", description: "PNG, JPEG, WebP, BMP, GIF" },
        { icon: "⚡", title: "Fast Processing", description: "Instant conversion" },
        { icon: "🔒", title: "Privacy Secure", description: "Client-side processing" },
      ]}
    />
  );
};

export default ImageConverter;
