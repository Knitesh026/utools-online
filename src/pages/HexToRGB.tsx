import { useState } from 'react';
import { Copy, Download, AlertCircle, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

export default function HexToRGBConverter() {
  const [hexColor, setHexColor] = useState('#FF6B5B');
  const [rgbColor, setRgbColor] = useState('rgb(255, 107, 91)');
  const [hslColor, setHslColor] = useState('hsl(12, 100%, 69%)');
  const [error, setError] = useState('');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const handleHexChange = (value: string) => {
    setHexColor(value);
    setError('');

    if (/^#[0-9A-F]{6}$/i.test(value)) {
      const rgb = hexToRgb(value);
      if (rgb) {
        setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        setHslColor(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
      }
    } else {
      setError('Invalid HEX color format. Use #RRGGBB');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const presetColors = [
    '#FF6B5B', // Coral
    '#FF5544', // Salmon
    '#FF8866', // Light Coral
    '#FFB3A7', // Peach
    '#4F46E5', // Indigo
    '#3B82F6', // Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">HEX to RGB Converter</h1>
          <p className="text-gray-600">Convert between HEX, RGB, and HSL color formats</p>
        </div>

        {/* Main Converter */}
        <Card>
          <CardHeader>
            <CardTitle>Color Converter</CardTitle>
            <CardDescription>Enter HEX color code to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Color Input */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    HEX Color Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={hexColor}
                      onChange={(e) => handleHexChange(e.target.value)}
                      placeholder="#RRGGBB"
                      className="flex-1"
                    />
                    <input
                      type="color"
                      value={hexColor}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="w-12 h-10 border rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Color Preview */}
                <div className="h-24 rounded-lg border-2 border-gray-200" style={{ backgroundColor: hexColor }} />
              </div>

              {/* Output Formats */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    RGB Format
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={rgbColor}
                      readOnly
                      className="flex-1 bg-gray-50"
                    />
                    <Button
                      onClick={() => copyToClipboard(rgbColor)}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    HSL Format
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={hslColor}
                      readOnly
                      className="flex-1 bg-gray-50"
                    />
                    <Button
                      onClick={() => copyToClipboard(hslColor)}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Preset Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Preset Colors</CardTitle>
            <CardDescription>Quick access to popular colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleHexChange(color)}
                  className="group relative"
                >
                  <div
                    className="h-20 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-gray-600 mt-1 text-center group-hover:text-gray-900">
                    {color}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
