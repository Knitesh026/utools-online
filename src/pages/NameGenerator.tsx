import { useState } from 'react';
import { Copy, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

export default function NameGenerator() {
  const [gender, setGender] = useState<'male' | 'female' | 'neutral'>('neutral');
  const [origin, setOrigin] = useState('international');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const maleNames = {
    international: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'],
    indian: ['Arjun', 'Rohan', 'Vikram', 'Aditya', 'Siddharth', 'Nikhil', 'Rahul', 'Anuj', 'Karan', 'Varun'],
  };

  const femaleNames = {
    international: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen'],
    indian: ['Priya', 'Anjali', 'Deepika', 'Sneha', 'Pooja', 'Shreya', 'Divya', 'Neha', 'Sakshi', 'Isha'],
  };

  const neutralNames = {
    international: ['Alex', 'Casey', 'Jordan', 'Morgan', 'Riley', 'Sam', 'Taylor', 'Avery', 'Quinn', 'Skyler'],
    indian: ['Aryan', 'Anaya', 'Amar', 'Asha', 'Akshay', 'Avni', 'Ashwin', 'Alisha', 'Anil', 'Ananya'],
  };

  const generateNames = () => {
    const namePool =
      gender === 'male'
        ? maleNames[origin as keyof typeof maleNames]
        : gender === 'female'
        ? femaleNames[origin as keyof typeof femaleNames]
        : neutralNames[origin as keyof typeof neutralNames];

    const generated: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * namePool.length);
      generated.push(namePool[randomIndex]);
    }

    setGeneratedNames(generated);
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(generatedNames.join('\n'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Name Generator</h1>
          <p className="text-gray-600">Generate random names for characters, aliases, and more</p>
        </div>

        {/* Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Generator Settings</CardTitle>
            <CardDescription>Configure name generation preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Gender */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Gender
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'neutral', label: 'Neutral' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={opt.value}
                        checked={gender === opt.value}
                        onChange={() => setGender(opt.value as 'male' | 'female' | 'neutral')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Origin */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Origin
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'international', label: 'International' },
                    { value: 'indian', label: 'Indian' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="origin"
                        value={opt.value}
                        checked={origin === opt.value}
                        onChange={() => setOrigin(opt.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Count */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Number of Names: {count}
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg"
                />
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))}
                  min="1"
                  max="20"
                  className="w-full mt-2"
                />
              </div>
            </div>

            <Button
              onClick={generateNames}
              className="w-full bg-pink-500 hover:bg-pink-600 gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Generate Names
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {generatedNames.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Generated Names</CardTitle>
                <CardDescription>Your randomly generated names</CardDescription>
              </div>
              <Button
                onClick={copyAll}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {generatedNames.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-pink-300 transition"
                  >
                    <span className="font-medium text-gray-900">{name}</span>
                    <Button
                      onClick={() => copyToClipboard(name)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
