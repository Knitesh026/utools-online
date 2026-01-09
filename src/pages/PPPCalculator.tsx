import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PPPCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [returnPercentage, setReturnPercentage] = useState(15);
  const [months, setMonths] = useState(12);

  const monthlyReturn = (investmentAmount * returnPercentage) / 100 / 12;
  const totalReturn = (investmentAmount * returnPercentage) / 100;
  const totalAmount = investmentAmount + totalReturn;
  const monthlyAmount = investmentAmount + monthlyReturn * months;

  const monthlyBreakdown = Array.from({ length: Math.min(months, 12) }, (_, i) => {
    const month = i + 1;
    const cumReturn = monthlyReturn * month;
    return {
      month,
      return: cumReturn,
      total: investmentAmount + cumReturn,
    };
  });

  const reset = () => {
    setInvestmentAmount(10000);
    setReturnPercentage(15);
    setMonths(12);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">PPP Calculator</h1>
            <p className="text-gray-600">Calculate Returns on Principal Protected Positive Yield Plans</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Investment Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">₹{(investmentAmount / 100000).toFixed(2)} L</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Expected Return Rate (%)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={returnPercentage}
                  onChange={(e) => setReturnPercentage(Number(e.target.value))}
                  step="0.5"
                  className="text-lg"
                />
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="0.5"
                  value={returnPercentage}
                  onChange={(e) => setReturnPercentage(Number(e.target.value))}
                  className="w-full"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Investment Period (Months)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="1"
                  max="120"
                  step="1"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-700">₹{investmentAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg">Expected Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-700">₹{totalReturn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-700">₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Principal Amount</p>
                  <p className="text-lg font-semibold">₹{investmentAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Monthly Return</p>
                  <p className="text-lg font-semibold">₹{monthlyReturn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Total Return</p>
                  <p className="text-lg font-semibold text-green-600">₹{totalReturn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Period</p>
                  <p className="text-lg font-semibold">{months} months</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Month-wise Breakdown (First 12 months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Month</th>
                      <th className="text-right py-2 px-2">Cumulative Returns</th>
                      <th className="text-right py-2 px-2">Total Amount</th>
                      <th className="text-right py-2 px-2">Return %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyBreakdown.map((row) => (
                      <tr key={row.month} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2">Month {row.month}</td>
                        <td className="text-right py-2 px-2">₹{row.return.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="text-right py-2 px-2 font-semibold">₹{row.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="text-right py-2 px-2">{((row.return / investmentAmount) * 100).toFixed(2)}%</td>
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
