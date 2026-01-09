import { useState } from 'react';
import { Upload, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImageConverter() {
  const [image, setImage] = useState<{file: File, preview: string} | null>(null);
  const [format, setFormat] = useState<'png' | 'jpg' | 'webp' | 'gif' | 'bmp'>('png');
  const [quality, setQuality] = useState(90);
  const [error, setError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage({
        file,
        preview: event.target?.result as string,
      });
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const convertImage = async () => {
    if (!image) {
      setError('Please upload an image');
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      const img = new Image();
      img.src = image.preview;

      await new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          resolve(null);
        };
      });

      const mimeType = {
        png: 'image/png',
        jpg: 'image/jpeg',
        webp: 'image/webp',
        gif: 'image/gif',
        bmp: 'image/bmp',
      }[format];

      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted-image.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      }, mimeType, format === 'jpg' ? quality / 100 : undefined);
    } catch (err) {
      setError('Failed to convert image');
    }
  };

  const formats = [
    { id: 'png', name: 'PNG', description: 'Lossless compression' },
    { id: 'jpg', name: 'JPG/JPEG', description: 'Lossy compression' },
    { id: 'webp', name: 'WebP', description: 'Modern format' },
    { id: 'gif', name: 'GIF', description: 'Animated support' },
    { id: 'bmp', name: 'BMP', description: 'Uncompressed' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Image Converter</h1>
            <p className="text-gray-600">Convert images between different formats</p>
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
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-violet-300 rounded-lg p-8 text-center hover:border-violet-500 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-violet-600 mx-auto mb-2" />
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
                  <CardTitle>Convert To</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {formats.map((fmt) => (
                      <button
                        key={fmt.id}
                        onClick={() => setFormat(fmt.id as any)}
                        className={`p-3 rounded-lg border-2 transition ${
                          format === fmt.id
                            ? 'border-violet-600 bg-violet-50'
                            : 'border-gray-200 hover:border-violet-300'
                        }`}
                      >
                        <p className="font-semibold text-sm">{fmt.name}</p>
                        <p className="text-xs text-gray-500">{fmt.description}</p>
                      </button>
                    ))}
                  </div>

                  {format === 'jpg' && (
                    <div>
                      <label className="text-sm font-medium">Quality: {quality}%</label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="w-full mt-2"
                      />
                    </div>
                  )}

                  <Button
                    onClick={convertImage}
                    className="w-full bg-violet-600 hover:bg-violet-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Convert to {format.toUpperCase()}
                  </Button>
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
