import React, { useState } from "react";
import { Upload, Download, FileText, CheckCircle2, AlertCircle, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { extractPdfText } from "@/lib/pdfjs";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [docxBlob, setDocxBlob] = useState<Blob | null>(null);
  const [extractedPreview, setExtractedPreview] = useState<string>("");
  const [error, setError] = useState("");

  const handleFileSelect = (selectedFile: File) => {
    setError("");
    if (!selectedFile.type.includes("pdf") && !selectedFile.name.endsWith(".pdf")) {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File size exceeds 50MB limit.");
      return;
    }

    setFile(selectedFile);
    setDocxBlob(null);
    setExtractedPreview("");
  };

  const handleConvertToWord = async () => {
    if (!file) return;

    setConverting(true);
    setError("");

    try {
      const { text } = await extractPdfText(file);
      if (!text) {
        setError("No extractable text was found. This PDF looks like a scan (page images only), so there are no characters to convert. Run it through an OCR tool first.");
        return;
      }
      const content = text;

      const paragraphs = content
        .split(/\n\s*\n/)
        .filter((p) => p.trim().length > 0)
        .map(
          (paraText) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: paraText.trim().replace(/\s*\n\s*/g, " "),
                  size: 24, // 12pt
                }),
              ],
              spacing: { after: 200 },
            })
        );

      if (paragraphs.length === 0) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Document: ${file.name}`,
                size: 28,
                bold: true,
              }),
            ],
          })
        );
      }

      // Build genuine Word (.docx) document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: file.name.replace(/\.pdf$/i, ""),
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 300 },
              }),
              ...paragraphs,
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      setDocxBlob(blob);
      setExtractedPreview(content.slice(0, 300) + (content.length > 300 ? "..." : ""));
    } catch (err) {
      console.error("PDF to Word conversion error:", err);
      setError("Failed to convert this PDF to Word. Please ensure it is a valid document.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (!docxBlob || !file) return;
    const url = URL.createObjectURL(docxBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file.name.replace(/\.pdf$/i, "")}.docx`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const handleReset = () => {
    setFile(null);
    setDocxBlob(null);
    setExtractedPreview("");
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
          className="border-2 border-dashed border-amber-200 dark:border-amber-900/50 hover:border-amber-500 rounded-2xl p-8 sm:p-12 text-center transition-all bg-amber-50/20 cursor-pointer"
          onClick={() => document.getElementById("pdf-to-word-input")?.click()}
        >
          <input
            id="pdf-to-word-input"
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Choose a PDF File to Convert to Word (.docx)
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Extract text and create an editable Microsoft Word document in seconds. 100% private.
          </p>
          <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-medium px-6">
            Select PDF
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Ready to convert to Microsoft Word (.docx)
                </p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={handleReset} className="text-xs text-muted-foreground hover:text-red-600">
              Change File
            </Button>
          </div>

          {docxBlob && (
            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Conversion Complete! Word Document Ready</span>
              </div>
              {extractedPreview && (
                <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100 text-xs text-muted-foreground font-mono">
                  {extractedPreview}
                </div>
              )}
              <Button
                onClick={handleDownload}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Word (.docx)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ProfessionalToolLayout
      title="PDF to Word Converter"
      description="Convert PDF documents into editable Microsoft Word (.docx) files directly in your browser. No registration required."
      category="Document Tools"
      inputSection={inputSection}
      error={error}
      actionButton={
        file && !docxBlob
          ? {
              label: "Convert to Word Now",
              onClick: handleConvertToWord,
              loading: converting,
            }
          : undefined
      }
      resetButton={file ? { label: "Upload Another PDF", onClick: handleReset } : undefined}
      howToUse={[
        "Upload the PDF document you want to convert into Word format.",
        "Click 'Convert to Word Now' to initiate client-side text and document parsing.",
        "Preview the extracted document structure and content summary.",
        "Click 'Download Word (.docx)' to save your editable document."
      ]}
      aboutText="PDF to Word Converter transforms PDF documents into native Microsoft Word (.docx) files using the browser-based docx engine. It extracts text and structural runs from PDF content, enabling you to edit, format, and share documents in Word without needing Adobe Acrobat or costly paid software."
      faqs={[
        {
          question: "Can I edit the converted Word file in Microsoft Word or Google Docs?",
          answer: "Yes! The output is a standard Office Open XML (.docx) file fully compatible with Microsoft Word, Google Docs, LibreOffice, and Apple Pages."
        },
        {
          question: "Is my document uploaded to a remote server?",
          answer: "No. The conversion is performed directly inside your browser. Your confidential files are never uploaded to any cloud server."
        },
        {
          question: "Does it support scanned PDFs?",
          answer: "Text-based PDFs convert directly. For scanned image-only PDFs, ensure the document has OCR text applied."
        }
      ]}
      features={[
        {
          icon: "📄",
          title: "Standard .DOCX Output",
          description: "Compatible with Word, Google Docs, and Pages."
        },
        {
          icon: "🔒",
          title: "Private Processing",
          description: "All parsing and packaging happens locally on your computer."
        },
        {
          icon: "⚡",
          title: "Fast & Free",
          description: "Instant document assembly with zero wait queues."
        }
      ]}
    />
  );
}
