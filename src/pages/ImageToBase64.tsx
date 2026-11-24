import { useState, useRef } from "react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Copy, Check, RefreshCw, Code2, FileCode, HardDrive } from "lucide-react";

const ImageToBase64 = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const inputSection = (
    <div>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Select an image to encode into Base64 text or a Data URL</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label htmlFor="file-input-tobase64" className="cursor-pointer block">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition">
            <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP, SVG up to 50MB</p>
          </div>
          <input
            id="file-input-tobase64"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
            {error}
          </div>
        )}

        {preview && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <p className="text-xs text-slate-500 mb-0.5">Original Size</p>
                <p className="text-sm font-mono font-bold text-slate-900">{formatBytes(fileSize)}</p>
              </div>
              <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200/80">
                <p className="text-xs text-blue-600 mb-0.5">Base64 Payload</p>
                <p className="text-sm font-mono font-bold text-blue-800">{formatBytes(base64Size)}</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Output Format</label>
              <Select value={format} onValueChange={(val: any) => setFormat(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dataUrl">Data URL (with MIME prefix)</SelectItem>
                  <SelectItem value="base64">Raw Base64 (without prefix)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <p className="text-xs text-slate-500 mb-2">Image Preview</p>
              <img src={preview} alt="Uploaded preview" className="w-full h-32 object-contain rounded-lg bg-white" />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy String"}
              </Button>
              <Button onClick={handleDownload} variant="outline" className="flex-1">
                Download .txt
              </Button>
              <Button onClick={handleReset} variant="outline" aria-label="Reset">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {!preview && (
          <div className="text-center py-2">
            <p className="text-xs text-slate-400">No image selected</p>
          </div>
        )}
      </CardContent>
    </div>
  );

  const outputSection = base64 ? (
    <div>
      <CardHeader>
        <CardTitle>Base64 Output</CardTitle>
        <CardDescription>Ready for HTML img src, CSS url(), or JSON payloads</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea value={displayValue} readOnly className="font-mono text-xs h-80 resize-none" />
        <div className="text-xs font-mono text-slate-500">
          {displayValue.length.toLocaleString()} characters
        </div>
      </CardContent>
    </div>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Image to Base64"
      description="Convert images to Base64 encoded strings or inline HTML/CSS Data URLs"
      icon={Code2}
      category="Image"
      inputSection={inputSection}
      outputSection={outputSection}
      features={[
        {
          icon: Code2,
          title: "Data URL & Raw Modes",
          description: "Switch between full data:image/...;base64 strings and raw Base64 payloads.",
        },
        {
          icon: HardDrive,
          title: "Payload Size Comparison",
          description: "Inspect exact byte overhead between the binary image and Base64 text.",
        },
        {
          icon: FileCode,
          title: "One-Click Copy & Export",
          description: "Copy directly to clipboard or export large strings as a .txt file.",
        },
      ]}
    />
  );
};

export default ImageToBase64;
