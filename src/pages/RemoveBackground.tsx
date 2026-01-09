import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const RemoveBackground = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputFormat, setOutputFormat] = useState("auto");

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
      setFile(droppedFile);
      simulateProcessing();
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      simulateProcessing();
    }
  };

  const simulateProcessing = () => {
    setProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const clearFile = () => {
    setFile(null);
    setProgress(0);
    setProcessing(false);
  };

  const outputFormats = [
    { id: "auto", label: "Auto Detect Subject" },
    { id: "png", label: "PNG (White Background)" },
    { id: "webp", label: "WebP" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Remove Background
          </h1>
          <p className="text-muted-foreground text-lg">
            Erase image backgrounds easily & quickly with just one click.
          </p>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Drop Zone */}
          <div className="lg:col-span-2">
            <div
              className={`drop-zone min-h-[300px] flex flex-col items-center justify-center cursor-pointer ${
                isDragging ? "border-primary bg-primary/10" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {processing ? (
                <div className="text-center">
                  {/* Progress Ring */}
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        className="stroke-muted"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        className="stroke-primary"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                        style={{ transition: "stroke-dashoffset 0.1s ease" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-foreground">{progress}%</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">Processing your image...</p>
                </div>
              ) : file ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium text-foreground mb-2">{file.name}</p>
                  <p className="text-sm text-muted-foreground">Ready for processing</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Drag & Drop Image Here
                  </h3>
                  <div className="w-20 h-20 rounded-xl border-2 border-primary/30 flex items-center justify-center mb-4">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <label className="btn-primary cursor-pointer text-center flex-1 py-3">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
              <button className="flex-1 py-3 rounded-full border-2 border-border bg-card font-medium text-foreground hover:bg-muted transition-colors">
                Paste Image URL
              </button>
            </div>
          </div>

          {/* Sidebar Options */}
          <div className="space-y-6">
            {/* File Options */}
            <div className="card-tool">
              <h3 className="font-semibold text-foreground mb-4">File Options</h3>
              {file ? (
                <div className="relative p-4 bg-muted/30 rounded-xl">
                  <button
                    onClick={clearFile}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-center text-foreground font-medium truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-muted/30 rounded-xl text-center">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">No file selected</p>
                </div>
              )}
            </div>

            {/* Output Format */}
            <div className="card-tool">
              <h3 className="font-semibold text-foreground mb-4">Output Format</h3>
              <div className="space-y-3">
                {outputFormats.map((format) => (
                  <label
                    key={format.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        outputFormat === format.id
                          ? "border-primary bg-primary"
                          : "border-border group-hover:border-primary/50"
                      }`}
                    >
                      {outputFormat === format.id && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span className="text-sm text-foreground">{format.label}</span>
                    <input
                      type="radio"
                      name="outputFormat"
                      value={format.id}
                      checked={outputFormat === format.id}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RemoveBackground;
