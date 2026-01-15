import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, RefreshCw } from "lucide-react";

const HistogramGenerator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [histogramCanvas, setHistogramCanvas] = useState<string>("");
  const [stats, setStats] = useState({
    brightness: 0,
    contrast: 0,
    avgR: 0,
    avgG: 0,
    avgB: 0,
  });
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
    setHistogramCanvas("");

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const generateHistogram = async () => {
    if (!preview) return;

    setProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const img = new Image();

      img.onload = () => {
        const w = img.width;
        const h = img.height;

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setError("Failed to process image");
          setProcessing(false);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        // Calculate histogram
        const histogram = {
          r: Array(256).fill(0),
          g: Array(256).fill(0),
          b: Array(256).fill(0),
          brightness: Array(256).fill(0),
        };

        let sumR = 0, sumG = 0, sumB = 0;
        const pixelCount = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          histogram.r[r]++;
          histogram.g[g]++;
          histogram.b[b]++;

          const brightness = Math.round((r + g + b) / 3);
          histogram.brightness[brightness]++;

          sumR += r;
          sumG += g;
          sumB += b;
        }

        // Calculate statistics
        const avgR = Math.round(sumR / pixelCount);
        const avgG = Math.round(sumG / pixelCount);
        const avgB = Math.round(sumB / pixelCount);
        const avgBrightness = Math.round((avgR + avgG + avgB) / 3);

        // Calculate contrast (standard deviation)
        let sumVarR = 0, sumVarG = 0, sumVarB = 0;
        for (let i = 0; i < data.length; i += 4) {
          sumVarR += Math.pow(data[i] - avgR, 2);
          sumVarG += Math.pow(data[i + 1] - avgG, 2);
          sumVarB += Math.pow(data[i + 2] - avgB, 2);
        }

        const contrast = Math.round(Math.sqrt((sumVarR + sumVarG + sumVarB) / (pixelCount * 3)));

        setStats({
          brightness: avgBrightness,
          contrast,
          avgR,
          avgG,
          avgB,
        });

        // Draw histogram
        const histCanvas = document.createElement("canvas");
        histCanvas.width = 600;
        histCanvas.height = 300;
        const histCtx = histCanvas.getContext("2d");

        if (!histCtx) {
          setError("Failed to draw histogram");
          setProcessing(false);
          return;
        }

        // Background
        histCtx.fillStyle = "#f3f4f6";
        histCtx.fillRect(0, 0, histCanvas.width, histCanvas.height);

        // Grid lines
        histCtx.strokeStyle = "#e5e7eb";
        histCtx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
          const x = (histCanvas.width / 4) * i;
          histCtx.beginPath();
          histCtx.moveTo(x, 0);
          histCtx.lineTo(x, histCanvas.height);
          histCtx.stroke();

          const y = (histCanvas.height / 4) * i;
          histCtx.beginPath();
          histCtx.moveTo(0, y);
          histCtx.lineTo(histCanvas.width, y);
          histCtx.stroke();
        }

        // Find max value for scaling
        const maxVal = Math.max(
          ...histogram.r,
          ...histogram.g,
          ...histogram.b,
          ...histogram.brightness
        );

        // Draw brightness histogram
        const barWidth = histCanvas.width / 256;
        const scale = histCanvas.height / maxVal;

        histCtx.fillStyle = "rgba(100, 100, 100, 0.5)";
        for (let i = 0; i < 256; i++) {
          const height = histogram.brightness[i] * scale;
          histCtx.fillRect(
            i * barWidth,
            histCanvas.height - height,
            barWidth,
            height
          );
        }

        // Draw individual RGB histograms (as lines)
        histCtx.lineWidth = 2;

        // Red
        histCtx.strokeStyle = "rgba(255, 0, 0, 0.6)";
        histCtx.beginPath();
        for (let i = 0; i < 256; i++) {
          const height = histogram.r[i] * scale;
          const y = histCanvas.height - height;
          if (i === 0) {
            histCtx.moveTo(i * barWidth, y);
          } else {
            histCtx.lineTo(i * barWidth, y);
          }
        }
        histCtx.stroke();

        // Green
        histCtx.strokeStyle = "rgba(0, 200, 0, 0.6)";
        histCtx.beginPath();
        for (let i = 0; i < 256; i++) {
          const height = histogram.g[i] * scale;
          const y = histCanvas.height - height;
          if (i === 0) {
            histCtx.moveTo(i * barWidth, y);
          } else {
            histCtx.lineTo(i * barWidth, y);
          }
        }
        histCtx.stroke();

        // Blue
        histCtx.strokeStyle = "rgba(0, 100, 255, 0.6)";
        histCtx.beginPath();
        for (let i = 0; i < 256; i++) {
          const height = histogram.b[i] * scale;
          const y = histCanvas.height - height;
          if (i === 0) {
            histCtx.moveTo(i * barWidth, y);
          } else {
            histCtx.lineTo(i * barWidth, y);
          }
        }
        histCtx.stroke();

        // Add labels
        histCtx.fillStyle = "#374151";
        histCtx.font = "12px sans-serif";
        histCtx.fillText("0", 5, histCanvas.height - 5);
        histCtx.fillText("255", histCanvas.width - 30, histCanvas.height - 5);

        histCanvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setHistogramCanvas(e.target?.result as string);
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
      setError("Failed to generate histogram");
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setHistogramCanvas("");
    setStats({ brightness: 0, contrast: 0, avgR: 0, avgG: 0, avgB: 0 });
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Histogram Generator</h1>
            <p className="text-gray-600">Analyze image color distribution</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-1">Visual Analysis</h4>
                <p className="text-sm text-gray-600">See color distribution</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-semibold text-gray-900 mb-1">RGB Channels</h4>
                <p className="text-sm text-gray-600">Individual channel graphs</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-1">Statistics</h4>
                <p className="text-sm text-gray-600">Brightness & contrast</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>Select an image to analyze</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label htmlFor="file-input-histogram" className="cursor-pointer block">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                  >
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 50MB</p>
                  </div>
                  <input
                    id="file-input-histogram"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>

                {preview && (
                  <div className="space-y-3">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={preview}
                        alt="preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={generateHistogram}
                        disabled={processing}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {processing ? "Processing..." : "Generate Histogram"}
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
            {(histogramCanvas || preview) && (
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>Color distribution histogram</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {histogramCanvas && (
                    <>
                      <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={histogramCanvas}
                          alt="histogram"
                          className="w-full h-auto"
                        />
                      </div>

                      {/* Statistics */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Brightness</p>
                          <p className="text-lg font-bold text-gray-900">{stats.brightness}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Contrast</p>
                          <p className="text-lg font-bold text-gray-900">{stats.contrast}</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-xs text-red-600 mb-1">Avg Red</p>
                          <p className="text-lg font-bold text-red-700">{stats.avgR}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-xs text-green-600 mb-1">Avg Green</p>
                          <p className="text-lg font-bold text-green-700">{stats.avgG}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-blue-600 mb-1">Avg Blue</p>
                          <p className="text-lg font-bold text-blue-700">{stats.avgB}</p>
                        </div>
                      </div>
                    </>
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

export default HistogramGenerator;
