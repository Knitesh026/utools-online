import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import fs from 'fs';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Use temp directory for Vercel serverless environment
const uploadsDir = path.join(os.tmpdir(), 'uploads');
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
    const outputPath = inputPath.replace('.', '-removed-bg.');

    // For demo: add transparency to edges
    await sharp(inputPath)
      .extract({ left: 10, top: 10, width: 200, height: 200 })
      .png({ quality: 90 })
      .toFile(outputPath);

    const fileBuffer = fs.readFileSync(outputPath);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="removed-background.png"');
    res.send(fileBuffer);

    // Cleanup
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  } catch (err) {
    console.error('Remove background error:', err);
    res.status(500).json({ error: 'Failed to remove background', details: err.message });
  }
});

// Image Compressor
app.post('/api/tools/compress-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const quality = parseInt(req.body.quality) || 80;
    const inputPath = req.file.path;
    const outputPath = inputPath.replace('.', '-compressed.');

    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality })
      .toFile(outputPath);

    const fileBuffer = fs.readFileSync(outputPath);
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'attachment; filename="compressed-image.jpg"');
    res.send(fileBuffer);

    // Cleanup
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  } catch (err) {
    console.error('Image compression error:', err);
    res.status(500).json({ error: 'Failed to compress image', details: err.message });
  }
});

// Image Resizer
app.post('/api/tools/resize-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const width = parseInt(req.body.width) || 800;
    const height = parseInt(req.body.height) || 600;
    const inputPath = req.file.path;
    const outputPath = inputPath.replace('.', '-resized.');

    await sharp(inputPath)
      .resize(width, height, { fit: 'fill', withoutEnlargement: true })
      .toFile(outputPath);

    const fileBuffer = fs.readFileSync(outputPath);
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'attachment; filename="resized-image.jpg"');
    res.send(fileBuffer);

    // Cleanup
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  } catch (err) {
    console.error('Image resizing error:', err);
    res.status(500).json({ error: 'Failed to resize image', details: err.message });
  }
});

// Placeholder endpoints for document conversions
app.post('/api/convert-word-to-pdf', upload.single('file'), (req, res) => {
  try {
    res.status(501).json({ error: 'Word to PDF conversion requires backend setup. Use a service like LibreOffice or Pandoc.' });
  } catch (err) {
    res.status(500).json({ error: 'Conversion failed', details: err.message });
  }
});

app.post('/api/convert-pdf-to-word', upload.single('file'), (req, res) => {
  try {
    res.status(501).json({ error: 'PDF to Word conversion requires backend setup. Use a service like LibreOffice or Pandoc.' });
  } catch (err) {
    res.status(500).json({ error: 'Conversion failed', details: err.message });
  }
});

app.post('/api/convert-document', upload.single('file'), (req, res) => {
  try {
    res.status(501).json({ error: 'Document conversion requires backend setup. Use a service like LibreOffice or Pandoc.' });
  } catch (err) {
    res.status(500).json({ error: 'Conversion failed', details: err.message });
  }
});

app.post('/api/sign-pdf', upload.single('pdf'), (req, res) => {
  try {
    res.status(501).json({ error: 'PDF signing requires backend setup.' });
  } catch (err) {
    res.status(500).json({ error: 'Signing failed', details: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    environment: 'Vercel Serverless'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'uTools Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      imageTools: '/api/tools/*',
      documentConversion: '/api/convert-*'
    }
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'uTools Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      imageTools: '/api/tools/*',
      documentConversion: '/api/convert-*'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error', 
    details: err.message,
    timestamp: new Date().toISOString()
  });
});

export default app;
