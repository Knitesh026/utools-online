import { useState } from "react";
import { SEOPage } from "@/components/SEOPage";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import toolsMetadata from "@/data/toolsMetadata";

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const metadata = toolsMetadata['password-generator'];
  const currentUrl = 'https://utoolss.online/password-generator';
  const breadcrumbs = [
    { name: 'Home', url: 'https://utoolss.online' },
    { name: 'Tools', url: 'https://utoolss.online/tools' },
    { name: 'Password Generator', url: currentUrl }
  ];

  const generatePassword = () => {
    let chars = "";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (chars === "") {
      setPassword("");
      return;
    }

    let generated = "";
    for (let i = 0; i < options.length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPassword("");
    setOptions({
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    });
    setCopied(false);
  };

  const getStrength = () => {
    if (options.length < 8) return { label: "Weak", color: "red" };
    if (options.length < 12) return { label: "Medium", color: "yellow" };
    return { label: "Strong", color: "green" };
  };

  const strength = getStrength();
  const strengthColors: Record<string, string> = {
    red: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300",
    yellow: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300",
    green: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
  };

  const inputSection = (
    <>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Length: {options.length} chars</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{options.length}</span>
          </label>
          <input
            type="range"
            value={options.length}
            onChange={(e) => setOptions({ ...options, length: Number(e.target.value) })}
            min={4}
            max={128}
            step={1}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900">
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
              className="mr-2 w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
              className="mr-2 w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
              className="mr-2 w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
          </label>
          <label className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
              className="mr-2 w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Symbols (!@#$%...)</span>
          </label>
        </div>
      </CardContent>
    </>
  );

  const outputSection = password ? (
    <>
      <CardHeader>
        <CardTitle>Generated Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-900 dark:bg-gray-950 rounded-lg font-mono text-white break-all select-all text-center text-sm">
          {password}
        </div>

        <div className={`p-3 rounded-lg border-2 ${strengthColors[strength.color]}`}>
          <p className="text-sm font-semibold">Strength: {strength.label}</p>
        </div>
      </CardContent>
    </>
  ) : undefined;

  return (
    <SEOPage
      title={metadata.title}
      description={metadata.description}
      keywords={metadata.keywords}
      canonical={currentUrl}
      breadcrumbs={breadcrumbs}
      toolName="Password Generator"
      toolDescription={metadata.description}
    >
      <ProfessionalToolLayout
        title="Password Generator"
        description="Create strong and secure passwords with customizable options"
        inputSection={inputSection}
        outputSection={outputSection}
        actionButton={{
          label: "Generate Password",
          onClick: generatePassword,
          icon: "Zap"
      }}
      resetButton={{
        label: "Reset",
        onClick: handleReset
      }}
      features={[
        {
          icon: "🔐",
          title: "Secure",
          description: "Cryptographically random passwords"
        },
        {
          icon: "⚙️",
          title: "Customizable",
          description: "Full control over character types"
        },
        {
          icon: "📋",
          title: "Easy Copy",
          description: "One-click clipboard copy"
        }
      ]}
      colorTheme={{
        gradient: "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
        accent: "purple"
      }}
    >
      
      {password && (
        <div className="mt-4">
          <button
            onClick={handleCopy}
            className={`w-full px-4 py-2 rounded-lg transition font-medium flex items-center justify-center gap-2 ${
              copied
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
      )}
    </ProfessionalToolLayout>
    </SEOPage>
  );
};

export default PasswordGenerator;
