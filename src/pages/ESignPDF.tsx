import React, { useState, useRef, useEffect } from "react";
import { Upload, Download, RefreshCw, PenTool, CheckCircle2, FileText, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";

export default function ESignPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [signerName, setSignerName] = useState("");
  const [signDate, setSignDate] = useState(new Date().toISOString().split("T")[0]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [signedPdfBlob, setSignedPdfBlob] = useState<Blob | null>(null);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1e293b";
  }, []);

  const handleFileSelect = async (selectedFile: File) => {
    setError("");
    if (!selectedFile.type.includes("pdf") && !selectedFile.name.endsWith(".pdf")) {
      setError("Please select a valid PDF file.");
      return;
    }

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();
      setFile(selectedFile);
      setPageCount(count);
      setSelectedPage(count); // Default to last page where signatures usually go
      setSignedPdfBlob(null);
    } catch (err) {
      setError("Failed to parse this PDF. Please ensure it is not password protected.");
    }
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSignPDF = async () => {
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    if (!hasSignature && !signerName.trim()) {  // nothing to place on the page
      setError("Nothing to sign with. Draw a signature or type a signer name before signing.");
      return;
    }

    setSigning(true);
    setError("");

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();
      const pageIndex = Math.max(0, Math.min(pages.length - 1, selectedPage - 1));
      const targetPage = pages[pageIndex];
      const { width } = targetPage.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const margin = 50;
      let textY = 70;

      // Embed signature image if drawn
      const canvas = canvasRef.current;
      if (canvas && hasSignature) {
        const sigPngDataUrl = canvas.toDataURL("image/png");
        const sigImage = await pdfDoc.embedPng(sigPngDataUrl);
        const sigDims = sigImage.scale(0.5);
        const sigW = Math.min(180, sigDims.width);
        const sigH = Math.min(60, sigDims.height);

        targetPage.drawImage(sigImage, {
          x: width - sigW - margin,
          y: 70,
          width: sigW,
          height: sigH,
        });
        textY = 56;
      }

      const drawRight = (text: string, y: number, size: number) => {
        const w = font.widthOfTextAtSize(text, size);
        targetPage.drawText(text, { x: width - w - margin, y, size, font, color: rgb(0.12, 0.16, 0.23) });
      };

      if (signerName.trim()) {
        drawRight(signerName.trim(), textY, 11);
        textY -= 14;
      }
      if (signDate) {
        drawRight(`Date: ${signDate}`, textY, 9);
      }

      const signedBytes = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([signedBytes], { type: "application/pdf" });
      setSignedPdfBlob(blob);
    } catch (err) {
      console.error("eSign error:", err);
      setError("Failed to sign PDF. If you typed a name, use only standard Latin letters; otherwise try again.");
    } finally {
      setSigning(false);
    }
  };

  const handleDownload = () => {
    if (!signedPdfBlob || !file) return;
    const url = URL.createObjectURL(signedPdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `signed-${file.name}`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const handleReset = () => {
    setFile(null);
    setSignedPdfBlob(null);
    clearCanvas();
    setError("");
    setSignerName("");
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
          className="border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 hover:border-primary rounded-2xl p-8 sm:p-12 text-center transition-all bg-indigo-50/20 cursor-pointer"
          onClick={() => document.getElementById("pdf-sign-input")?.click()}
        >
          <input
            id="pdf-sign-input"
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <PenTool className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Choose a PDF to Sign or Drag & Drop Here
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            Add electronic signatures directly in your browser. 100% private, no cloud storage.
          </p>
          <Button className="mt-4 bg-primary text-white font-medium px-6">
            Select PDF
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Document Summary Card */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total Pages: <span className="font-semibold text-gray-700 dark:text-gray-300">{pageCount}</span>
                </p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={handleReset} className="text-xs text-muted-foreground hover:text-red-600">
              Change PDF
            </Button>
          </div>

          {/* Signature Pad */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Draw Your Signature Below
              </Label>
              {hasSignature && (
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear Signature
                </button>
              )}
            </div>

            <div className="border border-slate-300 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 touch-none shadow-xs">
              <canvas
                ref={canvasRef}
                width={500}
                height={160}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-40 cursor-crosshair block"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Sign with your mouse, trackpad, or finger on touchscreens.
            </p>
          </div>

          {/* Signer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Page to Place Signature</Label>
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(Number(e.target.value))}
                className="w-full h-10 px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {Array.from({ length: pageCount }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Page {i + 1} {i + 1 === pageCount ? "(Last Page)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label className="text-xs font-medium">Typed Signer Name (optional, printed under the signature)</Label>
              <Input
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="Full name"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Signature Date</Label>
              <Input
                type="date"
                value={signDate}
                onChange={(e) => setSignDate(e.target.value)}
              />
            </div>
          </div>

          {/* Success Download Card */}
          {signedPdfBlob && (
            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>PDF Document Successfully Signed!</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your signature, name and date have been added to page {selectedPage}.
              </p>
              <Button
                onClick={handleDownload}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Signed PDF
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ProfessionalToolLayout
      title="eSign PDF"
      description="Draw, create, and embed electronic signatures directly onto your PDF documents in your browser. 100% private."
      category="Document Tools"
      inputSection={inputSection}
      error={error}
      actionButton={
        file && !signedPdfBlob
          ? {
              label: "Sign & Finalize PDF",
              onClick: handleSignPDF,
              loading: signing,
            }
          : undefined
      }
      resetButton={file ? { label: "Upload Different PDF", onClick: handleReset } : undefined}
      howToUse={[
        "Upload the PDF document you wish to sign.",
        "Draw your signature in the signature box using your mouse or touchscreen.",
        "Select the page number where you want your signature embedded.",
        "Click 'Sign & Finalize PDF' and download your signed document."
      ]}
      aboutText="eSign PDF is a secure browser-based electronic signature tool that embeds signatures directly into PDF coordinates using pdf-lib. Because all operations execute locally on your device, sensitive employment agreements, NDAs, rental agreements, and vendor contracts are never transmitted over the internet."
      faqs={[
        {
          question: "Is signing PDFs with this tool legally binding?",
          answer: "Electronic signatures created through web tools are widely recognized under standard e-signature legislation (such as the ESIGN Act and eIDAS) for ordinary business agreements."
        },
        {
          question: "Does my document get uploaded to any third party?",
          answer: "No. The entire signature embedding happens inside your browser using client-side JavaScript. No file is uploaded."
        },
        {
          question: "Can I sign on mobile phones or tablets?",
          answer: "Yes, the signature pad supports touch gestures, allowing you to draw smooth signatures with your finger or stylus."
        },
        {
          question: "Are there any document limits or fees?",
          answer: "eSign PDF is completely free with no limits on document count or pages."
        }
      ]}
      features={[
        {
          icon: "✍️",
          title: "Touchpad & Touchscreen",
          description: "Sign smoothly on phones, tablets, or desktop trackpads."
        },
        {
          icon: "🔒",
          title: "Strictly Client-Side",
          description: "Confidential files never touch any external server."
        },
        {
          icon: "📑",
          title: "Page Selection",
          description: "Choose exactly which page receives your signature."
        }
      ]}
    />
  );
}
