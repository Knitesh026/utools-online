import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EMICalculatorAdvanced() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(12);
  const [tenureType, setTenureType] = useState<'months' | 'years'>('months');

  const months = tenureType === 'years' ? tenure * 12 : tenure;
  const monthlyRate = rate / 100 / 12;
  const emi =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;

  const amortizationSchedule = Array.from({ length: Math.min(months, 12) }, (_, i) => {
    let balance = principal;
    let totalEmi = 0;
    let totalInt = 0;

    for (let j = 0; j <= i; j++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      totalEmi += emi;
      totalInt += interestPayment;
      balance -= principalPayment;
    }

    return {
      month: i + 1,
      emi: emi,
      principal: emi - balance * monthlyRate,
      interest: balance * monthlyRate,
      balance: Math.max(balance, 0),
    };
  });

  const reset = () => {
    setPrincipal(100000);
    setRate(8.5);
    setTenure(12);
    setTenureType('months');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">EMI Calculator</h1>
            <p className="text-gray-600">Calculate your monthly EMI with detailed breakdown</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Loan Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">₹{(principal / 100000).toFixed(2)} L</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Interest Rate (%)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  step="0.1"
                  className="text-lg"
                />
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">Per annum</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Tenure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="flex-1 text-lg"
                  />
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as 'months' | 'years')}
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
                <input
                  type="range"
                  min="1"
                  max="360"
                  step="1"
                  value={months}
                  onChange={(e) => {
                    const m = Number(e.target.value);
                    setTenure(m);
                    setTenureType('months');
                  }}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Monthly EMI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-700">₹{emi.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">Total Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-purple-700">₹{totalInterest.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Loan Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Principal</p>
                  <p className="text-lg font-semibold">₹{principal.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Total Interest</p>
                  <p className="text-lg font-semibold">₹{totalInterest.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Total Amount</p>
                  <p className="text-lg font-semibold">₹{totalAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="text-lg font-semibold">{months} months</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amortization Schedule (First 12 months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Month</th>
                      <th className="text-right py-2 px-2">EMI</th>
                      <th className="text-right py-2 px-2">Principal</th>
                      <th className="text-right py-2 px-2">Interest</th>
                      <th className="text-right py-2 px-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationSchedule.map((row) => (
                      <tr key={row.month} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2">{row.month}</td>
                        <td className="text-right py-2 px-2">₹{row.emi.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                        <td className="text-right py-2 px-2">₹{row.principal.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                        <td className="text-right py-2 px-2">₹{row.interest.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
                        <td className="text-right py-2 px-2">₹{row.balance.toLocaleString('en-IN', {maximumFractionDigits: 0})}</td>
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
