import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
const About = lazy(() => import("./pages/About"));
const Tools = lazy(() => import("./pages/Tools"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RemoveBackground = lazy(() => import("./pages/RemoveBackground"));
const WordCounter = lazy(() => import("./pages/WordCounter"));
const TextReverser = lazy(() => import("./pages/TextReverser"));
const AgeCalculator = lazy(() => import("./pages/AgeCalculator"));
const BMICalculator = lazy(() => import("./pages/BMICalculator"));
const UnitConverter = lazy(() => import("./pages/UnitConverter"));
const PasswordGenerator = lazy(() => import("./pages/PasswordGenerator"));
const UUIDGenerator = lazy(() => import("./pages/UUIDGenerator"));
const ImageEnhancer = lazy(() => import("./pages/ImageEnhancer"));
const ImageUpscaler = lazy(() => import("./pages/ImageUpscaler"));
const CropImage = lazy(() => import("./pages/CropImage"));
const QRCodeGenerator = lazy(() => import("./pages/QRCodeGenerator"));
const HexToRGB = lazy(() => import("./pages/HexToRGB"));
const Base64Converter = lazy(() => import("./pages/Base64Converter"));
const EMICalculator = lazy(() => import("./pages/EMICalculator"));
const GSTCalculator = lazy(() => import("./pages/GSTCalculator"));
const NameGenerator = lazy(() => import("./pages/NameGenerator"));
const ImageToPDF = lazy(() => import("./pages/ImageToPDF"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
// Image Tools
const ImageCompressor = lazy(() => import("./pages/ImageCompressor"));
const ImageResizer = lazy(() => import("./pages/ImageResizer"));
const ImageToBase64 = lazy(() => import("./pages/ImageToBase64"));
const ImagePixelator = lazy(() => import("./pages/ImagePixelator"));
const ImageSharpener = lazy(() => import("./pages/ImageSharpener"));
const ImageConverter = lazy(() => import("./pages/ImageConverter"));
// Color Tools
const HTMLColorCodes = lazy(() => import("./pages/HTMLColorCodes"));
const GradientGenerator = lazy(() => import("./pages/GradientGenerator"));
// PDF/Document Tools
const PDFToImage = lazy(() => import("./pages/PDFToImage"));
// Utility Tools
const BarcodeGenerator = lazy(() => import("./pages/BarcodeGenerator"));
// Calculator Tools
const SIPCalculator = lazy(() => import("./pages/SIPCalculator"));
const MortgageCalculator = lazy(() => import("./pages/MortgageCalculator"));
const PPPCalculator = lazy(() => import("./pages/PPPCalculator"));
const EMICalculatorAdvanced = lazy(() => import("./pages/EMICalculatorAdvanced"));
// New Tools
const HistogramGenerator = lazy(() => import("./pages/HistogramGenerator"));
const CompressPDF = lazy(() => import("./pages/CompressPDF"));
const MergePDF = lazy(() => import("./pages/MergePDF"));
const WordToPDF = lazy(() => import("./pages/WordToPDF"));
const PDFToWord = lazy(() => import("./pages/PDFToWord"));
const DocumentsConverter = lazy(() => import("./pages/DocumentsConverter"));
const ESignPDF = lazy(() => import("./pages/ESignPDF"));
const FaceBlur = lazy(() => import("./pages/FaceBlur"));
const Contact = lazy(() => import("./pages/Contact"));
import ErrorBoundary from "./components/ErrorBoundary";
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const AdvertisingDisclosure = lazy(() => import("./pages/AdvertisingDisclosure"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Guides = lazy(() => import("./pages/Guides"));
const GuideDetail = lazy(() => import("./pages/GuideDetail"));

const queryClient = new QueryClient();

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/category/:category" element={<Tools />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<GuideDetail />} />
            <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/advertising-disclosure" element={<AdvertisingDisclosure />} />
            <Route path="/accessibility" element={<Accessibility />} />
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
          <Route path="/histogram-generator" element={<HistogramGenerator />} />
          <Route path="/face-blur" element={<FaceBlur />} />
          
          {/* PDF Tools */}
          <Route path="/compress-pdf" element={<CompressPDF />} />
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/word-to-pdf" element={<WordToPDF />} />
          <Route path="/pdf-to-word" element={<PDFToWord />} />
          <Route path="/esign-pdf" element={<ESignPDF />} />
          
          {/* Document Tools */}
          <Route path="/documents-converter" element={<DocumentsConverter />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
