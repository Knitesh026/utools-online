import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, BarChart3, Copy, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    try {
      setError("");
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      const chars = text.length;
      const charsNoSpaces = text.replace(/\s/g, "").length;
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
      const readTime = Math.ceil(words.length / 200);

      setResult({
        words: words.length,
        characters: chars,
        charactersNoSpaces: charsNoSpaces,
        sentences: sentences.length,
        paragraphs: paragraphs.length,
        averageWordLength: (charsNoSpaces / words.length).toFixed(2),
        readingTime: `${readTime} min${readTime > 1 ? "s" : ""}`,
      });
    } catch (err) {
      setError("Error analyzing text. Please try again.");
    }
  };

  const handleReset = () => {
    setText("");
    setResult(null);
    setError("");
    setCopied(false);
  };

  const copyResult = () => {
    const resultText = `Words: ${result.words}\nCharacters: ${result.characters}\nSentences: ${result.sentences}\nParagraphs: ${result.paragraphs}`;
    navigator.clipboard
      .writeText(resultText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setError("Failed to copy"));
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Text Input</CardTitle>
        <CardDescription>Enter or paste your text</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="min-h-48 resize-none border-gray-200 focus:ring-blue-500"
        />
        <div className="text-xs text-gray-600">
          {text.length > 0 && `${text.length} characters`}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAnalyze}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analyze Text
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </>
  );

  const outputSection = result ? (
    <>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>Your text metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Words</p>
            <p className="text-3xl font-bold text-blue-700">{result.words}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Characters</p>
            <p className="text-3xl font-bold text-purple-700">{result.characters}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Sentences</p>
            <p className="text-3xl font-bold text-green-700">{result.sentences}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Paragraphs</p>
            <p className="text-3xl font-bold text-orange-700">{result.paragraphs}</p>
          </div>
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Characters (no spaces)</span>
            <span className="font-semibold text-gray-900">{result.charactersNoSpaces}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Avg. Word Length</span>
            <span className="font-semibold text-gray-900">{result.averageWordLength}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Reading Time</span>
            <span className="font-semibold text-gray-900">{result.readingTime}</span>
          </div>
        </div>

        <Button
          onClick={copyResult}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Results
            </>
          )}
        </Button>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Word Counter"
      description="Analyze your text with detailed metrics including word count, character count, reading time, and more"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      features={[
        { icon: "📊", title: "Comprehensive Stats", description: "Get detailed text analysis" },
        { icon: "⏱️", title: "Reading Time", description: "Estimate reading duration" },
        { icon: "📋", title: "Export Results", description: "Copy analysis to clipboard" },
      ]}
    />
  
      );
};

export default WordCounter;
