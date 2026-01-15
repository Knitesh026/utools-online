import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Copy, Check, RefreshCw } from "lucide-react";
import { useState as useCopyState } from "react";

const ImageToBase64 = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [base64, setBase64] = useState("");
  const [format, setFormat] = useState<"dataUrl" | "base64">("dataUrl");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [base64Size, setBase64Size] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }

    setError("");
    setFile(selectedFile);
    setFileSize(selectedFile.size);
    setCopied(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);

      const dataUrl = result;
      const justBase64 = dataUrl.split(",")[1] || dataUrl;

      setBase64(dataUrl);
      setBase64Size(justBase64.length);
    };
    reader.readAsDataURL(selectedFile);
  };

  const displayValue = format === "dataUrl" ? base64 : base64.split(",")[1] || base64;

  const handleCopy = () => {
    if (!displayValue) return;

    navigator.clipboard.writeText(displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!displayValue) return;

    const link = document.createElement("a");
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(displayValue)}`;
    link.download = `base64-${file?.name || "image"}.txt`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setPreview("");
    setBase64("");
    setFormat("dataUrl");
    setCopied(false);
    setError("");
    setFileSize(0);
    setBase64Size(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Image to Base64</h1>
            <p className="text-gray-600">Convert images to Base64 encoded text</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">🔄</div>
                <h4 className="font-semibold text-gray-900 mb-1">Fast Conversion</h4>
                <p className="text-sm text-gray-600">Instant encoding</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">📋</div>
                <h4 className="font-semibold text-gray-900 mb-1">Two Formats</h4>
                <p className="text-sm text-gray-600">Data URL or Base64</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold text-gray-900 mb-1">Size Info</h4>
                <p className="text-sm text-gray-600">See file sizes</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>Select an image to convert</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label htmlFor="file-input-tobase64" className="cursor-pointer block">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                  >
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 50MB</p>
                  </div>
                  <input
                    id="file-input-tobase64"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>

                {preview && (
                  <div className="space-y-4">
                    {/* File Info */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">File Size</p>
                        <p className="text-sm font-semibold text-gray-900">{formatBytes(fileSize)}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Base64 Size</p>
                        <p className="text-sm font-semibold text-blue-700">{formatBytes(base64Size)}</p>
                      </div>
                    </div>

                    {/* Format Selection */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Output Format</label>
                      <Select value={format} onValueChange={(val: any) => setFormat(val)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dataUrl">Data URL (with prefix)</SelectItem>
                          <SelectItem value="base64">Base64 (without prefix)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2">Image Preview</p>
                      <img src={preview} alt="preview" className="w-full h-32 object-cover rounded" />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleCopy} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <Button onClick={handleDownload} variant="outline" className="flex-1">
                        Download
                      </Button>
                      <Button onClick={handleReset} variant="outline" className="flex-1">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {!preview && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No image selected</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Output Section */}
            {base64 && (
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Base64 Output</CardTitle>
                  <CardDescription>Click to copy the code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={displayValue}
                    readOnly
                    className="font-mono text-xs h-80 resize-none"
                  />
                  <div className="text-xs text-gray-500">
                    {displayValue.length} characters
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-red-700">{error}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ImageToBase64;
