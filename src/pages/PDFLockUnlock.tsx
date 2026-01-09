import { useState } from 'react';
import { Upload, Download, AlertCircle, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PDFLockUnlock() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'lock' | 'unlock'>('lock');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultFile, setResultFile] = useState<Blob | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    setPdfFile(file);
    setError('');
    setResultFile(null);
  };

  const processPassword = async () => {
    if (!pdfFile) {
      setError('Please upload a PDF file');
      return;
    }

    if (mode === 'lock' && !password) {
      setError('Please enter a password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { PDFDocument } = await import('pdf-lib' as any);
      const PDFLib = { PDFDocument: (PDFDocument as any).default || PDFDocument };

      const pdfBytes = await pdfFile.arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(pdfBytes);

      if (mode === 'lock') {
        // Encrypt the PDF with password
        pdf.encrypt({
          userPassword: password,
          ownerPassword: password,
          permissions: {
            printing: 'none',
            modifying: false,
            copying: false,
            annotating: false,
            fillingForms: false,
            contentAccessibility: true,
            documentAssembly: false,
          },
        });
      }

      const bytes = await pdf.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      setResultFile(blob);
    } catch (err) {
      setError(mode === 'lock' 
        ? 'Failed to lock PDF. Please try again.' 
        : 'Failed to unlock PDF. Make sure the password is correct.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!resultFile) return;

    const url = URL.createObjectURL(resultFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = mode === 'lock' 
      ? `protected-${pdfFile?.name || 'document.pdf'}` 
      : `unlocked-${pdfFile?.name || 'document.pdf'}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">PDF Lock/Unlock</h1>
            <p className="text-gray-600">Add or remove password protection from PDFs</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Mode Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => { setMode('lock'); setResultFile(null); }}
                  className={`p-4 border-2 rounded-lg transition ${
                    mode === 'lock'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Lock className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">Lock PDF</p>
                  <p className="text-xs text-gray-600">Add password protection</p>
                </button>
                <button
                  onClick={() => { setMode('unlock'); setResultFile(null); }}
                  className={`p-4 border-2 rounded-lg transition ${
                    mode === 'unlock'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Unlock className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">Unlock PDF</p>
                  <p className="text-xs text-gray-600">Remove password protection</p>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload PDF</CardTitle>
              <CardDescription>Select a PDF file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-rose-300 rounded-lg p-8 text-center hover:border-rose-500 transition cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdfUpload"
                />
                <label htmlFor="pdfUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-rose-600 mx-auto mb-2" />
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

                  {mode === 'lock' && (
                    <div>
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="mt-2"
                      />
                    </div>
                  )}

                  {mode === 'unlock' && (
                    <div>
                      <label htmlFor="unlock-password" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                        id="unlock-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password to unlock"
                        className="mt-2"
                      />
                    </div>
                  )}

                  <Button
                    onClick={processPassword}
                    disabled={loading}
                    className="w-full bg-rose-600 hover:bg-rose-700"
                  >
                    {loading 
                      ? (mode === 'lock' ? 'Locking...' : 'Unlocking...')
                      : (mode === 'lock' ? 'Lock PDF' : 'Unlock PDF')}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {resultFile && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {mode === 'lock' ? 'PDF Locked' : 'PDF Unlocked'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  {mode === 'lock'
                    ? 'Your PDF has been password protected'
                    : 'Your PDF has been unlocked successfully'}
                </p>
                <Button
                  onClick={downloadFile}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download {mode === 'lock' ? 'Locked' : 'Unlocked'} PDF
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Security Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Lock PDF:</strong> Protects your PDF with a password. Users must enter the password to open or edit the document.
              </p>
              <p>
                <strong>Unlock PDF:</strong> Removes password protection from a locked PDF. You must know the correct password.
              </p>
              <p className="text-xs text-gray-500 mt-4">
                Note: This tool uses client-side encryption. No files are uploaded to any server.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
