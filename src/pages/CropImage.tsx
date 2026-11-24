import { useState, useRef } from "react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Upload, RefreshCw, Crop, Maximize2, Eye } from "lucide-react";

const CropImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      case "1:1": {
        const size = Math.min(w, h);
        setWidth(size);
        setHeight(size);
        break;
      }
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

  const inputSection = (
    <div>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Select an image and configure crop coordinates or aspect ratio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label htmlFor="file-input-crop" className="cursor-pointer block">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition">
            <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP up to 50MB</p>
          </div>
          <input
            id="file-input-crop"
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
              <Label className="text-xs font-semibold text-slate-700 mb-2 block">Aspect Ratio</Label>
              <div className="grid grid-cols-4 gap-2">
                {["16:9", "4:3", "1:1", "free"].map((a) => (
                  <Button
                    key={a}
                    onClick={() => {
                      setAspect(a as any);
                      if (a !== "free") updateDimensionsForAspect(a);
                    }}
                    variant={aspect === a ? "default" : "outline"}
                    size="sm"
                  >
                    {a}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="x" className="text-xs text-slate-600">
                  X Position (px)
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
                <Label htmlFor="y" className="text-xs text-slate-600">
                  Y Position (px)
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
                <Label htmlFor="width" className="text-xs text-slate-600">
                  Width (px)
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
                <Label htmlFor="height" className="text-xs text-slate-600">
                  Height (px)
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
              <Button onClick={cropImage} disabled={processing} className="flex-1">
                {processing ? "Processing..." : "Crop Image"}
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
    preview || cropped ? (
      <div>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            Target dimensions: {width} × {height} px
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
            <img
              src={cropped || preview}
              alt="Cropped preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {cropped && (
            <Button onClick={handleDownload} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Cropped Image
            </Button>
          )}
        </CardContent>
      </div>
    ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Crop Image"
      description="Crop images to exact pixel dimensions or standard aspect ratios (16:9, 4:3, 1:1)"
      icon={Crop}
      category="Image"
      inputSection={inputSection}
      outputSection={outputSection}
      features={[
        {
          icon: Crop,
          title: "Pixel-Exact Coordinates",
          description: "Specify exact X, Y, Width, and Height values in pixels for repeatable crops.",
        },
        {
          icon: Maximize2,
          title: "Aspect Ratio Presets",
          description: "Lock dimensions to 16:9 widescreen, 4:3 standard, 1:1 square, or freeform.",
        },
        {
          icon: Eye,
          title: "Instant Preview",
          description: "Inspect your cropped output immediately and download as a lossless PNG.",
        },
      ]}
    />
  );
};

export default CropImage;
