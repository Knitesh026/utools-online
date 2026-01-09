import { useState } from 'react';
import { Upload, Download, AlertCircle, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CropImage() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aspectRatio, setAspectRatio] = useState('free');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setCroppedImage(null);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const cropImage = async () => {
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
        let cropWidth = img.width;
        let cropHeight = img.height;
        let cropX = 0;
        let cropY = 0;

        // Apply aspect ratio constraints
        switch (aspectRatio) {
          case '1:1':
            const minDim = Math.min(img.width, img.height);
            cropWidth = minDim;
            cropHeight = minDim;
            cropX = (img.width - minDim) / 2;
            cropY = (img.height - minDim) / 2;
            break;
          case '16:9':
            cropHeight = (img.width * 9) / 16;
            cropY = (img.height - cropHeight) / 2;
            break;
          case '4:3':
            cropHeight = (img.width * 3) / 4;
            cropY = (img.height - cropHeight) / 2;
            break;
          default:
            break;
        }

        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx!.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        const cropped = canvas.toDataURL('image/jpeg', 0.95);
        setCroppedImage(cropped);
        setLoading(false);
      };

      img.src = image;
    } catch (err) {
      setError('Failed to crop image');
      setLoading(false);
    }
  };

  const downloadImage = (imageData: string) => {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'cropped-image.jpg';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Crop Image</h1>
          <p className="text-gray-600">Crop and resize images with precise aspect ratios</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select image to crop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <Upload className="mx-auto h-12 w-12 text-blue-500 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 50MB</p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Crop Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Crop Settings</CardTitle>
              <CardDescription>Choose aspect ratio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Aspect Ratio
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'free', label: 'Free' },
                    { value: '1:1', label: '1:1 (Square)' },
                    { value: '16:9', label: '16:9 (Landscape)' },
                    { value: '4:3', label: '4:3 (Standard)' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="aspectRatio"
                        value={opt.value}
                        checked={aspectRatio === opt.value}
                        onChange={() => setAspectRatio(opt.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                onClick={cropImage}
                disabled={!image || loading}
                className="w-full bg-blue-500 hover:bg-blue-600 gap-2"
              >
                <Scissors className="h-4 w-4" />
                {loading ? 'Cropping...' : 'Crop Image'}
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

        {/* Original Preview */}
        {image && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Original Image</CardTitle>
                <CardDescription>Your uploaded image</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-auto rounded-lg border border-gray-200">
                <img src={image} alt="Original" className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cropped Preview */}
        {croppedImage && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Cropped Image</CardTitle>
                <CardDescription>Your cropped result</CardDescription>
              </div>
              <Button
                onClick={() => downloadImage(croppedImage)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-auto rounded-lg border border-gray-200">
                <img src={croppedImage} alt="Cropped" className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
