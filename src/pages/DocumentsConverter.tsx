import React, { useState } from "react";
import { Upload, Download, FileText, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import JSZip from "jszip";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { extractPdfText } from "@/lib/pdfjs";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";

export default function DocumentsConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<"pdf" | "docx" | "txt">("pdf");
  const [converting, setConverting] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultFileName, setResultFileName] = useState("");
  const [error, setError] = useState("");

  const handleFileSelect = (selectedFile: File) => {
    setError("");
    const name = selectedFile.name.toLowerCase();
    const isSupported = name.endsWith(".docx") || name.endsWith(".txt") || name.endsWith(".pdf");

    if (!isSupported) {
      setError("Please select a supported document (.docx, .txt, or .pdf).");
      return;
    }

    if (selectedFile.size > 30 * 1024 * 1024) {
      setError("File size exceeds 30MB limit.");
      return;
    }

    setFile(selectedFile);
    setResultBlob(null);

    // Set smart target format default
    if (name.endsWith(".txt")) setTargetFormat("pdf");
    else if (name.endsWith(".docx")) setTargetFormat("pdf");
    else if (name.endsWith(".pdf")) setTargetFormat("docx");
  };

  const handleConvert = async () => {
    if (!file) return;

    setConverting(true);
    setError("");

    try {
      const fileName = file.name.toLowerCase();
      let extractedText = "";

      // 1. Extract plain text based on input format
      if (fileName.endsWith(".txt")) {
        extractedText = await file.text();
      } else if (fileName.endsWith(".docx")) {
        const buffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(buffer);
        const documentXml = await zip.file("word/document.xml")?.async("text");
        if (documentXml) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(documentXml, "text/xml");
          const paragraphs = xmlDoc.getElementsByTagName("w:p");
          const lines: string[] = [];
          for (let i = 0; i < paragraphs.length; i++) {
            const textNodes = paragraphs[i].getElementsByTagName("w:t");
            let line = "";
            for (let j = 0; j < textNodes.length; j++) {
              line += textNodes[j].textContent || "";
            }
            if (line.trim()) lines.push(line.trim());
          }
          extractedText = lines.join("\n\n");
        }
      } else if (fileName.endsWith(".pdf")) {
        const res = await extractPdfText(file);
        if (!res.text) {
          setError("No extractable text was found in this PDF. It looks like a scan (page images only), so there is nothing to convert. Run it through an OCR tool first.");
          return;
        }
        extractedText = res.text;
      }

      if (!extractedText.trim()) {
        extractedText = `Converted Content from ${file.name}`;
      }

      const baseName = file.name.replace(/\.[^/.]+$/, "");

      // 2. Build target output format
      if (targetFormat === "txt") {
        const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
        setResultBlob(blob);
        setResultFileName(`${baseName}.txt`);
      } else if (targetFormat === "docx") {
        const paragraphs = extractedText
          .split(/\n\s*\n/)
          .filter((p) => p.trim())
          .map(
            (p) =>
              new Paragraph({
                children: [new TextRun({ text: p.trim().replace(/\s*\n\s*/g, " "), size: 24 })],
                spacing: { after: 200 },
              })
          );

        const doc = new Document({
          sections: [{ properties: {}, children: paragraphs.length ? paragraphs : [new Paragraph(extractedText)] }],
        });
        const blob = await Packer.toBlob(doc);
        setResultBlob(blob);
        setResultFileName(`${baseName}.docx`);
      } else if (targetFormat === "pdf") {
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pageWidth = 595.28;
        const pageHeight = 841.89;
        const margin = 50;
        const usableWidth = pageWidth - margin * 2;

        let page = pdfDoc.addPage([pageWidth, pageHeight]);
        let y = pageHeight - margin;

        const lines = extractedText.split(/\r?\n/);
        for (const line of lines) {
          if (y < margin + 20) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
          const truncated = line.slice(0, 90);
          page.drawText(truncated, {
            x: margin,
            y: y,
            size: 11,
            font: font,
            color: rgb(0.15, 0.15, 0.15),
          });
          y -= 16;
        }

        const bytes = await pdfDoc.save({ useObjectStreams: true });
        const blob = new Blob([bytes], { type: "application/pdf" });
        setResultBlob(blob);
        setResultFileName(`${baseName}.pdf`);
      }
    } catch (err) {
      console.error("Document conversion error:", err);
      setError("Failed to convert document. Please ensure the file is not damaged.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !resultFileName) return;
    const url = URL.createObjectURL(resultBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = resultFileName;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const handleReset = () => {
    setFile(null);
    setResultBlob(null);
    setResultFileName("");
    setError("");
  };

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
          className="border-2 border-dashed border-teal-200 dark:border-teal-900/50 hover:border-teal-500 rounded-2xl p-8 sm:p-12 text-center transition-all bg-teal-50/20 cursor-pointer"
          onClick={() => document.getElementById("doc-conv-input")?.click()}
        >
          <input
            id="doc-conv-input"
            type="file"
            accept=".docx,.txt,.pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Upload Document (.docx, .pdf, or .txt)
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Convert documents between PDF, Word, and Text format inside your browser.
          </p>
          <Button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-medium px-6">
            Select Document
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">Ready for multi-format conversion</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={handleReset} className="text-xs text-muted-foreground hover:text-red-600">
              Change File
            </Button>
          </div>

          {/* Target Format Selector */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Target Format</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => setTargetFormat("pdf")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  targetFormat === "pdf"
                    ? "border-teal-600 bg-teal-50/50 dark:bg-teal-950/20 shadow-xs"
                    : "border-slate-200 dark:border-gray-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">PDF Document</span>
                  {targetFormat === "pdf" && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                </div>
                <p className="text-xs text-muted-foreground">Standardized vector PDF format.</p>
              </div>

              <div
                onClick={() => setTargetFormat("docx")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  targetFormat === "docx"
                    ? "border-teal-600 bg-teal-50/50 dark:bg-teal-950/20 shadow-xs"
                    : "border-slate-200 dark:border-gray-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">Word (.docx)</span>
                  {targetFormat === "docx" && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                </div>
                <p className="text-xs text-muted-foreground">Editable Microsoft Word format.</p>
              </div>

              <div
                onClick={() => setTargetFormat("txt")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  targetFormat === "txt"
                    ? "border-teal-600 bg-teal-50/50 dark:bg-teal-950/20 shadow-xs"
                    : "border-slate-200 dark:border-gray-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">Plain Text (.txt)</span>
                  {targetFormat === "txt" && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                </div>
                <p className="text-xs text-muted-foreground">Clean universal plain text.</p>
              </div>
            </div>
          </div>

          {resultBlob && (
            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Conversion Succeeded!</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Output generated as: <span className="font-semibold text-gray-800 dark:text-gray-200">{resultFileName}</span>
              </p>
              <Button
                onClick={handleDownload}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download {resultFileName}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ProfessionalToolLayout
      title="Documents Converter"
      description="Convert documents between PDF, Word (.docx), and Text (.txt) formats privately inside your browser."
      category="Document Tools"
      inputSection={inputSection}
      error={error}
      actionButton={
        file && !resultBlob
          ? {
              label: "Convert Document Now",
              onClick: handleConvert,
              loading: converting,
            }
          : undefined
      }
      resetButton={file ? { label: "Upload Different File", onClick: handleReset } : undefined}
      howToUse={[
        "Upload your document (.docx, .pdf, or .txt).",
        "Select your preferred target output format (PDF, Word, or Plain Text).",
        "Click 'Convert Document Now' to initiate client-side conversion.",
        "Download your converted file instantly."
      ]}
      aboutText="Documents Converter provides universal multi-format conversion between standard document types. By operating directly inside your browser using client-side parsers and encoders, your confidential documents are never uploaded to any remote server or third-party storage."
      faqs={[
        {
          question: "Which formats are supported?",
          answer: "You can convert between Microsoft Word (.docx), PDF (.pdf), and Plain Text (.txt) formats."
        },
        {
          question: "Is there any file size limit?",
          answer: "You can convert documents up to 30MB in size with zero fees or restrictions."
        },
        {
          question: "Are my files secure?",
          answer: "Yes, 100%. Processing occurs locally in your browser memory."
        }
      ]}
      features={[
        {
          icon: "🔄",
          title: "Multi-Format",
          description: "Seamless conversion between PDF, Word, and Text."
        },
        {
          icon: "🔒",
          title: "Strictly Private",
          description: "Zero server uploads; documents stay on your machine."
        },
        {
          icon: "⚡",
          title: "Instant Assembly",
          description: "Fast in-browser packaging with no wait times."
        }
      ]}
    />
  );
}
