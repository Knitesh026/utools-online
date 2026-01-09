import { useState } from 'react';
import { Upload, Download, AlertCircle, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getApiUrl } from '@/lib/api';

export default function ESignPDF() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [signatureName, setSignatureName] = useState('');
  const [signatureDate, setSignatureDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signedPdfUrl, setSignedPdfUrl] = useState('');
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    setPdfFile(file);
    setError('');
    setSignedPdfUrl('');
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef) return;
    setIsDrawing(true);
    const rect = canvasRef.getBoundingClientRect();
    const ctx = canvasRef.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef) return;
    const rect = canvasRef.getBoundingClientRect();
    const ctx = canvasRef.getContext('2d');
    if (ctx) {
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    if (canvasRef) {
      const ctx = canvasRef.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
      }
    }
  };

  const signPDF = async () => {
    if (!pdfFile) {
      setError('Please upload a PDF file');
      return;
    }

    if (!signatureName) {
      setError('Please enter your name');
      return;
    }

    if (!canvasRef) {
      setError('Please draw your signature');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get signature image from canvas
      const signatureImage = canvasRef.toDataURL('image/png');

      const formData = new FormData();
      formData.append('pdf', pdfFile);
      formData.append('signature', signatureImage);
      formData.append('name', signatureName);
      formData.append('date', signatureDate);

      const response = await fetch(`${getApiUrl()}/api/sign-pdf`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Signing failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setSignedPdfUrl(url);
    } catch (err) {
      setError('Failed to sign PDF. Make sure the backend server is running on port 3001.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = signedPdfUrl;
    link.download = `signed-${pdfFile?.name || 'document.pdf'}`;
    link.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">eSign PDF</h1>
            <p className="text-gray-600">Add digital signatures to PDF documents</p>
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
              <CardDescription>Select a PDF file to sign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-violet-300 rounded-lg p-8 text-center hover:border-violet-500 transition cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdfUpload"
                />
                <label htmlFor="pdfUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-violet-600 mx-auto mb-2" />
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
            </CardContent>
          </Card>

          {pdfFile && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="w-5 h-5" />
                    Draw Your Signature
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                    <canvas
                      ref={setCanvasRef}
                      width={400}
                      height={150}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      className="w-full cursor-crosshair"
                    />
                  </div>
                  <Button
                    onClick={clearSignature}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Signature
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Signature Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="text-sm font-medium">
                      Signature Date
                    </label>
                    <Input
                      id="date"
                      type="date"
                      value={signatureDate}
                      onChange={(e) => setSignatureDate(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <Button
                    onClick={signPDF}
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700"
                  >
                    {loading ? 'Signing PDF...' : 'Sign PDF'}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {signedPdfUrl && (
            <Card>
              <CardHeader>
                <CardTitle>PDF Signed Successfully</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded">
                  <p className="text-sm text-gray-600">
                    Signed by: <span className="font-medium">{signatureName}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: <span className="font-medium">{signatureDate}</span>
                  </p>
                </div>
                <Button
                  onClick={downloadPDF}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Signed PDF
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>About Digital Signatures</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>
                • Digital signatures provide a way to authenticate and sign documents electronically
              </p>
              <p>
                • Your signature is embedded in the PDF for verification
              </p>
              <p>
                • The signature includes your name and the date you signed
              </p>
              <p className="text-xs text-gray-500 mt-4">
                Note: For legally binding signatures, consider using a certified digital signature service.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
