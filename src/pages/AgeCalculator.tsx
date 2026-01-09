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

  const handleCalculate = () => {
    if (!birthDate) {
      alert("Please select a birth date");
      return;
    }

    try {
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
      alert("Error: Invalid date");
      console.error(error);
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
                className="w-full bg-primary hover:bg-primary/90"
              >
                Calculate Age
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Your Age</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm">Years</p>
                    <p className="text-3xl font-bold text-primary">{result.years}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm">Months</p>
                    <p className="text-2xl font-bold text-primary">{result.months}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm">Days</p>
                    <p className="text-2xl font-bold text-primary">{result.days}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-muted-foreground text-sm">Total Days</p>
                    <p className="text-xl font-bold text-primary">{result.totalDays}</p>
                  </div>
                </div>
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
