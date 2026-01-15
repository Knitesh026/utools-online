import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    if (!birthDate) {
      setError("Please select a birth date");
      return;
    }

    try {
      setError("");
      const birth = new Date(birthDate);
      const today = new Date();
      
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();
      
      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      
      setResult({
        years,
        months,
        days,
        totalDays,
        birthDate: birth.toLocaleDateString(),
      });
    } catch (error) {
      setError("Error: Invalid date. Please try again.");
      console.error(error);
    }
  };

  const handleReset = () => {
    setBirthDate("");
    setResult(null);
    setError("");
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Select Birth Date</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="birthDate">Birth Date</Label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-2"
          />
        </div>
      </CardContent>
    </>
  );

  const outputSection = result ? (
    <>
      <CardHeader>
        <CardTitle>Your Age</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Years</p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-2">{result.years}</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Months</p>
            <p className="text-3xl font-bold text-purple-700 dark:text-purple-300 mt-2">{result.months}</p>
          </div>
          <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg border border-pink-200 dark:border-pink-800">
            <p className="text-pink-600 dark:text-pink-400 text-sm font-medium">Days</p>
            <p className="text-3xl font-bold text-pink-700 dark:text-pink-300 mt-2">{result.days}</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-600 dark:text-green-400 text-sm font-medium">Total Days</p>
            <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-2">{result.totalDays}</p>
          </div>
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, days, and total days lived"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      actionButton={{
        label: "Calculate Age",
        onClick: handleCalculate,
        icon: "Calculator"
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset
      }}
      features={[
        {
          icon: "📅",
          title: "Precise Calculation",
          description: "Get your age down to the exact day"
        },
        {
          icon: "🎂",
          title: "All Units",
          description: "See years, months, days, and total days"
        },
        {
          icon: "⚡",
          title: "Instant Results",
          description: "Calculate immediately with no delays"
        }
      ]}
    />
  
      <AdPopunder />
);
};

export default AgeCalculator;
