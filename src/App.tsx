import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import RemoveBackground from "./pages/RemoveBackground";
import WordCounter from "./pages/WordCounter";
import TextReverser from "./pages/TextReverser";
import AgeCalculator from "./pages/AgeCalculator";
import BMICalculator from "./pages/BMICalculator";
import UnitConverter from "./pages/UnitConverter";
import PasswordGenerator from "./pages/PasswordGenerator";
import UUIDGenerator from "./pages/UUIDGenerator";
import ImageEnhancer from "./pages/ImageEnhancer";
import ImageUpscaler from "./pages/ImageUpscaler";
import CropImage from "./pages/CropImage";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import HexToRGB from "./pages/HexToRGB";
import Base64Converter from "./pages/Base64Converter";
import EMICalculator from "./pages/EMICalculator";
import GSTCalculator from "./pages/GSTCalculator";
import NameGenerator from "./pages/NameGenerator";
import ImageToPDF from "./pages/ImageToPDF";
import NotFound from "./pages/NotFound";
// Image Tools
import ImageCompressor from "./pages/ImageCompressor";
import ImageResizer from "./pages/ImageResizer";
import ImageToBase64 from "./pages/ImageToBase64";
import ImagePixelator from "./pages/ImagePixelator";
import ImageSharpener from "./pages/ImageSharpener";
import ImageConverter from "./pages/ImageConverter";
// Color Tools
import HTMLColorCodes from "./pages/HTMLColorCodes";
import GradientGenerator from "./pages/GradientGenerator";
// PDF/Document Tools
import PDFToImage from "./pages/PDFToImage";
// Utility Tools
import BarcodeGenerator from "./pages/BarcodeGenerator";
// Calculator Tools
import SIPCalculator from "./pages/SIPCalculator";
import MortgageCalculator from "./pages/MortgageCalculator";
import PPPCalculator from "./pages/PPPCalculator";
import EMICalculatorAdvanced from "./pages/EMICalculatorAdvanced";
// New Tools
import GIFMaker from "./pages/GIFMaker";
import APNGMaker from "./pages/APNGMaker";
import HistogramGenerator from "./pages/HistogramGenerator";
import CompressPDF from "./pages/CompressPDF";
import MergePDF from "./pages/MergePDF";
import PDFLockUnlock from "./pages/PDFLockUnlock";
import WordToPDF from "./pages/WordToPDF";
import PDFToWord from "./pages/PDFToWord";
import DocumentsConverter from "./pages/DocumentsConverter";
import ESignPDF from "./pages/ESignPDF";
import FaceBlur from "./pages/FaceBlur";
import useAdsterraAds from "./hooks/use-adsterra";

const queryClient = new QueryClient();

const App = () => {
  // Initialize Adsterra ads globally
  useAdsterraAds();

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/remove-background" element={<RemoveBackground />} />
          <Route path="/word-counter" element={<WordCounter />} />
          <Route path="/text-reverser" element={<TextReverser />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/uuid-generator" element={<UUIDGenerator />} />
          <Route path="/image-enhancer" element={<ImageEnhancer />} />
          <Route path="/image-upscaler" element={<ImageUpscaler />} />
          <Route path="/crop-image" element={<CropImage />} />
          <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
          <Route path="/qr-code" element={<QRCodeGenerator />} />
          <Route path="/hex-to-rgb" element={<HexToRGB />} />
          <Route path="/base64-converter" element={<Base64Converter />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/gst-calculator" element={<GSTCalculator />} />
          <Route path="/name-generator" element={<NameGenerator />} />
          <Route path="/image-to-pdf" element={<ImageToPDF />} />
          
          {/* Image Tools */}
          <Route path="/image-compressor" element={<ImageCompressor />} />
          <Route path="/image-resizer" element={<ImageResizer />} />
          <Route path="/image-to-base64" element={<ImageToBase64 />} />
          <Route path="/base64-to-image" element={<ImageToBase64 />} />
          <Route path="/image-pixelator" element={<ImagePixelator />} />
          <Route path="/image-sharpener" element={<ImageSharpener />} />
          <Route path="/image-converter" element={<ImageConverter />} />
          <Route path="/color-picker" element={<HTMLColorCodes />} />
          
          {/* Color Tools */}
          <Route path="/html-color-codes" element={<HTMLColorCodes />} />
          <Route path="/gradient-generator" element={<GradientGenerator />} />
          
          {/* PDF/Document Tools */}
          <Route path="/pdf-to-image" element={<PDFToImage />} />
          
          {/* Utility Tools */}
          <Route path="/barcode-generator" element={<BarcodeGenerator />} />
          
          {/* Calculator Tools */}
          <Route path="/sip-calculator" element={<SIPCalculator />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/ppp-calculator" element={<PPPCalculator />} />
          <Route path="/emi-calculator-advanced" element={<EMICalculatorAdvanced />} />
          
          {/* GIF/Image Animation Tools */}
          <Route path="/gif-maker" element={<GIFMaker />} />
          <Route path="/apng-maker" element={<APNGMaker />} />
          <Route path="/histogram-generator" element={<HistogramGenerator />} />
          <Route path="/face-blur" element={<FaceBlur />} />
          
          {/* PDF Tools */}
          <Route path="/compress-pdf" element={<CompressPDF />} />
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/pdf-lock-unlock" element={<PDFLockUnlock />} />
          <Route path="/word-to-pdf" element={<WordToPDF />} />
          <Route path="/pdf-to-word" element={<PDFToWord />} />
          <Route path="/esign-pdf" element={<ESignPDF />} />
          
          {/* Document Tools */}
          <Route path="/documents-converter" element={<DocumentsConverter />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
