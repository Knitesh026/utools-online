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
import { LucideIcon } from "lucide-react";

export interface Tool {
  title: string;
  icon: LucideIcon;
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
      { title: "Background Remover", icon: Eraser, to: "/remove-background", description: "Remove image backgrounds instantly" },
      { title: "Image Enhancer", icon: Image, to: "/image-enhancer", description: "Enhance image quality" },
      { title: "Image Upscaler", icon: Sparkles, to: "/image-upscaler", description: "Upscale images to higher resolution" },
      { title: "Image Compressor", icon: Download, to: "/image-compressor", description: "Compress images for faster loading" },
      { title: "Image Sharpener", icon: Zap, to: "/image-sharpener", description: "Sharpen blurry images" },
      { title: "Image to Text (OCR)", icon: Type, to: "/image-to-text", description: "Extract text from images" },
      { title: "Crop Image", icon: Crop, to: "/crop-image", description: "Crop images to any size" },
      { title: "Image Resizer", icon: Maximize2, to: "/image-resizer", description: "Resize images easily" },
      { title: "Image Converter", icon: Layers, to: "/image-converter", description: "Convert image formats" },
      { title: "Image Noise Reducer", icon: Zap, to: "/image-noise-reducer", description: "Reduce image noise" },
      { title: "HEIC to JPG", icon: Image, to: "/heic-to-jpg", description: "Convert HEIC to JPG" },
      { title: "Image Color Picker", icon: Palette, to: "/color-picker", description: "Pick colors from images" },
      { title: "SVG to Image", icon: Image, to: "/svg-to-image", description: "Convert SVG to image" },
      { title: "Image to SVG", icon: Image, to: "/image-to-svg", description: "Convert image to SVG" },
      { title: "Metadata Stripper", icon: FileText, to: "/metadata-stripper", description: "Remove image metadata" },
      { title: "GIF Maker", icon: Layers, to: "/gif-maker", description: "Create GIF animations" },
      { title: "APNG Maker", icon: Layers, to: "/apng-maker", description: "Create APNG animations" },
      { title: "Image to Base64", icon: Copy, to: "/image-to-base64", description: "Convert image to Base64" },
      { title: "Base64 to Image", icon: Image, to: "/base64-to-image", description: "Convert Base64 to image" },
      { title: "Image Pixelator", icon: Image, to: "/image-pixelator", description: "Pixelate images" },
      { title: "Image Histogram Generator", icon: TrendingUp, to: "/histogram-generator", description: "Generate image histogram" },
      { title: "Face Blur Pro", icon: Image, to: "/face-blur", description: "Blur faces in images" },
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
      { title: "Image to PDF", icon: FileText, to: "/image-to-pdf", description: "Convert images to PDF" },
      { title: "PDF to Image", icon: Image, to: "/pdf-to-image", description: "Extract images from PDFs" },
      { title: "Compress PDF", icon: Download, to: "/compress-pdf", description: "Reduce PDF file size" },
      { title: "Merge PDF", icon: FileText, to: "/merge-pdf", description: "Combine multiple PDFs" },
      { title: "eSign PDF", icon: FileText, to: "/esign-pdf", description: "Add digital signatures" },
      { title: "PDF lock/unlock", icon: FileText, to: "/pdf-lock-unlock", description: "Protect or unlock PDFs" },
      { title: "PDF to Word", icon: FileText, to: "/pdf-to-word", description: "Convert PDF to Word" },
      { title: "Word to PDF", icon: FileText, to: "/word-to-pdf", description: "Convert Word to PDF" },
      { title: "Documents Converter", icon: FileText, to: "/documents-converter", description: "Convert document formats" },
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
      { title: "Word Counter", icon: Type, to: "/word-counter", description: "Count words and characters" },
      { title: "Text Reverser", icon: Type, to: "/text-reverser", description: "Reverse text content" },
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
      { title: "Image Color Picker", icon: Palette, to: "/color-picker", description: "Pick colors from images" },
      { title: "HTML Color Codes", icon: Palette, to: "/html-color-codes", description: "Browse HTML color codes" },
      { title: "HEX to RGB Converter", icon: Palette, to: "/hex-to-rgb", description: "Convert HEX to RGB" },
      { title: "Gradient Generator", icon: Palette, to: "/gradient-generator", description: "Create color gradients" },
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
      { title: "SIP Calculator", icon: Calculator, to: "/sip-calculator", description: "Calculate SIP investments" },
      { title: "EMI Calculator", icon: Calculator, to: "/emi-calculator", description: "Calculate loan EMI" },
      { title: "Age Calculator", icon: Calculator, to: "/age-calculator", description: "Calculate your age" },
      { title: "Unit Converter", icon: Wrench, to: "/unit-converter", description: "Convert between units" },
      { title: "BMI Calculator", icon: Calculator, to: "/bmi-calculator", description: "Calculate body mass index" },
      { title: "GST Calculator", icon: Calculator, to: "/gst-calculator", description: "Calculate GST amounts" },
      { title: "Mortgage Calculator", icon: Calculator, to: "/mortgage-calculator", description: "Calculate mortgage payments" },
      { title: "PPP Calculator", icon: Calculator, to: "/ppp-calculator", description: "Calculate purchasing power" },
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
      { title: "QR Code Generator", icon: QrCode, to: "/qr-code", description: "Generate QR codes" },
      { title: "Bar Code Generator", icon: TrendingUp, to: "/barcode-generator", description: "Create barcodes" },
      { title: "UUID Generator", icon: Zap, to: "/uuid-generator", description: "Generate unique IDs" },
      { title: "Password Generator", icon: Zap, to: "/password-generator", description: "Create secure passwords" },
      { title: "Name Generator", icon: Type, to: "/name-generator", description: "Generate random names" },
      { title: "Base64 Converter", icon: Copy, to: "/base64-converter", description: "Encode/decode Base64" },
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
