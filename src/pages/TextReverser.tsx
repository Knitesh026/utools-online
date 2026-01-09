import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";

const TextReverser = () => {
  const [text, setText] = useState("");
  const [reversed, setReversed] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReverse = async () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/tools/reverse-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setReversed(data.reversed);
    } catch (error) {
      alert("Error: Unable to connect to backend. Make sure server is running on port 3001");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reversed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Text Reverser</h1>
            <p className="text-muted-foreground">Reverse your text instantly</p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Enter Text</CardTitle>
              <CardDescription>Type or paste text to reverse</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
                className="min-h-32 resize-none"
              />
              <Button
                onClick={handleReverse}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Reversing..." : "Reverse Text"}
              </Button>
            </CardContent>
          </Card>

          {reversed && (
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Reversed Text</CardTitle>
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
                <div className="p-4 bg-muted rounded-lg break-all">
                  {reversed}
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

export default TextReverser;
