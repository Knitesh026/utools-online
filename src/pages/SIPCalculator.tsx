import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);

  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  // Future Value of SIP formula: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
  const futureValue =
    monthlyAmount *
    (Math.pow(1 + monthlyRate, months) - 1) /
    monthlyRate *
    (1 + monthlyRate);

  const totalInvested = monthlyAmount * months;
  const earnings = futureValue - totalInvested;

  const yearlyBreakdown = Array.from({ length: years }, (_, i) => {
    const y = i + 1;
    const m = y * 12;
    const fv =
      monthlyAmount *
      (Math.pow(1 + monthlyRate, m) - 1) /
      monthlyRate *
      (1 + monthlyRate);
    return {
      year: y,
      amount: fv,
      invested: monthlyAmount * m,
      earnings: fv - monthlyAmount * m,
    };
  });

  const reset = () => {
    setMonthlyAmount(10000);
    setAnnualRate(12);
    setYears(10);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">SIP Calculator</h1>
            <p className="text-gray-600">Calculate returns on Systematic Investment Plans</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Monthly Investment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="500"
                  max="1000000"
                  step="500"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">₹{monthlyAmount.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Annual Return Rate (%)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  step="0.5"
                  className="text-lg"
                />
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="w-full"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Time Period (Years)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Total Invested</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-700">₹{totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg">Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-700">₹{earnings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-700">₹{futureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Year-wise Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Year</th>
                      <th className="text-right py-2 px-2">Amount Invested</th>
                      <th className="text-right py-2 px-2">Earnings</th>
                      <th className="text-right py-2 px-2">Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyBreakdown.map((row) => (
                      <tr key={row.year} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2">Year {row.year}</td>
                        <td className="text-right py-2 px-2">₹{row.invested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="text-right py-2 px-2 text-green-600">₹{row.earnings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="text-right py-2 px-2 font-semibold">₹{row.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Button onClick={reset} variant="outline" className="w-full">
            Reset
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
