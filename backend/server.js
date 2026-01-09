import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

// ==================== IMAGE TOOLS ====================

// Remove Background (simulated)
app.post('/api/tools/remove-background', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join(uploadsDir, 'processed-' + req.file.filename);

    // Simulate background removal by adding a transparent border
    await sharp(inputPath)
      .png({ alpha: true })
      .toFile(outputPath);

    const processedData = fs.readFileSync(outputPath);
    const base64 = processedData.toString('base64');

    res.json({
      success: true,
      message: 'Background removed successfully',
      image: `data:image/png;base64,${base64}`,
      filename: path.basename(outputPath),
    });

    // Cleanup
    fs.unlinkSync(inputPath);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Processing failed', details: error.message });
  }
});

// Image Compressor
app.post('/api/tools/compress-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputPath = req.file.path;
    const quality = parseInt(req.body.quality) || 80;
    const outputPath = path.join(uploadsDir, 'compressed-' + req.file.filename);

    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality, progressive: true })
      .toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(2);

    const processedData = fs.readFileSync(outputPath);
    const base64 = processedData.toString('base64');

    res.json({
      success: true,
      message: 'Image compressed successfully',
      image: `data:image/jpeg;base64,${base64}`,
      originalSize,
      compressedSize,
      reduction: `${reduction}%`,
      filename: path.basename(outputPath),
    });

    fs.unlinkSync(inputPath);
  } catch (error) {
    res.status(500).json({ error: 'Compression failed', details: error.message });
  }
});

// Image Resizer
app.post('/api/tools/resize-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { width, height } = req.body;
    const inputPath = req.file.path;
    const outputPath = path.join(uploadsDir, 'resized-' + req.file.filename);

    await sharp(inputPath)
      .resize(parseInt(width), parseInt(height), { fit: 'cover' })
      .toFile(outputPath);

    const processedData = fs.readFileSync(outputPath);
    const base64 = processedData.toString('base64');

    res.json({
      success: true,
      message: 'Image resized successfully',
      image: `data:image/png;base64,${base64}`,
      width,
      height,
      filename: path.basename(outputPath),
    });

    fs.unlinkSync(inputPath);
  } catch (error) {
    res.status(500).json({ error: 'Resizing failed', details: error.message });
  }
});

// ==================== TEXT TOOLS ====================

// Word Counter
app.post('/api/tools/word-counter', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    const words = text.trim().split(/\s+/).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).length - 1;
    const paragraphs = text.split(/\n\n+/).length;
    const readingTime = Math.ceil(words / 200); // Avg 200 words per minute

    res.json({
      success: true,
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime: `${readingTime} min`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
});

// Text Reverser
app.post('/api/tools/reverse-text', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    const reversed = text.split('').reverse().join('');

    res.json({
      success: true,
      original: text,
      reversed,
    });
  } catch (error) {
    res.status(500).json({ error: 'Reversal failed', details: error.message });
  }
});

// ==================== CALCULATOR TOOLS ====================

// Age Calculator
app.post('/api/tools/age-calculator', (req, res) => {
  try {
    const { birthDate } = req.body;
    if (!birthDate) {
      return res.status(400).json({ error: 'Birth date required' });
    }

    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    res.json({
      success: true,
      age,
      daysUntilBirthday,
      nextBirthday: nextBirthday.toDateString(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Calculation failed', details: error.message });
  }
});

// BMI Calculator
app.post('/api/tools/bmi-calculator', (req, res) => {
  try {
    const { weight, height, unit = 'kg' } = req.body;

    if (!weight || !height) {
      return res.status(400).json({ error: 'Weight and height required' });
    }

    let bmi;
    if (unit === 'kg') {
      bmi = weight / (height * height);
    } else {
      // Pounds and inches
      bmi = (weight / (height * height)) * 703;
    }

    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    res.json({
      success: true,
      bmi: bmi.toFixed(1),
      category,
      unit,
    });
  } catch (error) {
    res.status(500).json({ error: 'Calculation failed', details: error.message });
  }
});

// Unit Converter
app.post('/api/tools/unit-converter', (req, res) => {
  try {
    const { value, fromUnit, toUnit } = req.body;

    if (!value || !fromUnit || !toUnit) {
      return res.status(400).json({ error: 'All parameters required' });
    }

    const conversions = {
      // Length
      'm-km': (v) => v / 1000,
      'km-m': (v) => v * 1000,
      'm-cm': (v) => v * 100,
      'cm-m': (v) => v / 100,
      'kg-g': (v) => v * 1000,
      'g-kg': (v) => v / 1000,
      'celsius-fahrenheit': (v) => (v * 9) / 5 + 32,
      'fahrenheit-celsius': (v) => ((v - 32) * 5) / 9,
    };

    const key = `${fromUnit}-${toUnit}`;
    const converter = conversions[key];

    if (!converter) {
      return res.status(400).json({ error: 'Conversion not supported' });
    }

    const result = converter(parseFloat(value));

    res.json({
      success: true,
      value: parseFloat(value),
      fromUnit,
      toUnit,
      result: parseFloat(result.toFixed(4)),
    });
  } catch (error) {
    res.status(500).json({ error: 'Conversion failed', details: error.message });
  }
});

// ==================== UTILITY TOOLS ====================

// Password Generator
app.post('/api/tools/password-generator', (req, res) => {
  try {
    const {
      length = 16,
      useUppercase = true,
      useLowercase = true,
      useNumbers = true,
      useSymbols = true,
    } = req.body;

    let chars = '';
    if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    res.json({
      success: true,
      password,
      length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Generation failed', details: error.message });
  }
});

// UUID Generator
app.post('/api/tools/uuid-generator', (req, res) => {
  try {
    const { count = 1 } = req.body;

    const uuids = [];
    for (let i = 0; i < count; i++) {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      uuids.push(uuid);
    }

    res.json({
      success: true,
      uuids,
      count,
    });
  } catch (error) {
    res.status(500).json({ error: 'Generation failed', details: error.message });
  }
});

// Base64 Converter
app.post('/api/tools/base64-converter', (req, res) => {
  try {
    const { text, mode = 'encode' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text required' });
    }

    let result;
    if (mode === 'encode') {
      result = Buffer.from(text).toString('base64');
    } else {
      result = Buffer.from(text, 'base64').toString('utf-8');
    }

    res.json({
      success: true,
      original: text,
      result,
      mode,
    });
  } catch (error) {
    res.status(500).json({ error: 'Conversion failed', details: error.message });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`   API endpoints available at http://localhost:${PORT}/api/tools/*`);
});
