import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(20);

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  const yearlyBreakdown = Array.from({ length: loanTerm }, (_, i) => {
    const year = i + 1;
    let balance = loanAmount;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    for (let month = 1; month <= numberOfPayments; month++) {
      if (Math.floor((month - 1) / 12) === i) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        balance -= principalPayment;
      } else if (month <= (i + 1) * 12) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        balance -= principalPayment;
      }
    }

    return {
      year,
      principal: yearlyPrincipal,
      interest: yearlyInterest,
      balance: Math.max(0, balance),
    };
  });

  const reset = () => {
    setLoanAmount(3000000);
    setInterestRate(6.5);
    setLoanTerm(20);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Mortgage Calculator</h1>
            <p className="text-gray-600">Calculate home loan EMI and amortization schedule</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Loan Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="100000"
                  max="50000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">₹{(loanAmount / 100000).toFixed(1)} L</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Interest Rate (%)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  step="0.1"
                  className="text-lg"
                />
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Loan Term (Years)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Payment (EMI)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-700">
                  ₹{monthlyPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">Total Interest Payable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-purple-700">
                  ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Loan Amount</p>
                  <p className="text-lg font-semibold">₹{loanAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Monthly EMI</p>
                  <p className="text-lg font-semibold">₹{monthlyPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Total Payment</p>
                  <p className="text-lg font-semibold">₹{totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="text-lg font-semibold">{loanTerm} years</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Year-wise Amortization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Year</th>
                      <th className="text-right py-2 px-2">Principal</th>
                      <th className="text-right py-2 px-2">Interest</th>
                      <th className="text-right py-2 px-2">Total Payment</th>
                      <th className="text-right py-2 px-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyBreakdown.map((row) => (
                      <tr key={row.year} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2">Year {row.year}</td>
                        <td className="text-right py-2 px-2">₹{row.principal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="text-right py-2 px-2">₹{row.interest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="text-right py-2 px-2">₹{(row.principal + row.interest).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="text-right py-2 px-2 font-semibold">₹{row.balance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
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
