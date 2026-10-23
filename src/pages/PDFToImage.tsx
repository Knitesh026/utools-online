import { useState } from "react";
import ToolExtras from "@/components/ToolExtras";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, RefreshCw } from "lucide-react";
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">PDF to Image</h1>
            <p className="text-gray-600">Convert PDF pages to PNG or JPG images in your browser</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Select PDF</CardTitle>
                <CardDescription>Upload a PDF file (up to 50MB). It is rendered locally and never uploaded.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label htmlFor="file-input-pdftoimage" className="cursor-pointer block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to choose a PDF</p>
                    <p className="text-xs text-gray-500 mt-1">PDF files up to 50MB</p>
                  </div>
                  <input id="file-input-pdftoimage" type="file" accept=".pdf,application/pdf" onChange={handleFileSelect} className="hidden" />
                </label>

                {file && (
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-xs font-semibold text-blue-700">File Selected</p>
                      <p className="text-sm font-medium text-blue-900 mt-1">{file.name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="img-format" className="text-xs font-semibold text-gray-700">Format</label>
                        <select
                          id="img-format"
                          value={format}
                          onChange={(e) => setFormat(e.target.value as "png" | "jpg")}
                          className="w-full h-10 px-2 text-sm rounded-md border border-gray-300 bg-white"
                        >
                          <option value="png">PNG (sharp text)</option>
                          <option value="jpg">JPG (smaller files)</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="img-scale" className="text-xs font-semibold text-gray-700">Resolution</label>
                        <select
                          id="img-scale"
                          value={scale}
                          onChange={(e) => setScale(Number(e.target.value))}
                          className="w-full h-10 px-2 text-sm rounded-md border border-gray-300 bg-white"
                        >
                          <option value={1}>1x (72 DPI, preview)</option>
                          <option value={2}>2x (144 DPI)</option>
                          <option value={3}>3x (216 DPI)</option>
                          <option value={4}>4x (288 DPI, large)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={convertPDF} disabled={processing} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                        {processing ? "Converting..." : "Convert to Images"}
                      </Button>
                      <Button onClick={handleReset} variant="outline" className="flex-1" aria-label="Reset">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {!file && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No PDF selected</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {images.length > 0 && (
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Converted Images</CardTitle>
                  <CardDescription>{images.length} page(s) converted</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!processing && images.length > 1 && (
                    <Button onClick={downloadAll} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download all pages
                    </Button>
                  )}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {images.map((img) => (
                      <div key={img.page} className="p-2 bg-gray-50 border border-gray-200 rounded flex items-center gap-3">
                        <img src={img.url} alt={`Page ${img.page}`} className="w-14 h-20 object-contain bg-white border" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">Page {img.page}</p>
                          <p className="text-xs text-gray-500">{(img.blob.size / 1024).toFixed(0)} KB</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => downloadOne(img)}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {error && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <p className="text-sm text-orange-700">{error}</p>
              </CardContent>
            </Card>
          )}
        </div>
      <ToolExtras />
      </main>
      <Footer />
    </>
  );
};

export default PDFToImage;
