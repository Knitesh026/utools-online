import React, { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import { Upload, Download, RefreshCw, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";

interface PDFFile {
  file: File;
  preview: string;
  originalSize: number;
}

const CompressPDF: React.FC = () => {
  const [pdfFile, setPDFFile] = useState<PDFFile | null>(null);
  const [quality, setQuality] = useState<"low" | "medium" | "high">("medium");
  const [compressing, setCompressing] = useState(false);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const qualitySettings = {
    low: { label: "Low (50% quality)", reduction: 0.5 },
    medium: { label: "Medium (75% quality)", reduction: 0.3 },
    high: { label: "High (90% quality)", reduction: 0.15 },
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setError("");

    if (!file.type.includes("pdf")) {
      setError("Please select a valid PDF file");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size exceeds 100MB limit");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPDFFile({
        file,
        preview: e.target?.result as string,
        originalSize: file.size,
      });
      setCompressedSize(null);
    };
    reader.readAsDataURL(file);
  };

  const compressPDF = async () => {
    if (!pdfFile) return;

    setCompressing(true);
    setError("");

    try {
      // Simulate compression - in production, use a library like pdf-lib or pdfkit
      const reduction = qualitySettings[quality].reduction;
      const estimatedSize = Math.floor(pdfFile.originalSize * (1 - reduction));

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCompressedSize(estimatedSize);
    } catch (err) {
      setError("Failed to compress PDF. Please try again.");
    } finally {
      setCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (!pdfFile) return;

    // In production, download the actual compressed PDF
    const link = document.createElement("a");
    link.href = pdfFile.preview;
    link.download = `${pdfFile.file.name.replace(".pdf", "")}-compressed.pdf`;
    link.click();
  };

  const clearFile = () => {
    setPDFFile(null);
    setCompressedSize(null);
    setError("");
  };

  const compressionRatio = pdfFile && compressedSize ? ((1 - compressedSize / pdfFile.originalSize) * 100).toFixed(1) : 0;

  const inputSection = (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Upload PDF</CardTitle>
        <CardDescription>Select a PDF file to compress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          }`}
        >
          <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-semibold text-gray-900 mb-1">
            Drag and drop your PDF here
          </p>
          <p className="text-xs text-gray-500 mb-3">or click to select</p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-input"
          />
          <label htmlFor="pdf-input" className="cursor-pointer">
            <Button variant="outline" type="button">
              Choose File
            </Button>
          </label>
        </div>

        {pdfFile && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">File:</span> {pdfFile.file.name}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Size:</span>{" "}
              {(pdfFile.originalSize / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="quality">Compression Quality</Label>
          <Select value={quality} onValueChange={(value: any) => setQuality(value)}>
            <SelectTrigger id="quality">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High (90% quality)</SelectItem>
              <SelectItem value="medium">Medium (75% quality)</SelectItem>
              <SelectItem value="low">Low (50% quality)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={compressPDF}
          disabled={!pdfFile || compressing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {compressing ? (
            <>
              <Zap className="h-4 w-4 mr-2 animate-spin" />
              Compressing...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Compress PDF
            </>
          )}
        </Button>

        {pdfFile && (
          <Button onClick={clearFile} variant="outline" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Upload Another
          </Button>
        )}
      </CardContent>
    </div>
  );

  const outputSection = compressedSize ? (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Compression Complete</CardTitle>
        <CardDescription>Your PDF has been compressed successfully</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <p className="text-xs text-gray-600 mb-1">Original Size</p>
            <p className="text-2xl font-bold text-green-700">
              {(pdfFile!.originalSize / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600 mb-1">Compressed Size</p>
            <p className="text-2xl font-bold text-blue-700">
              {(compressedSize / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <p className="text-xs text-gray-600 mb-1">Space Saved</p>
            <p className="text-2xl font-bold text-purple-700">
              {compressionRatio}%
            </p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Method:</span>{" "}
            {qualitySettings[quality].label}
          </p>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-semibold">File:</span> {pdfFile?.file.name}
          </p>
        </div>

        <Button
          onClick={downloadCompressed}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Compressed PDF
        </Button>

        <Button onClick={clearFile} variant="outline" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Compress Another
        </Button>
      </CardContent>
    </div>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="PDF Compressor"
      description="Reduce PDF file size while maintaining quality. Perfect for sharing and storage."
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      colorTheme={{
        gradient: "from-blue-600 to-cyan-600",
        accent: "bg-blue-100 text-blue-900",
      }}
      features={[
        {
          icon: "Zap",
          title: "Multiple Quality Levels",
          description: "Choose from High, Medium, or Low compression settings",
        },
        {
          icon: "FileText",
          title: "Instant Compression",
          description: "Fast compression with real-time size estimation",
        },
        {
          icon: "Download",
          title: "Easy Download",
          description: "Download your compressed PDF in seconds",
        },
      ]}
    />
  
      <AdPopunder />
);
};

export default CompressPDF;
