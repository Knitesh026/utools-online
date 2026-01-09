import { useState } from 'react';
import { Upload, Download, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MergePDF() {
  const [pdfFiles, setPdfFiles] = useState<Array<{ file: File; name: string; order: number }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mergedFile, setMergedFile] = useState<Blob | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (!file.type.includes('pdf')) {
        setError('Please upload only PDF files');
        return;
      }
      setPdfFiles((prev) => [
        ...prev,
        {
          file,
          name: file.name,
          order: prev.length,
        },
      ]);
      setError('');
    });
  };

  const removeFile = (index: number) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...pdfFiles];
    if (direction === 'up' && index > 0) {
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
    } else if (direction === 'down' && index < newFiles.length - 1) {
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    }
    setPdfFiles(newFiles);
  };

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) {
      setError('Please upload at least 2 PDF files');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { PDFDocument } = await import('pdf-lib' as any);
      const PDFLib = { PDFDocument: (PDFDocument as any).default || PDFDocument };

      const mergedPdf = await PDFLib.PDFDocument.create();

      for (const pdfItem of pdfFiles) {
        const pdfBytes = await pdfItem.file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(pdfBytes);

        const pageIndices = pdf.getPages().map((_, i) => i);
        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);

        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setMergedFile(blob);
    } catch (err) {
      setError('Failed to merge PDFs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!mergedFile) return;

    const url = URL.createObjectURL(mergedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'merged-document.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Merge PDF</h1>
            <p className="text-gray-600">Combine multiple PDF files into one</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Upload PDF Files</CardTitle>
              <CardDescription>Select 2 or more PDF files to merge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center hover:border-indigo-500 transition cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdfUpload"
                />
                <label htmlFor="pdfUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Click to upload PDF files</p>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                </label>
              </div>

              {pdfFiles.length > 0 && (
                <Button
                  onClick={mergePDFs}
                  disabled={loading || pdfFiles.length < 2}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {loading ? 'Merging PDFs...' : 'Merge PDFs'}
                </Button>
              )}
            </CardContent>
          </Card>

          {pdfFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>PDF Files ({pdfFiles.length})</CardTitle>
                <CardDescription>Drag to reorder or remove files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pdfFiles.map((pdf, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 border rounded-lg bg-white"
                    >
                      <div className="text-sm font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded min-w-fit">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium flex-1 truncate">{pdf.name}</span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveFile(idx, 'up')}
                          disabled={idx === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveFile(idx, 'down')}
                          disabled={idx === pdfFiles.length - 1}
                        >
                          ↓
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(idx)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {mergedFile && (
            <Card>
              <CardHeader>
                <CardTitle>Merged PDF Ready</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Successfully merged {pdfFiles.length} PDF files
                </p>
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-xs text-gray-600">File Size</p>
                  <p className="text-lg font-bold text-gray-900">
                    {(mergedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <Button
                  onClick={downloadPDF}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Merged PDF
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>1. Upload 2 or more PDF files</p>
              <p>2. Reorder files using up/down arrows if needed</p>
              <p>3. Click "Merge PDFs" to combine them</p>
              <p>4. Download the merged PDF file</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
