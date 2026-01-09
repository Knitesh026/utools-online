import { useState } from 'react';
import { Upload, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DocumentsConverter() {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<'pdf' | 'word' | 'text'>('pdf');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultUrl, setResultUrl] = useState('');

  const supportedFormats = {
    input: ['.doc', '.docx', '.odt', '.rtf', '.txt', '.pdf'],
    output: ['PDF', 'Word (.docx)', 'Text (.txt)'],
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const isSupported = supportedFormats.input.some((ext) => fileName.endsWith(ext));

    if (!isSupported) {
      setError('Unsupported file format. Please upload a supported document.');
      return;
    }

    setDocumentFile(file);
    setError('');
    setResultUrl('');
  };

  const convertDocument = async () => {
    if (!documentFile) {
      setError('Please upload a document');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', documentFile);
      formData.append('targetFormat', targetFormat);

      const response = await fetch('http://localhost:3001/api/convert-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setError('Failed to convert document. Make sure the backend server is running on port 3001.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!resultUrl || !documentFile) return;

    const baseName = documentFile.name.split('.')[0];
    const ext = targetFormat === 'pdf' ? '.pdf' : targetFormat === 'word' ? '.docx' : '.txt';

    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `${baseName}${ext}`;
    link.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Documents Converter</h1>
            <p className="text-gray-600">Convert between multiple document formats</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>Select a document to convert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center hover:border-teal-500 transition cursor-pointer">
                <input
                  type="file"
                  accept=".doc,.docx,.odt,.rtf,.txt,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="docUpload"
                />
                <label htmlFor="docUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Click to upload document</p>
                  <p className="text-xs text-gray-500">Supported: DOC, DOCX, ODT, RTF, TXT, PDF</p>
                </label>
              </div>

              {documentFile && (
                <>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">{documentFile.name}</p>
                    <p className="text-xs text-gray-500">{(documentFile.size / 1024).toFixed(2)} KB</p>
                  </div>

                  <div>
                    <Label htmlFor="format">Convert to</Label>
                    <select
                      id="format"
                      value={targetFormat}
                      onChange={(e) => setTargetFormat(e.target.value as any)}
                      className="w-full mt-2 p-2 border rounded-lg"
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="word">Word Document (.docx)</option>
                      <option value="text">Plain Text (.txt)</option>
                    </select>
                  </div>

                  <Button
                    onClick={convertDocument}
                    disabled={loading}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    {loading ? 'Converting...' : 'Convert Document'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {resultUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Conversion Complete</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">Your document has been successfully converted</p>
                <Button
                  onClick={downloadFile}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Converted File
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Supported Formats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-medium mb-2">Input Formats</h3>
                <ul className="text-gray-600 space-y-1">
                  {supportedFormats.input.map((fmt) => (
                    <li key={fmt}>• {fmt}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Output Formats</h3>
                <ul className="text-gray-600 space-y-1">
                  {supportedFormats.output.map((fmt) => (
                    <li key={fmt}>• {fmt}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>1. Upload your document in any supported format</p>
              <p>2. Select the target format you want to convert to</p>
              <p>3. Click "Convert Document"</p>
              <p>4. Download your converted file</p>
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
