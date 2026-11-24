import React, { useState } from "react";
import { Upload, Download, RefreshCw, FileText, Combine, Shield, Zap } from "lucide-react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import toolsMetadata from "@/data/toolsMetadata";
import { mergePdfs } from "@/lib/stirlingPdfApi";
import { downloadBlob } from "@/lib/api";

interface PDFFile {
  file: File;
  name: string;
  size: number;
}

const MergePDF: React.FC = () => {
  const metadata = toolsMetadata["merge-pdf"] || {
    title: "PDF Merger - Combine Multiple PDFs Online Free",
    description:
      "Merge multiple PDF files into one document. Reorder, organize, and download your combined PDF instantly.",
    keywords: "merge PDF, combine PDF, PDF merger, join PDF files",
    longDescription:
      "PDF Merger is a free online tool for combining multiple PDF files into a single document. Easily reorder pages, manage files, and download your merged PDF without any software installation.",
  };

  const [pdfFiles, setPDFFiles] = useState<PDFFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergedSize, setMergedSize] = useState<number | null>(null);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("merged.pdf");

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
      if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
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
    setMergedBlob(null);
  };

  const removeFile = (index: number) => {
    setPDFFiles((prev) => prev.filter((_, i) => i !== index));
    setMergedSize(null);
    setMergedBlob(null);
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
    downloadBlob(mergedBlob, fileName);
  };

  const clearFiles = () => {
    setPDFFiles([]);
    setMergedSize(null);
    setMergedBlob(null);
    setError("");
    setFileName("merged.pdf");
  };

  const totalSize = pdfFiles.reduce((sum, f) => sum + f.size, 0);

  const inputSection = (
    <div>
      <CardHeader>
        <CardTitle>Upload PDF Files</CardTitle>
        <CardDescription>
          Add 2 or more PDF files to merge into a single ordered document
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <label
          htmlFor="pdf-input"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer block ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-slate-300 hover:border-primary/50 bg-slate-50/70"
          }`}
        >
          <input
            type="file"
            accept=".pdf,application/pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="pdf-input"
          />
          <div className="flex justify-center mb-4">
            <div className="size-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center">
              <FileText className="h-8 w-8 text-rose-600" />
            </div>
          </div>

          <p className="text-base font-bold text-slate-900 mb-1">
            Drag and drop your PDF files here
          </p>
          <p className="text-sm text-slate-500 mb-5">
            or click to browse files from your device
          </p>

          <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm">
            <Upload className="h-4 w-4" />
            Select PDF Files
          </span>

          <p className="mt-4 text-xs text-slate-400">
            Maximum file size: 100MB each · Supported format: PDF
          </p>
        </label>

        {pdfFiles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Selected Files ({pdfFiles.length})
              </h3>
              <p className="text-xs font-mono text-slate-500">
                Total: {(totalSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {pdfFiles.map((pdf, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="size-9 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4 w-4 text-rose-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {index + 1}. {pdf.name}
                      </p>
                      <p className="text-xs font-mono text-slate-500">
                        {(pdf.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 ml-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveFile(index, "up")}
                      disabled={index === 0}
                      className="h-8 w-8 p-0"
                      title="Move up"
                    >
                      ↑
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveFile(index, "down")}
                      disabled={index === pdfFiles.length - 1}
                      className="h-8 w-8 p-0"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                onClick={mergePDFsWithBlob}
                disabled={pdfFiles.length < 2 || merging}
              >
                <Combine className={`h-4 w-4 mr-2 ${merging ? "animate-spin" : ""}`} />
                {merging ? "Merging..." : `Merge ${pdfFiles.length} PDFs`}
              </Button>

              <Button onClick={clearFiles} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );

  const outputSection = mergedSize ? (
    <div>
      <CardHeader>
        <CardTitle>Merge Complete</CardTitle>
        <CardDescription>Your PDFs have been combined in the selected order</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <p className="text-xs text-slate-500 mb-1">Files Merged</p>
            <p className="text-2xl font-display font-bold text-slate-900">{pdfFiles.length}</p>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80">
            <p className="text-xs text-emerald-700 mb-1">Total Output Size</p>
            <p className="text-2xl font-display font-bold text-emerald-800">
              {(mergedSize / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Output Filename
          </label>
          <Input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value || "merged.pdf")}
            placeholder="merged.pdf"
          />
        </div>

        <Button onClick={downloadMerged} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download Merged PDF
        </Button>

        <Button onClick={clearFiles} variant="outline" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Merge Another Set
        </Button>
      </CardContent>
    </div>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="PDF Merger"
      description={metadata.description}
      icon={Combine}
      category="PDF"
      inputSection={inputSection}
      outputSection={outputSection}
      features={[
        {
          icon: Combine,
          title: "Reorder & Organize",
          description: "Arrange PDFs in any sequence with up/down controls before merging.",
        },
        {
          icon: Shield,
          title: "100% Client-Side",
          description: "Documents are merged locally in your browser with zero server uploads.",
        },
        {
          icon: Zap,
          title: "Instant Output",
          description: "Combine multi-page PDFs into a single file and download immediately.",
        },
      ]}
      aboutTitle="About PDF Merger"
      aboutDescription={metadata.longDescription}
      commonUses={[
        "Combine reports from different departments into one cohesive document",
        "Merge scanned pages into a single organized PDF file",
        "Consolidate receipts, invoices, and contracts for archival",
        "Combine multiple documents for easier sharing and review",
      ]}
    />
  );
};

export default MergePDF;
