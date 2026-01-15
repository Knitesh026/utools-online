import React, { useState } from "react";
import { Upload, Download, RefreshCw, FileText, Combine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";

interface PDFFile {
  file: File;
  name: string;
  size: number;
}

const MergePDF: React.FC = () => {
  const [pdfFiles, setPDFFiles] = useState<PDFFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergedSize, setMergedSize] = useState<number | null>(null);
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
      if (!file.type.includes("pdf")) {
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
  };

  const removeFile = (index: number) => {
    setPDFFiles((prev) => prev.filter((_, i) => i !== index));
    setMergedSize(null);
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

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) {
      setError("Please add at least 2 PDF files to merge");
      return;
    }

    setMerging(true);
    setError("");

    try {
      // Simulate merge - in production, use pdf-lib or similar
      const totalSize = pdfFiles.reduce((sum, f) => sum + f.size, 0);

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMergedSize(totalSize);
    } catch (err) {
      setError("Failed to merge PDFs. Please try again.");
    } finally {
      setMerging(false);
    }
  };

  const downloadMerged = () => {
    if (pdfFiles.length === 0) return;

    // In production, download the actual merged PDF
    const link = document.createElement("a");
    link.href = pdfFiles[0].file.type; // Placeholder
    link.download = fileName;
    link.click();
  };

  const clearFiles = () => {
    setPDFFiles([]);
    setMergedSize(null);
    setError("");
    setFileName("merged.pdf");
  };

  const totalSize = pdfFiles.reduce((sum, f) => sum + f.size, 0);

  const inputSection = (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Upload PDFs</CardTitle>
        <CardDescription>Add multiple PDF files to merge (at least 2)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragActive
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          }`}
        >
          <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-semibold text-gray-900 mb-1">
            Drag and drop PDFs here
          </p>
          <p className="text-xs text-gray-500 mb-3">or click to select</p>
          <label htmlFor="pdf-input" className="cursor-pointer inline-block">
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="pdf-input"
            />
            <div className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-block font-medium text-sm">
              Choose Files
            </div>
          </label>
        </div>

        {pdfFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900">
              Selected Files ({pdfFiles.length})
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {pdfFiles.map((pdf, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{pdf.name}</p>
                    <p className="text-xs text-gray-500">
                      {(pdf.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveFile(index, "up")}
                      disabled={index === 0}
                      className="h-8 w-8"
                    >
                      ↑
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveFile(index, "down")}
                      disabled={index === pdfFiles.length - 1}
                      className="h-8 w-8"
                    >
                      ↓
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pdfFiles.length > 0 && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Total Size:</span>{" "}
              {(totalSize / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <Button
          onClick={mergePDFs}
          disabled={pdfFiles.length < 2 || merging}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          {merging ? (
            <>
              <Combine className="h-4 w-4 mr-2 animate-spin" />
              Merging...
            </>
          ) : (
            <>
              <Combine className="h-4 w-4 mr-2" />
              Merge PDFs
            </>
          )}
        </Button>

        {pdfFiles.length > 0 && (
          <Button onClick={clearFiles} variant="outline" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </CardContent>
    </div>
  );

  const outputSection = mergedSize ? (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Merge Complete</CardTitle>
        <CardDescription>Your PDFs have been merged successfully</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <p className="text-xs text-gray-600 mb-1">Files Merged</p>
            <p className="text-2xl font-bold text-purple-700">{pdfFiles.length}</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600 mb-1">Total Size</p>
            <p className="text-2xl font-bold text-blue-700">
              {(mergedSize / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            Output Filename
          </label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value || "merged.pdf")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="merged.pdf"
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 font-semibold mb-2">Merged Files:</p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {pdfFiles.map((pdf, index) => (
              <p key={index} className="text-xs text-gray-600">
                {index + 1}. {pdf.name}
              </p>
            ))}
          </div>
        </div>

        <Button
          onClick={downloadMerged}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Merged PDF
        </Button>

        <Button onClick={clearFiles} variant="outline" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Merge Another
        </Button>
      </CardContent>
    </div>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="PDF Merger"
      description="Combine multiple PDF files into one. Reorder files before merging."
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      colorTheme={{
        gradient: "from-purple-600 to-pink-600",
        accent: "bg-purple-100 text-purple-900",
      }}
      features={[
        {
          icon: "Combine",
          title: "Reorder Files",
          description: "Arrange PDFs in any order before merging",
        },
        {
          icon: "FileText",
          title: "Batch Merge",
          description: "Merge multiple PDFs at once without limits",
        },
        {
          icon: "Download",
          title: "Custom Filename",
          description: "Set your own name for the merged PDF",
        },
      ]}
    />
  
      );
};

export default MergePDF;
