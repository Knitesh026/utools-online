import { useState } from "react";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    if (!weight || !height) {
      setError("Please enter both weight and height");
      return;
    }

    try {
      setError("");
      const w = parseFloat(weight);
      const h = parseFloat(height);

      if (w <= 0 || h <= 0) {
        setError("Weight and height must be positive numbers");
        return;
      }

      let heightInMeters = h;
      if (unit === "kg") {
        heightInMeters = h / 100;
      } else {
        heightInMeters = h * 0.0254;
      }

      const bmi = w / (heightInMeters * heightInMeters);

      let category = "";
      let color = "";

      if (bmi < 18.5) {
        category = "Underweight";
        color = "blue";
      } else if (bmi < 25) {
        category = "Normal Weight";
        color = "green";
      } else if (bmi < 30) {
        category = "Overweight";
        color = "orange";
      } else {
        category = "Obese";
        color = "red";
      }

      setResult({
        bmi: bmi.toFixed(1),
        category,
        color,
        weight: w,
        height: h,
        unit,
      });
    } catch (err) {
      setError("Invalid input. Please check your values.");
    }
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setUnit("kg");
    setResult(null);
    setError("");
  };

  const categoryColors: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    orange: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
    red: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
  };

  const categoryTextColors: Record<string, string> = {
    blue: "text-blue-700 dark:text-blue-300",
    green: "text-green-700 dark:text-green-300",
    orange: "text-orange-700 dark:text-orange-300",
    red: "text-red-700 dark:text-red-300",
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Measurements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-3 block">Measurement System</Label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900">
              <input
                type="radio"
                value="kg"
                checked={unit === "kg"}
                onChange={(e) => setUnit(e.target.value)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Metric (kg/cm)</span>
            </label>
            <label className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900">
              <input
                type="radio"
                value="lbs"
                checked={unit === "lbs"}
                onChange={(e) => setUnit(e.target.value)}
                className="mr-2 w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Imperial (lbs/in)</span>
            </label>
          </div>
        </div>

        <div>
          <Label htmlFor="weight" className="text-sm font-medium">
            Weight ({unit === "kg" ? "kg" : "lbs"})
          </Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            className="mt-1 border-gray-200 dark:border-gray-700 dark:bg-gray-950 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="height" className="text-sm font-medium">
            Height ({unit === "kg" ? "cm" : "inches"})
          </Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            className="mt-1 border-gray-200 dark:border-gray-700 dark:bg-gray-950 focus:ring-blue-500"
          />
        </div>
      </CardContent>
    </>
  );

  const outputSection = result ? (
    <>
      <CardHeader>
        <CardTitle>Your BMI Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-6 rounded-lg border-2 ${categoryColors[result.color]}`}>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Body Mass Index</p>
          <p className={`text-5xl font-bold mb-2 ${categoryTextColors[result.color]}`}>
            {result.bmi}
          </p>
          <p className={`text-lg font-semibold ${categoryTextColors[result.color]}`}>
            {result.category}
          </p>
        </div>

        <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Height:</span> {result.height} {unit === "kg" ? "cm" : "in"}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Weight:</span> {result.weight} {unit === "kg" ? "kg" : "lbs"}
          </p>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-900 dark:text-blue-200">
            <span className="font-semibold">BMI Categories:</span> Underweight &lt;18.5, Normal 18.5-24.9, Overweight 25-29.9, Obese 30+
          </p>
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index and get health insights"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      actionButton={{
        label: "Calculate BMI",
        onClick: handleCalculate,
        icon: "BarChart3"
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset
      }}
      features={[
        {
          icon: "📊",
          title: "Accurate",
          description: "Precise BMI calculation"
        },
        {
          icon: "🌍",
          title: "Global Units",
          description: "Metric & Imperial support"
        },
        {
          icon: "✅",
          title: "Health Category",
          description: "Get classification instantly"
        }
      ]}
    />
  );
};

export default BMICalculator;
