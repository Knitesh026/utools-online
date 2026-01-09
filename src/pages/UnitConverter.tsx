import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UnitConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [result, setResult] = useState<any>(null);

  const conversions: { [key: string]: string[] } = {
    "Length": ["m", "km", "cm", "mm", "mi", "yd", "ft", "in"],
    "Mass": ["kg", "g", "mg", "lb", "oz"],
    "Temperature": ["celsius", "fahrenheit", "kelvin"],
    "Volume": ["l", "ml", "gal", "pt", "cup"],
  };

  const convertUnits = (inputValue: number, from: string, to: string): number => {
    // Length conversions (base unit: meter)
    const lengthToMeter: { [key: string]: number } = {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.34,
      yd: 0.9144,
      ft: 0.3048,
      in: 0.0254,
    };

    // Mass conversions (base unit: kilogram)
    const massToKg: { [key: string]: number } = {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.453592,
      oz: 0.0283495,
    };

    // Volume conversions (base unit: liter)
    const volumeToLiter: { [key: string]: number } = {
      l: 1,
      ml: 0.001,
      gal: 3.78541,
      pt: 0.473176,
      cup: 0.236588,
    };

    // Handle length conversions
    if (lengthToMeter[from] && lengthToMeter[to]) {
      const meters = inputValue * lengthToMeter[from];
      return meters / lengthToMeter[to];
    }

    // Handle mass conversions
    if (massToKg[from] && massToKg[to]) {
      const kg = inputValue * massToKg[from];
      return kg / massToKg[to];
    }

    // Handle volume conversions
    if (volumeToLiter[from] && volumeToLiter[to]) {
      const liters = inputValue * volumeToLiter[from];
      return liters / volumeToLiter[to];
    }

    // Handle temperature conversions
    if ((from === "celsius" || from === "fahrenheit" || from === "kelvin") &&
        (to === "celsius" || to === "fahrenheit" || to === "kelvin")) {
      // Convert to Celsius first
      let celsius: number;
      if (from === "celsius") {
        celsius = inputValue;
      } else if (from === "fahrenheit") {
        celsius = (inputValue - 32) * 5 / 9;
      } else { // kelvin
        celsius = inputValue - 273.15;
      }

      // Convert from Celsius to target
      if (to === "celsius") {
        return celsius;
      } else if (to === "fahrenheit") {
        return (celsius * 9 / 5) + 32;
      } else { // kelvin
        return celsius + 273.15;
      }
    }

    return 0;
  };

  const handleConvert = () => {
    if (!value) {
      alert("Please enter a value");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      alert("Please enter a valid number");
      return;
    }

    const convertedValue = convertUnits(numValue, fromUnit, toUnit);
    setResult({
      value: numValue,
      fromUnit,
      result: Math.round(convertedValue * 100000) / 100000, // Round to 5 decimal places
      toUnit,
    });
  };

  const units = ["m", "km", "cm", "kg", "g", "celsius", "fahrenheit"];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Unit Converter</h1>
            <p className="text-muted-foreground">Convert between different units</p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Enter Value</CardTitle>
              <CardDescription>Select units and enter the value to convert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="100"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>From</Label>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>To</Label>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleConvert}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Convert
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Conversion Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm">From</p>
                    <p className="text-2xl font-bold text-primary">
                      {result.value} {result.fromUnit}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm">To</p>
                    <p className="text-2xl font-bold text-primary">
                      {result.result} {result.toUnit}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UnitConverter;
