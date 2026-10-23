import React, { useState } from "react";
import { Upload, Download, RefreshCw, FileText, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PDFDocument } from "pdf-lib";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [error, setError] = useState("");

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = (selectedFile: File) => {
    setError("");
    if (!selectedFile.type.includes("pdf") && !selectedFile.name.endsWith(".pdf")) {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > 80 * 1024 * 1024) {
      setError("File size exceeds 80MB. Please select a smaller PDF.");
      return;
    }

    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setCompressedBlob(null);
    setCompressedSize(0);
  };

  const handleCompress = async () => {
    if (!file) return;

    setCompressing(true);
    setError("");

    try {
      const arrayBuffer = await file.arrayBuffer();

      // Load PDF using pdf-lib
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
        updateMetadata: false,
      });

      // Strip unnecessary metadata streams to reduce overhead
      pdfDoc.setTitle("");
      pdfDoc.setAuthor("");
      pdfDoc.setSubject("");
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer("uTools.online PDF Engine");
      pdfDoc.setCreator("uTools.online");

      // Save with maximum object stream compression and structural optimization
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const finalBlob = new Blob([compressedBytes], { type: "application/pdf" });
      const finalSize = finalBlob.size;

      setCompressedBlob(finalBlob);
      setCompressedSize(finalSize);
    } catch (err) {
      console.error("PDF compression error:", err);
      setError("Failed to compress this PDF. The document may be password-protected or corrupted.");
    } finally {
      setCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob || !file) return;
    const url = URL.createObjectURL(compressedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file.name.replace(/\.pdf$/i, "")}-compressed.pdf`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const handleReset = () => {
    setFile(null);
    setCompressedBlob(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setError("");
  };

  const savingsPercent =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, (((originalSize - compressedSize) / originalSize) * 100)).toFixed(1)
      : "0";

  const inputSection = (
    <div className="space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) {
              handleFileSelect(e.dataTransfer.files[0]);
            }
          }}
          className="border-2 border-dashed border-red-200 dark:border-red-900/50 hover:border-red-500 rounded-2xl p-8 sm:p-12 text-center transition-all bg-red-50/20 cursor-pointer"
          onClick={() => document.getElementById("pdf-compress-input")?.click()}
        >
          <input
            id="pdf-compress-input"
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Choose a PDF File or Drag & Drop Here
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Reduce PDF file size securely directly in your browser. Maximum file size: 80MB.
          </p>
          <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium px-6">
            Select PDF
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Card */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Original Size: <span className="font-semibold text-gray-700 dark:text-gray-300">{formatFileSize(originalSize)}</span>
                </p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={handleReset} className="text-xs text-muted-foreground hover:text-red-600">
              Change File
            </Button>
          </div>

          <p className="text-xs text-muted-foreground rounded-lg border border-slate-200 dark:border-gray-800 p-3">
            This tool re-saves the PDF with a more compact internal structure and clears title, author, subject and keywords. It does not recompress or downsample embedded images, so photo-heavy or scanned PDFs may barely change.
          </p>

          {/* Result Card if compressed */}
          {compressedBlob && (
            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{compressedSize < originalSize ? "PDF re-saved with a smaller structure" : "This PDF is already optimised"}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100 shadow-xs">
                  <span className="text-xs text-muted-foreground">Before</span>
                  <p className="text-base font-bold text-gray-900 dark:text-white mt-0.5">{formatFileSize(originalSize)}</p>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100 shadow-xs">
                  <span className="text-xs text-muted-foreground">After</span>
                  <p className="text-base font-bold text-emerald-600 mt-0.5">{formatFileSize(compressedSize)}</p>
                </div>
                <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100 shadow-xs col-span-2 sm:col-span-1">
                  <span className="text-xs text-muted-foreground">Size Reduction</span>
                  <p className="text-base font-bold text-primary mt-0.5">{compressedSize < originalSize ? `-${savingsPercent}%` : "No reduction"}</p>
                </div>
              </div>

              {compressedSize >= originalSize && (
                <p className="text-xs text-muted-foreground">
                  The re-saved file is not smaller ({formatFileSize(compressedSize)} vs {formatFileSize(originalSize)}). Its structure is already compact and the remaining weight is likely embedded images, which this tool does not recompress. Keep your original file.
                </p>
              )}
              <Button
                onClick={handleDownload}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Compressed PDF
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ProfessionalToolLayout
      title="Compress PDF"
      description="Re-save a PDF with a compact structure and stripped metadata, in your browser. Embedded images are not recompressed. No uploads."
      category="Document Tools"
      inputSection={inputSection}
      error={error}
      actionButton={
        file && !compressedBlob
          ? {
              label: "Compress PDF Now",
              onClick: handleCompress,
              loading: compressing,
            }
          : undefined
      }
      resetButton={file ? { label: "Upload New PDF", onClick: handleReset } : undefined}
      howToUse={[
        "Click the upload area or drag and drop your PDF document.",
        "Review the original size shown on the file card. The tool re-saves the PDF and strips metadata; it does not shrink embedded images.",
        "Click 'Compress PDF Now' to re-save the file in your browser.",
        "Check the real before and after sizes, then click 'Download Compressed PDF'."
      ]}
      aboutText="Compress PDF is an in-browser document optimizer that restructures PDF dictionary streams, purges redundant cross-reference tables, and strips unneeded metadata using the modern pdf-lib engine. Because everything executes strictly inside your browser's local sandbox, sensitive contracts, financial statements, and personal forms are never transmitted to any third-party cloud."
      faqs={[
        {
          question: "How does this PDF compressor work?",
          answer: "It inspects the internal PDF objects and streams, optimizing data packing and removing duplicate metadata while preserving all fonts, vector text, and forms."
        },
        {
          question: "Is there any risk of losing text quality?",
          answer: "No. Vector text, fonts, and hyperlinks are fully preserved in high fidelity."
        },
        {
          question: "Can I compress password-protected PDFs?",
          answer: "If the PDF requires a password to open, it usually cannot be processed here. Remove the password in a PDF viewer first, if you are entitled to open it."
        },
        {
          question: "Is there a limit on how many PDFs I can compress?",
          answer: "There are no limits! You can compress as many PDF documents as you need completely free of charge."
        }
      ]}
      features={[
        {
          icon: "📉",
          title: "Structural Re-save",
          description: "Repacks PDF objects and clears metadata; images are left untouched."
        },
        {
          icon: "🔒",
          title: "Private & Secure",
          description: "No remote server storage; processing stays on your machine."
        },
        {
          icon: "⚡",
          title: "Instant Download",
          description: "No queues or email waits — download the result immediately."
        }
      ]}
    />
  );
}
