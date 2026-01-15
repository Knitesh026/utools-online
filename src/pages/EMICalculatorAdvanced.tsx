import React, { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import { BarChart3, TrendingUp, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";

interface EMIBreakdown {
  month: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
  totalInterestPaid: number;
}

const EMICalculatorAdvanced: React.FC = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [processingFee, setProcessingFee] = useState(0);
  const [down, setDown] = useState(0);
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");

  const calculateEMI = () => {
    const p = principal - down;
    const r = rate / 100 / 12; // Monthly rate
    const n = tenureUnit === "years" ? tenure * 12 : tenure;

    if (r === 0) {
      return p / n; // Simple division if no interest
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emi;
  };

  const generateAmortization = () => {
    const p = principal - down;
    const r = rate / 100 / 12;
    const n = tenureUnit === "years" ? tenure * 12 : tenure;
    const emi = calculateEMI();

    let breakdown: EMIBreakdown[] = [];
    let remainingBalance = p;
    let totalInterestPaid = 0;

    for (let month = 1; month <= n; month++) {
      const interestPayment = remainingBalance * r;
      const principalPayment = emi - interestPayment;
      remainingBalance -= principalPayment;
      totalInterestPaid += interestPayment;

      if (month % Math.ceil(n / 12) === 0 || month <= 3 || month === n) {
        breakdown.push({
          month,
          principalPayment,
          interestPayment,
          remainingBalance: Math.max(0, remainingBalance),
          totalInterestPaid,
        });
      }
    }

    return breakdown;
  };

  const emi = calculateEMI();
  const months = tenureUnit === "years" ? tenure * 12 : tenure;
  const totalAmount = emi * months + processingFee;
  const totalInterest = totalAmount - (principal - down) - processingFee;
  const amortization = generateAmortization();

  const downloadSchedule = () => {
    let csv = "Month,Principal Payment,Interest Payment,Remaining Balance,Total Interest Paid\n";
    amortization.forEach((row) => {
      csv += `${row.month},${row.principalPayment.toFixed(2)},${row.interestPayment.toFixed(2)},${row.remainingBalance.toFixed(2)},${row.totalInterestPaid.toFixed(2)}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emi-schedule.csv";
    a.click();
  };

  const reset = () => {
    setPrincipal(500000);
    setRate(8.5);
    setTenure(5);
    setProcessingFee(0);
    setDown(0);
    setTenureUnit("years");
  };

  const inputSection = (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
        <CardDescription>Enter your loan information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="principal">Loan Amount (₹)</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            placeholder="Enter loan amount"
            className="border-gray-300"
          />
          <div className="flex gap-2">
            {[100000, 500000, 1000000, 2000000].map((val) => (
              <Button
                key={val}
                size="sm"
                variant="outline"
                onClick={() => setPrincipal(val)}
                className="text-xs"
              >
                ₹{(val / 100000).toFixed(0)}L
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="downpayment">Down Payment (₹)</Label>
          <Input
            id="downpayment"
            type="number"
            value={down}
            onChange={(e) => setDown(Number(e.target.value))}
            placeholder="Enter down payment"
            className="border-gray-300"
          />
          <p className="text-xs text-gray-500">
            Net Loan: ₹{(principal - down).toLocaleString()}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
          <Input
            id="rate"
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            placeholder="Enter interest rate"
            className="border-gray-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="tenure">Tenure</Label>
            <Input
              id="tenure"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              placeholder="Enter tenure"
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Select value={tenureUnit} onValueChange={(value: any) => setTenureUnit(value)}>
              <SelectTrigger id="unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="years">Years</SelectItem>
                <SelectItem value="months">Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fee">Processing Fee (₹)</Label>
          <Input
            id="fee"
            type="number"
            value={processingFee}
            onChange={(e) => setProcessingFee(Number(e.target.value))}
            placeholder="Enter processing fee"
            className="border-gray-300"
          />
        </div>

        <Button onClick={reset} variant="outline" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset Values
        </Button>
      </CardContent>
    </div>
  );

  const outputSection = (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Loan Summary</CardTitle>
        <CardDescription>Your EMI breakdown and payment schedule</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <p className="text-xs text-gray-600 mb-1">Monthly EMI</p>
            <p className="text-3xl font-bold text-green-700">
              ₹{emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-600 mb-1">Total Interest</p>
              <p className="text-2xl font-bold text-blue-700">
                ₹{totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <p className="text-xs text-gray-600 mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-purple-700">
                ₹{totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Loan Amount:</span>
                <span className="float-right font-semibold">
                  ₹{principal.toLocaleString("en-IN")}
                </span>
              </p>
              <p>
                <span className="text-gray-600">Down Payment:</span>
                <span className="float-right font-semibold">
                  ₹{down.toLocaleString("en-IN")}
                </span>
              </p>
              <p className="border-t pt-2">
                <span className="text-gray-600">Net Loan:</span>
                <span className="float-right font-semibold">
                  ₹{(principal - down).toLocaleString("en-IN")}
                </span>
              </p>
              <p>
                <span className="text-gray-600">Tenure:</span>
                <span className="float-right font-semibold">
                  {months} months ({tenure} {tenureUnit})
                </span>
              </p>
              <p>
                <span className="text-gray-600">Processing Fee:</span>
                <span className="float-right font-semibold">
                  ₹{processingFee.toLocaleString("en-IN")}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Amortization Preview */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-900">Payment Schedule (Sample)</p>
          <div className="max-h-40 overflow-y-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-2">Month</th>
                  <th className="text-right p-2">Principal</th>
                  <th className="text-right p-2">Interest</th>
                  <th className="text-right p-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {amortization.slice(0, 6).map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-2">{row.month}</td>
                    <td className="text-right p-2 font-medium">
                      ₹{row.principalPayment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </td>
                    <td className="text-right p-2 text-gray-600">
                      ₹{row.interestPayment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </td>
                    <td className="text-right p-2 text-gray-700">
                      ₹{row.remainingBalance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Button
          onClick={downloadSchedule}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Full Schedule (CSV)
        </Button>
      </CardContent>
    </div>
  );

  return (
    <ProfessionalToolLayout
      title="EMI Calculator Advanced"
      description="Calculate EMI with down payment, processing fees, and detailed amortization schedule."
      inputSection={inputSection}
      outputSection={outputSection}
      colorTheme={{
        gradient: "from-green-600 to-teal-600",
        accent: "bg-green-100 text-green-900",
      }}
      features={[
        {
          icon: "BarChart3",
          title: "Advanced Features",
          description: "Down payment, processing fees, and tenure options",
        },
        {
          icon: "TrendingUp",
          title: "Amortization Schedule",
          description: "View detailed month-by-month payment breakdown",
        },
        {
          icon: "Download",
          title: "CSV Export",
          description: "Download full payment schedule as CSV file",
        },
      ]}
    />
  
      <AdPopunder />
);
};

export default EMICalculatorAdvanced;
