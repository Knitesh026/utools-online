import { useState } from "react";
import { Upload, AlertCircle, FileText, Image as ImageIcon, Shield, Zap } from "lucide-react";
import ProfessionalToolLayout from "@/components/ProfessionalToolLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ImageToPDF() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target?.result as string]);
        setError("");
      };
      reader.readAsDataURL(file);
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        const img = new Image();
        img.src = images[i];

        await new Promise((resolve) => {
          img.onload = () => {
            const imgWidth = pageWidth - 20;
            const imgHeight = (img.height * imgWidth) / img.width;
            const yPos = Math.max(10, (pageHeight - imgHeight) / 2);

            pdf.addImage(images[i], "JPEG", 10, yPos, imgWidth, imgHeight);
            resolve(null);
          };
        });
      }

      pdf.save("images-to-pdf.pdf");
      setLoading(false);
    } catch (err) {
      setError("Failed to generate PDF.");
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setImages([]);
    setError("");
  };

  const inputSection = (
    <div>
      <CardHeader>
        <CardTitle>Upload Images</CardTitle>
        <CardDescription>Select one or more images to compile into an A4 PDF document</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-primary/50 hover:bg-slate-50 transition">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer block">
            <Upload className="mx-auto h-10 w-10 text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">Click to upload images</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WebP up to 50MB each</p>
          </label>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {images.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={generatePDF} disabled={loading} className="gap-2 flex-1">
              <FileText className="h-4 w-4" />
              {loading ? "Generating PDF..." : `Generate PDF (${images.length})`}
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear All
            </Button>
          </div>
        )}
      </CardContent>
    </div>
  );

  const outputSection =
    images.length > 0 ? (
      <div>
        <CardHeader>
          <CardTitle>Selected Images</CardTitle>
          <CardDescription>{images.length} image(s) queued for PDF pages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-14 h-14 rounded-lg border border-slate-200 overflow-hidden bg-white">
                    <img
                      src={image}
                      alt={`Selected page ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Page {index + 1}</p>
                    <p className="text-xs text-slate-500">Centered on A4 portrait page</p>
                  </div>
                </div>
                <Button onClick={() => removeImage(index)} variant="destructive" size="sm">
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    ) : undefined;

  return (
    <ProfessionalToolLayout
      title="Image to PDF"
      description="Convert multiple images into a single clean A4 PDF file in your browser"
      icon={FileText}
      category="PDF"
      inputSection={inputSection}
      outputSection={outputSection}
      features={[
        {
          icon: ImageIcon,
          title: "Multi-Image Support",
          description: "Combine JPG, PNG, and WebP photos into sequential PDF pages.",
        },
        {
          icon: Shield,
          title: "Private Processing",
          description: "Your photos stay in browser memory and are never uploaded.",
        },
        {
          icon: Zap,
          title: "Instant A4 Layout",
          description: "Automatically scales and centers each image onto standard A4 pages.",
        },
      ]}
    />
  );
}
