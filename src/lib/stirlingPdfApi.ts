// Stirling PDF API Integration
// Documentation: https://docs.stirlingpdf.com/

const STIRLING_PDF_URL = import.meta.env.VITE_STIRLING_PDF_URL || 'http://localhost:8080';
const STIRLING_API_KEY = import.meta.env.VITE_STIRLING_API_KEY || '1e75c22b-a848-4c7a-80a2-61bf91b13cea';

interface StirlingApiResponse {
  success: boolean;
  data?: Blob;
  error?: string;
}

/**
 * Merge multiple PDF files using Stirling PDF API
 * @param files - Array of PDF File objects
 * @returns Promise containing the merged PDF as Blob
 */
export const mergePdfs = async (files: File[]): Promise<Blob> => {
  try {
    const formData = new FormData();

    // Add all PDF files to FormData
    files.forEach((file, index) => {
      formData.append('fileInput', file);
    });

    const response = await fetch(`${STIRLING_PDF_URL}/api/v1/misc/merge-pdfs`, {
      method: 'POST',
      headers: {
        'X-API-KEY': STIRLING_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Stirling API Error: ${response.status} - ${errorText}`);
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Error merging PDFs:', error);
    throw error;
  }
};

/**
 * Add watermark to PDF using Stirling PDF API
 */
export const addWatermark = async (
  file: File,
  watermarkText: string,
  opacity: number = 0.5,
  fontSize: number = 30
): Promise<Blob> => {
  try {
    const formData = new FormData();
    formData.append('fileInput', file);
    formData.append('watermarkType', 'text');
    formData.append('watermarkText', watermarkText);
    formData.append('fontSize', fontSize.toString());
    formData.append('opacity', opacity.toString());
    formData.append('rotation', '0');
    formData.append('widthSpacer', '50');
    formData.append('heightSpacer', '50');

    const response = await fetch(`${STIRLING_PDF_URL}/api/v1/misc/add-watermark`, {
      method: 'POST',
      headers: {
        'X-API-KEY': STIRLING_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to add watermark: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error('Error adding watermark:', error);
    throw error;
  }
};

/**
 * Compress PDF using Stirling PDF API
 */
export const compressPdf = async (file: File, optimizeLevel: string = 'recommended'): Promise<Blob> => {
  try {
    const formData = new FormData();
    formData.append('fileInput', file);
    formData.append('optimizeLevel', optimizeLevel);

    const response = await fetch(`${STIRLING_PDF_URL}/api/v1/misc/compress-pdf`, {
      method: 'POST',
      headers: {
        'X-API-KEY': STIRLING_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to compress PDF: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error('Error compressing PDF:', error);
    throw error;
  }
};

/**
 * Convert PDF to images using Stirling PDF API
 */
export const pdfToImages = async (file: File, imageFormat: string = 'png'): Promise<Blob> => {
  try {
    const formData = new FormData();
    formData.append('fileInput', file);
    formData.append('imageFormat', imageFormat);
    formData.append('singleOrMultiple', 'multiple');

    const response = await fetch(`${STIRLING_PDF_URL}/api/v1/convert/pdf-to-img`, {
      method: 'POST',
      headers: {
        'X-API-KEY': STIRLING_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to convert PDF to images: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error('Error converting PDF to images:', error);
    throw error;
  }
};

/**
 * Split PDF into pages using Stirling PDF API
 */
export const splitPdf = async (file: File): Promise<Blob> => {
  try {
    const formData = new FormData();
    formData.append('fileInput', file);

    const response = await fetch(`${STIRLING_PDF_URL}/api/v1/split-pdfs`, {
      method: 'POST',
      headers: {
        'X-API-KEY': STIRLING_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to split PDF: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error('Error splitting PDF:', error);
    throw error;
  }
};

/**
 * Get health status of Stirling PDF API
 */
export const checkStirlingHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${STIRLING_PDF_URL}/api/v1/info/health`, {
      method: 'GET',
      headers: {
        'X-API-KEY': STIRLING_API_KEY,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Stirling PDF API health check failed:', error);
    return false;
  }
};

export default {
  mergePdfs,
  addWatermark,
  compressPdf,
  pdfToImages,
  splitPdf,
  checkStirlingHealth,
};
