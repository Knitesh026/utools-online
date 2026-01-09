import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HTMLColorCodes() {
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [copied, setCopied] = useState('');
  const [colorName, setColorName] = useState('');

  const commonColors = [
    { name: 'Red', hex: '#FF6B6B', rgb: 'rgb(255, 107, 107)' },
    { name: 'Green', hex: '#51CF66', rgb: 'rgb(81, 207, 102)' },
    { name: 'Blue', hex: '#4ECDC4', rgb: 'rgb(78, 205, 196)' },
    { name: 'Yellow', hex: '#FFE66D', rgb: 'rgb(255, 230, 109)' },
    { name: 'Purple', hex: '#A78BFA', rgb: 'rgb(167, 139, 250)' },
    { name: 'Orange', hex: '#FFA500', rgb: 'rgb(255, 165, 0)' },
    { name: 'Pink', hex: '#FF69B4', rgb: 'rgb(255, 105, 180)' },
    { name: 'Teal', hex: '#20B2AA', rgb: 'rgb(32, 178, 170)' },
    { name: 'Navy', hex: '#000080', rgb: 'rgb(0, 0, 128)' },
    { name: 'Gray', hex: '#808080', rgb: 'rgb(128, 128, 128)' },
    { name: 'Black', hex: '#000000', rgb: 'rgb(0, 0, 0)' },
    { name: 'White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' },
  ];

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : '';
  };

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const rgb = hexToRgb(selectedColor);
  const hsl = hexToHsl(selectedColor);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">HTML Color Codes</h1>
            <p className="text-gray-600">Convert and explore color codes in different formats</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Color Picker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div>
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-32 h-32 rounded-lg cursor-pointer border-4 border-gray-300"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    placeholder="#FF6B6B"
                    className="text-lg font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-2">Enter HEX color code</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Formats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hexadecimal</p>
                    <p className="font-mono text-lg font-semibold">{selectedColor}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(selectedColor, 'hex')}
                  >
                    {copied === 'hex' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600">RGB</p>
                    <p className="font-mono text-lg font-semibold">{rgb}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(rgb, 'rgb')}
                  >
                    {copied === 'rgb' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600">HSL</p>
                    <p className="font-mono text-lg font-semibold">{hsl}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(hsl, 'hsl')}
                  >
                    {copied === 'hsl' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {commonColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className="space-y-2 hover:scale-105 transition"
                  >
                    <div
                      className="w-full h-24 rounded-lg border-2 border-gray-300 hover:border-gray-500"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm font-medium text-center text-gray-700">{color.name}</p>
                    <p className="text-xs font-mono text-center text-gray-500">{color.hex}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
