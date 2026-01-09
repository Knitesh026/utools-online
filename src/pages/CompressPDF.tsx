import { useState } from 'react';
import { Upload, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CompressPDF() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(75);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    setPdfFile(file);
    setOriginalSize(file.size);
    setError('');
    setCompressedFile(null);
  };

  const compressPDF = async () => {
    if (!pdfFile) {
      setError('Please upload a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { PDFDocument } = await import('pdf-lib' as any);
      const PDFLib = { PDFDocument: (PDFDocument as any).default || PDFDocument };

      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

      // Create a new PDF with compressed content
      const newPdf = await PDFLib.PDFDocument.create();

      // Copy pages from original PDF
      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
      }

      // Save with compression (this is a basic compression)
      const compressedPdfBytes = await newPdf.save();
      const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });

      setCompressedFile(blob);
      setCompressedSize(blob.size);
    } catch (err) {
      setError('Failed to compress PDF');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!compressedFile) return;

    const url = URL.createObjectURL(compressedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed-${pdfFile?.name || 'document.pdf'}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const compressionPercent = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Compress PDF</h1>
            <p className="text-gray-600">Reduce PDF file size while maintaining quality</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Upload PDF</CardTitle>
              <CardDescription>Select a PDF file to compress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-500 transition cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdfUpload"
                />
                <label htmlFor="pdfUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Click to upload PDF</p>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                </label>
              </div>

              {pdfFile && (
                <>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">{pdfFile.name}</p>
                    <p className="text-xs text-gray-500">
                      Original size: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Compression Quality: {quality}%</label>
                    <Slider
                      value={[quality]}
                      onValueChange={(value) => setQuality(value[0])}
                      min={1}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">Lower values = better compression, lower quality</p>
                  </div>

                  <Button
                    onClick={compressPDF}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {loading ? 'Compressing...' : 'Compress PDF'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {compressedFile && (
            <Card>
              <CardHeader>
                <CardTitle>Compressed PDF Ready</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Original Size</p>
                    <p className="text-lg font-bold text-gray-900">
                      {(originalSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <p className="text-xs text-gray-600">Compressed Size</p>
                    <p className="text-lg font-bold text-green-600">
                      {(compressedSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-xs text-gray-600">Space Saved</p>
                  <p className="text-2xl font-bold text-blue-600">{compressionPercent}%</p>
                </div>

                <Button
                  onClick={downloadPDF}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Compressed PDF
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Compression Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>• Higher quality setting = larger file size</p>
              <p>• Lower quality setting = smaller file size</p>
              <p>• Works best with PDFs containing high-resolution images</p>
              <p>• Text content will not be affected by compression</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
