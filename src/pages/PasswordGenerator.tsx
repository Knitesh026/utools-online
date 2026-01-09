import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { getApiUrl } from '@/lib/api';

const PasswordGenerator = () => {
  const [length, setLength] = useState("16");
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${getApiUrl()}/api/tools/password-generator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          length: parseInt(length),
          useUppercase,
          useLowercase,
          useNumbers,
          useSymbols,
        }),
      });

      const data = await response.json();
      setPassword(data.password);
    } catch (error) {
      alert("Error: Unable to connect to backend. Make sure server is running on port 3001");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Password Generator</h1>
            <p className="text-muted-foreground">Generate strong, random passwords</p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Password Settings</CardTitle>
              <CardDescription>Configure your password preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="length">Password Length: {length}</Label>
                <Input
                  id="length"
                  type="range"
                  min="8"
                  max="128"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="uppercase"
                    checked={useUppercase}
                    onChange={(e) => setUseUppercase(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="uppercase" className="cursor-pointer">
                    Uppercase (A-Z)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="lowercase"
                    checked={useLowercase}
                    onChange={(e) => setUseLowercase(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="lowercase" className="cursor-pointer">
                    Lowercase (a-z)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="numbers"
                    checked={useNumbers}
                    onChange={(e) => setUseNumbers(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="numbers" className="cursor-pointer">
                    Numbers (0-9)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="symbols"
                    checked={useSymbols}
                    onChange={(e) => setUseSymbols(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="symbols" className="cursor-pointer">
                    Symbols (!@#$%...)
                  </Label>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Generating..." : "Generate Password"}
              </Button>
            </CardContent>
          </Card>

          {password && (
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Password</CardTitle>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg font-mono text-lg break-all select-all">
                  {password}
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

export default PasswordGenerator;
