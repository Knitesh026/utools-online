import { useState } from 'react';
import { Upload, Download, AlertCircle, Copy, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImageEnhancer() {
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [hue, setHue] = useState(0);
  const [showPreview, setShowPreview] = useState(true);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setImage(imageData);
        setOriginalImage(imageData);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = async () => {
    if (!originalImage) {
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
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx!.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) hue-rotate(${hue}deg)`;
        ctx!.drawImage(img, 0, 0);
        
        const enhancedImage = canvas.toDataURL('image/jpeg', 0.95);
        setImage(enhancedImage);
        setLoading(false);
      };

      img.src = originalImage;
    } catch (err) {
      setError('Failed to enhance image');
      setLoading(false);
    }
  };

  const resetValues = () => {
    setImage(originalImage);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    setHue(0);
  };

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'enhanced-image.jpg';
    link.click();
  };

  const copyToClipboard = () => {
    if (!image) return;
    navigator.clipboard.writeText(image);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Image Enhancer
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Professional image enhancement with advanced filters. Adjust brightness, contrast, saturation, and more for perfect results.
          </p>
        </section>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="flex gap-3 items-start p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <span className="text-orange-500 text-lg">🎨</span>
            <div>
              <h4 className="font-semibold text-foreground">Advanced Filters</h4>
              <p className="text-sm text-muted-foreground">5+ enhancement options</p>
            </div>
          </div>
          <div className="flex gap-3 items-start p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <span className="text-blue-500 text-lg">⚡</span>
            <div>
              <h4 className="font-semibold text-foreground">Real-time Preview</h4>
              <p className="text-sm text-muted-foreground">See changes instantly</p>
            </div>
          </div>
          <div className="flex gap-3 items-start p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <span className="text-green-500 text-lg">💾</span>
            <div>
              <h4 className="font-semibold text-foreground">Multiple Options</h4>
              <p className="text-sm text-muted-foreground">Download or copy</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>Select an image to enhance</CardDescription>
              </CardHeader>
              <CardContent>
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
                    <p className="text-sm text-foreground font-medium">Click to upload image</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 50MB</p>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Controls Section */}
            {image && (
              <Card>
                <CardHeader>
                  <CardTitle>Enhancement Controls</CardTitle>
                  <CardDescription>Adjust image properties</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground flex justify-between mb-2">
                      <span>Brightness</span>
                      <span className="text-orange-500 font-semibold">{brightness}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={brightness}
                      onChange={(e) => {
                        setBrightness(Number(e.target.value));
                        enhanceImage();
                      }}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground flex justify-between mb-2">
                      <span>Contrast</span>
                      <span className="text-orange-500 font-semibold">{contrast}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={contrast}
                      onChange={(e) => {
                        setContrast(Number(e.target.value));
                        enhanceImage();
                      }}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground flex justify-between mb-2">
                      <span>Saturation</span>
                      <span className="text-orange-500 font-semibold">{saturation}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => {
                        setSaturation(Number(e.target.value));
                        enhanceImage();
                      }}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground flex justify-between mb-2">
                      <span>Blur</span>
                      <span className="text-orange-500 font-semibold">{blur}px</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={blur}
                      onChange={(e) => {
                        setBlur(Number(e.target.value));
                        enhanceImage();
                      }}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground flex justify-between mb-2">
                      <span>Hue Rotation</span>
                      <span className="text-orange-500 font-semibold">{hue}°</span>
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={hue}
                      onChange={(e) => {
                        setHue(Number(e.target.value));
                        enhanceImage();
                      }}
                      className="w-full"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={resetValues}
                      variant="outline"
                      className="flex-1"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview */}
          <div className="space-y-6">
            {image && (
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Preview</CardTitle>
                    </div>
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="p-2 hover:bg-muted rounded"
                    >
                      {showPreview ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </CardHeader>
                {showPreview && (
                  <CardContent>
                    <img 
                      src={image} 
                      alt="Enhanced preview" 
                      className="w-full rounded-lg border border-border" 
                    />
                  </CardContent>
                )}
              </Card>
            )}

            {image && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Export</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={downloadImage}
                    className="w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Image
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </main>

      <Footer />
    </div>
  );
}
