import { useState } from "react";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

const UUIDGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [version, setVersion] = useState("v4");

  const generateUUID = () => {
    if (version === "v4") {
      const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      setUuids([uuid, ...uuids.slice(0, 9)]);
    }
  };

  const generateMultiple = (count: number) => {
    const newUUIDs: string[] = [];
    for (let i = 0; i < count; i++) {
      const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      newUUIDs.push(uuid);
    }
    setUuids([...newUUIDs, ...uuids].slice(0, 20));
  };

  const handleCopy = (uuid: string, idx: number) => {
    navigator.clipboard.writeText(uuid);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyAll = () => {
    const allText = uuids.join("\n");
    navigator.clipboard.writeText(allText);
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setUuids([]);
    setCopied(null);
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>UUID Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">UUID Version</label>
          <select
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white rounded focus:ring-blue-500"
          >
            <option value="v4">Version 4 (Random)</option>
          </select>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => generateUUID()}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded font-medium transition-colors"
          >
            Generate Single UUID
          </button>
          <button
            onClick={() => generateMultiple(5)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Generate 5 UUIDs
          </button>
          <button
            onClick={() => generateMultiple(10)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Generate 10 UUIDs
          </button>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Generated Count</p>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-400 mt-1">{uuids.length}</p>
        </div>
      </CardContent>
    </>
  );

  const outputSection = uuids.length > 0 ? (
    <>
      <CardHeader>
        <CardTitle>Generated UUIDs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="max-h-96 overflow-y-auto space-y-2">
          {uuids.map((uuid, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded flex items-center justify-between gap-2"
            >
              <code className="text-xs text-gray-700 dark:text-gray-300 break-all font-mono">{uuid}</code>
              <button
                onClick={() => handleCopy(uuid, idx)}
                className={`p-1 transition-colors ${
                  copied === idx
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {copied === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <ProfessionalToolLayout
      title="UUID Generator"
      description="Generate unique identifiers for your projects instantly"
      inputSection={inputSection}
      outputSection={outputSection}
      actionButton={{
        label: "Generate",
        onClick: () => 
      generateUUID(),
        icon: "Key",
      }}
      resetButton={{
        label: "Clear All",
        onClick: handleReset,
      }}
      features={[
        { icon: "🔑", title: "Unique IDs", description: "Globally unique identifiers" },
        { icon: "⚡", title: "Instant", description: "Generate in milliseconds" },
        { icon: "📋", title: "Bulk Generate", description: "Create multiple at once" },
      ]}
      children={uuids.length > 0 ? (
        <button
          onClick={handleCopyAll}
          className={`w-full mt-4 px-8 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            copied === -1
              ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          } text-white`}
        >
          {copied === -1 ? (
            <>
              <Check className="w-4 h-4" />
              All Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy All
            </>
          )}
        </button>
      ) : undefined}
    />
  );
};

export default UUIDGenerator;
