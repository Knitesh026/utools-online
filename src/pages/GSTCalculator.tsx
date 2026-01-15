import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GSTCalculator = () => {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [result, setResult] = useState<{
    baseAmount: number;
    gstAmount: number;
    totalAmount: number;
    gstPercentage: number;
  } | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    setResult(null);

    if (!amount) {
      setError("Please enter an amount");
      return;
    }

    const baseAmt = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (baseAmt <= 0 || rate < 0) {
      setError("Please enter valid amounts (positive numbers)");
      return;
    }

    const gstAmt = (baseAmt * rate) / 100;
    const totalAmt = baseAmt + gstAmt;

    setResult({
      baseAmount: Math.round(baseAmt * 100) / 100,
      gstAmount: Math.round(gstAmt * 100) / 100,
      totalAmount: Math.round(totalAmt * 100) / 100,
      gstPercentage: rate,
    });
  };

  const handleReset = () => {
    setAmount("");
    setGstRate("18");
    setResult(null);
    setError("");
  };

  return (
    <ProfessionalToolLayout
      title="GST Calculator"
      description="Calculate GST tax and total amount"
      inputSection={
        <>
          
      <AdPopunder />
<CardHeader>
            <CardTitle>GST Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Base Amount (₹)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="gst-rate" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                GST Rate (%)
              </Label>
              <Select value={gstRate} onValueChange={setGstRate}>
                <SelectTrigger id="gst-rate" className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5% - Essential goods</SelectItem>
                  <SelectItem value="12">12% - Standard goods</SelectItem>
                  <SelectItem value="18">18% - Premium goods</SelectItem>
                  <SelectItem value="28">28% - Luxury items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </>
      }
      outputSection={
        result ? (
          <>
            <CardHeader>
              <CardTitle className="text-green-900 dark:text-green-400">GST Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Base Amount</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{result.baseAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">GST Amount ({result.gstPercentage}%)</p>
                <p className="text-lg font-semibold text-orange-700 dark:text-orange-400">₹{result.gstAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
              </div>

              <div className="bg-green-100 dark:bg-green-950 p-4 rounded-lg border-2 border-green-300 dark:border-green-800">
                <p className="text-xs text-green-700 dark:text-green-400 mb-1 font-medium">TOTAL AMOUNT (Incl. GST)</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">₹{result.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
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
        { icon: "🧾", title: "Invoice Ready", description: "Quick tax calculation" },
        { icon: "📋", title: "Multiple Rates", description: "5%, 12%, 18%, 28%" },
        { icon: "⚡", title: "Instant Results", description: "See breakdown instantly" },
      ]}
      error={error}
    />
  );
};

export default GSTCalculator;
