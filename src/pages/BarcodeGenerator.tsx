import { useState } from "react";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download } from "lucide-react";

const BarcodeGenerator = () => {
  const [text, setText] = useState("");
  const [format, setFormat] = useState("qr");
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Everything below is generated locally in the browser; the entered text is never sent anywhere.
  const generateQRCode = async (value: string) => {
    const url = await QRCode.toDataURL(value, { width: 300, margin: 2, errorCorrectionLevel: "M" });
    setBarcode(url);
    setError("");
  };

  const generateLinear = (value: string, jsBarcodeFormat: "CODE128" | "EAN13") => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, value, {
      format: jsBarcodeFormat,
      displayValue: true,
      margin: 12,
      width: 2,
      height: 90,
      background: "#ffffff",
      lineColor: "#000000",
    });
    setBarcode(canvas.toDataURL("image/png"));
    setError("");
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Please enter text to encode");
      return;
    }

    if (format === "ean13" && !/^\d{12}$/.test(text)) {
      setError("EAN-13 needs exactly 12 digits; the 13th check digit is added for you.");
      return;
    }

    setLoading(true);
    try {
      if (format === "qr") {
        await generateQRCode(text);
      } else if (format === "code128") {
        generateLinear(text, "CODE128");
      } else if (format === "ean13") {
        generateLinear(text, "EAN13");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate barcode");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setFormat("qr");
    setBarcode("");
    setError("");
  };

  const handleDownload = () => {
    if (!barcode) return;

    const link = document.createElement("a");
    link.href = barcode;
    link.download = `barcode-${format}.png`;
    link.click();
  };

  const handleCopy = async () => {
    if (!barcode) return;

    try {
      const response = await fetch(barcode);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
    } catch (err) {
      setError("Failed to copy barcode");
    }
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Generate Barcode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="text" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Text / Data
          </Label>
          <Input
            id="text"
            type="text"
            placeholder={format === "ean13" ? "Enter 1-12 digits" : "Enter text to encode"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={format === "ean13" ? 12 : 100}
            className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
          {format === "ean13" && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{text.length}/12 characters</p>
          )}
        </div>

        <div>
          <Label htmlFor="format" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Barcode Format
          </Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="format" className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
              <SelectItem value="qr">QR Code</SelectItem>
              <SelectItem value="code128">Code 128</SelectItem>
              <SelectItem value="ean13">EAN-13</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </>
  );

  const outputSection = barcode ? (
    <>
      <CardHeader>
        <CardTitle>Generated Barcode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-blue-200 dark:border-blue-800 p-6 flex items-center justify-center">
          <img
            src={barcode}
            alt="Generated Barcode"
            className="max-w-full max-h-64"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {format === "qr" ? "QR" : format === "code128" ? "128" : "13"}
            </div>
            <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">Format</div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {text.length}
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">Characters</div>
          </div>
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Barcode Generator"
      description="Generate QR codes, Code128, and EAN-13 barcodes"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      actionButton={{
        label: "Generate",
        onClick: handleGenerate,
        icon: "Zap",
        loading,
        disabled: !text.trim(),
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        { icon: "📱", title: "Multiple Formats", description: "QR, Code128, EAN-13" },
        { icon: "📊", title: "Instant Generation", description: "Real-time encoding" },
        { icon: "⚡", title: "Easy Download", description: "Save as PNG" },
      ]}
      children={barcode ? (
        <div className="flex flex-col gap-2">
          
      <Button
            onClick={handleDownload}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Barcode
          </Button>
          {format === "qr" && (
            <Button
              onClick={handleCopy}
              variant="outline"
              className="w-full border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </Button>
          )}
        </div>
      ) : undefined}
    />
  );
};

export default BarcodeGenerator;
