import { useState } from 'react';
import { AlertCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

export default function GSTCalculator() {
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [gstAmount, setGstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [error, setError] = useState('');

  const calculateGST = () => {
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setError('');

    if (mode === 'exclusive') {
      // Price is exclusive of GST
      const gst = (amount * gstRate) / 100;
      const total = amount + gst;
      setGstAmount(gst);
      setTotalAmount(total);
    } else {
      // Price is inclusive of GST
      const baseAmount = amount / (1 + gstRate / 100);
      const gst = amount - baseAmount;
      setGstAmount(gst);
      setTotalAmount(amount);
    }
  };

  const reset = () => {
    setAmount(10000);
    setGstRate(18);
    setGstAmount(0);
    setTotalAmount(0);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">GST Calculator</h1>
          <p className="text-gray-600">Calculate Goods and Services Tax easily</p>
        </div>

        {/* Calculator Card */}
        <Card>
          <CardHeader>
            <CardTitle>GST Calculation</CardTitle>
            <CardDescription>Calculate GST with inclusive or exclusive pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode Selection */}
            <div className="flex gap-4">
              {[
                { value: 'exclusive', label: 'Exclusive (Add GST)' },
                { value: 'inclusive', label: 'Inclusive (Extract GST)' },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value={opt.value}
                    checked={mode === opt.value}
                    onChange={() => setMode(opt.value as 'exclusive' | 'inclusive')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  {mode === 'exclusive' ? 'Amount (Before GST)' : 'Amount (With GST)'}
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="10000"
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  GST Rate (%)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[5, 12, 18, 28].map((rate) => (
                    <Button
                      key={rate}
                      onClick={() => setGstRate(rate)}
                      variant={gstRate === rate ? 'default' : 'outline'}
                      size="sm"
                      className={gstRate === rate ? 'bg-orange-500 hover:bg-orange-600' : ''}
                    >
                      {rate}%
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  step="0.1"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  placeholder="18"
                  className="w-full"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-center">
              <Button
                onClick={calculateGST}
                className="bg-orange-500 hover:bg-orange-600 gap-2 flex-1"
              >
                <Calculator className="h-4 w-4" />
                Calculate
              </Button>
              <Button onClick={reset} variant="outline" className="flex-1">
                Reset
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {gstAmount > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-2 border-orange-500">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Base Amount</p>
                  <p className="text-3xl font-bold text-orange-600">
                    ₹{(mode === 'exclusive' ? amount : totalAmount - gstAmount).toLocaleString('en-IN', {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-500">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">GST Amount</p>
                  <p className="text-3xl font-bold text-red-600">
                    ₹{gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    {mode === 'exclusive' ? 'Total (With GST)' : 'Total'}
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    ₹{(mode === 'exclusive' ? totalAmount : totalAmount).toLocaleString('en-IN', {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info */}
        <Card>
          <CardHeader>
            <CardTitle>GST Rates in India</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <p className="font-medium">Common GST Rates:</p>
            <ul className="space-y-1">
              <li>• 5% - Essential items like food, oil, etc.</li>
              <li>• 12% - Processed food, textiles, etc.</li>
              <li>• 18% - Electronics, cosmetics, etc.</li>
              <li>• 28% - Luxury items, sin goods, etc.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
