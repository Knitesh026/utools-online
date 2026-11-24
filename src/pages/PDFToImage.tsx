import { useState } from "react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, RefreshCw, Image as ImageIcon, Layers, Zap } from "lucide-react";
import { loadPdf } from "@/lib/pdfjs";

interface PageImage {
  page: number;
  url: string;
  blob: Blob;
}

const PDFToImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<PageImage[]>([]);
  const [format, setFormat] = useState<"png" | "jpg">("png");
  const [scale, setScale] = useState(2);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const clearImages = () => {
    images.forEach((i) => URL.revokeObjectURL(i.url));
    setImages([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file");
      return;
    }
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }
    setError("");
    setFile(selectedFile);
    clearImages();
  };

  const convertPDF = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    clearImages();
    try {
      const pdf = await loadPdf(file);
      const mime = format === "png" ? "image/png" : "image/jpeg";
      const result: PageImage[] = [];
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not available");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
        const blob: Blob = await new Promise((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Encoding failed"))), mime, 0.92)
        );
        result.push({ page: p, url: URL.createObjectURL(blob), blob });
        setImages([...result]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to convert this PDF. It may be password-protected or damaged.");
    } finally {
      setProcessing(false);
    }
  };

  const baseName = () => (file ? file.name.replace(/\.pdf$/i, "") : "page");

  const downloadOne = (img: PageImage) => {
    const a = document.createElement("a");
    a.href = img.url;
    a.download = `${baseName()}-page-${img.page}.${format}`;
    a.click();
  };

  const downloadAll = () => {
    images.forEach((img, idx) => setTimeout(() => downloadOne(img), idx * 300));
  };

  const handleReset = () => {
    setFile(null);
    clearImages();
    setError("");
  };

  const inputSection = (
    <div>
      <CardHeader>
        <CardTitle>Select PDF</CardTitle>
        <CardDescription>
          Upload a PDF file (up to 50MB). Pages are rendered locally in your browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label htmlFor="file-input-pdftoimage" className="cursor-pointer block">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition">
            <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">Click to choose a PDF</p>
            <p className="text-xs text-slate-500 mt-1">PDF files up to 50MB</p>
          </div>
          <input
            id="file-input-pdftoimage"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
            {error}
          </div>
        )}

        {file && (
          <div className="space-y-4">
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
              <p className="text-xs font-semibold text-slate-500">File Selected</p>
              <p className="text-sm font-semibold text-slate-900 mt-0.5 truncate">{file.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="img-format" className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Format
                </label>
                <select
                  id="img-format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value as "png" | "jpg")}
                  className="w-full h-11 px-3 text-sm rounded-xl border border-slate-200 bg-white"
                >
                  <option value="png">PNG (sharp text)</option>
                  <option value="jpg">JPG (smaller files)</option>
                </select>
              </div>
              <div>
                <label htmlFor="img-scale" className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Resolution
                </label>
                <select
                  id="img-scale"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-11 px-3 text-sm rounded-xl border border-slate-200 bg-white"
                >
                  <option value={1}>1x (72 DPI, preview)</option>
                  <option value={2}>2x (144 DPI)</option>
                  <option value={3}>3x (216 DPI)</option>
                  <option value={4}>4x (288 DPI, large)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={convertPDF} disabled={processing} className="flex-1">
                {processing ? "Converting..." : "Convert to Images"}
              </Button>
              <Button onClick={handleReset} variant="outline" aria-label="Reset">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {!file && (
          <div className="text-center py-2">
            <p className="text-xs text-slate-400">No PDF selected</p>
          </div>
        )}
      </CardContent>
    </div>
  );

  const outputSection =
    images.length > 0 ? (
      <div>
        <CardHeader>
          <CardTitle>Converted Images</CardTitle>
          <CardDescription>{images.length} page(s) rendered</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!processing && images.length > 1 && (
            <Button onClick={downloadAll} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download All Pages
            </Button>
          )}
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {images.map((img) => (
              <div
                key={img.page}
                className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-3"
              >
                <img
                  src={img.url}
                  alt={`Page ${img.page}`}
                  className="w-14 h-20 object-contain bg-white border border-slate-200 rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">Page {img.page}</p>
                  <p className="text-xs font-mono text-slate-500">
                    {(img.blob.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => downloadOne(img)}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    ) : undefined;

  return (
    <ProfessionalToolLayout
      title="PDF to Image"
      description="Convert PDF pages to high-resolution PNG or JPG images directly in your browser"
      icon={ImageIcon}
      category="PDF"
      inputSection={inputSection}
      outputSection={outputSection}
      features={[
        {
          icon: ImageIcon,
          title: "PNG & JPG Export",
          description: "Choose lossless PNG for crisp typography or compressed JPG for smaller files.",
        },
        {
          icon: Layers,
          title: "Up to 288 DPI",
          description: "Select 1x to 4x rendering resolution for sharp slides and printouts.",
        },
        {
          icon: Zap,
          title: "Local Rendering",
          description: "Powered by PDF.js on your device with zero server uploads.",
        },
      ]}
    />
  );
};

export default PDFToImage;
