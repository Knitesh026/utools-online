import React, { useState, useEffect } from "react";
import { Upload, Download, RefreshCw, FileText, Combine, Shield, Zap } from "lucide-react";
import { SEOPage } from "@/components/SEOPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import toolsMetadata from "@/data/toolsMetadata";
import { mergePdfs } from "@/lib/stirlingPdfApi";
import { downloadBlob } from "@/lib/api";

interface PDFFile {
  file: File;
  name: string;
  size: number;
}

const MergePDF: React.FC = () => {
  const metadata = toolsMetadata['merge-pdf'] || {
    title: 'PDF Merger - Combine Multiple PDFs Online Free',
    description: 'Merge multiple PDF files into one document. Reorder, organize, and download your combined PDF instantly.',
    keywords: 'merge PDF, combine PDF, PDF merger, join PDF files',
    longDescription: 'PDF Merger is a free online tool for combining multiple PDF files into a single document. Easily reorder pages, manage files, and download your merged PDF without any software installation.'
  };
  
  const currentUrl = 'https://utoolss.online/merge-pdf';
  const breadcrumbs = [
    { name: 'Home', url: 'https://utoolss.online' },
    { name: 'Tools', url: 'https://utoolss.online/tools' },
    { name: 'PDF Merger', url: currentUrl }
  ];

  const [pdfFiles, setPDFFiles] = useState<PDFFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergedSize, setMergedSize] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("merged.pdf");
  const [currentStep, setCurrentStep] = useState(1);

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev === 3 ? 1 : prev + 1));
    }, 4000); // Change step every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files: File[]) => {
    setError("");

    const validFiles = files.filter((file) => {
      if (!file.type.includes("pdf")) {
        setError("All files must be PDF format");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("File size exceeds 100MB limit");
        return false;
      }
      return true;
    });

    const newFiles: PDFFile[] = validFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
    }));

    setPDFFiles((prev) => [...prev, ...newFiles]);
    setMergedSize(null);
  };

  const removeFile = (index: number) => {
    setPDFFiles((prev) => prev.filter((_, i) => i !== index));
    setMergedSize(null);
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    const newFiles = [...pdfFiles];
    if (direction === "up" && index > 0) {
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
    } else if (direction === "down" && index < newFiles.length - 1) {
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    }
    setPDFFiles(newFiles);
  };

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) {
      setError("Please add at least 2 PDF files to merge");
      return;
    }

    setMerging(true);
    setError("");

    try {
      // Extract File objects from PDFFile array (order matters)
      const files = pdfFiles.map((pdf) => pdf.file);

      // Call Stirling PDF API to merge PDFs
      const mergedBlob = await mergePdfs(files);

      // Store the blob for download
      setMergedSize(mergedBlob.size);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to merge PDFs. Please try again.";
      setError(errorMessage);
      console.error("Merge error:", err);
    } finally {
      setMerging(false);
    }
  };

  // Store the merged blob for download
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);

  const mergePDFsWithBlob = async () => {
    if (pdfFiles.length < 2) {
      setError("Please add at least 2 PDF files to merge");
      return;
    }

    setMerging(true);
    setError("");

    try {
      const files = pdfFiles.map((pdf) => pdf.file);
      const blob = await mergePdfs(files);
      
      setMergedBlob(blob);
      setMergedSize(blob.size);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to merge PDFs. Please try again.";
      setError(errorMessage);
      console.error("Merge error:", err);
    } finally {
      setMerging(false);
    }
  };

  const downloadMerged = () => {
    if (!mergedBlob) return;

    // Download the merged PDF blob
    downloadBlob(mergedBlob, fileName);
  };

  const clearFiles = () => {
    setPDFFiles([]);
    setMergedSize(null);
    setError("");
    setFileName("merged.pdf");
  };

  const totalSize = pdfFiles.reduce((sum, f) => sum + f.size, 0);

  const inputSection = (
    <div className="w-full">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl md:text-3xl mb-2">Upload PDF Files</CardTitle>
        <CardDescription className="text-base">
          Add 2 or more PDF files to merge into a single document
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Enhanced Drag-Drop Area - Centered */}
        <label 
          htmlFor="pdf-input"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 md:p-16 text-center transition-all cursor-pointer block ${
            dragActive
              ? "border-primary bg-primary/5 dark:bg-primary/10"
              : "border-primary/30 dark:border-primary/40 hover:border-primary/50 dark:hover:border-primary/60 bg-primary/2 dark:bg-primary/5"
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="pdf-input"
          />
          <div className="flex justify-center mb-4">
            <div className="size-20 flex items-center justify-center">
              <FileText className="h-16 w-16 text-primary/40 dark:text-primary/50" />
            </div>
          </div>
          
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Drag and drop your PDF files here
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            or click the button below to select files from your computer
          </p>
          
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-12 py-3 text-base font-bold">
            <Upload className="h-5 w-5 mr-2" />
            Upload from PC or Mobile
          </Button>
          
          <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
            Maximum file size: 100MB each • Supported format: PDF
          </p>
        </label>

        {/* File List */}
        {pdfFiles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Selected Files ({pdfFiles.length})
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Total: {(totalSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {pdfFiles.map((pdf, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="size-10 bg-red-100 dark:bg-red-950 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {index + 1}. {pdf.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(pdf.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveFile(index, "up")}
                      disabled={index === 0}
                      className="h-8 w-8 p-0 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50"
                      title="Move up"
                    >
                      ↑
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveFile(index, "down")}
                      disabled={index === pdfFiles.length - 1}
                      className="h-8 w-8 p-0 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50"
                      title="Move down"
                    >
                      ↓
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 p-0"
                      title="Remove file"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {pdfFiles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Button
              onClick={mergePDFsWithBlob}
              disabled={pdfFiles.length < 2 || merging}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white py-3 text-base font-bold rounded-lg"
            >
              {merging ? (
                <>
                  <Combine className="h-4 w-4 mr-2 animate-spin" />
                  Merging...
                </>
              ) : (
                <>
                  <Combine className="h-4 w-4 mr-2" />
                  Merge {pdfFiles.length} PDFs
                </>
              )}
            </Button>

            <Button 
              onClick={clearFiles} 
              variant="outline" 
              className="py-3 text-base font-bold rounded-lg border-2 border-primary/30 hover:bg-primary/5"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear & Start Over
            </Button>
          </div>
        )}
      </CardContent>
    </div>
  );

  const outputSection = mergedSize ? (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Merge Complete</CardTitle>
        <CardDescription>Your PDFs have been merged successfully</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <p className="text-xs text-gray-600 mb-1">Files Merged</p>
            <p className="text-2xl font-bold text-purple-700">{pdfFiles.length}</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600 mb-1">Total Size</p>
            <p className="text-2xl font-bold text-blue-700">
              {(mergedSize / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            Output Filename
          </label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value || "merged.pdf")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="merged.pdf"
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 font-semibold mb-2">Merged Files:</p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {pdfFiles.map((pdf, index) => (
              <p key={index} className="text-xs text-gray-600">
                {index + 1}. {pdf.name}
              </p>
            ))}
          </div>
        </div>

        <Button
          onClick={downloadMerged}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Merged PDF
        </Button>

        <Button onClick={clearFiles} variant="outline" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Merge Another
        </Button>
      </CardContent>
    </div>
  ) : undefined;

  return (
    <SEOPage 
      title={metadata.title}
      description={metadata.description}
      keywords={metadata.keywords}
      canonical={currentUrl}
      breadcrumbs={breadcrumbs}
      toolName="PDF Merger"
      toolDescription={metadata.description}
    >
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary dark:from-primary/80 dark:to-secondary/80 text-white py-10 md:py-14 shadow-lg">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {metadata.title.split(' - ')[0]}
            </h1>
            <p className="text-base md:text-lg text-white/90">
              {metadata.description}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Animated Steps Section at Top - Compact Size */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative">
              {[
                {
                  step: 1,
                  title: "Select PDFs",
                  description: "Choose 2 or more PDF files",
                },
                {
                  step: 2,
                  title: "Upload Files",
                  description: "Upload from your device",
                },
                {
                  step: 3,
                  title: "Download",
                  description: "Get your merged PDF",
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center">
                  {/* Step Circle - Compact */}
                  <div
                    className={`size-12 rounded-full flex items-center justify-center mb-2 shadow-lg font-bold text-base transition-all duration-500 relative z-10 ${
                      currentStep === item.step
                        ? "bg-gradient-to-br from-primary to-secondary dark:from-primary/80 dark:to-secondary/80 text-white scale-110 ring-4 ring-primary/30 dark:ring-primary/50"
                        : currentStep > item.step
                        ? "bg-green-500 dark:bg-green-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {currentStep > item.step ? "✓" : item.step}
                  </div>
                  
                  {/* Step Label */}
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-0.5 uppercase tracking-wider">
                    {item.title}
                  </p>
                  
                  {/* Description */}
                  <p
                    className={`text-center text-xs text-gray-600 dark:text-gray-400 transition-all duration-500 ${
                      currentStep === item.step
                        ? "opacity-100 scale-100"
                        : "opacity-60 scale-95"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Section */}
          <Card className="border-0 shadow-lg mb-8">
            {inputSection}
          </Card>

          {/* Output Section */}
          {outputSection && (
            <Card className="border-0 shadow-lg mb-8">
              {outputSection}
            </Card>
          )}

          {/* Features Section */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-2xl p-8 md:p-12 border-2 border-primary/10 dark:border-primary/20 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why Use Our PDF Merger?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Combine,
                  title: "Reorder & Organize",
                  description: "Arrange PDFs in any order before merging with intuitive up/down controls",
                },
                {
                  icon: FileText,
                  title: "Batch Processing",
                  description: "Merge multiple PDFs at once without any file count limitations",
                },
                {
                  icon: Download,
                  title: "Custom Naming",
                  description: "Set your own filename for the merged PDF before downloading",
                },
                {
                  icon: Shield,
                  title: "100% Secure",
                  description: "Files processed in your browser with zero data stored on servers",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Instant processing and download of your merged documents",
                },
                {
                  icon: FileText,
                  title: "Completely Free",
                  description: "No registration, no limits, and no hidden costs - always free",
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary dark:text-primary/80 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-8 md:p-12 border-2 border-gray-200 dark:border-slate-700/50">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              About PDF Merger
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {metadata.longDescription}
            </p>
            
            <div className="mt-8 pt-8 border-t-2 border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Common Uses:</h3>
              <ul className="space-y-3">
                {[
                  "Combine reports from different departments into one cohesive document",
                  "Merge scanned pages into a single organized PDF file",
                  "Consolidate receipts, invoices, and contracts for proper archival",
                  "Combine multiple documents for easier sharing and collaboration",
                  "Organize project documentation into a single comprehensive file",
                ].map((use, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="inline-block h-2 w-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Uploaded and generated files are deleted 1 hour after upload</p>
          </div>
        </div>
      </div>
    </SEOPage>
  );
};

export default MergePDF;
