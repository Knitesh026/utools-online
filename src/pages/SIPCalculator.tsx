import { useState } from "react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SIPCalculator = () => {
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    totalInvested: number;
    totalGain: number;
    finalValue: number;
    gainPercentage: number;
  } | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    setResult(null);

    if (!monthlyAmount || !annualRate || !years) {
      setError("Please fill in all fields");
      return;
    }

    const pmt = parseFloat(monthlyAmount);
    const rate = parseFloat(annualRate);
    const n = parseFloat(years);

    if (pmt <= 0 || rate < 0 || n <= 0) {
      setError("Please enter valid amounts (positive numbers)");
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const months = n * 12;
    const totalInvested = pmt * months;

    let finalValue: number;
    if (monthlyRate === 0) {
      finalValue = totalInvested;
    } else {
      finalValue = (pmt * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;
    }

    const totalGain = finalValue - totalInvested;
    const gainPercentage = (totalGain / totalInvested) * 100;

    setResult({
      totalInvested: Math.round(totalInvested * 100) / 100,
      totalGain: Math.round(totalGain * 100) / 100,
      finalValue: Math.round(finalValue * 100) / 100,
      gainPercentage: Math.round(gainPercentage * 100) / 100,
    });
  };

  const handleReset = () => {
    setMonthlyAmount("");
    setAnnualRate("");
    setYears("");
    setResult(null);
    setError("");
  };

  return (
    <ProfessionalToolLayout
      title="SIP Calculator"
      description="Calculate your systematic investment plan returns"
      inputSection={
        <>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="monthly" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Monthly Investment (₹)
              </Label>
              <Input
                id="monthly"
                type="number"
                placeholder="e.g., 5000"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                min="0"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="rate" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Annual Return Rate (%)
              </Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g., 12"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                min="0"
                step="0.1"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="years" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Time Period (Years)
              </Label>
              <Input
                id="years"
                type="number"
                placeholder="e.g., 10"
                value={years}
                onChange={(e) => setYears(e.target.value)}
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
              <CardTitle className="text-green-900 dark:text-green-400">Investment Returns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Final Value</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">₹{result.finalValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Invested</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">₹{result.totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Gain ({result.gainPercentage}%)</p>
                  <p className="text-lg font-bold text-green-700 dark:text-green-400">₹{result.totalGain.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
                </div>
              </div>
            </CardContent>
          </>
        ) : undefined
      }
      actionButton={{
        label: "Calculate",
        onClick: handleCalculate,
        icon: "📊",
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        { icon: "📈", title: "Investment Growth", description: "Track your gains" },
        { icon: "💹", title: "Long Term Wealth", description: "Compound interest benefit" },
        { icon: "⚡", title: "Instant Results", description: "See projections instantly" },
      ]}
      error={error}
    />
  );
};

export default SIPCalculator;
