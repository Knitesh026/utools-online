import { useState, useRef } from "react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Download, Upload, RefreshCw, Sparkles, Sliders, Zap } from "lucide-react";

const ImageSharpener = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [sharpened, setSharpened] = useState<string>("");
  const [intensity, setIntensity] = useState(1);
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
    setSharpened("");

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const sharpenImage = async () => {
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
        const originalData = new Uint8ClampedArray(data);

        for (let i = 0; i < data.length; i += 4) {
          const pixelIndex = i / 4;
          const x = pixelIndex % w;
          const y = Math.floor(pixelIndex / w);

          if (x > 0 && x < w - 1 && y > 0 && y < h - 1) {
            for (let c = 0; c < 3; c++) {
              const center = originalData[i + c];
              let sum = 0;
              let count = 0;

              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (dx === 0 && dy === 0) continue;
                  const ni = ((y + dy) * w + (x + dx)) * 4 + c;
                  sum += originalData[ni];
                  count++;
                }
              }

              const avg = sum / count;
              const diff = center - avg;
              const newVal = center + diff * intensity;

              data[i + c] = Math.max(0, Math.min(255, newVal));
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setSharpened(e.target?.result as string);
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
      setError("Failed to sharpen image");
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!sharpened) return;

    const link = document.createElement("a");
    link.href = sharpened;
    link.download = `sharpened-${file?.name || "image.png"}`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setSharpened("");
    setIntensity(1);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const inputSection = (
    <div>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Select an image to enhance edge definition and detail</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label htmlFor="file-input-sharpener" className="cursor-pointer block">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition">
            <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP up to 50MB</p>
          </div>
          <input
            id="file-input-sharpener"
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
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Sharpening Intensity</span>
                <span className="text-sm font-mono font-bold text-primary">{intensity.toFixed(1)}x</span>
              </label>
              <Slider
                value={[intensity]}
                onValueChange={(val) => setIntensity(val[0])}
                min={0.1}
                max={3}
                step={0.1}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={sharpenImage} disabled={processing} className="flex-1">
                {processing ? "Processing..." : "Sharpen Image"}
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

  const outputSection =
    preview || sharpened ? (
      <div>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Sharpened output preview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
            <img
              src={sharpened || preview}
              alt="Sharpened preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {sharpened && (
            <Button onClick={handleDownload} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Sharpened Image
            </Button>
          )}
        </CardContent>
      </div>
    ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Image Sharpener"
      description="Enhance image clarity, edge contrast, and fine detail using local convolution filtering"
      icon={Sparkles}
      category="Image"
      inputSection={inputSection}
      outputSection={outputSection}
      features={[
        {
          icon: Sparkles,
          title: "Edge Contrast Boost",
          description: "Accentuates micro-contrast along edges to recover soft photos and scans.",
        },
        {
          icon: Sliders,
          title: "0.1x to 3.0x Control",
          description: "Dial in subtle sharpening for portraits or strong crispness for text scans.",
        },
        {
          icon: Zap,
          title: "Lossless PNG Export",
          description: "Exports the sharpened canvas directly as a clean PNG without recompression artifacts.",
        },
      ]}
    />
  );
};

export default ImageSharpener;
