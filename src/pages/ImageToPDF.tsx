import { useState } from 'react';
import { Upload, Download, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ImageToPDF() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target?.result as string]);
        setError('');
      };
      reader.readAsDataURL(file);
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Dynamically load jsPDF and html2canvas
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
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
            const yPos = (pageHeight - imgHeight) / 2;

            pdf.addImage(images[i], 'JPEG', 10, yPos, imgWidth, imgHeight);
            resolve(null);
          };
        });
      }

      pdf.save('images-to-pdf.pdf');
      setLoading(false);
    } catch (err) {
      setError('Failed to generate PDF. Make sure jsPDF is installed.');
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setImages([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4 md:p-8">
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Image to PDF</h1>
          <p className="text-gray-600">Convert multiple images into a single PDF file</p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Images</CardTitle>
            <CardDescription>Select one or more images to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-red-300 rounded-lg p-8 text-center hover:border-red-500 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                <Upload className="mx-auto h-12 w-12 text-red-500 mb-2" />
                <p className="text-sm text-gray-600">Click to upload images</p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 50MB each</p>
              </label>
            </div>

            {images.length > 0 && (
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={generatePDF}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 gap-2 flex-1"
                >
                  <FileText className="h-4 w-4" />
                  {loading ? 'Generating PDF...' : 'Generate PDF'}
                </Button>
                <Button onClick={clearAll} variant="outline" className="flex-1">
                  Clear All
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Image Preview */}
        {images.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Selected Images</CardTitle>
                <CardDescription>{images.length} image(s) selected</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {images.map((image, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-16 h-16 rounded border border-gray-300 overflow-hidden">
                        <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Image {index + 1}</p>
                        <p className="text-xs text-gray-600">Click to view full size</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeImage(index)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
