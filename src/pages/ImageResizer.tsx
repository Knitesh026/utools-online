import { useState } from 'react';
import { Upload, Download, AlertCircle, Trash2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImageResizer() {
  const [image, setImage] = useState<{file: File, preview: string} | null>(null);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resized, setResized] = useState<Blob | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setImage({
          file,
          preview: event.target?.result as string,
        });
        setError('');
        setResized(null);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspect && image) {
      const img = new Image();
      img.src = image.preview;
      img.onload = () => {
        const newHeight = Math.round((newWidth / img.width) * img.height);
        setHeight(newHeight);
      };
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspect && image) {
      const img = new Image();
      img.src = image.preview;
      img.onload = () => {
        const newWidth = Math.round((newHeight / img.height) * img.width);
        setWidth(newWidth);
      };
    }
  };

  const resizeImage = async () => {
    if (!image) {
      setError('Please upload an image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.src = image.preview;
      await new Promise((resolve) => {
        img.onload = () => {
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(null);
        };
      });

      canvas.toBlob(
        (blob) => {
          setResized(blob);
          setLoading(false);
        },
        image.file.type,
        0.95
      );
    } catch (err) {
      setError('Failed to resize image');
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!resized || !image) return;

    const url = URL.createObjectURL(resized);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resized-${image.file.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const presetSizes = [
    { name: 'Twitter', w: 1200, h: 675 },
    { name: 'Instagram', w: 1080, h: 1080 },
    { name: 'Facebook', w: 1200, h: 628 },
    { name: 'YouTube', w: 1280, h: 720 },
    { name: 'HD', w: 1920, h: 1080 },
    { name: '4K', w: 3840, h: 2160 },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Image Resizer</h1>
            <p className="text-gray-600">Resize images to custom dimensions</p>
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
              <CardDescription>Select an image to resize</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-500 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-purple-600 mx-auto mb-2" />
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
                  <div className="border rounded-lg p-4 bg-gray-50 flex justify-center">
                    <img
                      src={image.preview}
                      alt="preview"
                      className="max-h-64 object-contain"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Resize Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Width: {width}px</label>
                      <Slider
                        value={[width]}
                        onValueChange={(value) => handleWidthChange(value[0])}
                        min={50}
                        max={4000}
                        step={10}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Height: {height}px</label>
                      <Slider
                        value={[height]}
                        onValueChange={(value) => handleHeightChange(value[0])}
                        min={50}
                        max={4000}
                        step={10}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="maintainAspect"
                        checked={maintainAspect}
                        onChange={(e) => setMaintainAspect(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="maintainAspect" className="text-sm font-medium cursor-pointer">
                        Maintain Aspect Ratio
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Preset Sizes:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {presetSizes.map((size) => (
                        <Button
                          key={size.name}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setWidth(size.w);
                            setHeight(size.h);
                          }}
                          className="text-xs"
                        >
                          {size.name} ({size.w}x{size.h})
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={resizeImage}
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? 'Resizing...' : 'Resize Image'}
                  </Button>
                </CardContent>
              </Card>

              {resized && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Image Resized Successfully</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={downloadImage}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resized Image
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
