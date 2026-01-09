import { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImageSharpener() {
  const [image, setImage] = useState<{file: File, preview: string} | null>(null);
  const [sharpness, setSharpness] = useState(1.5);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage({
        file,
        preview: event.target?.result as string,
      });
      setResult('');
    };
    reader.readAsDataURL(file);
  };

  const sharpenImage = async () => {
    if (!image) return;

    setLoading(true);
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

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Simple sharpening kernel
      const kernel = [-1, -1, -1, -1, sharpness * 8 + 1, -1, -1, -1, -1];
      const divisor = 1;

      for (let i = 0; i < data.length; i += 4) {
        const idx = i / 4;
        const x = idx % canvas.width;
        const y = Math.floor(idx / canvas.width);

        if (x > 0 && x < canvas.width - 1 && y > 0 && y < canvas.height - 1) {
          let r = 0, g = 0, b = 0;

          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx2 = ((y + ky) * canvas.width + (x + kx)) * 4;
              const k = kernel[(ky + 1) * 3 + (kx + 1)];
              r += data[idx2] * k;
              g += data[idx2 + 1] * k;
              b += data[idx2 + 2] * k;
            }
          }

          data[i] = Math.min(255, Math.max(0, r / divisor));
          data[i + 1] = Math.min(255, Math.max(0, g / divisor));
          data[i + 2] = Math.min(255, Math.max(0, b / divisor));
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setResult(canvas.toDataURL());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!result || !image) return;

    const link = document.createElement('a');
    link.href = result;
    link.download = `sharpened-${image.file.name}`;
    link.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Image Sharpener</h1>
            <p className="text-gray-600">Enhance image clarity and details</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select an image to sharpen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center hover:border-indigo-500 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
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
                  <CardTitle>Sharpening Strength</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Strength: {sharpness.toFixed(1)}x</label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={sharpness}
                      onChange={(e) => setSharpness(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>

                  <Button
                    onClick={sharpenImage}
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    {loading ? 'Sharpening...' : 'Apply Sharpening'}
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Original</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={image.preview} alt="original" className="w-full rounded" />
                  </CardContent>
                </Card>

                {result && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Sharpened</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img src={result} alt="sharpened" className="w-full rounded" />
                    </CardContent>
                  </Card>
                )}
              </div>

              {result && (
                <Button onClick={downloadImage} className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Download Sharpened Image
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
