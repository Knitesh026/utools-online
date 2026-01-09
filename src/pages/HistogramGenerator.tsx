import { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HistogramGenerator() {
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState('');
  const [histogram, setHistogram] = useState<{ r: number[]; g: number[]; b: number[] } | null>(null);
  const [stats, setStats] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = () => {
    if (!imageSrc) {
      setError('Please upload an image');
      return;
    }

    const img = new window.Image();
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setError('Could not process image');
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Initialize histogram arrays
      const r = new Array(256).fill(0);
      const g = new Array(256).fill(0);
      const b = new Array(256).fill(0);

      // Calculate histogram
      for (let i = 0; i < data.length; i += 4) {
        r[data[i]]++;
        g[data[i + 1]]++;
        b[data[i + 2]]++;
      }

      // Normalize histogram values
      const max = Math.max(...r, ...g, ...b);
      const normalizedR = r.map((v) => (v / max) * 100);
      const normalizedG = g.map((v) => (v / max) * 100);
      const normalizedB = b.map((v) => (v / max) * 100);

      setHistogram({
        r: normalizedR,
        g: normalizedG,
        b: normalizedB,
      });

      // Calculate statistics
      const avgR = r.reduce((a, b, i) => a + i * b, 0) / r.reduce((a, b) => a + b);
      const avgG = g.reduce((a, b, i) => a + i * b, 0) / g.reduce((a, b) => a + b);
      const avgB = b.reduce((a, b, i) => a + i * b, 0) / b.reduce((a, b) => a + b);

      setStats({
        avgR: Math.round(avgR),
        avgG: Math.round(avgG),
        avgB: Math.round(avgB),
        totalPixels: (data.length / 4).toLocaleString(),
      });
    };
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Histogram Generator</h1>
            <p className="text-gray-600">Analyze color distribution in images</p>
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
              <CardDescription>Select an image to analyze</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center hover:border-orange-500 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Click to upload image</p>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                </label>
              </div>

              {imageSrc && (
                <>
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className="w-full max-h-48 object-contain rounded-lg"
                  />
                  <Button
                    onClick={analyzeImage}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    Analyze Histogram
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {histogram && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Color Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Red Histogram */}
                  <div>
                    <h3 className="text-sm font-medium text-red-600 mb-2">Red Channel</h3>
                    <div className="flex items-end gap-0.5 h-32 bg-gray-100 p-2 rounded">
                      {histogram.r.map((val, idx) => (
                        <div
                          key={idx}
                          style={{
                            height: `${val}%`,
                            backgroundColor: 'rgb(239, 68, 68)',
                            flex: 1,
                            minWidth: '1px',
                          }}
                          title={`${idx}: ${val.toFixed(2)}%`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Green Histogram */}
                  <div>
                    <h3 className="text-sm font-medium text-green-600 mb-2">Green Channel</h3>
                    <div className="flex items-end gap-0.5 h-32 bg-gray-100 p-2 rounded">
                      {histogram.g.map((val, idx) => (
                        <div
                          key={idx}
                          style={{
                            height: `${val}%`,
                            backgroundColor: 'rgb(34, 197, 94)',
                            flex: 1,
                            minWidth: '1px',
                          }}
                          title={`${idx}: ${val.toFixed(2)}%`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Blue Histogram */}
                  <div>
                    <h3 className="text-sm font-medium text-blue-600 mb-2">Blue Channel</h3>
                    <div className="flex items-end gap-0.5 h-32 bg-gray-100 p-2 rounded">
                      {histogram.b.map((val, idx) => (
                        <div
                          key={idx}
                          style={{
                            height: `${val}%`,
                            backgroundColor: 'rgb(59, 130, 246)',
                            flex: 1,
                            minWidth: '1px',
                          }}
                          title={`${idx}: ${val.toFixed(2)}%`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {stats && (
                <Card>
                  <CardHeader>
                    <CardTitle>Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-red-50 rounded">
                        <p className="text-xs text-gray-600">Red Average</p>
                        <p className="text-xl font-bold text-red-600">{stats.avgR}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded">
                        <p className="text-xs text-gray-600">Green Average</p>
                        <p className="text-xl font-bold text-green-600">{stats.avgG}</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded">
                        <p className="text-xs text-gray-600">Blue Average</p>
                        <p className="text-xl font-bold text-blue-600">{stats.avgB}</p>
                      </div>
                      <div className="p-3 bg-gray-100 rounded">
                        <p className="text-xs text-gray-600">Total Pixels</p>
                        <p className="text-lg font-bold text-gray-700">{stats.totalPixels}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          <Card>
            <CardHeader>
              <CardTitle>About Histograms</CardTitle>
              <CardDescription>Understanding color distribution</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>
                • A histogram shows the distribution of color values in an image
              </p>
              <p>
                • The X-axis represents pixel intensity values (0-255)
              </p>
              <p>
                • The Y-axis shows the frequency of each value
              </p>
              <p>
                • Useful for exposure and contrast analysis
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
