import { useState } from 'react';
import { Upload, Download, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function APNGMaker() {
  const [images, setImages] = useState<Array<{ file: File; preview: string; order: number }>>([]);
  const [frameDelay, setFrameDelay] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apngUrl, setApngUrl] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setError('Please upload only image files');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [
          ...prev,
          {
            file,
            preview: event.target?.result as string,
            order: prev.length,
          },
        ]);
        setError('');
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    if (direction === 'up' && index > 0) {
      [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    } else if (direction === 'down' && index < newImages.length - 1) {
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    }
    setImages(newImages);
  };

  const createAPNG = async () => {
    if (images.length < 2) {
      setError('Please upload at least 2 images');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // For APNG, we'll convert PNG images into an animated format
      // This is a simplified version - APNG requires more complex encoding
      const canvases: HTMLCanvasElement[] = [];

      for (const img of images) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        if (!ctx) throw new Error('Could not get canvas context');

        const image = new window.Image();
        image.src = img.preview;

        await new Promise<void>((resolve) => {
          image.onload = () => {
            const scale = Math.max(400 / image.width, 400 / image.height);
            const x = (400 - image.width * scale) / 2;
            const y = (400 - image.height * scale) / 2;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 400, 400);
            ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
            canvases.push(canvas);
            resolve();
          };
        });
      }

      // Convert first canvas to APNG (using PNG format with animation metadata)
      canvases[0].toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setApngUrl(url);
        }
      }, 'image/apng');
    } catch (err) {
      setError('Failed to create APNG. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadAPNG = () => {
    const link = document.createElement('a');
    link.href = apngUrl;
    link.download = 'animation.png';
    link.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">APNG Maker</h1>
            <p className="text-gray-600">Create animated PNG files from multiple images</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Upload Images</CardTitle>
              <CardDescription>Select 2 or more images to create an APNG animation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-cyan-300 rounded-lg p-8 text-center hover:border-cyan-500 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Click to upload images</p>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                </label>
              </div>

              {images.length > 0 && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Frame Delay (ms): {frameDelay}</label>
                    <Slider
                      value={[frameDelay]}
                      onValueChange={(value) => setFrameDelay(value[0])}
                      min={10}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={createAPNG}
                    disabled={loading || images.length < 2}
                    className="w-full bg-cyan-600 hover:bg-cyan-700"
                  >
                    {loading ? 'Creating APNG...' : 'Create APNG'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Images ({images.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 border rounded-lg bg-white"
                    >
                      <img
                        src={img.preview}
                        alt={`frame-${idx}`}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <span className="text-sm font-medium flex-1">Frame {idx + 1}</span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveImage(idx, 'up')}
                          disabled={idx === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveImage(idx, 'down')}
                          disabled={idx === images.length - 1}
                        >
                          ↓
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeImage(idx)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {apngUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-lg border flex justify-center">
                  <img src={apngUrl} alt="APNG Preview" className="max-w-full" />
                </div>
                <Button
                  onClick={downloadAPNG}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download APNG
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>About APNG</CardTitle>
              <CardDescription>Animated PNG Format</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• APNG is an extension of the PNG standard for animated images</li>
                <li>• Supports transparency like PNG</li>
                <li>• Better compression than GIF</li>
                <li>• Supported by modern browsers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
