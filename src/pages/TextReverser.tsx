import { useState } from "react";
import { AdPopunder } from "@/components/AdPopunder";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";

const TextReverser = () => {
  const [text, setText] = useState("");
  const [reversed, setReversed] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleReverse = () => {
    if (!text.trim()) {
      setError("Please enter some text");
      return;
    }

    try {
      setError("");
      const reversedText = text.split("").reverse().join("");
      setReversed(reversedText);
    } catch (err) {
      setError("Error reversing text. Please try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(reversed)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setError("Failed to copy"));
  };

  const handleReset = () => {
    setText("");
    setReversed("");
    setCopied(false);
    setError("");
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Original Text</CardTitle>
        <CardDescription>Enter text to reverse</CardDescription>
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
            onClick={handleReverse}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            ↻ Reverse Text
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

  const outputSection = reversed ? (
    <>
      <CardHeader>
        <CardTitle>Reversed Text</CardTitle>
        <CardDescription>Your text reversed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-100 rounded-lg p-4 min-h-48 max-h-96 overflow-auto">
          <p className="text-gray-900 break-words whitespace-pre-wrap font-mono text-sm">
            {reversed}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
          <p className="text-xs text-blue-900">
            <span className="font-semibold">Character count:</span> {reversed.length}
          </p>
        </div>

        <Button
          onClick={handleCopy}
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
              Copy Result
            </>
          )}
        </Button>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Text Reverser"
      description="Instantly reverse any text. Perfect for creating mirror text, palindromes, or just having fun"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      features={[
        { icon: "⚡", title: "Instant Reversal", description: "Real-time text reversal" },
        { icon: "📋", title: "Easy Copy", description: "One-click copy to clipboard" },
        { icon: "🔄", title: "Flexible", description: "Works with any text" },
      ]}
    />
  
      <AdPopunder />
);
};

export default TextReverser;
