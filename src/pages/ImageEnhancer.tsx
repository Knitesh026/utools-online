import { useState } from 'react';
import { Upload, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ImageEnhancer() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create canvas for image enhancement
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Apply filters
        ctx!.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
        ctx!.drawImage(img, 0, 0);
        
        const enhancedImage = canvas.toDataURL('image/jpeg', 0.95);
        setImage(enhancedImage);
        setLoading(false);
      };

      img.src = image;
    } catch (err) {
      setError('Failed to enhance image');
      setLoading(false);
    }
  };

  const resetValues = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'enhanced-image.jpg';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Image Enhancer</h1>
          <p className="text-gray-600">Enhance your images with advanced filters</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select an image to enhance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center hover:border-orange-500 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <Upload className="mx-auto h-12 w-12 text-orange-500 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload image</p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 50MB</p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Controls Section */}
          <Card>
            <CardHeader>
              <CardTitle>Enhancement Controls</CardTitle>
              <CardDescription>Adjust image properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Brightness: {brightness}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Contrast: {contrast}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Saturation: {saturation}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={enhanceImage}
                  disabled={!image || loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  {loading ? 'Enhancing...' : 'Enhance'}
                </Button>
                <Button
                  onClick={resetValues}
                  variant="outline"
                  className="flex-1"
                >
                  Reset
                </Button>
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

        {/* Preview Section */}
        {image && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Your enhanced image</CardDescription>
              </div>
              <Button
                onClick={downloadImage}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-auto rounded-lg border border-gray-200">
                <img src={image} alt="Enhanced preview" className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
