import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/tools/word-counter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
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
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Word Counter</h1>
            <p className="text-muted-foreground">Count words, characters, and analyze text</p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Enter Your Text</CardTitle>
              <CardDescription>Paste or type text to analyze</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
                className="min-h-48 resize-none"
              />
              <Button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Analyzing..." : "Analyze Text"}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm">Words</p>
                  <p className="text-2xl font-bold text-primary">{result.words}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm">Characters</p>
                  <p className="text-2xl font-bold text-primary">{result.characters}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm">No Spaces</p>
                  <p className="text-2xl font-bold text-primary">{result.charactersNoSpaces}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm">Sentences</p>
                  <p className="text-2xl font-bold text-primary">{result.sentences}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm">Paragraphs</p>
                  <p className="text-2xl font-bold text-primary">{result.paragraphs}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-sm">Read Time</p>
                  <p className="text-2xl font-bold text-primary">{result.readingTime}</p>
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

export default WordCounter;
