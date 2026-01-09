import { useState } from 'react';
import { Upload, Download, AlertCircle, Trash2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImageCompressor() {
  const [images, setImages] = useState<Array<{file: File, preview: string, compressed?: Blob}>>([]);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setError('Please upload only image files');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, {
          file,
          preview: event.target?.result as string,
        }]);
        setError('');
      };
      reader.readAsDataURL(file);
    });
  };

  const compressImage = async (file: File, quality: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => resolve(blob!),
          file.type,
          quality / 100
        );
      };
    });
  };

  const handleCompress = async () => {
    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const compressed = await Promise.all(
        images.map((img) => compressImage(img.file, quality))
      );

      const updated = images.map((img, idx) => ({
        ...img,
        compressed: compressed[idx],
      }));
      setImages(updated);
    } catch (err) {
      setError('Failed to compress images');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (index: number) => {
    const img = images[index];
    if (!img.compressed) return;

    const url = URL.createObjectURL(img.compressed);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-${img.file.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const JSZipModule = await import('jszip' as any);
    const JSZip = JSZipModule.default;
    const zip = new JSZip();

    images.forEach((img, idx) => {
      if (img.compressed) {
        zip.file(`compressed-${img.file.name}`, img.compressed);
      }
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed-images.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setImages([]);
    setError('');
  };

  const getCompressionStats = (index: number) => {
    const img = images[index];
    if (!img.compressed) return null;
    const originalSize = img.file.size;
    const compressedSize = img.compressed.size;
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);
    return { originalSize, compressedSize, reduction };
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Image Compressor</h1>
            <p className="text-gray-600">Reduce image file size while maintaining quality</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Compression Settings
              </CardTitle>
              <CardDescription>Adjust quality and upload images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Quality: {quality}%</label>
                <Slider
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  min={10}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">Higher values = better quality but larger file size</p>
              </div>

              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Click to upload images</p>
                  <p className="text-xs text-gray-500">or drag and drop (PNG, JPG, WebP)</p>
                </label>
              </div>

              <Button
                onClick={handleCompress}
                disabled={loading || images.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Compressing...' : 'Compress Images'}
              </Button>
            </CardContent>
          </Card>

          {images.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Images ({images.length})</CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {images.map((img, idx) => {
                  const stats = getCompressionStats(idx);
                  return (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                        <img
                          src={img.preview}
                          alt={`preview-${idx}`}
                          className="h-24 w-24 object-cover rounded"
                        />
                        <div className="space-y-1">
                          <p className="font-medium text-sm truncate">{img.file.name}</p>
                          <p className="text-xs text-gray-500">
                            Original: {(img.file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        {stats && (
                          <div className="space-y-1">
                            <p className="text-xs text-gray-600">
                              Compressed: {(stats.compressedSize / 1024).toFixed(2)} KB
                            </p>
                            <p className="text-xs font-semibold text-green-600">
                              Reduced: {stats.reduction}%
                            </p>
                          </div>
                        )}
                        <div className="flex gap-2">
                          {img.compressed && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadImage(idx)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeImage(idx)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {images.some((img) => img.compressed) && (
            <div className="flex gap-2">
              <Button
                onClick={downloadAll}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
