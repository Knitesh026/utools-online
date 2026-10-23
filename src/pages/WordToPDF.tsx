import React, { useState } from "react";
import { Upload, Download, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";

export default function WordToPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [previewSnippet, setPreviewSnippet] = useState<string>("");
  const [error, setError] = useState("");

  const handleFileSelect = (selectedFile: File) => {
    setError("");
    if (!selectedFile.name.toLowerCase().endsWith(".docx")) {
      setError("Please upload a .docx file. Older .doc files must be saved as .docx in Word first.");
      return;
    }

    if (selectedFile.size > 40 * 1024 * 1024) {
      setError("File size exceeds 40MB limit.");
      return;
    }

    setFile(selectedFile);
    setPdfBlob(null);
    setPreviewSnippet("");
  };

  const handleConvertToPDF = async () => {
    if (!file) return;

    setConverting(true);
    setError("");

    try {
      const buffer = await file.arrayBuffer();

      // Read Word .docx XML content with JSZip
      const zip = await JSZip.loadAsync(buffer);
      const documentXml = await zip.file("word/document.xml")?.async("text");

      let extractedParagraphs: string[] = [];

      if (documentXml) {
        // Parse XML document using DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(documentXml, "text/xml");
        const paragraphs = xmlDoc.getElementsByTagName("w:p");

        for (let i = 0; i < paragraphs.length; i++) {
          const p = paragraphs[i];
          const textNodes = p.getElementsByTagName("w:t");
          let pText = "";
          for (let j = 0; j < textNodes.length; j++) {
            pText += textNodes[j].textContent || "";
          }
          if (pText.trim()) {
            extractedParagraphs.push(pText.trim());
          }
        }
      }

      if (extractedParagraphs.length === 0) {
        setError("No text was found in this Word file, so there is nothing to convert.");
        return;
      }

      // Create PDF using pdf-lib
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const pageWidth = 595.28; // Standard A4 points
      const pageHeight = 841.89;
      const margin = 50;
      const usableWidth = pageWidth - margin * 2;

      let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      let currentY = pageHeight - margin;

      // Draw Document Title Header
      currentPage.drawText(file.name.replace(/\.[^/.]+$/, ""), {
        x: margin,
        y: currentY,
        size: 18,
        font: boldFont,
        color: rgb(0.1, 0.15, 0.25),
      });
      currentY -= 35;

      // Word wrap helper
      const wrapText = (text: string, maxW: number, f: any, size: number): string[] => {
        const words = text.split(/\s+/);
        const lines: string[] = [];
        let curLine = "";

        for (const w of words) {
          const testLine = curLine ? `${curLine} ${w}` : w;
          const textW = f.widthOfTextAtSize(testLine, size);
          if (textW <= maxW) {
            curLine = testLine;
          } else {
            if (curLine) lines.push(curLine);
            curLine = w;
          }
        }
        if (curLine) lines.push(curLine);
        return lines;
      };

      for (const para of extractedParagraphs) {
        const lines = wrapText(para, usableWidth, font, 11);

        for (const line of lines) {
          if (currentY < margin + 20) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            currentY = pageHeight - margin;
          }

          currentPage.drawText(line, {
            x: margin,
            y: currentY,
            size: 11,
            font: font,
            color: rgb(0.2, 0.2, 0.2),
          });

          currentY -= 16;
        }

        currentY -= 10; // Paragraph spacing
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setPdfBlob(blob);
      setPreviewSnippet(extractedParagraphs.slice(0, 3).join("\n\n"));
    } catch (err) {
      console.error("Word to PDF conversion error:", err);
      setError("Failed to convert Word file. Please verify it is a valid .docx document.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob || !file) return;
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file.name.replace(/\.[^/.]+$/, "")}.pdf`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const handleReset = () => {
    setFile(null);
    setPdfBlob(null);
    setPreviewSnippet("");
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
          className="border-2 border-dashed border-blue-200 dark:border-blue-900/50 hover:border-blue-500 rounded-2xl p-8 sm:p-12 text-center transition-all bg-blue-50/20 cursor-pointer"
          onClick={() => document.getElementById("word-to-pdf-input")?.click()}
        >
          <input
            id="word-to-pdf-input"
            type="file"
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Choose a Word Document (.docx)
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Convert Microsoft Word documents to professional PDF files in seconds. 100% private.
          </p>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6">
            Select Word File
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Ready to compile into PDF format
                </p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={handleReset} className="text-xs text-muted-foreground hover:text-red-600">
              Change File
            </Button>
          </div>

          {pdfBlob && (
            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>PDF Document Ready to Download!</span>
              </div>
              {previewSnippet && (
                <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100 text-xs text-muted-foreground font-mono">
                  {previewSnippet}
                </div>
              )}
              <Button
                onClick={handleDownload}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF Document
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ProfessionalToolLayout
      title="Word to PDF Converter"
      description="Convert Microsoft Word (.docx) documents into clean, readable PDF documents directly in your browser. Completely free."
      category="Document Tools"
      inputSection={inputSection}
      error={error}
      actionButton={
        file && !pdfBlob
          ? {
              label: "Convert to PDF Now",
              onClick: handleConvertToPDF,
              loading: converting,
            }
          : undefined
      }
      resetButton={file ? { label: "Upload Another File", onClick: handleReset } : undefined}
      howToUse={[
        "Upload your Microsoft Word document (.docx) into the converter.",
        "Click 'Convert to PDF Now' to parse paragraphs and typography in your browser.",
        "Preview the formatted document snippet.",
        "Click 'Download PDF Document' to save your new PDF file."
      ]}
      aboutText="Word to PDF Converter parses OpenXML document structures from .docx files and compiles them into standardized PDF documents with crisp vector typography. Because the entire parsing and page assembly takes place in your local browser sandbox, your personal documents, resumes, and business reports remain private and confidential."
      faqs={[
        {
          question: "Which Word formats are supported?",
          answer: "The tool supports modern Microsoft Word (.docx) files created in Word 2007 through current versions, as well as documents exported from Google Docs and Pages."
        },
        {
          question: "Will my document layout be preserved?",
          answer: "Text, headings, and paragraphs are formatted cleanly on standard A4 PDF pages with automatic line wrapping."
        },
        {
          question: "Is there any cost or registration?",
          answer: "Word to PDF is 100% free with no account creation or subscription needed."
        }
      ]}
      features={[
        {
          icon: "📑",
          title: "Clean Typography",
          description: "Generates standard A4 PDF documents with sharp vector fonts."
        },
        {
          icon: "🛡️",
          title: "100% Private",
          description: "No cloud server upload; conversion executes in your browser."
        },
        {
          icon: "⚡",
          title: "Instant Results",
          description: "No email verification or queues required."
        }
      ]}
    />
  );
}
