import React, { useState, useRef, useCallback } from "react";
import { Upload, Download, RefreshCw, ZoomIn, ZoomOut, Check, Sliders, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";

export default function RemoveBackground() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [tolerance, setTolerance] = useState<number>(35);
  const [feathering, setFeathering] = useState<number>(2);
  const [bgMode, setBgMode] = useState<"transparent" | "white" | "custom">("transparent");
  const [customColor, setCustomColor] = useState<string>("#ffffff");
  const [zoom, setZoom] = useState<number>(100);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }
    if (selectedFile.size > 25 * 1024 * 1024) {
      setError("Image size exceeds the 25MB limit.");
      return;
    }

    setError("");
    setFile(selectedFile);
    setProcessedUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPreviewUrl(url);
      executeBackgroundRemoval(url, tolerance, feathering, bgMode, customColor);
    };
    reader.onerror = () => {
      setError("Failed to read the selected image file.");
    };
    reader.readAsDataURL(selectedFile);
  };

  const executeBackgroundRemoval = (
    imageSource: string,
    tol: number,
    feather: number,
    mode: "transparent" | "white" | "custom",
    customBg: string
  ) => {
    setProcessing(true);
    setError("");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          throw new Error("Unable to initialize canvas context.");
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Sample border pixels to establish background color profiles
        const samplePoints = [
          [0, 0],
          [width - 1, 0],
          [0, height - 1],
          [width - 1, height - 1],
          [Math.floor(width / 2), 0],
          [0, Math.floor(height / 2)],
          [width - 1, Math.floor(height / 2)],
        ];

        const bgSamples: Array<[number, number, number]> = [];
        for (const [x, y] of samplePoints) {
          const idx = (y * width + x) * 4;
          bgSamples.push([data[idx], data[idx + 1], data[idx + 2]]);
        }

        // Distance function in RGB space
        const colorDist = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) => {
          return Math.sqrt(
            Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
          );
        };

        // Flood-fill connectivity mask from border to avoid deleting interior matching colors
        const visited = new Uint8Array(width * height);
        const queue: number[] = [];

        // Check matching tolerance
        const isBgColor = (idx: number) => {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          for (const [sr, sg, sb] of bgSamples) {
            if (colorDist(r, g, b, sr, sg, sb) <= tol * 3.5) {
              return true;
            }
          }
          return false;
        };

        // Seed with all edge pixels that match background
        for (let x = 0; x < width; x++) {
          const topIdx = (0 * width + x) * 4;
          if (isBgColor(topIdx)) {
            visited[x] = 1;
            queue.push(x);
          }
          const bottomIdx = ((height - 1) * width + x) * 4;
          if (isBgColor(bottomIdx)) {
            const pos = (height - 1) * width + x;
            visited[pos] = 1;
            queue.push(pos);
          }
        }

        for (let y = 0; y < height; y++) {
          const leftIdx = (y * width + 0) * 4;
          if (isBgColor(leftIdx) && !visited[y * width]) {
            visited[y * width] = 1;
            queue.push(y * width);
          }
          const rightIdx = (y * width + (width - 1)) * 4;
          if (isBgColor(rightIdx) && !visited[y * width + (width - 1)]) {
            const pos = y * width + (width - 1);
            visited[pos] = 1;
            queue.push(pos);
          }
        }

        // BFS flood fill outwards
        let head = 0;
        while (head < queue.length) {
          const pos = queue[head++];
          const x = pos % width;
          const y = Math.floor(pos / width);

          const neighbors = [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
          ];

          for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const npos = ny * width + nx;
              if (!visited[npos]) {
                const nidx = npos * 4;
                if (isBgColor(nidx)) {
                  visited[npos] = 1;
                  queue.push(npos);
                }
              }
            }
          }
        }

        // Parse custom color if set
        let customR = 255, customG = 255, customB = 255;
        if (mode === "custom" && customBg.startsWith("#")) {
          const hex = customBg.replace("#", "");
          customR = parseInt(hex.substring(0, 2), 16) || 255;
          customG = parseInt(hex.substring(2, 4), 16) || 255;
          customB = parseInt(hex.substring(4, 6), 16) || 255;
        }

        // Apply alpha or replacement
        for (let i = 0; i < width * height; i++) {
          if (visited[i] === 1) {
            const idx = i * 4;
            if (mode === "transparent") {
              data[idx + 3] = 0; // Alpha 0
            } else if (mode === "white") {
              data[idx] = 255;
              data[idx + 1] = 255;
              data[idx + 2] = 255;
              data[idx + 3] = 255;
            } else if (mode === "custom") {
              data[idx] = customR;
              data[idx + 1] = customG;
              data[idx + 2] = customB;
              data[idx + 3] = 255;
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const resultDataUrl = canvas.toDataURL("image/png");
        setProcessedUrl(resultDataUrl);
      } catch (err) {
        console.error("Background removal error:", err);
        setError("Error during background removal. Please try a different image.");
      } finally {
        setProcessing(false);
      }
    };
    img.onerror = () => {
      setError("Failed to process image format.");
      setProcessing(false);
    };
    img.src = imageSource;
  };

  const handleApplyChanges = () => {
    if (previewUrl) {
      executeBackgroundRemoval(previewUrl, tolerance, feathering, bgMode, customColor);
    }
  };

  const handleDownload = () => {
    if (!processedUrl || !file) return;
    const link = document.createElement("a");
    link.href = processedUrl;
    link.download = `${file.name.replace(/\.[^/.]+$/, "")}-no-bg.png`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setProcessedUrl(null);
    setError("");
    setTolerance(35);
  };

  const inputSection = (
    <div className="space-y-6">
      {!previewUrl ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) {
              handleFileSelect(e.dataTransfer.files[0]);
            }
          }}
          className="border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 hover:border-primary rounded-2xl p-8 sm:p-12 text-center transition-all bg-indigo-50/20 cursor-pointer"
          onClick={() => document.getElementById("bg-file-input")?.click()}
        >
          <input
            id="bg-file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Choose an Image or Drag & Drop Here
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Supports PNG, JPG, and WebP up to 25MB. Instant background transparency with smart edge detection.
          </p>
          <Button className="mt-4 bg-primary text-white font-medium px-6">
            Browse Image
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Original Preview */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Original Photo</Label>
              <div className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden bg-slate-100 dark:bg-gray-800 flex items-center justify-center h-64 p-2">
                <img
                  src={previewUrl}
                  alt="Original"
                  className="max-h-full max-w-full object-contain rounded"
                  style={{ transform: `scale(${zoom / 100})`, transition: "transform 0.2s" }}
                />
              </div>
            </div>

            {/* Processed Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Background Removed</Label>
                {processing && <span className="text-xs text-primary font-medium animate-pulse">Processing...</span>}
              </div>
              <div
                className="border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden flex items-center justify-center h-64 p-2 relative"
                style={{
                  backgroundImage: bgMode === "transparent" ? "radial-gradient(#cbd5e1 1px, transparent 1px)" : undefined,
                  backgroundSize: "16px 16px",
                  backgroundColor: bgMode === "white" ? "#ffffff" : bgMode === "custom" ? customColor : "#f8fafc",
                }}
              >
                {processedUrl ? (
                  <img
                    src={processedUrl}
                    alt="Processed result"
                    className="max-h-full max-w-full object-contain rounded"
                    style={{ transform: `scale(${zoom / 100})`, transition: "transform 0.2s" }}
                  />
                ) : (
                  <div className="text-xs text-muted-foreground">Generating transparent image...</div>
                )}
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-200">
              <Sliders className="w-4 h-4 text-primary" />
              <span>Sensitivity & Background Settings</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tolerance Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Tolerance Sensitivity</span>
                  <span className="font-bold text-primary">{tolerance}%</span>
                </div>
                <Slider
                  min={5}
                  max={80}
                  step={1}
                  value={[tolerance]}
                  onValueChange={(val) => setTolerance(val[0])}
                />
              </div>

              {/* Background Color Mode */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">Background Output</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={bgMode === "transparent" ? "default" : "outline"}
                    onClick={() => setBgMode("transparent")}
                    className="text-xs flex-1"
                  >
                    Transparent
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={bgMode === "white" ? "default" : "outline"}
                    onClick={() => setBgMode("white")}
                    className="text-xs flex-1"
                  >
                    Pure White
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={bgMode === "custom" ? "default" : "outline"}
                    onClick={() => setBgMode("custom")}
                    className="text-xs flex-1"
                  >
                    Custom
                  </Button>
                </div>
              </div>

              {/* Custom Color Input if Custom is selected */}
              {bgMode === "custom" && (
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">Pick Custom Color</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-10 h-9 p-1 rounded border border-slate-300 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-muted-foreground uppercase">{customColor}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoom(Math.max(50, zoom - 25))}
                  className="h-8 px-2 text-xs"
                >
                  <ZoomOut className="w-3.5 h-3.5 mr-1" /> Zoom Out
                </Button>
                <span className="text-xs text-muted-foreground">{zoom}%</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                  className="h-8 px-2 text-xs"
                >
                  <ZoomIn className="w-3.5 h-3.5 mr-1" /> Zoom In
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleApplyChanges}
                  disabled={processing}
                  className="bg-primary text-white text-xs h-8"
                >
                  <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${processing ? "animate-spin" : ""}`} />
                  Re-process
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  disabled={!processedUrl}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download PNG
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ProfessionalToolLayout
      title="Background Remover"
      description="Remove image backgrounds automatically with smart client-side edge and color keying. 100% private, no server upload."
      category="Image Tools"
      inputSection={inputSection}
      error={error}
      resetButton={previewUrl ? { label: "Upload Different Image", onClick: handleReset } : undefined}
      howToUse={[
        "Select or drag-and-drop your image (PNG, JPG, or WebP) into the upload box.",
        "The smart detector automatically samples background edges to render transparency.",
        "Fine-tune the Sensitivity slider or change background to Transparent, White, or Custom Color.",
        "Click 'Download PNG' to save your clean, transparent photo instantly."
      ]}
      aboutText="Background Remover is an advanced browser-based photo editor designed to strip solid or uniform backgrounds from photos without transmitting your image over the web. Built using HTML5 Canvas pixel manipulation, it detects background boundary colors and transforms them into an alpha transparency channel. This makes it ideal for e-commerce product photos, social media avatars, thumbnails, and graphic design projects while preserving your complete privacy."
      faqs={[
        {
          question: "Is this background remover really free?",
          answer: "Yes, it is completely free with no usage limits, watermark overlays, or account requirements."
        },
        {
          question: "Does my image get uploaded to any server?",
          answer: "No. All pixel isolation happens directly inside your web browser using HTML5 Canvas. Your image never leaves your device."
        },
        {
          question: "Which images work best?",
          answer: "Images with solid, uniform, or distinct background colors (e.g. studio backdrops, white product backgrounds, simple wallpapers) yield the highest fidelity cutouts."
        },
        {
          question: "Can I replace the background with white or another color?",
          answer: "Yes! Use the Background Output toggle to switch between Transparent (PNG), Pure White, or any custom color."
        }
      ]}
      features={[
        {
          icon: "⚡",
          title: "Real-Time Processing",
          description: "Instant canvas-based cutout generation without server delays."
        },
        {
          icon: "🛡️",
          title: "Zero Data Leakage",
          description: "Files are processed strictly in local browser memory."
        },
        {
          icon: "🎨",
          title: "Custom Backgrounds",
          description: "Export as transparent PNG, e-commerce white, or custom colors."
        }
      ]}
    />
  );
}
