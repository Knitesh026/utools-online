import {
  Image,
  FileText,
  Type,
  Palette,
  Calculator,
  Wrench,
  Eraser,
  Sparkles,
  Download,
  Crop,
  Maximize2,
  Copy,
  Layers,
  QrCode,
  TrendingUp,
  Zap,
} from "lucide-react";

export interface Tool {
  title: string;
  icon: React.ElementType;
  to: string;
  description?: string;
}

export interface ToolCategory {
  name: string;
  description: string;
  tools: Tool[];
  colorTheme: {
    gradient: string;
    accentColor: string;
    iconColor: string;
    borderColor: string;
  };
}

export const toolCategories: ToolCategory[] = [
  {
    name: "Image Tools",
    description: "Browse our top collection of free online image tools",
    tools: [
      { title: "Background Remover", icon: Eraser, to: "/remove-background" },
      { title: "Image Enhancer", icon: Image, to: "/image-enhancer" },
      { title: "Image Upscaler", icon: Sparkles, to: "/image-upscaler" },
      { title: "Image Compressor", icon: Download, to: "/image-compressor" },
      { title: "Image Sharpener", icon: Zap, to: "/image-sharpener" },
      { title: "Image to Text (OCR)", icon: Type, to: "/image-to-text" },
      { title: "Crop Image", icon: Crop, to: "/crop-image" },
      { title: "Image Resizer", icon: Maximize2, to: "/image-resizer" },
      { title: "Image Converter", icon: Layers, to: "/image-converter" },
      { title: "Image Noise Reducer", icon: Zap, to: "/image-noise-reducer" },
      { title: "HEIC to JPG", icon: Image, to: "/heic-to-jpg" },
      { title: "Image Color Picker", icon: Palette, to: "/color-picker" },
      { title: "SVG to Image", icon: Image, to: "/svg-to-image" },
      { title: "Image to SVG", icon: Image, to: "/image-to-svg" },
      { title: "Metadata Stripper", icon: FileText, to: "/metadata-stripper" },
      { title: "GIF Maker", icon: Layers, to: "/gif-maker" },
      { title: "APNG Maker", icon: Layers, to: "/apng-maker" },
      { title: "Image to Base64", icon: Copy, to: "/image-to-base64" },
      { title: "Base64 to Image", icon: Image, to: "/base64-to-image" },
      { title: "Image Pixelator", icon: Image, to: "/image-pixelator" },
      { title: "Image Histogram Generator", icon: TrendingUp, to: "/histogram-generator" },
      { title: "Face Blur Pro", icon: Image, to: "/face-blur" },
    ],
    colorTheme: {
      gradient: "from-orange-100 via-orange-50 to-red-100",
      accentColor: "rgb(249, 115, 22)",
      iconColor: "#f97316",
      borderColor: "rgb(254, 214, 165)",
    },
  },
  {
    name: "Document Tools",
    description: "Browse our top collection of free online PDF tools",
    tools: [
      { title: "Image to PDF", icon: FileText, to: "/image-to-pdf" },
      { title: "PDF to Image", icon: Image, to: "/pdf-to-image" },
      { title: "Compress PDF", icon: Download, to: "/compress-pdf" },
      { title: "Merge PDF", icon: FileText, to: "/merge-pdf" },
      { title: "eSign PDF", icon: FileText, to: "/esign-pdf" },
      { title: "PDF lock/unlock", icon: FileText, to: "/pdf-lock-unlock" },
      { title: "PDF to Word", icon: FileText, to: "/pdf-to-word" },
      { title: "Word to PDF", icon: FileText, to: "/word-to-pdf" },
      { title: "Documents Converter", icon: FileText, to: "/documents-converter" },
    ],
    colorTheme: {
      gradient: "from-red-100 via-red-50 to-pink-100",
      accentColor: "rgb(239, 68, 68)",
      iconColor: "#ef4444",
      borderColor: "rgb(254, 205, 211)",
    },
  },
  {
    name: "Text Tools",
    description: "Browse our top collection of free online Text tools",
    tools: [
      { title: "Word Counter", icon: Type, to: "/word-counter" },
      { title: "Text Reverser", icon: Type, to: "/text-reverser" },
    ],
    colorTheme: {
      gradient: "from-purple-100 via-purple-50 to-violet-100",
      accentColor: "rgb(147, 51, 234)",
      iconColor: "#9333ea",
      borderColor: "rgb(243, 232, 255)",
    },
  },
  {
    name: "Color Tools",
    description: "Browse our top collection of free online Color tools",
    tools: [
      { title: "Image Color Picker", icon: Palette, to: "/color-picker" },
      { title: "HTML Color Codes", icon: Palette, to: "/html-color-codes" },
      { title: "HEX to RGB Converter", icon: Palette, to: "/hex-to-rgb" },
      { title: "Gradient Generator", icon: Palette, to: "/gradient-generator" },
    ],
    colorTheme: {
      gradient: "from-pink-100 via-pink-50 to-rose-100",
      accentColor: "rgb(219, 39, 119)",
      iconColor: "#db2777",
      borderColor: "rgb(254, 205, 211)",
    },
  },
  {
    name: "Calculator Tools",
    description: "Browse our top collection of free online Calculator Tools",
    tools: [
      { title: "SIP Calculator", icon: Calculator, to: "/sip-calculator" },
      { title: "EMI Calculator", icon: Calculator, to: "/emi-calculator" },
      { title: "Age Calculator", icon: Calculator, to: "/age-calculator" },
      { title: "Unit Converter", icon: Wrench, to: "/unit-converter" },
      { title: "BMI Calculator", icon: Calculator, to: "/bmi-calculator" },
      { title: "GST Calculator", icon: Calculator, to: "/gst-calculator" },
      { title: "Mortgage Calculator", icon: Calculator, to: "/mortgage-calculator" },
      { title: "PPP Calculator", icon: Calculator, to: "/ppp-calculator" },
    ],
    colorTheme: {
      gradient: "from-blue-100 via-blue-50 to-cyan-100",
      accentColor: "rgb(59, 130, 246)",
      iconColor: "#3b82f6",
      borderColor: "rgb(219, 234, 254)",
    },
  },
  {
    name: "Utility Tools",
    description: "Browse our top collection of free online handy Utility tools",
    tools: [
      { title: "QR Code Generator", icon: QrCode, to: "/qr-code" },
      { title: "Bar Code Generator", icon: TrendingUp, to: "/barcode-generator" },
      { title: "UUID Generator", icon: Zap, to: "/uuid-generator" },
      { title: "Password Generator", icon: Zap, to: "/password-generator" },
      { title: "Name Generator", icon: Type, to: "/name-generator" },
      { title: "Base64 Converter", icon: Copy, to: "/base64-converter" },
    ],
    colorTheme: {
      gradient: "from-green-100 via-green-50 to-emerald-100",
      accentColor: "rgb(34, 197, 94)",
      iconColor: "#22c55e",
      borderColor: "rgb(220, 252, 231)",
    },
  },
];

export const mainTools = [
  { title: "Image Tools", description: "Image editor & converter", to: "/image-tools" },
  { title: "Document Tools", description: "PDF processor & converter", to: "/document-tools" },
  { title: "Text Tools", description: "Text utilities & converter", to: "/text-tools" },
  { title: "Utility Tools", description: "QR codes & generators", to: "/utility-tools" },
];
