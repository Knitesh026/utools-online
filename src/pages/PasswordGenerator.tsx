import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

const PasswordGenerator = () => {
  const [length, setLength] = useState("16");
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (useUppercase) chars += uppercase;
    if (useLowercase) chars += lowercase;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    if (!chars) {
      alert("Please select at least one character type");
      return;
    }

    const len = parseInt(length);
    if (len < 4 || len > 128) {
      alert("Password length must be between 4 and 128");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < len; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generatedPassword);
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
                className="w-full bg-primary hover:bg-primary/90"
              >
                Generate Password
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
