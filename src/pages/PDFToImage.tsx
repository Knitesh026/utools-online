import { useState } from 'react';
import { Upload, Download, AlertCircle, Trash2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PDFToImage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quality, setQuality] = useState(2);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    setPdfFile(file);
    setError('');
    setImages([]);
  };

  const convertPDF = async () => {
    if (!pdfFile) {
      setError('Please upload a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const pdfjsLib = await import('pdfjs-dist' as any);
      const arrayBuffer = await pdfFile.arrayBuffer();

      const pdf = await pdfjsLib.default.getDocument({ data: arrayBuffer }).promise;
      const convertedImages: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) throw new Error('Could not get canvas context');

        const viewport = page.getViewport({ scale: quality });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        }).promise;

        convertedImages.push(canvas.toDataURL('image/png'));
      }

      setImages(convertedImages);
    } catch (err) {
      setError('Failed to convert PDF. Make sure pdf.js is installed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (index: number) => {
    const link = document.createElement('a');
    link.href = images[index];
    link.download = `page-${index + 1}.png`;
    link.click();
  };

  const downloadAllAsZip = async () => {
    const JSZipModule = await import('jszip' as any);
    const JSZip = JSZipModule.default;
    const zip = new JSZip();

    images.forEach((img, idx) => {
      const data = img.split(',')[1];
      zip.file(`page-${idx + 1}.png`, data, { base64: true });
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pdf-images.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">PDF to Image</h1>
            <p className="text-gray-600">Convert PDF pages to high-quality images</p>
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
              <CardDescription>Select a PDF file to convert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-yellow-300 rounded-lg p-8 text-center hover:border-yellow-500 transition cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdfUpload"
                />
                <label htmlFor="pdfUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Click to upload PDF</p>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                </label>
              </div>

              {pdfFile && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">{pdfFile.name}</p>
                  <p className="text-xs text-gray-500">{(pdfFile.size / 1024).toFixed(2)} KB</p>
                </div>
              )}

              {pdfFile && (
                <>
                  <div>
                    <label className="text-sm font-medium">Conversion Quality: {quality}x</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>

                  <Button
                    onClick={convertPDF}
                    disabled={loading}
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                  >
                    {loading ? 'Converting...' : 'Convert PDF to Images'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {images.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Converted Images ({images.length})</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadAllAsZip}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="border rounded-lg overflow-hidden">
                      <img src={img} alt={`page-${idx + 1}`} className="w-full h-auto" />
                      <Button
                        onClick={() => downloadImage(idx)}
                        variant="outline"
                        size="sm"
                        className="w-full rounded-none border-t"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Page {idx + 1}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
