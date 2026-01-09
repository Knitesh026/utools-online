import { useState } from 'react';
import { Copy, AlertCircle, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [error, setError] = useState('');

  const calculateEMI = () => {
    if (!principal || !rate || !tenure) {
      setError('Please fill all fields');
      return;
    }

    if (principal <= 0 || rate < 0 || tenure <= 0) {
      setError('Please enter valid values');
      return;
    }

    setError('');

    // Formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
    // where P = Principal, r = monthly rate, n = total months
    const monthlyRate = rate / 12 / 100;
    const numberOfPayments = tenure * 12;

    if (monthlyRate === 0) {
      const calculatedEmi = principal / numberOfPayments;
      setEmi(calculatedEmi);
      setTotalAmount(principal);
      setTotalInterest(0);
    } else {
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
      const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
      const calculatedEmi = principal * (numerator / denominator);

      const total = calculatedEmi * numberOfPayments;
      const interest = total - principal;

      setEmi(calculatedEmi);
      setTotalAmount(total);
      setTotalInterest(interest);
    }
  };

  const reset = () => {
    setPrincipal(100000);
    setRate(8.5);
    setTenure(5);
    setEmi(0);
    setTotalAmount(0);
    setTotalInterest(0);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">EMI Calculator</h1>
          <p className="text-gray-600">Calculate monthly EMI for loans and mortgages</p>
        </div>

        {/* Calculator Card */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Enter loan information to calculate EMI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Principal Amount */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Loan Amount (₹)
                </label>
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  placeholder="100000"
                  className="w-full"
                />
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Annual Interest Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  placeholder="8.5"
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg"
                />
              </div>

              {/* Tenure */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Tenure (Years)
                </label>
                <Input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  placeholder="5"
                  className="w-full"
                />
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-gray-200 rounded-lg"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-center">
              <Button
                onClick={calculateEMI}
                className="bg-green-500 hover:bg-green-600 gap-2 flex-1"
              >
                <BarChart3 className="h-4 w-4" />
                Calculate EMI
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="flex-1"
              >
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
        {emi > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-2 border-green-500">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Monthly EMI</p>
                  <p className="text-3xl font-bold text-green-600">
                    ₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Total Interest</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-500">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Total Amount</p>
                  <p className="text-3xl font-bold text-purple-600">
                    ₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Amortization Table */}
        {emi > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Schedule (First 12 Months)</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left py-2 px-2">Month</th>
                    <th className="text-right py-2 px-2">EMI</th>
                    <th className="text-right py-2 px-2">Principal</th>
                    <th className="text-right py-2 px-2">Interest</th>
                    <th className="text-right py-2 px-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.min(12, tenure * 12) }).map((_, i) => {
                    const monthlyRate = rate / 12 / 100;
                    let balance = principal;

                    for (let j = 0; j <= i; j++) {
                      const interest = balance * monthlyRate;
                      const principalPayment = emi - interest;
                      balance -= principalPayment;
                    }

                    const interest = balance < 0 ? 0 : balance * monthlyRate;
                    const principalPayment = emi - interest;

                    return (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2">{i + 1}</td>
                        <td className="text-right py-2 px-2">₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="text-right py-2 px-2">₹{principalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="text-right py-2 px-2">₹{interest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="text-right py-2 px-2">₹{Math.max(0, balance).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
