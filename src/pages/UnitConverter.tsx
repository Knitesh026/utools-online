import { useState } from "react";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UnitConverter = () => {
  const [category, setCategory] = useState("length");
  const [inputValue, setInputValue] = useState("");
  const [inputUnit, setInputUnit] = useState("meter");
  const [outputUnit, setOutputUnit] = useState("kilometer");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const conversions: Record<string, Record<string, number>> = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      mile: 0.000621371,
      yard: 1.09361,
      foot: 3.28084,
      inch: 39.3701,
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001,
    },
    temperature: {
      celsius: 1,
      fahrenheit: 2,
      kelvin: 3,
    },
    volume: {
      liter: 1,
      milliliter: 1000,
      gallon: 0.264172,
      pint: 2.11338,
      cup: 4.22675,
      tablespoon: 67.628,
      teaspoon: 202.884,
    },
  };

  const units = Object.keys(conversions[category as keyof typeof conversions] || {});

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const newUnits = Object.keys(conversions[newCategory as keyof typeof conversions] || {});
    setInputUnit(newUnits[0]);
    setOutputUnit(newUnits[1] || newUnits[0]);
    setResult("");
    setError("");
  };

  const convert = () => {
    setLoading(true);
    try {
      if (!inputValue) {
        setError("Please enter a value");
        setLoading(false);
        return;
      }

      const value = parseFloat(inputValue);

      if (isNaN(value) || value < 0) {
        setError("Please enter a valid positive number");
        setLoading(false);
        return;
      }

      if (category === "temperature") {
        let celsius = value;

        if (inputUnit === "fahrenheit") {
          celsius = (value - 32) * (5 / 9);
        } else if (inputUnit === "kelvin") {
          celsius = value - 273.15;
        }

        let output = celsius;
        if (outputUnit === "fahrenheit") {
          output = celsius * (9 / 5) + 32;
        } else if (outputUnit === "kelvin") {
          output = celsius + 273.15;
        }

        setResult(output.toFixed(2));
      } else {
        const baseValue = value / conversions[category as keyof typeof conversions][inputUnit];
        const convertedValue = baseValue * conversions[category as keyof typeof conversions][outputUnit];
        setResult(convertedValue.toFixed(6).replace(/\.?0+$/, ""));
      }
      setError("");
    } catch (err) {
      setError("Conversion failed");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setInputValue("");
    setResult("");
    setError("");
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Input Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="category" className="text-sm font-medium">
            Category
          </Label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white rounded focus:ring-blue-500"
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="volume">Volume</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>

        <div>
          <Label htmlFor="value" className="text-sm font-medium">
            Value
          </Label>
          <Input
            id="value"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="mt-1 border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm font-medium mb-2 block">From</Label>
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              className="w-full p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white rounded focus:ring-blue-500"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">To</Label>
            <select
              value={outputUnit}
              onChange={(e) => setOutputUnit(e.target.value)}
              className="w-full p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white rounded focus:ring-blue-500"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </>
  );

  const outputSection = result ? (
    <>
      <CardHeader>
        <CardTitle>Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Value</p>
          <p className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-2">{result}</p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {inputValue} {inputUnit} = {result} {outputUnit}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">FROM</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
              {inputValue} {inputUnit}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">TO</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
              {result} {outputUnit}
            </p>
          </div>
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Unit Converter"
      description="Convert between different units of measurement instantly"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      actionButton={{
        label: "Convert",
        onClick: convert,
        icon: "ArrowRight",
        loading,
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        {
          icon: "📏",
          title: "Multiple Categories",
          description: "Length, weight, volume, temperature",
        },
        {
          icon: "🔄",
          title: "Accurate Conversion",
          description: "Precise unit conversion",
        },
        {
          icon: "⚡",
          title: "Instant Results",
          description: "Real-time calculation",
        },
      ]}
    />
  
      );
};

export default UnitConverter;
