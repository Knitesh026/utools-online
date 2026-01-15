import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Download, Upload, RefreshCw } from "lucide-react";

const ImagePixelator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [pixelated, setPixelated] = useState<string>("");
  const [pixelSize, setPixelSize] = useState(10);
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
    setPixelated("");

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const pixelateImage = async () => {
    if (!preview) return;

    setProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const img = new Image();

      img.onload = () => {
        const w = img.width;
        const h = img.height;
        const size = pixelSize;

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");

        // Draw original image smaller
        const smallCanvas = document.createElement("canvas");
        smallCanvas.width = Math.ceil(w / size);
        smallCanvas.height = Math.ceil(h / size);
        const smallCtx = smallCanvas.getContext("2d");

        smallCtx?.drawImage(img, 0, 0, smallCanvas.width, smallCanvas.height);

        // Scale back up (pixelated effect)
        ctx?.drawImage(smallCanvas, 0, 0, smallCanvas.width, smallCanvas.height, 0, 0, w, h);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setPixelated(e.target?.result as string);
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
      setError("Failed to pixelate image");
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pixelated) return;

    const link = document.createElement("a");
    link.href = pixelated;
    link.download = `pixelated-${file?.name || "image.png"}`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setPixelated("");
    setPixelSize(10);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Image Pixelator</h1>
            <p className="text-gray-600">Create pixelated or mosaic effects on images</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-semibold text-gray-900 mb-1">Pixelated Effect</h4>
                <p className="text-sm text-gray-600">Create blocky pixel art</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">⚙️</div>
                <h4 className="font-semibold text-gray-900 mb-1">Adjustable</h4>
                <p className="text-sm text-gray-600">Control pixel size</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-1">Instant</h4>
                <p className="text-sm text-gray-600">Real-time preview</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>Select an image to pixelate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label htmlFor="file-input-pixelator" className="cursor-pointer block">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                  >
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 50MB</p>
                  </div>
                  <input
                    id="file-input-pixelator"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>

                {preview && (
                  <div className="space-y-3">
                    <div>
                      <label className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Pixel Size</span>
                        <span className="text-sm font-bold text-blue-600">{pixelSize}px</span>
                      </label>
                      <Slider
                        value={[pixelSize]}
                        onValueChange={(val) => setPixelSize(val[0])}
                        min={2}
                        max={50}
                        step={1}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={pixelateImage}
                        disabled={processing}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {processing ? "Processing..." : "Pixelate Image"}
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
            </Card>

            {/* Output Section */}
            {(preview || pixelated) && (
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>Pixelated image preview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={pixelated || preview}
                      alt="preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {pixelated && (
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Pixelated Image
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-red-700">{error}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ImagePixelator;
