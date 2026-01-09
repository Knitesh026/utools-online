import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (!weight || !height) {
      alert("Please enter weight and height");
      return;
    }

    try {
      const w = parseFloat(weight);
      const h = parseFloat(height);

      let heightInMeters = h;
      if (unit === "lbs") {
        heightInMeters = h * 0.01; // Assuming h is in cm for lbs
      } else if (unit === "kg") {
        heightInMeters = h / 100; // Convert cm to meters
      }

      const bmi = w / (heightInMeters * heightInMeters);

      let category = "";
      if (bmi < 18.5) category = "Underweight";
      else if (bmi < 25) category = "Normal weight";
      else if (bmi < 30) category = "Overweight";
      else category = "Obese";

      setResult({
        bmi: bmi.toFixed(1),
        category,
        weight: w,
        height: h,
        unit,
      });
    } catch (error) {
      alert("Error: Invalid input");
      console.error(error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Underweight":
        return "text-blue-500";
      case "Normal weight":
        return "text-green-500";
      case "Overweight":
        return "text-orange-500";
      case "Obese":
        return "text-red-500";
      default:
        return "text-primary";
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">BMI Calculator</h1>
            <p className="text-muted-foreground">Calculate your Body Mass Index</p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Enter Your Measurements</CardTitle>
              <CardDescription>Weight and height in your preferred unit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Unit System</Label>
                <RadioGroup value={unit} onValueChange={setUnit}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kg" id="metric" />
                    <Label htmlFor="metric" className="cursor-pointer">
                      Metric (kg, m)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lb" id="imperial" />
                    <Label htmlFor="imperial" className="cursor-pointer">
                      Imperial (lb, inches)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight ({unit === "kg" ? "kg" : "lb"})</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="75"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height ({unit === "kg" ? "m" : "inches"})</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.01"
                    placeholder={unit === "kg" ? "1.75" : "69"}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Calculate BMI
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Your BMI Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-muted-foreground text-sm mb-2">BMI Score</p>
                  <p className="text-5xl font-bold text-primary">{result.bmi}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-muted-foreground text-sm mb-2">Category</p>
                  <p className={`text-2xl font-bold ${getCategoryColor(result.category)}`}>
                    {result.category}
                  </p>
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

export default BMICalculator;
