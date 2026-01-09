import { useState } from 'react';
import { Upload, Download, AlertCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ImageUpscaler() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scale, setScale] = useState(2);

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

  const upscaleImage = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        ctx!.imageSmoothingEnabled = true;
        ctx!.imageSmoothingQuality = 'high';
        ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const upscaledImage = canvas.toDataURL('image/png', 0.95);
        setImage(upscaledImage);
        setLoading(false);
      };

      img.src = image;
    } catch (err) {
      setError('Failed to upscale image');
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = `upscaled-${scale}x.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Image Upscaler</h1>
          <p className="text-gray-600">Enlarge your images with AI-enhanced upscaling</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select image to upscale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-500 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <Upload className="mx-auto h-12 w-12 text-purple-500 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 50MB</p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Upscale Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Upscale Settings</CardTitle>
              <CardDescription>Choose upscaling factor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Scale Factor: {scale}x
                </label>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="scale"
                        value={s}
                        checked={scale === s}
                        onChange={() => setScale(s)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{s}x Upscale</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                onClick={upscaleImage}
                disabled={!image || loading}
                className="w-full bg-purple-500 hover:bg-purple-600 gap-2"
              >
                <Zap className="h-4 w-4" />
                {loading ? 'Upscaling...' : 'Upscale Image'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Preview */}
        {image && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Upscaled image result</CardDescription>
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
                <img src={image} alt="Upscaled preview" className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
