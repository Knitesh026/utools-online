import { useState } from 'react';
import { Download, AlertCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BarcodeGenerator() {
  const [input, setInput] = useState('1234567890');
  const [barcodeType, setBarcodeType] = useState<'code128' | 'code39' | 'ean13' | 'ean8' | 'upca'>('code128');
  const [barcodeImage, setBarcodeImage] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateBarcode = async () => {
    if (!input.trim()) {
      setError('Please enter a value for barcode');
      return;
    }

    setError('');

    try {
      const JsBarcodeModule = await import('jsbarcode' as any);
      const JsBarcode = JsBarcodeModule.default;
      const canvas = document.createElement('canvas');

      JsBarcode(canvas, input, {
        format: barcodeType.toUpperCase(),
        width: 2,
        height: 100,
        displayValue: true,
      });

      setBarcodeImage(canvas.toDataURL('image/png'));
    } catch (err) {
      setError('Failed to generate barcode');
      console.error(err);
    }
  };

  const downloadBarcode = () => {
    if (!barcodeImage) return;

    const link = document.createElement('a');
    link.href = barcodeImage;
    link.download = `barcode-${input}.png`;
    link.click();
  };

  const copySVG = async () => {
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy');
    }
  };

  const barcodeTypes = [
    { id: 'code128', name: 'Code 128', example: '1234567890' },
    { id: 'code39', name: 'Code 39', example: 'ABC123' },
    { id: 'ean13', name: 'EAN-13', example: '9780201379624' },
    { id: 'ean8', name: 'EAN-8', example: '96385074' },
    { id: 'upca', name: 'UPC-A', example: '123456789012' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Barcode Generator</h1>
            <p className="text-gray-600">Generate various types of barcodes</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Barcode Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="barcodeType">Barcode Type</Label>
                <select
                  id="barcodeType"
                  value={barcodeType}
                  onChange={(e) => setBarcodeType(e.target.value as any)}
                  className="w-full mt-2 p-2 border rounded-lg"
                >
                  {barcodeTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} (e.g., {type.example})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="barcodeInput">Value to Encode</Label>
                <Input
                  id="barcodeInput"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter value"
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {barcodeTypes.find((t) => t.id === barcodeType)?.example &&
                    `Example: ${barcodeTypes.find((t) => t.id === barcodeType)?.example}`}
                </p>
              </div>

              <Button
                onClick={generateBarcode}
                className="w-full bg-slate-700 hover:bg-slate-800"
              >
                Generate Barcode
              </Button>
            </CardContent>
          </Card>

          {barcodeImage && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Generated Barcode</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border flex justify-center">
                    <img src={barcodeImage} alt="Generated Barcode" className="max-w-full" />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={downloadBarcode}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      onClick={copySVG}
                      variant="outline"
                      className="flex-1"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Value
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Barcode Types</CardTitle>
              <CardDescription>Information about different barcode formats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">Code 128</p>
                  <p className="text-xs text-gray-600">Numeric, upper/lowercase, special characters</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">Code 39</p>
                  <p className="text-xs text-gray-600">Numeric, uppercase letters, and special characters</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">EAN-13</p>
                  <p className="text-xs text-gray-600">Product barcode, 13 digits</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">UPC-A</p>
                  <p className="text-xs text-gray-600">American product code, 12 digits</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
