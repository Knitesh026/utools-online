import { useState } from "react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PPPCalculator = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [result, setResult] = useState<{
    originalAmount: number;
    exchangeAmount: number;
    pppAdjustedAmount: number;
    inflationAdjustment: number;
  } | null>(null);
  const [error, setError] = useState("");

  const currencies = ["USD", "EUR", "GBP", "JPY", "INR", "AUD", "CAD", "CHF", "CNY", "SEK"];

  const handleCalculate = () => {
    setError("");
    setResult(null);

    if (!amount || !exchangeRate) {
      setError("Please fill in amount and exchange rate");
      return;
    }

    const amt = parseFloat(amount);
    const rate = parseFloat(exchangeRate);
    const inflation = parseFloat(inflationRate || "0");

    if (amt <= 0 || rate <= 0) {
      setError("Please enter valid amounts (positive numbers)");
      return;
    }

    const exchangeAmount = amt * rate;
    const inflationMultiplier = 1 + inflation / 100;
    const pppAdjusted = exchangeAmount * inflationMultiplier;

    setResult({
      originalAmount: Math.round(amt * 100) / 100,
      exchangeAmount: Math.round(exchangeAmount * 100) / 100,
      pppAdjustedAmount: Math.round(pppAdjusted * 100) / 100,
      inflationAdjustment: inflation,
    });
  };

  const handleReset = () => {
    setAmount("");
    setFromCurrency("USD");
    setToCurrency("INR");
    setExchangeRate("");
    setInflationRate("");
    setResult(null);
    setError("");
  };

  return (
    <ProfessionalToolLayout
      title="PPP Calculator"
      description="Purchasing Power Parity currency conversion"
      inputSection={
        <>
          
      <CardHeader>
            <CardTitle>Conversion Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="from" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  From Currency
                </Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger id="from" className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="to" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  To Currency
                </Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger id="to" className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="rate" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Exchange Rate (1 {fromCurrency} = ? {toCurrency})
              </Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g., 83.5"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                min="0"
                step="0.01"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="inflation" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Inflation Rate (%) - Optional
              </Label>
              <Input
                id="inflation"
                type="number"
                placeholder="e.g., 5.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                min="0"
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
              <CardTitle className="text-green-900 dark:text-green-400">PPP Conversion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Original Amount</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{result.originalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })} {fromCurrency}</p>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Exchange Rate Conversion</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">{result.exchangeAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })} {toCurrency}</p>
              </div>

              {result.inflationAdjustment > 0 && (
                <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">PPP Adjusted (+ {result.inflationAdjustment}% inflation)</p>
                  <p className="text-lg font-bold text-orange-700 dark:text-orange-400">{result.pppAdjustedAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })} {toCurrency}</p>
                </div>
              )}

              <div className="bg-purple-100 dark:bg-purple-950 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-xs text-purple-700 dark:text-purple-400 font-medium">
                  {fromCurrency} {result.originalAmount} = {toCurrency} {result.inflationAdjustment > 0 ? result.pppAdjustedAmount : result.exchangeAmount}
                </p>
              </div>
            </CardContent>
          </>
        ) : undefined
      }
      actionButton={{
        label: "Calculate",
        onClick: handleCalculate,
        icon: "💱",
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        { icon: "💱", title: "Currency Conversion", description: "Multi-currency support" },
        { icon: "📊", title: "PPP Adjustment", description: "Cost of living factor" },
        { icon: "⚡", title: "Instant Results", description: "Real-time calculation" },
      ]}
      error={error}
    />
  );
};

export default PPPCalculator;
