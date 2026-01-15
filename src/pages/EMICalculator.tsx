import { useState } from "react";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

const EMICalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState<{
    monthlyEMI: number;
    totalAmount: number;
    totalInterest: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    setError("");
    setResult(null);

    if (!principal || !rate || !tenure) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(tenure);

    if (p <= 0 || r < 0 || t <= 0) {
      setError("Please enter valid amounts (positive numbers)");
      setLoading(false);
      return;
    }

    try {
      const monthlyRate = r / 100 / 12;
      const months = t * 12;

      let monthlyEMI: number;
      if (monthlyRate === 0) {
        monthlyEMI = p / months;
      } else {
        monthlyEMI =
          (p * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
      }

      const totalAmount = monthlyEMI * months;
      const totalInterest = totalAmount - p;

      setResult({
        monthlyEMI: Math.round(monthlyEMI * 100) / 100,
        totalAmount: Math.round(totalAmount * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      });
    } catch (err) {
      setError("Failed to calculate EMI");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setTenure("");
    setResult(null);
    setError("");
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="principal" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Principal Amount (₹)
          </Label>
          <Input
            id="principal"
            type="number"
            placeholder="e.g., 500000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            min="0"
            className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
        </div>

        <div>
          <Label htmlFor="rate" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Annual Interest Rate (%)
          </Label>
          <Input
            id="rate"
            type="number"
            placeholder="e.g., 8.5"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            min="0"
            step="0.1"
            className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
        </div>

        <div>
          <Label htmlFor="tenure" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Tenure (Years)
          </Label>
          <Input
            id="tenure"
            type="number"
            placeholder="e.g., 5"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            min="0.1"
            step="0.1"
            className="border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
        </div>
      </CardContent>
    </>
  );

  const outputSection = result ? (
    <>
      <CardHeader>
        <CardTitle>EMI Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-xs text-green-700 dark:text-green-300 mb-1">Monthly EMI</div>
          <div className="text-3xl font-bold text-green-700 dark:text-green-400">
            ₹{result.monthlyEMI.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ₹{(result.totalAmount / 100000).toFixed(1)}L
            </div>
            <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">Total Amount</div>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ₹{(result.totalInterest / 100000).toFixed(1)}L
            </div>
            <div className="text-xs text-orange-700 dark:text-orange-300 mt-1">Total Interest</div>
          </div>
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="EMI Calculator"
      description="Calculate your monthly loan installments and total interest"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      actionButton={{
        label: "Calculate",
        onClick: handleCalculate,
        icon: "DollarSign",
        loading,
        disabled: !principal || !rate || !tenure,
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        { icon: "💰", title: "Loan Planning", description: "Plan your borrowing efficiently" },
        { icon: "📊", title: "Detailed Breakdown", description: "Interest and total amounts" },
        { icon: "⚡", title: "Instant Results", description: "Calculate in seconds" },
      ]}
    />
  
      );
};

export default EMICalculator;
