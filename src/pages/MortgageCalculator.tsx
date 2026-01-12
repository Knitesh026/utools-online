import { useState } from "react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

const MortgageCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [result, setResult] = useState<{
    loanAmount: number;
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    setResult(null);

    if (!propertyPrice || !downPayment || !interestRate || !loanTenure) {
      setError("Please fill in all fields");
      return;
    }

    const price = parseFloat(propertyPrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate);
    const tenure = parseFloat(loanTenure);

    if (price <= 0 || down < 0 || rate < 0 || tenure <= 0) {
      setError("Please enter valid amounts (positive numbers)");
      return;
    }

    if (down > price) {
      setError("Down payment cannot be more than property price");
      return;
    }

    const loanAmt = price - down;
    const monthlyRate = rate / 100 / 12;
    const months = tenure * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmt / months;
    } else {
      monthlyPayment =
        (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - loanAmt;

    setResult({
      loanAmount: Math.round(loanAmt * 100) / 100,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
    });
  };

  const handleReset = () => {
    setPropertyPrice("");
    setDownPayment("");
    setInterestRate("");
    setLoanTenure("");
    setResult(null);
    setError("");
  };

  const handleAutoDownPayment = () => {
    if (propertyPrice) {
      const price = parseFloat(propertyPrice);
      const down = Math.round(price * 0.2 * 100) / 100;
      setDownPayment(down.toString());
    }
  };

  return (
    <ProfessionalToolLayout
      title="Mortgage Calculator"
      description="Calculate home loan monthly payments"
      inputSection={
        <>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="price" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Property Price (₹)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 5000000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(e.target.value)}
                min="0"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="down" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Down Payment (₹)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="down"
                  type="number"
                  placeholder="e.g., 1000000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  min="0"
                  className="flex-1 border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                />
                <button
                  onClick={handleAutoDownPayment}
                  className="px-3 py-2 text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  Auto 20%
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="rate" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Annual Interest Rate (%)
              </Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g., 7.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                min="0"
                step="0.1"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="tenure" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Loan Tenure (Years)
              </Label>
              <Input
                id="tenure"
                type="number"
                placeholder="e.g., 20"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                min="0.1"
                step="0.1"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>
          </CardContent>
        </>
      }
      outputSection={
        result ? (
          <>
            <CardHeader>
              <CardTitle className="text-green-900 dark:text-green-400">Mortgage Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Monthly Payment</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">₹{result.monthlyPayment.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Loan Amount</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">₹{result.loanAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Interest</p>
                  <p className="text-lg font-bold text-orange-700 dark:text-orange-400">₹{result.totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Payment (with interest)</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">₹{result.totalPayment.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
              </div>
            </CardContent>
          </>
        ) : undefined
      }
      actionButton={{
        label: "Calculate",
        onClick: handleCalculate,
        icon: "🧮",
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        { icon: "🏠", title: "Home Planning", description: "Plan your property purchase" },
        { icon: "💰", title: "Budget Details", description: "Know your costs and payments" },
        { icon: "⚡", title: "Instant Results", description: "Calculate in seconds" },
      ]}
      error={error}
    />
  );
};

export default MortgageCalculator;
