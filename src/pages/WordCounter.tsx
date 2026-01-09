import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);

    setResult({
      words: words.length,
      characters: chars,
      charactersNoSpaces: charsNoSpaces,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      averageWordLength: (charsNoSpaces / words.length).toFixed(2),
    });
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
                className="w-full bg-primary hover:bg-primary/90"
              >
                Analyze Text
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
