import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Image as ImageIcon, Download, Copy, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const RemoveBackground = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputFormat, setOutputFormat] = useState("png");
  const [zoom, setZoom] = useState(100);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      processFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      simulateProcessing();
    };
    reader.readAsDataURL(selectedFile);
  };

  const simulateProcessing = () => {
    setProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          // Mock result - in real app this would be from backend
          setResult("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setProgress(0);
    setProcessing(false);
    setZoom(100);
  };

  const downloadImage = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = result;
    link.download = `removed-background.${outputFormat}`;
    link.click();
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
  };

  const outputFormats = [
    { id: "png", label: "PNG (Transparent)" },
    { id: "jpg", label: "JPG (White Background)" },
    { id: "webp", label: "WebP (Modern Format)" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Remove Background
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Erase image backgrounds instantly with AI-powered precision. Perfect for product photos, portraits, and professional use.
          </p>
        </section>

        {/* Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="flex gap-3 items-start p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <span className="text-orange-500">⚡</span>
            <div>
              <h4 className="font-semibold text-foreground">Fast Processing</h4>
              <p className="text-sm text-muted-foreground">Instant results in seconds</p>
            </div>
          </div>
          <div className="flex gap-3 items-start p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <span className="text-blue-500">🎯</span>
            <div>
              <h4 className="font-semibold text-foreground">Precise Detection</h4>
              <p className="text-sm text-muted-foreground">AI-powered edge detection</p>
            </div>
          </div>
          <div className="flex gap-3 items-start p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <span className="text-green-500">🔄</span>
            <div>
              <h4 className="font-semibold text-foreground">Multiple Formats</h4>
              <p className="text-sm text-muted-foreground">PNG, JPG, WebP support</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  isDragging
                    ? "border-primary bg-primary/10"
                    : file
                    ? "border-green-500/30 bg-green-50/50 dark:bg-green-950/20"
                    : "border-border hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {processing ? (
                  <div className="space-y-4">
                    {/* Progress Ring */}
                    <div className="relative w-40 h-40 mx-auto">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          className="stroke-muted"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          className="stroke-primary"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 70}`}
                          strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
                          style={{ transition: "stroke-dashoffset 0.1s ease" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-foreground">{Math.round(progress)}%</span>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-foreground">Processing your image...</p>
                    <p className="text-sm text-muted-foreground">This may take a few moments</p>
                  </div>
                ) : preview ? (
                  <div className="space-y-4">
                    <div className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                      <ImageIcon className="h-12 w-12 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">{file?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file?.size || 0) > 1024 * 1024
                          ? `${((file?.size || 0) / (1024 * 1024)).toFixed(1)} MB`
                          : `${((file?.size || 0) / 1024).toFixed(1)} KB`}
                      </p>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">✓ Ready to process</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 rounded-xl border-2 border-primary/30 flex items-center justify-center mx-auto bg-primary/5">
                      <Upload className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Drop your image here
                      </h3>
                      <p className="text-muted-foreground">or click to browse files</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, WebP (Max 50MB)</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <label className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90 cursor-pointer">
                    Choose File
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
                <Button variant="outline" className="flex-1">
                  Paste Image URL
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar Options */}
          <div className="space-y-6">
            {/* Output Format */}
            <div className="p-6 bg-card rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-lg">⚙️</span> Output Format
              </h3>
              <div className="space-y-3">
                {outputFormats.map((format) => (
                  <label
                    key={format.id}
                    className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <input
                      type="radio"
                      name="outputFormat"
                      value={format.id}
                      checked={outputFormat === format.id}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-foreground font-medium">{format.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Processing Info */}
            <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-lg">ℹ️</span> How it works
              </h3>
              <ol className="text-sm text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="font-semibold text-primary">1.</span>
                  <span>Upload your image</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-primary">2.</span>
                  <span>AI removes background</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-primary">3.</span>
                  <span>Download the result</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Result Section */}
        {result && (
          <section className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Original vs Result */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Original Image</h3>
                <div className="relative bg-card rounded-lg overflow-hidden border border-border">
                  <img
                    src={preview}
                    alt="Original"
                    className="w-full h-auto"
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Result with Background Removed</h3>
                <div className="relative bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-border" style={{ backgroundImage: 'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50% / 20px 20px' }}>
                  <div style={{ zoom: `${zoom}%`, transformOrigin: 'top center' }}>
                    <img
                      src={result}
                      alt="Result"
                      className="w-full h-auto"
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </div>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2 mt-4 bg-card p-3 rounded-lg border border-border">
                  <button
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    className="p-2 hover:bg-muted rounded transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-semibold min-w-12 text-center">{zoom}%</span>
                  <button
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    className="p-2 hover:bg-muted rounded transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setZoom(100)}
                    className="ml-auto p-2 hover:bg-muted rounded transition-colors"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Download Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={downloadImage}
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Image
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </Button>
              <Button onClick={clearFile} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Process Another
              </Button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RemoveBackground;
