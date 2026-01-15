import { useState } from 'react';
import { Upload, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getApiUrl } from '@/lib/api';

export default function WordToPDF() {
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('word') && !file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
      setError('Please upload a Word document (.doc, .docx)');
      return;
    }

    setWordFile(file);
    setError('');
    setPdfUrl('');
  };

  const convertToPDF = async () => {
    if (!wordFile) {
      setError('Please upload a Word document');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Use LibreOffice Online or similar service for conversion
      // This is a placeholder - actual implementation would require backend
      const formData = new FormData();
      formData.append('file', wordFile);

      const response = await fetch(`${getApiUrl()}/api/convert-word-to-pdf`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      setError('Failed to convert Word to PDF. Make sure the backend server is running on port 3001.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${wordFile?.name?.replace(/\.[^/.]+$/, '')}.pdf` || 'document.pdf';
    link.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Word to PDF</h1>
            <p className="text-gray-600">Convert Word documents to PDF format</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Upload Word Document</CardTitle>
              <CardDescription>Select a .doc or .docx file to convert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                <input
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="wordUpload"
                />
                <label htmlFor="wordUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Click to upload Word document</p>
                  <p className="text-xs text-gray-500">or drag and drop (.doc, .docx)</p>
                </label>
              </div>

              {wordFile && (
                <>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">{wordFile.name}</p>
                    <p className="text-xs text-gray-500">{(wordFile.size / 1024).toFixed(2)} KB</p>
                  </div>

                  <Button
                    onClick={convertToPDF}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? 'Converting...' : 'Convert to PDF'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {pdfUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Conversion Complete</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">Your Word document has been converted to PDF</p>
                <Button
                  onClick={downloadPDF}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Supported Formats</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>• Microsoft Word (.docx) - Office Open XML Format</p>
              <p>• Microsoft Word (.doc) - Legacy Format</p>
              <p>
                Note: For best results, ensure your Word document is saved with the latest formatting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>1. Upload your Word document</p>
              <p>2. Click "Convert to PDF"</p>
              <p>3. Wait for the conversion to complete</p>
              <p>4. Download your PDF file</p>
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
