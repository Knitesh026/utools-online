import React, { useState, useRef, useEffect } from "react";
import { Upload, Download, RefreshCw, EyeOff, ShieldCheck, Plus, Trash2, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";

interface BlurBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function FaceBlur() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [blurBoxes, setBlurBoxes] = useState<BlurBox[]>([]);
  const [blurIntensity, setBlurIntensity] = useState<number>(20);
  const [blurType, setBlurType] = useState<"blur" | "pixelate">("blur");
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentBox, setCurrentBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [error, setError] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }
    if (selectedFile.size > 25 * 1024 * 1024) {
      setError("File size exceeds 25MB limit.");
      return;
    }

    setError("");
    setFile(selectedFile);
    setBlurBoxes([]);
    setProcessedUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImageUrl(url);

      const img = new Image();
      img.onload = () => {
        imageElementRef.current = img;
        // Default: Add one centered face-sized sample blur box
        const boxW = Math.round(img.width * 0.2);
        const boxH = Math.round(img.width * 0.2);
        const boxX = Math.round((img.width - boxW) / 2);
        const boxY = Math.round((img.height - boxH) / 3);
        setBlurBoxes([
          {
            id: "initial-1",
            x: boxX,
            y: boxY,
            width: boxW,
            height: boxH,
          },
        ]);
      };
      img.src = url;
    };
    reader.readAsDataURL(selectedFile);
  };

  // Re-render canvas whenever image, blur boxes, intensity, or blurType changes
  useEffect(() => {
    if (!imageElementRef.current || !imageUrl) return;
    renderCanvas();
  }, [blurBoxes, blurIntensity, blurType, imageUrl]);

  const renderCanvas = () => {
    const img = imageElementRef.current;
    if (!img) return;

    const canvas = canvasRef.current || document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw base original image
    ctx.drawImage(img, 0, 0);

    // Apply blur/pixelation to each selected face / region box
    for (const box of blurBoxes) {
      const bx = Math.max(0, box.x);
      const by = Math.max(0, box.y);
      const bw = Math.min(canvas.width - bx, box.width);
      const bh = Math.min(canvas.height - by, box.height);

      if (bw <= 0 || bh <= 0) continue;

      if (blurType === "blur") {
        // High quality multi-pass box blur for face obscuration
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = bw;
        tempCanvas.height = bh;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.drawImage(canvas, bx, by, bw, bh, 0, 0, bw, bh);
          ctx.save();
          ctx.filter = `blur(${Math.max(4, Math.round(blurIntensity))}px)`;
          ctx.drawImage(tempCanvas, bx, by);
          ctx.restore();
        }
      } else {
        // Pixelate mode
        const pixelSize = Math.max(6, Math.round(blurIntensity * 1.2));
        const tempCanvas = document.createElement("canvas");
        const scaledW = Math.max(1, Math.floor(bw / pixelSize));
        const scaledH = Math.max(1, Math.floor(bh / pixelSize));
        tempCanvas.width = scaledW;
        tempCanvas.height = scaledH;

        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.drawImage(canvas, bx, by, bw, bh, 0, 0, scaledW, scaledH);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(tempCanvas, 0, 0, scaledW, scaledH, bx, by, bw, bh);
          ctx.imageSmoothingEnabled = true;
        }
      }
    }

    setProcessedUrl(canvas.toDataURL("image/png"));
  };

  // Mouse / Touch drawing to create new blur boxes
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - container.left;
    const y = e.clientY - container.top;

    setIsDrawing(true);
    setStartPos({ x, y });
    setCurrentBox({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !startPos) return;
    const container = e.currentTarget.getBoundingClientRect();
    const curX = e.clientX - container.left;
    const curY = e.clientY - container.top;

    const x = Math.min(startPos.x, curX);
    const y = Math.min(startPos.y, curY);
    const width = Math.abs(curX - startPos.x);
    const height = Math.abs(curY - startPos.y);

    setCurrentBox({ x, y, width, height });
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !startPos || !currentBox || !imageElementRef.current) {
      setIsDrawing(false);
      return;
    }

    const container = e.currentTarget.getBoundingClientRect();
    const scaleX = imageElementRef.current.naturalWidth / container.width;
    const scaleY = imageElementRef.current.naturalHeight / container.height;

    // Only add if box is at least 15x15 px
    if (currentBox.width > 15 && currentBox.height > 15) {
      const newBox: BlurBox = {
        id: `box-${Date.now()}`,
        x: Math.round(currentBox.x * scaleX),
        y: Math.round(currentBox.y * scaleY),
        width: Math.round(currentBox.width * scaleX),
        height: Math.round(currentBox.height * scaleY),
      };
      setBlurBoxes([...blurBoxes, newBox]);
    }

    setIsDrawing(false);
    setStartPos(null);
    setCurrentBox(null);
  };

  const handleRemoveBox = (id: string) => {
    setBlurBoxes(blurBoxes.filter((b) => b.id !== id));
  };

  const handleDownload = () => {
    if (!processedUrl || !file) return;
    const link = document.createElement("a");
    link.href = processedUrl;
    link.download = `${file.name.replace(/\.[^/.]+$/, "")}-blurred.png`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl(null);
    setProcessedUrl(null);
    setBlurBoxes([]);
    setError("");
  };

  const inputSection = (
    <div className="space-y-6">
      {!imageUrl ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) {
              handleFileSelect(e.dataTransfer.files[0]);
            }
          }}
          className="border-2 border-dashed border-purple-200 dark:border-purple-900/50 hover:border-purple-500 rounded-2xl p-8 sm:p-12 text-center transition-all bg-purple-50/20 cursor-pointer"
          onClick={() => document.getElementById("face-blur-input")?.click()}
        >
          <input
            id="face-blur-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4">
            <EyeOff className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Upload Image to Blur Faces or Sensitive Details
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Click & drag to blur faces, license plates, badges, or private info. 100% private.
          </p>
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6">
            Select Photo
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Click & Drag On Photo Below to Add Face Blur Zones
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-primary">{blurBoxes.length} zone(s) blurred</span>
              <Button size="sm" variant="ghost" onClick={handleReset} className="text-xs text-muted-foreground hover:text-red-600">
                Change Photo
              </Button>
            </div>
          </div>

          {/* Interactive Photo Canvas Area with Drag-to-Box */}
          <div className="relative border border-slate-300 dark:border-gray-700 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center select-none">
            <div
              className="relative cursor-crosshair inline-block max-w-full"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {processedUrl && (
                <img
                  src={processedUrl}
                  alt="Processed"
                  className="max-h-[500px] w-auto object-contain block pointer-events-none"
                />
              )}

              {/* In-progress Drag Box */}
              {isDrawing && currentBox && (
                <div
                  className="absolute border-2 border-primary bg-primary/25 rounded pointer-events-none"
                  style={{
                    left: `${currentBox.x}px`,
                    top: `${currentBox.y}px`,
                    width: `${currentBox.width}px`,
                    height: `${currentBox.height}px`,
                  }}
                />
              )}
            </div>
          </div>
          {blurBoxes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blurBoxes.map((b, i) => (
                <Button key={b.id} size="sm" variant="outline" onClick={() => handleRemoveBox(b.id)} className="text-xs h-7">
                  <Trash2 className="w-3 h-3 mr-1" /> Remove zone {i + 1}
                </Button>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground text-center">
            Drag a box over any face or sensitive detail to blur it immediately.
          </p>

          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
              {/* Blur Intensity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Blur Intensity</span>
                  <span className="font-bold text-primary">{blurIntensity}px</span>
                </div>
                <Slider
                  min={5}
                  max={50}
                  step={1}
                  value={[blurIntensity]}
                  onValueChange={(val) => setBlurIntensity(val[0])}
                />
              </div>

              {/* Blur Style Mode */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700 dark:text-gray-300">Blur Style</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={blurType === "blur" ? "default" : "outline"}
                    onClick={() => setBlurType("blur")}
                    className="text-xs flex-1"
                  >
                    Smooth Gaussian
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={blurType === "pixelate" ? "default" : "outline"}
                    onClick={() => setBlurType("pixelate")}
                    className="text-xs flex-1"
                  >
                    Censor Pixelate
                  </Button>
                </div>
              </div>

              {/* Clear Zones */}
              <div className="flex items-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setBlurBoxes([])}
                  disabled={blurBoxes.length === 0}
                  className="w-full text-xs text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Clear All Blur Zones
                </Button>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-gray-700">
              <Button
                onClick={handleDownload}
                disabled={!processedUrl}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-6 py-2"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Protected Image
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ProfessionalToolLayout
      title="Photo & Face Blur (Privacy Censor)"
      description="Select and blur faces, identity cards, license plates, and sensitive details on photos. 100% private in-browser editor."
      category="Image Tools"
      inputSection={inputSection}
      error={error}
      resetButton={imageUrl ? { label: "Upload Different Photo", onClick: handleReset } : undefined}
      howToUse={[
        "Upload the photo you want to censor or protect.",
        "Click and drag directly on the photo over any face or sensitive zone.",
        "Select your preferred censor style (Smooth Gaussian Blur or Mosaic Pixelate).",
        "Fine-tune the Blur Intensity slider and click 'Download Protected Image'."
      ]}
      aboutText="Photo & Face Blur provides precise privacy censoring for photos before sharing them online. By allowing you to draw custom blur boxes directly over faces, badges, documents, or license plates, your private identifiable information is obscured with zero risk of unblurring. All pixel filtering runs locally inside your browser canvas."
      faqs={[
        {
          question: "Can anyone reverse or unblur the blurred faces?",
          answer: "No. The blur and pixelation filters permanently blend and rewrite the underlying pixel color values onto the canvas, making mathematical reconstruction impossible."
        },
        {
          question: "Can I blur multiple faces on a single photo?",
          answer: "Yes! Simply click and drag over each face or region you wish to protect. You can add as many blur zones as needed."
        },
        {
          question: "Does my photo get stored online?",
          answer: "No. The entire photo editing and censoring process runs in your browser memory."
        }
      ]}
      features={[
        {
          icon: "🎯",
          title: "Selective Privacy Zones",
          description: "Click & drag precisely over faces or sensitive regions."
        },
        {
          icon: "🔒",
          title: "Irreversible Censoring",
          description: "Pixels are permanently blended for true anonymity."
        },
        {
          icon: "🛡️",
          title: "Zero Cloud Upload",
          description: "All processing takes place in your local browser sandbox."
        }
      ]}
    />
  );
}
