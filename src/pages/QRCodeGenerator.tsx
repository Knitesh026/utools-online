import { useState } from 'react';
import { Copy, RefreshCw, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://example.com');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState('M');

  const generateQR = async () => {
    if (!text.trim()) {
      setError('Please enter text or URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Using QR Server API
      const encodedText = encodeURIComponent(text);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&ecc=${errorLevel}`;
      setQrCode(qrUrl);
      setLoading(false);
    } catch (err) {
      setError('Failed to generate QR code');
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">QR Code Generator</h1>
          <p className="text-gray-600">Create QR codes for any text, URL, or data</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>QR Code Data</CardTitle>
              <CardDescription>Enter text or URL to encode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Text or URL
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                />
              </div>

              <Button
                onClick={generateQR}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {loading ? 'Generating...' : 'Generate QR Code'}
              </Button>
            </CardContent>
          </Card>

          {/* Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure QR code properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Size: {size}x{size}px
                </label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  step="64"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Error Correction Level
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'L', label: 'Low (7%)' },
                    { value: 'M', label: 'Medium (15%)' },
                    { value: 'Q', label: 'Quartile (25%)' },
                    { value: 'H', label: 'High (30%)' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="errorLevel"
                        value={opt.value}
                        checked={errorLevel === opt.value}
                        onChange={() => setErrorLevel(opt.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* QR Code Preview */}
        {qrCode && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>QR Code Preview</CardTitle>
                <CardDescription>Your generated QR code</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button
                  onClick={downloadQR}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-white p-4 rounded-lg border border-gray-200 inline-block">
                <img src={qrCode} alt="QR Code" style={{ width: size, height: size }} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
