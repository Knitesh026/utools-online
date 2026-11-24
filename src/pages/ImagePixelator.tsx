import { useState, useRef } from "react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Download, Upload, RefreshCw, Grid, Sliders, Zap } from "lucide-react";

const ImagePixelator = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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

        const smallCanvas = document.createElement("canvas");
        smallCanvas.width = Math.ceil(w / size);
        smallCanvas.height = Math.ceil(h / size);
        const smallCtx = smallCanvas.getContext("2d");

        smallCtx?.drawImage(img, 0, 0, smallCanvas.width, smallCanvas.height);

        if (ctx) ctx.imageSmoothingEnabled = false;
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

  const inputSection = (
    <div>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Select an image to apply a blocky mosaic or pixel-art effect</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label htmlFor="file-input-pixelator" className="cursor-pointer block">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition">
            <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP up to 50MB</p>
          </div>
          <input
            id="file-input-pixelator"
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
                <span className="text-sm font-medium text-slate-700">Pixel Block Size</span>
                <span className="text-sm font-mono font-bold text-primary">{pixelSize}px</span>
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
              <Button onClick={pixelateImage} disabled={processing} className="flex-1">
                {processing ? "Processing..." : "Pixelate Image"}
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
    preview || pixelated ? (
      <div>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Pixelated output preview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
            <img
              src={pixelated || preview}
              alt="Pixelated preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {pixelated && (
            <Button onClick={handleDownload} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Pixelated Image
            </Button>
          )}
        </CardContent>
      </div>
    ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Image Pixelator"
      description="Create pixelated mosaic effects or retro 8-bit pixel art from any image"
      icon={Grid}
      category="Image"
      inputSection={inputSection}
      outputSection={outputSection}
      features={[
        {
          icon: Grid,
          title: "Pixel Art & Redaction",
          description: "Generate retro pixel art aesthetics or obfuscate sensitive image areas.",
        },
        {
          icon: Sliders,
          title: "Adjustable Block Size",
          description: "Fine-tune pixel dimensions from 2px subtle grain up to 50px mosaic blocks.",
        },
        {
          icon: Zap,
          title: "Crisp Nearest-Neighbor",
          description: "Uses nearest-neighbor canvas scaling to keep pixel edges razor-sharp.",
        },
      ]}
    />
  );
};

export default ImagePixelator;
