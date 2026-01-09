import { useState } from 'react';
import { Copy, AlertCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { getApiUrl } from '@/lib/api';

export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!input.trim()) {
      setError('Please enter text to convert');
      return;
    }

    setError('');

    try {
      const response = await fetch(`${getApiUrl()}/api/tools/base64-converter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, mode }),
      });

      if (!response.ok) {
        throw new Error('Backend unavailable');
      }

      const data = await response.json();
      setOutput(data.result);
    } catch (err) {
      // Fallback: Client-side conversion
      try {
        if (mode === 'encode') {
          const encoded = btoa(input);
          setOutput(encoded);
        } else {
          const decoded = atob(input);
          setOutput(decoded);
        }
      } catch {
        setError('Invalid input for the selected mode');
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Base64 Converter</h1>
          <p className="text-gray-600">Encode and decode Base64 text instantly</p>
        </div>

        {/* Main Converter */}
        <Card>
          <CardHeader>
            <CardTitle>Base64 {mode === 'encode' ? 'Encoder' : 'Decoder'}</CardTitle>
            <CardDescription>
              {mode === 'encode' ? 'Convert text to Base64' : 'Convert Base64 to text'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode Selector */}
            <div className="flex gap-2 justify-center">
              {['encode', 'decode'].map((m) => (
                <Button
                  key={m}
                  onClick={() => setMode(m as 'encode' | 'decode')}
                  variant={mode === m ? 'default' : 'outline'}
                  className={mode === m ? 'bg-indigo-500 hover:bg-indigo-600' : ''}
                >
                  {m === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
                </Button>
              ))}
            </div>

            {/* Input and Output */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Input Text
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm min-h-48"
                />
              </div>

              {/* Output */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Output
                </label>
                <textarea
                  value={output}
                  readOnly
                  placeholder="Converted output will appear here..."
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm min-h-48"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-2 justify-center">
              <Button
                onClick={handleConvert}
                className="bg-indigo-500 hover:bg-indigo-600 gap-2"
              >
                <Zap className="h-4 w-4" />
                Convert
              </Button>
              <Button
                onClick={swapMode}
                variant="outline"
                className="gap-2"
              >
                ⇅ Swap
              </Button>
              {output && (
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>About Base64</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <p>
              Base64 is a binary-to-text encoding scheme used to represent binary data in ASCII format. It's commonly used for:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Transmitting binary data over text-based protocols</li>
              <li>Embedding images in HTML/CSS</li>
              <li>Securing credentials and tokens</li>
              <li>Data interchange between systems</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
