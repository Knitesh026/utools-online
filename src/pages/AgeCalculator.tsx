import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!birthDate) {
      alert("Please select a birth date");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/tools/age-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error: Unable to connect to backend. Make sure server is running on port 3001");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Age Calculator</h1>
            <p className="text-muted-foreground">Calculate your exact age</p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Select Birth Date</CardTitle>
              <CardDescription>Choose your date of birth</CardDescription>
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
              <Button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Calculating..." : "Calculate Age"}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Your Age</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm">Age</p>
                    <p className="text-3xl font-bold text-primary">{result.age}</p>
                    <p className="text-xs text-muted-foreground mt-1">Years</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm">Next Birthday</p>
                    <p className="text-lg font-bold text-primary">{result.daysUntilBirthday}</p>
                    <p className="text-xs text-muted-foreground mt-1">Days away</p>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm">Birthday Date</p>
                  <p className="text-foreground mt-1">{result.nextBirthday}</p>
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

export default AgeCalculator;
