import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Upload, RefreshCw } from "lucide-react";

const CropImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [cropped, setCropped] = useState<string>("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [aspect, setAspect] = useState<"16:9" | "4:3" | "1:1" | "free">("16:9");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [originalDims, setOriginalDims] = useState({ width: 0, height: 0 });

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
    setCropped("");

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);

      const img = new Image();
      img.onload = () => {
        setOriginalDims({ width: img.width, height: img.height });
        setWidth(Math.floor(img.width * 0.8));
        setHeight(Math.floor(img.height * 0.8));
        setX(Math.floor(img.width * 0.1));
        setY(Math.floor(img.height * 0.1));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const updateDimensionsForAspect = (newAspect: string, baseWidth?: number, baseHeight?: number) => {
    const w = baseWidth || originalDims.width;
    const h = baseHeight || originalDims.height;

    switch (newAspect) {
      case "16:9":
        if (w >= h) {
          const newH = Math.floor(w * (9 / 16));
          setHeight(Math.min(newH, h));
        } else {
          const newW = Math.floor(h * (16 / 9));
          setWidth(Math.min(newW, w));
        }
        break;
      case "4:3":
        if (w >= h) {
          const newH = Math.floor(w * (3 / 4));
          setHeight(Math.min(newH, h));
        } else {
          const newW = Math.floor(h * (4 / 3));
          setWidth(Math.min(newW, w));
        }
        break;
      case "1:1":
        const size = Math.min(w, h);
        setWidth(size);
        setHeight(size);
        break;
    }
  };

  const cropImage = async () => {
    if (!preview || width <= 0 || height <= 0) {
      setError("Please set valid crop dimensions");
      return;
    }

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
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setCropped(e.target?.result as string);
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
      setError("Failed to crop image");
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!cropped) return;

    const link = document.createElement("a");
    link.href = cropped;
    link.download = `cropped-${file?.name || "image.png"}`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setCropped("");
    setX(0);
    setY(0);
    setWidth(0);
    setHeight(0);
    setAspect("16:9");
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Crop Image</h1>
            <p className="text-gray-600">Crop images with aspect ratio presets</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">✂️</div>
                <h4 className="font-semibold text-gray-900 mb-1">Precise Cropping</h4>
                <p className="text-sm text-gray-600">Set exact dimensions</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">📐</div>
                <h4 className="font-semibold text-gray-900 mb-1">Aspect Ratios</h4>
                <p className="text-sm text-gray-600">16:9, 4:3, 1:1, free</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">👁️</div>
                <h4 className="font-semibold text-gray-900 mb-1">Live Preview</h4>
                <p className="text-sm text-gray-600">See crop in real-time</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>Select an image to crop</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label htmlFor="file-input-crop" className="cursor-pointer block">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                  >
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 50MB</p>
                  </div>
                  <input
                    id="file-input-crop"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>

                {preview && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Aspect Ratio</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["16:9", "4:3", "1:1", "free"].map((a) => (
                          <Button
                            key={a}
                            onClick={() => {
                              setAspect(a as any);
                              if (a !== "free") updateDimensionsForAspect(a);
                            }}
                            variant={aspect === a ? "default" : "outline"}
                            className="text-sm"
                          >
                            {a}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="x" className="text-xs text-gray-600">
                          X Position
                        </Label>
                        <Input
                          id="x"
                          type="number"
                          value={x}
                          onChange={(e) => setX(Number(e.target.value))}
                          min={0}
                          max={originalDims.width}
                        />
                      </div>
                      <div>
                        <Label htmlFor="y" className="text-xs text-gray-600">
                          Y Position
                        </Label>
                        <Input
                          id="y"
                          type="number"
                          value={y}
                          onChange={(e) => setY(Number(e.target.value))}
                          min={0}
                          max={originalDims.height}
                        />
                      </div>
                      <div>
                        <Label htmlFor="width" className="text-xs text-gray-600">
                          Width
                        </Label>
                        <Input
                          id="width"
                          type="number"
                          value={width}
                          onChange={(e) => {
                            const newW = Number(e.target.value);
                            setWidth(newW);
                            if (aspect !== "free") {
                              updateDimensionsForAspect(aspect, newW, height);
                            }
                          }}
                          min={1}
                          max={originalDims.width}
                        />
                      </div>
                      <div>
                        <Label htmlFor="height" className="text-xs text-gray-600">
                          Height
                        </Label>
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => {
                            const newH = Number(e.target.value);
                            setHeight(newH);
                            if (aspect !== "free") {
                              updateDimensionsForAspect(aspect, width, newH);
                            }
                          }}
                          min={1}
                          max={originalDims.height}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={cropImage}
                        disabled={processing}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {processing ? "Processing..." : "Crop Image"}
                      </Button>
                      <Button onClick={handleReset} variant="outline" className="flex-1">
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
            {(preview || cropped) && (
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    {width}×{height}px
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={cropped || preview}
                      alt="preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {cropped && (
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Cropped Image
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

export default CropImage;
