import { useState } from 'react';
import { Upload, Download, AlertCircle, Trash2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImageToBase64() {
  const [image, setImage] = useState<{file: File, preview: string} | null>(null);
  const [base64, setBase64] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImage({
        file,
        preview: result,
      });
      setBase64(result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(base64);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const downloadBase64 = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(base64));
    element.setAttribute('download', `${image?.file.name || 'image'}.base64`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Image to Base64</h1>
            <p className="text-gray-600">Convert images to Base64 encoded strings</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select an image to convert</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center hover:border-amber-500 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Click to upload image</p>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                </label>
              </div>
            </CardContent>
          </Card>

          {image && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <img
                      src={image.preview}
                      alt="preview"
                      className="max-h-64 mx-auto object-contain"
                    />
                    <p className="text-center text-sm text-gray-600 mt-4">{image.file.name}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Base64 Output</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-xs overflow-auto max-h-64">
                    <code>{base64}</code>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex-1"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={downloadBase64}
                      className="flex-1 bg-amber-600 hover:bg-amber-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
