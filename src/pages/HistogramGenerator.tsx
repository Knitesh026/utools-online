import { useState, useRef } from "react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, RefreshCw, BarChart3, Palette, Activity } from "lucide-react";

const HistogramGenerator = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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

        const histogram = {
          r: Array(256).fill(0),
          g: Array(256).fill(0),
          b: Array(256).fill(0),
          brightness: Array(256).fill(0),
        };

        let sumR = 0,
          sumG = 0,
          sumB = 0;
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

        const avgR = Math.round(sumR / pixelCount);
        const avgG = Math.round(sumG / pixelCount);
        const avgB = Math.round(sumB / pixelCount);
        const avgBrightness = Math.round((avgR + avgG + avgB) / 3);

        let sumVarR = 0,
          sumVarG = 0,
          sumVarB = 0;
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

        const histCanvas = document.createElement("canvas");
        histCanvas.width = 600;
        histCanvas.height = 300;
        const histCtx = histCanvas.getContext("2d");

        if (!histCtx) {
          setError("Failed to draw histogram");
          setProcessing(false);
          return;
        }

        histCtx.fillStyle = "#f8fafc";
        histCtx.fillRect(0, 0, histCanvas.width, histCanvas.height);

        histCtx.strokeStyle = "#e2e8f0";
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

        const maxVal = Math.max(
          ...histogram.r,
          ...histogram.g,
          ...histogram.b,
          ...histogram.brightness
        );

        const barWidth = histCanvas.width / 256;
        const scale = histCanvas.height / maxVal;

        histCtx.fillStyle = "rgba(100, 116, 139, 0.35)";
        for (let i = 0; i < 256; i++) {
          const height = histogram.brightness[i] * scale;
          histCtx.fillRect(i * barWidth, histCanvas.height - height, barWidth, height);
        }

        histCtx.lineWidth = 2;

        // Red
        histCtx.strokeStyle = "rgba(239, 68, 68, 0.75)";
        histCtx.beginPath();
        for (let i = 0; i < 256; i++) {
          const height = histogram.r[i] * scale;
          const y = histCanvas.height - height;
          if (i === 0) histCtx.moveTo(i * barWidth, y);
          else histCtx.lineTo(i * barWidth, y);
        }
        histCtx.stroke();

        // Green
        histCtx.strokeStyle = "rgba(16, 185, 129, 0.75)";
        histCtx.beginPath();
        for (let i = 0; i < 256; i++) {
          const height = histogram.g[i] * scale;
          const y = histCanvas.height - height;
          if (i === 0) histCtx.moveTo(i * barWidth, y);
          else histCtx.lineTo(i * barWidth, y);
        }
        histCtx.stroke();

        // Blue
        histCtx.strokeStyle = "rgba(37, 99, 235, 0.75)";
        histCtx.beginPath();
        for (let i = 0; i < 256; i++) {
          const height = histogram.b[i] * scale;
          const y = histCanvas.height - height;
          if (i === 0) histCtx.moveTo(i * barWidth, y);
          else histCtx.lineTo(i * barWidth, y);
        }
        histCtx.stroke();

        histCtx.fillStyle = "#475569";
        histCtx.font = "12px monospace";
        histCtx.fillText("0", 6, histCanvas.height - 6);
        histCtx.fillText("255", histCanvas.width - 30, histCanvas.height - 6);

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

  const inputSection = (
    <div>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Select an image to inspect its RGB and luminance distribution</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label htmlFor="file-input-histogram" className="cursor-pointer block">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition">
            <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP up to 50MB</p>
          </div>
          <input
            id="file-input-histogram"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
            {error}
          </div>
        )}

        {preview && (
          <div className="space-y-4">
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
              <img
                src={preview}
                alt="Uploaded source preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={generateHistogram} disabled={processing} className="flex-1">
                {processing ? "Analyzing..." : "Generate Histogram"}
              </Button>
              <Button onClick={handleReset} variant="outline" aria-label="Reset">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {!preview && (
          <div className="text-center py-2">
            <p className="text-xs text-slate-400">No image selected</p>
          </div>
        )}
      </CardContent>
    </div>
  );

  const outputSection = histogramCanvas ? (
    <div>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>RGB channel curves & luminance statistics (0–255)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
          <img src={histogramCanvas} alt="RGB and luminance histogram graph" className="w-full h-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <p className="text-xs text-slate-500 mb-0.5">Brightness</p>
            <p className="text-lg font-mono font-bold text-slate-900">{stats.brightness}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <p className="text-xs text-slate-500 mb-0.5">Contrast (σ)</p>
            <p className="text-lg font-mono font-bold text-slate-900">{stats.contrast}</p>
          </div>
          <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200/80">
            <p className="text-xs text-rose-600 mb-0.5">Avg Red</p>
            <p className="text-lg font-mono font-bold text-rose-700">{stats.avgR}</p>
          </div>
          <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
            <p className="text-xs text-emerald-600 mb-0.5">Avg Green</p>
            <p className="text-lg font-mono font-bold text-emerald-700">{stats.avgG}</p>
          </div>
          <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200/80">
            <p className="text-xs text-blue-600 mb-0.5">Avg Blue</p>
            <p className="text-lg font-mono font-bold text-blue-700">{stats.avgB}</p>
          </div>
        </div>
      </CardContent>
    </div>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Histogram Generator"
      description="Analyze image tonal exposure, RGB channel balance, brightness, and contrast"
      icon={BarChart3}
      category="Image"
      inputSection={inputSection}
      outputSection={outputSection}
      features={[
        {
          icon: BarChart3,
          title: "Luminance Distribution",
          description: "Inspect shadow clipping, midtone balance, and highlight roll-off across 256 bins.",
        },
        {
          icon: Palette,
          title: "RGB Channel Curves",
          description: "Overlay Red, Green, and Blue intensity curves to spot color casts.",
        },
        {
          icon: Activity,
          title: "Quantitative Telemetry",
          description: "Computes mean channel values, overall brightness, and RMS contrast.",
        },
      ]}
    />
  );
};

export default HistogramGenerator;
