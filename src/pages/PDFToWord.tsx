import { useState } from 'react';
import { Upload, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getApiUrl } from '@/lib/api';

export default function PDFToWord() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [docxUrl, setDocxUrl] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    setPdfFile(file);
    setError('');
    setDocxUrl('');
  };

  const convertToWord = async () => {
    if (!pdfFile) {
      setError('Please upload a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Use backend API for PDF to Word conversion
      const formData = new FormData();
      formData.append('file', pdfFile);

      const response = await fetch(`${getApiUrl()}/api/convert-pdf-to-word`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDocxUrl(url);
    } catch (err) {
      setError('Failed to convert PDF to Word. Make sure the backend server is running on port 3001.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadWord = () => {
    const link = document.createElement('a');
    link.href = docxUrl;
    link.download = `${pdfFile?.name?.replace(/\.[^/.]+$/, '')}.docx` || 'document.docx';
    link.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">PDF to Word</h1>
            <p className="text-gray-600">Convert PDF documents to Word format</p>
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
              <div className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center hover:border-amber-500 transition cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdfUpload"
                />
                <label htmlFor="pdfUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Click to upload PDF</p>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                </label>
              </div>

              {pdfFile && (
                <>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">{pdfFile.name}</p>
                    <p className="text-xs text-gray-500">{(pdfFile.size / 1024).toFixed(2)} KB</p>
                  </div>

                  <Button
                    onClick={convertToWord}
                    disabled={loading}
                    className="w-full bg-amber-600 hover:bg-amber-700"
                  >
                    {loading ? 'Converting...' : 'Convert to Word'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {docxUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Conversion Complete</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">Your PDF has been converted to Word document</p>
                <Button
                  onClick={downloadWord}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Word Document
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>• Scanned PDFs (images) cannot be converted to editable Word documents</p>
              <p>• Text-based PDFs will be converted to .docx format</p>
              <p>• Formatting and layout may vary from the original PDF</p>
              <p>• Complex layouts may require manual adjustments after conversion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>1. Upload your PDF file</p>
              <p>2. Click "Convert to Word"</p>
              <p>3. Wait for the conversion to complete</p>
              <p>4. Download your Word document (.docx)</p>
              <p className="text-xs text-gray-500 mt-4">
                The conversion happens on the backend server. Make sure the server is running on port 3001.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
