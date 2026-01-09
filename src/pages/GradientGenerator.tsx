import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GradientGenerator() {
  const [color1, setColor1] = useState('#FF6B6B');
  const [color2, setColor2] = useState('#4ECDC4');
  const [angle, setAngle] = useState(90);
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');

  const gradientCSS = gradientType === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const presets = [
    { name: 'Sunset', color1: '#FF6B6B', color2: '#FFE66D' },
    { name: 'Ocean', color1: '#4ECDC4', color2: '#44A0D6' },
    { name: 'Forest', color1: '#51CF66', color2: '#37B24D' },
    { name: 'Lavender', color1: '#A78BFA', color2: '#D8B4FE' },
    { name: 'Fire', color1: '#FF6B6B', color2: '#FFA500' },
    { name: 'Cool', color1: '#667EEA', color2: '#764BA2' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Gradient Generator</h1>
            <p className="text-gray-600">Create beautiful color gradients</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gradient Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="w-full h-64 rounded-lg border-2 border-gray-300 shadow-lg"
                style={{ background: gradientCSS }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Gradient Type</label>
                <div className="flex gap-2">
                  <Button
                    variant={gradientType === 'linear' ? 'default' : 'outline'}
                    onClick={() => setGradientType('linear')}
                  >
                    Linear
                  </Button>
                  <Button
                    variant={gradientType === 'radial' ? 'default' : 'outline'}
                    onClick={() => setGradientType('radial')}
                  >
                    Radial
                  </Button>
                </div>
              </div>

              {gradientType === 'linear' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Angle: {angle}°</label>
                  <Slider
                    value={[angle]}
                    onValueChange={(value) => setAngle(value[0])}
                    min={0}
                    max={360}
                    step={1}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Color 1</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <Input
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Color 2</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <Input
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSS Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm overflow-auto">
                <code>background: {gradientCSS};</code>
              </div>
              <Button
                onClick={() => copyToClipboard(`background: ${gradientCSS};`)}
                className="w-full mt-2"
              >
                Copy CSS
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preset Gradients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setColor1(preset.color1);
                      setColor2(preset.color2);
                    }}
                    className="space-y-2 hover:scale-105 transition"
                  >
                    <div
                      className="w-full h-20 rounded-lg border-2 border-gray-300"
                      style={{ background: `linear-gradient(135deg, ${preset.color1}, ${preset.color2})` }}
                    />
                    <p className="text-sm font-medium text-center text-gray-700">{preset.name}</p>
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
