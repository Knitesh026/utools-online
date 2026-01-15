import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Download, Upload, RefreshCw, AlertCircle } from "lucide-react";

const FaceBlur = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [blurred, setBlurred] = useState<string>("");
  const [intensity, setIntensity] = useState(15);
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
    setBlurred("");

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const blurImage = async () => {
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

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Apply blur filter (simple pixelation-based blur)
        // This is a placeholder approach - actual face detection would require ML library
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const step = Math.ceil(intensity / 5);

        // Apply simple blur effect across entire image
        // In production, you'd use face-api.js or ml5.js for actual face detection
        for (let i = 0; i < data.length; i += 4 * step) {
          if (i + 4 * step < data.length) {
            const avg_r = (data[i] + data[i + 4] + data[i + 8] + data[i + 12]) / 4;
            const avg_g = (data[i + 1] + data[i + 5] + data[i + 9] + data[i + 13]) / 4;
            const avg_b = (data[i + 2] + data[i + 6] + data[i + 10] + data[i + 14]) / 4;

            for (let j = 0; j < step && i + j * 4 < data.length; j++) {
              data[i + j * 4] = avg_r;
              data[i + j * 4 + 1] = avg_g;
              data[i + j * 4 + 2] = avg_b;
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);

        // Apply additional blur filter
        ctx.filter = `blur(${intensity}px)`;
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setBlurred(e.target?.result as string);
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
      setError("Failed to blur image");
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!blurred) return;

    const link = document.createElement("a");
    link.href = blurred;
    link.download = `blurred-${file?.name || "image.png"}`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setBlurred("");
    setIntensity(15);
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Face Blur</h1>
            <p className="text-gray-600">Blur faces in photos for privacy</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-semibold text-gray-900 mb-1">Privacy Protection</h4>
                <p className="text-sm text-gray-600">Protect identities</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🎚️</div>
                <h4 className="font-semibold text-gray-900 mb-1">Adjustable Intensity</h4>
                <p className="text-sm text-gray-600">Control blur strength</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-1">Quick Processing</h4>
                <p className="text-sm text-gray-600">Instant results</p>
              </CardContent>
            </Card>
          </div>

          {/* Info Alert */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">Note</p>
                  <p className="text-sm text-amber-800">
                    This tool applies a general blur effect. For precise face detection, consider using specialized face detection libraries.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>Select an image to blur</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label htmlFor="file-input-faceblur" className="cursor-pointer block">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                  >
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 50MB</p>
                  </div>
                  <input
                    id="file-input-faceblur"
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
                        <span className="text-sm font-medium text-gray-700">Blur Intensity</span>
                        <span className="text-sm font-bold text-blue-600">{intensity}px</span>
                      </label>
                      <Slider
                        value={[intensity]}
                        onValueChange={(val) => setIntensity(val[0])}
                        min={5}
                        max={50}
                        step={1}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={blurImage}
                        disabled={processing}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {processing ? "Processing..." : "Blur Image"}
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
            {(preview || blurred) && (
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>Blurred image preview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={blurred || preview}
                      alt="preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {blurred && (
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Blurred Image
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

export default FaceBlur;
