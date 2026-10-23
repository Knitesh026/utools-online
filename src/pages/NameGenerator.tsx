import { useState } from "react";
import { ProfessionalToolLayout } from "@/components/ProfessionalToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download } from "lucide-react";

const NameGenerator = () => {
  const [category, setCategory] = useState("male");
  const [count, setCount] = useState("5");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const nameDatabase: Record<string, string[]> = {
    male: [
      "James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Christopher",
      "Daniel", "Matthew", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin",
      "Brian", "George", "Edward", "Ronald", "Anthony", "Frank", "Ryan", "Gary", "Nicholas", "Eric",
      "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Benjamin", "Samuel", "Frank", "Gregory"
    ],
    female: [
      "Mary", "Patricia", "Jennifer", "Linda", "Barbara", "Elizabeth", "Susan", "Jessica", "Sarah", "Karen",
      "Nancy", "Lisa", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle",
      "Dorothy", "Carol", "Amanda", "Melissa", "Deborah", "Stephanie", "Rebecca", "Sharon", "Laura", "Cynthia",
      "Kathleen", "Amy", "Angela", "Shirley", "Anna", "Brenda", "Pamela", "Emma", "Nicole", "Helen"
    ],
    fantasy: [
      "Aerith","Bramwell","Caelum","Dunmar","Elric","Fenris","Gorran","Harwick","Ilmar","Jarek","Korvin","Lysander","Marrow","Nyx","Orsolya","Pyrrhus","Quillan","Rhosyn","Sorrel","Thistle","Umber","Valdis","Willow","Xerxa","Ysolde","Zorin","Ashgrove","Bellamy","Cinder","Dovecote"
    ],
    fantasy_female: [
      "Aelira","Brynja","Caelith","Dessa","Elowen","Faye","Gwenna","Hanalei","Isolde","Jessamine","Kaia","Liora","Maren","Nerys","Ondine","Perenelle","Quenby","Rowena","Sylvie","Thessaly","Una","Vesper","Wynne","Xanthe","Yara","Zinnia","Adrielle","Briar","Calista","Dahlia","Embla","Freya","Greta","Halcyon","Ivy","Junia","Kestra","Lysandra","Mirelle","Nymeria"
    ],
    tech: [
      "Syntax", "Nexus", "Cipher", "Pixel", "Byte", "Cache", "Index", "Vector", "Matrix", "Quantum",
      "Codec", "Binary", "Firewall", "Router", "Server", "Client", "Protocol", "Socket", "Stream", "Thread",
      "Kernel", "Shell", "Debug", "Patch", "Update", "Backup", "Restore", "Archive", "Deploy", "Compile",
      "Execute", "Iterate", "Optimize", "Validate", "Encrypt", "Decrypt", "Compress", "Decompress", "Parse", "Render"
    ]
  };

  const handleGenerate = () => {
    const c = parseInt(count);
    if (c <= 0) return;

    const names = Array.from(new Set(nameDatabase[category] || nameDatabase.male));
    const selected: string[] = [];

    // Shuffle a copy so one run never repeats a name (until the list is exhausted).
    const pool = [...names];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    for (let i = 0; i < Math.min(c, pool.length); i++) {
      selected.push(pool[i]);
    }

    setGeneratedNames(selected);
    setCopied(false);
  };

  const handleCopyNames = async () => {
    const text = generatedNames.join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setGeneratedNames([]);
    setCopied(false);
  };

  const handleDownload = () => {
    const text = generatedNames.join("\n");
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", "names.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <ProfessionalToolLayout
      title="Name Generator"
      description="Generate random names from various categories"
      inputSection={
        <>
          
      <CardHeader>
            <CardTitle>Generation Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Name Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-white rounded focus:ring-blue-500"
              >
                <option value="male">Male Names</option>
                <option value="female">Female Names</option>
                <option value="fantasy">Fantasy Names</option>
                <option value="fantasy_female">Fantasy Female Names</option>
                <option value="tech">Tech Names</option>
              </select>
            </div>

            <div>
              <label htmlFor="count" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Number of Names: {count}
              </label>
              <input
                id="count"
                type="range"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded font-medium transition-colors"
            >
              Generate Names
            </button>

            <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-xs font-semibold text-green-700 dark:text-green-300">Generated Count</p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-400 mt-1">{generatedNames.length}</p>
            </div>
          </CardContent>
        </>
      }
      outputSection={generatedNames.length > 0 ? (
        <>
          <CardHeader>
            <CardTitle>Generated Names</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto p-4 space-y-2">
              {generatedNames.map((name, index) => (
                <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
                  {index + 1}. {name}
                </p>
              ))}
            </div>
          </CardContent>
        </>
      ) : undefined}
      actionButton={{
        label: "Generate",
        onClick: handleGenerate,
        icon: "Sparkles",
      }}
      resetButton={{
        label: "Clear",
        onClick: handleReset,
      }}
      features={[
        { icon: "👤", title: "Multiple Categories", description: "Male, female, fantasy & more" },
        { icon: "⚡", title: "Bulk Generation", description: "Generate multiple at once" },
        { icon: "📋", title: "Easy Export", description: "Copy or download list" },
      ]}
      children={generatedNames.length > 0 ? (
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleCopyNames}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              copied
                ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            } text-white`}
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy All"}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      ) : undefined}
    />
  );
};

export default NameGenerator;
