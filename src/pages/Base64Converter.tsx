import { useState } from "react";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const Base64Converter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const encode = (str: string) => {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
      throw new Error("Failed to encode");
    }
  };

  const decode = (str: string) => {
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch (e) {
      throw new Error("Invalid base64 string");
    }
  };

  const convert = () => {
    setLoading(true);
    try {
      if (!input) {
        setError("Please enter text");
        setLoading(false);
        return;
      }

      const result = mode === "encode" ? encode(input) : decode(input);
      setOutput(result);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Input Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
            <input
              type="radio"
              checked={mode === "encode"}
              onChange={() => setMode("encode")}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Encode (Text → Base64)</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
            <input
              type="radio"
              checked={mode === "decode"}
              onChange={() => setMode("decode")}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Decode (Base64 → Text)</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="min-h-32 border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white focus:ring-blue-500"
          />
        </div>
      </CardContent>
    </>
  );

  const outputSection = output ? (
    <>
      <CardHeader>
        <CardTitle>Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800 rounded-lg min-h-32 break-all text-sm text-gray-700 dark:text-gray-300 max-h-40 overflow-y-auto font-mono">
          {output}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">CHARACTER COUNT</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{output.length}</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">SIZE BYTES</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{new Blob([output]).size}</p>
          </div>
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Base64 Converter"
      description="Encode and decode text using Base64 encoding"
      inputSection={inputSection}
      outputSection={outputSection}
      error={error}
      actionButton={{
        label: mode === "encode" ? "Encode" : "Decode",
        onClick: convert,
        icon: "ArrowRight",
        loading,
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset,
      }}
      features={[
        {
          icon: "🔐",
          title: "Encoding",
          description: "Convert text to Base64",
        },
        {
          icon: "🔓",
          title: "Decoding",
          description: "Convert Base64 to text",
        },
        {
          icon: "✨",
          title: "Instant",
          description: "Real-time conversion",
        },
      ]}
      children={
        output && (
          <Button
            onClick={handleCopy}
            className={`w-full mt-4 ${
              copied
                ? "bg-green-600 hover:bg-green-700 dark:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            } text-white`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Output
              </>
            )}
          </Button>
        )
      }
    />
  );
};

export default Base64Converter;
