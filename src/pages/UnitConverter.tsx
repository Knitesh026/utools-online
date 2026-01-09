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
  const [loading, setLoading] = useState(false);

  const conversions: { [key: string]: string[] } = {
    "Length": ["m", "km", "cm"],
    "Mass": ["kg", "g"],
    "Temperature": ["celsius", "fahrenheit"],
  };

  const handleConvert = async () => {
    if (!value) {
      alert("Please enter a value");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/tools/unit-converter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: parseFloat(value),
          fromUnit,
          toUnit,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error: Unable to connect to backend. Make sure server is running on port 3001");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Converting..." : "Convert"}
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
