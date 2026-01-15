import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, RefreshCw } from "lucide-react";

const PDFToImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [converted, setConverted] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }

    setError("");
    setFile(selectedFile);
    setConverted([]);
    setPreview("");
  };

  const convertPDF = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      // Note: In production, use pdf-lib or similar library
      // For now, show a placeholder message
      setError("PDF conversion requires backend support. Please ensure your server has pdf2image installed.");
      setProcessing(false);
    } catch (err) {
      setError("Failed to convert PDF");
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setConverted([]);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">PDF to Image</h1>
            <p className="text-gray-600">Convert PDF pages to high-quality images</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">📄</div>
                <h4 className="font-semibold text-gray-900 mb-1">All Pages</h4>
                <p className="text-sm text-gray-600">Convert entire PDF</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🖼️</div>
                <h4 className="font-semibold text-gray-900 mb-1">High Quality</h4>
                <p className="text-sm text-gray-600">Crisp image output</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-1">Fast Conversion</h4>
                <p className="text-sm text-gray-600">Quick processing</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Select PDF</CardTitle>
                <CardDescription>Upload a PDF file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label htmlFor="file-input-pdftoimage" className="cursor-pointer block">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                  >
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF files up to 50MB</p>
                  </div>
                  <input
                    id="file-input-pdftoimage"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>

                {file && (
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-xs font-semibold text-blue-700">File Selected</p>
                      <p className="text-sm font-medium text-blue-900 mt-1">{file.name}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={convertPDF}
                        disabled={processing}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {processing ? "Converting..." : "Convert to Images"}
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {!file && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No PDF selected</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Output Section */}
            {converted.length > 0 && (
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Converted Images</CardTitle>
                  <CardDescription>{converted.length} pages converted</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {converted.map((img, idx) => (
                      <div key={idx} className="p-2 bg-gray-50 border border-gray-200 rounded">
                        <p className="text-sm font-medium text-gray-700">Page {idx + 1}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <p className="text-sm text-orange-700">{error}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PDFToImage;
