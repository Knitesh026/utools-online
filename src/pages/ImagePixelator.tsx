import { useState } from 'react';
import { Upload, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImagePixelator() {
  const [image, setImage] = useState<{file: File, preview: string} | null>(null);
  const [pixelSize, setPixelSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<string>('');

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
      setResult('');
    };
    reader.readAsDataURL(file);
  };

  const pixelateImage = async () => {
    if (!image) {
      setError('Please upload an image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const img = new Image();
      img.src = image.preview;

      await new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Could not get canvas context');

          canvas.width = img.width;
          canvas.height = img.height;

          // Draw original image
          ctx.drawImage(img, 0, 0);

          // Get image data
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const data = imageData.data;

          // Pixelate
          for (let y = 0; y < img.height; y += pixelSize) {
            for (let x = 0; x < img.width; x += pixelSize) {
              const pixelIndex = (y * img.width + x) * 4;
              const r = data[pixelIndex];
              const g = data[pixelIndex + 1];
              const b = data[pixelIndex + 2];

              for (let yy = y; yy < y + pixelSize && yy < img.height; yy++) {
                for (let xx = x; xx < x + pixelSize && xx < img.width; xx++) {
                  const index = (yy * img.width + xx) * 4;
                  data[index] = r;
                  data[index + 1] = g;
                  data[index + 2] = b;
                }
              }
            }
          }

          ctx.putImageData(imageData, 0, 0);
          setResult(canvas.toDataURL());
          resolve(null);
        };
      });
    } catch (err) {
      setError('Failed to pixelate image');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!result) return;

    const link = document.createElement('a');
    link.href = result;
    link.download = `pixelated-${image?.file.name || 'image'}`;
    link.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Image Pixelator</h1>
            <p className="text-gray-600">Add pixel effects to your images</p>
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
              <CardDescription>Select an image to pixelate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-cyan-300 rounded-lg p-8 text-center hover:border-cyan-500 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
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
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Pixel Size: {pixelSize}px</label>
                    <Slider
                      value={[pixelSize]}
                      onValueChange={(value) => setPixelSize(value[0])}
                      min={1}
                      max={50}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <Button
                    onClick={pixelateImage}
                    disabled={loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700"
                  >
                    {loading ? 'Processing...' : 'Pixelate Image'}
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Original</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={image.preview}
                      alt="original"
                      className="w-full h-auto rounded-lg"
                    />
                  </CardContent>
                </Card>

                {result && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Pixelated</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={result}
                        alt="pixelated"
                        className="w-full h-auto rounded-lg"
                      />
                    </CardContent>
                  </Card>
                )}
              </div>

              {result && (
                <Button
                  onClick={downloadImage}
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Pixelated Image
                </Button>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
