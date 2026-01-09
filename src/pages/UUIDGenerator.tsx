import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

const UUIDGenerator = () => {
  const [count, setCount] = useState("1");
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const num = parseInt(count);
    if (num < 1 || num > 100) {
      alert("Please enter a number between 1 and 100");
      return;
    }
    const newUuids = Array.from({ length: num }, () => generateUUID());
    setUuids(newUuids);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">UUID Generator</h1>
            <p className="text-muted-foreground">Generate unique identifiers</p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>UUID Settings</CardTitle>
              <CardDescription>How many UUIDs do you need?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="count">Number of UUIDs</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Generate UUIDs
              </Button>
            </CardContent>
          </Card>

          {uuids.length > 0 && (
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Generated UUIDs</CardTitle>
                  <CardDescription>{uuids.length} UUIDs generated</CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy All"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {uuids.map((uuid, index) => (
                    <div
                      key={index}
                      className="p-3 bg-muted rounded-lg font-mono text-sm break-all"
                    >
                      {uuid}
                    </div>
                  ))}
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

export default UUIDGenerator;
